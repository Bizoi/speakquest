(function () {
  const STORAGE_KEY = 'sandwich_party_progress_v1';

  const defaultState = () => ({
    mode: 'vocab',
    wordMastery: {}, // { [wordId]: { roundA: false, roundB: false, mastered: false } }
    reviewQueue: [], // [{ key: 'vocab:cheese', type: 'vocab', id: 'cheese', label: 'cheese — גבינה', reason: 'טעות/רמז' }]
    completedChunks: [],
    completedDays: [],
    completedPhonics: []
  });

  let state = loadState();
  let activeSession = null; // Current sprint or station session
  let mediaRecorder = null;
  let audioChunks = [];
  let recognitionInstance = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore storage quota errors
    }
    updateHeaderStats();
  }

  function getWordMastery(wordId) {
    if (!state.wordMastery[wordId]) {
      state.wordMastery[wordId] = { roundA: false, roundB: false, mastered: false };
    }
    return state.wordMastery[wordId];
  }

  function addToReviewQueue(type, id, label, reason) {
    const key = `${type}:${id}`;
    const existing = state.reviewQueue.find(item => item.key === key);
    if (!existing) {
      state.reviewQueue.push({ key, type, id, label, reason });
    } else {
      existing.reason = reason;
    }
    saveState();
  }

  function removeFromReviewQueue(type, id) {
    const key = `${type}:${id}`;
    state.reviewQueue = state.reviewQueue.filter(item => item.key !== key);
    saveState();
  }

  function updateHeaderStats() {
    const masteredCount = ALL_WORDS.filter(w => getWordMastery(w.id).mastered).length;
    const statMastered = document.getElementById('stat-mastered');
    const reviewCount = document.getElementById('review-count');
    if (statMastered) {
      statMastered.textContent = `✅ נלמדו באמת: ${masteredCount} / ${ALL_WORDS.length}`;
    }
    if (reviewCount) {
      reviewCount.textContent = String(state.reviewQueue.length);
    }
  }

  // Highlight ch, sh, th in English words/sentences safely
  function highlightPhonics(text) {
    if (!text) return '';
    return text.replace(/(ch|sh|th)/gi, match => {
      const lower = match.toLowerCase();
      return `<span class="ph-${lower}">${match}</span>`;
    });
  }

  function highlightCapitalDay(dayName) {
    if (!dayName) return '';
    const first = dayName.charAt(0);
    const rest = highlightPhonics(dayName.slice(1));
    return `<span class="cap-letter">${first}</span>${rest}`;
  }

  function speakEnglish(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 400);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.85;
      utter.onend = () => {
        if (onEnd) onEnd();
      };
      utter.onerror = () => {
        if (onEnd) onEnd();
      };
      window.speechSynthesis.speak(utter);
    } catch (e) {
      if (onEnd) setTimeout(onEnd, 400);
    }
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickDistractors(targetWord, pool, count = 2) {
    const candidates = pool.filter(w => w.id !== targetWord.id);
    const source = candidates.length >= count ? candidates : ALL_WORDS.filter(w => w.id !== targetWord.id);
    return shuffle(source).slice(0, count);
  }

  function blankWordInSentence(sentence, wordEn) {
    const regex = new RegExp(`\\b${wordEn}\\b`, 'i');
    if (regex.test(sentence)) {
      return sentence.replace(regex, '___');
    }
    return `${sentence} (___)`;
  }

  // Build a 5-word Micro-Sprint (Round A + Round B + 2 Speaking & Self-Listening cards)
  function startVocabSprint(wordsList, title, isReviewSprint = false) {
    const batch = wordsList.slice(0, 5);
    const drawerPool = ALL_WORDS.filter(w => w.drawerId === (batch[0]?.drawerId || 'sandwich'));

    const cards = [];
    // Round A: Recognition (English -> Hebrew)
    batch.forEach(word => {
      const distractors = pickDistractors(word, drawerPool, 2);
      cards.push({
        cardType: 'vocab-round-a',
        word,
        choices: shuffle([
          { label: `${word.he} ${word.emoji}`, isCorrect: true, value: word.id },
          ...distractors.map(d => ({ label: `${d.he} ${d.emoji}`, isCorrect: false, value: d.id }))
        ]),
        flawed: false,
        hintLevel: 0,
        answered: false
      });
    });

    // Round B: Reverse Context Verification inside a 3-4 word sentence (Hebrew + Blanked English -> English word)
    batch.forEach(word => {
      const distractors = pickDistractors(word, drawerPool, 2);
      cards.push({
        cardType: 'vocab-round-b',
        word,
        blankedSentence: blankWordInSentence(word.shortEn, word.en),
        choices: shuffle([
          { label: word.en, isCorrect: true, value: word.id },
          ...distractors.map(d => ({ label: d.en, isCorrect: false, value: d.id }))
        ]),
        flawed: false,
        hintLevel: 0,
        answered: false
      });
    });

    // Round C: 2 Mandatory Speaking & Self-Listening Cards at the end of the sprint (25% speaking)
    const speakWords = batch.slice(0, Math.min(2, batch.length));
    speakWords.forEach(word => {
      cards.push({
        cardType: 'vocab-speak',
        word,
        phraseToSpeak: word.shortEn,
        phraseHe: word.shortHe,
        recordedUrl: null,
        hasListenedToSelf: false,
        sttTranscript: '',
        answered: false
      });
    });

    activeSession = {
      sessionType: 'vocab-sprint',
      title,
      isReviewSprint,
      batch,
      cards,
      currentIndex: 0,
      flawedWordIds: new Set()
    };
    render();
  }

  function startReviewQueueSprint() {
    if (state.reviewQueue.length === 0) return;
    const vocabReviewIds = state.reviewQueue
      .filter(item => item.type === 'vocab')
      .map(item => item.id);
    const wordsToReview = ALL_WORDS.filter(w => vocabReviewIds.includes(w.id));

    if (wordsToReview.length > 0) {
      state.mode = 'vocab';
      syncTabButtons();
      startVocabSprint(wordsToReview, '🔄 ספרינט חיזוק זיכרון — מילים שטעיתי או ביקשתי רמז', true);
      return;
    }

    // If review queue has chunks/days/phonics, jump to that station
    const firstItem = state.reviewQueue[0];
    if (firstItem.type === 'chunk') {
      switchMode('chunks');
    } else if (firstItem.type === 'day') {
      switchMode('days');
    } else if (firstItem.type === 'phonics') {
      switchMode('phonics');
    }
  }

  function formatMasteryDots(wordId, flawedWordIds) {
    const m = getWordMastery(wordId);
    const isFlawedNow = flawedWordIds && flawedWordIds.has(wordId);
    if (m.mastered && !isFlawedNow) {
      return { text: '● ● נלמד באמת! ✅', isMastered: true };
    }
    if (m.roundA && !isFlawedNow) {
      return { text: '● ○ שלב 1 מתוך 2 (עוד אימות במשפט)', isMastered: false };
    }
    if (isFlawedNow) {
      return { text: '◐ ○ נעזרנו ברמז/ניסיון — ייכנס לחיזוק זיכרון 🔄', isMastered: false };
    }
    return { text: '○ ○ מילה חדשה בספרינט', isMastered: false };
  }

  // Render Vocab Overview (6 Drawers + Review Queue Banner)
  function renderVocabOverview(container) {
    const reviewVocabCount = state.reviewQueue.filter(i => i.type === 'vocab').length;

    let reviewBannerHtml = '';
    if (state.reviewQueue.length > 0) {
      reviewBannerHtml = `
        <div class="practice-card" style="border-color: #f59e0b; background: #fffbeb;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h2 style="font-size:1.15rem;">🔄 תור חיזוק זיכרון פעיל (${state.reviewQueue.length} פריטים)</h2>
              <p style="color:var(--text-muted); font-size:0.92rem;">
                כאן מחכות המילים והתבניות שבהן ביקשתם רמז, טעיתם בלחיצה, או סימנתם שהתבלבלתם בהגייה.
              </p>
            </div>
            <button type="button" class="btn btn-warning" id="btn-launch-review-now">
              🚀 תרגל עכשיו חיזוק זיכרון (${state.reviewQueue.length})
            </button>
          </div>
        </div>
      `;
    }

    const drawersHtml = DRAWERS.map(drawer => {
      const total = drawer.words.length;
      const mastered = drawer.words.filter(w => getWordMastery(w.id).mastered).length;
      const pct = Math.round((mastered / total) * 100);
      const isCompleted = mastered === total;

      return `
        <div class="drawer-card ${isCompleted ? 'completed' : ''}">
          <div>
            <div class="drawer-header">
              <div class="drawer-title">${drawer.title}</div>
              <span class="mastery-badge ${isCompleted ? 'mastered' : ''}">${mastered} / ${total} נלמדו</span>
            </div>
            <p style="font-size:0.86rem; color:var(--text-muted); margin: 6px 0 12px;">${drawer.subtitle}</p>
            <div class="drawer-progress-bar">
              <div class="drawer-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="drawer-actions">
            <button type="button" class="btn btn-primary" style="flex:1;" data-start-drawer="${drawer.id}">
              ${isCompleted ? '🔁 תרגול חוזר (5 מילים)' : '🚀 ספרינט 5 מילים'}
            </button>
            <button type="button" class="btn btn-secondary" data-preview-drawer="${drawer.id}" title="הצג את כל מילות המגירה">
              📖 מילים
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      ${reviewBannerHtml}
      <div class="practice-card">
        <h2 style="font-size:1.2rem; margin-bottom:6px;">איך עובד אימון הזיכרון שלנו? (נגד ניחוש מקרי!)</h2>
        <p style="color:var(--text-muted); font-size:0.93rem;">
          בכל ספרינט מתרגלים רק <strong>5 מילים קצרות</strong> ב-3 שלבים:
          <strong>(1)</strong> זיהוי משמעות המילה ←
          <strong>(2)</strong> שיבוץ המילה בתוך משפט קצר של 3–4 מילים ←
          <strong>(3)</strong> הקלטה קולית ושמיעה עצמית אוטומטית של המשפט!
          מילה מסומנת כ<strong>"נלמד באמת ✅"</strong> רק כשמצליחים בשני הסבבים בלי לנחש ובלי רמז.
        </p>
      </div>
      <div class="drawers-grid">${drawersHtml}</div>
      <div id="drawer-preview-box"></div>
    `;

    const launchReviewBtn = document.getElementById('btn-launch-review-now');
    if (launchReviewBtn) {
      launchReviewBtn.addEventListener('click', startReviewQueueSprint);
    }

    container.querySelectorAll('[data-start-drawer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawerId = btn.getAttribute('data-start-drawer');
        const drawer = DRAWERS.find(d => d.id === drawerId);
        if (!drawer) return;
        const unmastered = drawer.words.filter(w => !getWordMastery(w.id).mastered);
        const pool = unmastered.length > 0 ? unmastered : shuffle(drawer.words);
        startVocabSprint(pool, drawer.title, false);
      });
    });

    container.querySelectorAll('[data-preview-drawer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawerId = btn.getAttribute('data-preview-drawer');
        const drawer = DRAWERS.find(d => d.id === drawerId);
        if (!drawer) return;
        renderDrawerWordList(drawer);
      });
    });
  }

  function renderDrawerWordList(drawer) {
    const box = document.getElementById('drawer-preview-box');
    if (!box) return;
    const cardsHtml = drawer.words.map(w => {
      const m = getWordMastery(w.id);
      return `
        <div class="word-mini-card">
          <div class="word-mini-top">
            <span style="font-weight:800; font-size:1.1rem; direction:ltr;">${w.emoji} ${highlightPhonics(w.en)}</span>
            <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:0.8rem;" data-speak-word="${w.en}">🔊</button>
          </div>
          <div style="font-weight:700; color:var(--text-main);">${w.he}</div>
          <div style="font-size:0.84rem; color:var(--text-muted); direction:ltr; text-align:left;">"${highlightPhonics(w.shortEn)}"</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${w.shortHe}</div>
          <div style="font-size:0.78rem; margin-top:4px; font-weight:700; color:${m.mastered ? 'var(--success)' : 'var(--text-muted)'};">
            ${m.mastered ? '● ● נלמד באמת ✅' : '○ ○ טרם הושלם אימות כפול'}
          </div>
        </div>
      `;
    }).join('');

    box.innerHTML = `
      <div class="practice-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h3>📖 כל המילים ב${drawer.title}</h3>
          <button type="button" class="btn btn-primary" id="btn-start-from-preview">🚀 התחל ספרינט ממגירה זו</button>
        </div>
        <div class="word-list-grid">${cardsHtml}</div>
      </div>
    `;

    box.querySelectorAll('[data-speak-word]').forEach(b => {
      b.addEventListener('click', () => speakEnglish(b.getAttribute('data-speak-word')));
    });
    const startBtn = document.getElementById('btn-start-from-preview');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const unmastered = drawer.words.filter(w => !getWordMastery(w.id).mastered);
        const pool = unmastered.length > 0 ? unmastered : shuffle(drawer.words);
        startVocabSprint(pool, drawer.title, false);
      });
    }
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Render an active Vocab Sprint Card (Round A, Round B, or Round C Speaking)
  function renderVocabSprint(container) {
    const s = activeSession;
    if (s.currentIndex >= s.cards.length) {
      renderVocabSprintSummary(container);
      return;
    }

    const card = s.cards[s.currentIndex];
    const word = card.word;
    const masteryInfo = formatMasteryDots(word.id, s.flawedWordIds);

    const dotsHtml = s.cards.map((c, idx) => {
      const cls = idx < s.currentIndex ? 'done' : idx === s.currentIndex ? 'active' : '';
      return `<span class="step-dot ${cls}" title="שלב ${idx + 1} מתוך ${s.cards.length}"></span>`;
    }).join('');

    const phonicsLegend = word.phonics === 'ch'
      ? '<div class="phonics-tip">🟧 שימו לב לצליל <strong>ch (צ׳)</strong> המודגש בכתום!</div>'
      : word.phonics === 'sh'
      ? '<div class="phonics-tip">🟦 שימו לב לצליל <strong>sh (שׁ)</strong> המודגש בכחול!</div>'
      : word.phonics === 'th'
      ? '<div class="phonics-tip">🟪 שימו לב לצליל <strong>th (לשון בין השיניים 👅)</strong> המודגש בסגול!</div>'
      : '';

    if (card.cardType === 'vocab-round-a' || card.cardType === 'vocab-round-b') {
      const isRoundA = card.cardType === 'vocab-round-a';
      const roundBadge = isRoundA
        ? 'סבב א׳ (1/2): זיהוי משמעות המילה'
        : 'סבב ב׳ (2/2): אימות הפוך בתוך משפט קצר (3–4 מילים)';

      const showcaseHtml = isRoundA
        ? `
          <div class="target-showcase">
            <div class="target-emoji">${word.emoji}</div>
            <div class="ltr-en">${highlightPhonics(word.en)}</div>
            ${phonicsLegend}
            <div>
              <button type="button" class="audio-btn" id="btn-play-target-audio">🔊 השמע הגייה באנגלית</button>
            </div>
          </div>
          <h2 class="question-prompt" style="font-size:1.2rem; text-align:center;">מה המשמעות של המילה <strong>${word.en}</strong>?</h2>
        `
        : `
          <div class="target-showcase">
            <div class="target-emoji">${word.emoji}</div>
            <div style="font-size:1.25rem; font-weight:800; margin-bottom:8px;">"${word.shortHe}"</div>
            <div class="ltr-sentence">${highlightPhonics(card.blankedSentence)}</div>
            ${phonicsLegend}
            <div>
              <button type="button" class="audio-btn" id="btn-play-target-audio">🔊 השמע את המשפט המלא</button>
            </div>
          </div>
          <h2 class="question-prompt" style="font-size:1.2rem; text-align:center;">איזו מילה באנגלית משלימה נכון את המשפט הקצר?</h2>
        `;

      const choicesHtml = card.choices.map((ch, idx) => `
        <button type="button" class="choice-btn" data-choice-idx="${idx}" ${card.answered ? 'disabled' : ''}>
          <span style="${!isRoundA ? 'direction:ltr; display:inline-block;' : ''}">
            ${!isRoundA ? highlightPhonics(ch.label) : ch.label}
          </span>
        </button>
      `).join('');

      container.innerHTML = `
        <div class="practice-card">
          <div class="sprint-topbar">
            <div>
              <div style="font-weight:800; font-size:0.95rem;">${s.title}</div>
              <div style="font-size:0.84rem; color:var(--text-muted);">${roundBadge}</div>
            </div>
            <div class="sprint-step-pills">${dotsHtml}</div>
            <span class="mastery-badge ${masteryInfo.isMastered ? 'mastered' : ''}">${masteryInfo.text}</span>
            <button type="button" class="btn btn-secondary" id="btn-exit-sprint" style="padding:6px 12px; font-size:0.82rem;">יציאה למגירות</button>
          </div>

          ${showcaseHtml}

          <div class="choices-grid" id="choices-box">${choicesHtml}</div>

          <div class="support-bar">
            <button type="button" class="btn btn-warning" id="btn-show-hint">
              💡 רמז מדורג (יוסיף את המילה לחיזוק זיכרון)
            </button>
            <span style="font-size:0.84rem; color:var(--text-muted);">כרטיס ${s.currentIndex + 1} מתוך ${s.cards.length}</span>
          </div>

          <div id="hint-area"></div>
          <div id="feedback-area"></div>
        </div>
      `;

      document.getElementById('btn-exit-sprint').addEventListener('click', () => {
        activeSession = null;
        render();
      });

      document.getElementById('btn-play-target-audio').addEventListener('click', () => {
        speakEnglish(isRoundA ? word.en : word.shortEn);
      });

      document.getElementById('btn-show-hint').addEventListener('click', () => {
        card.flawed = true;
        s.flawedWordIds.add(word.id);
        addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'ביקשתי רמז');
        card.hintLevel = Math.min(2, card.hintLevel + 1);
        const hintArea = document.getElementById('hint-area');
        hintArea.innerHTML = `
          <div class="hint-box">
            <div><strong>💡 רמז 1 (צליל):</strong> ${word.hintSound}</div>
            ${card.hintLevel >= 2 ? `<div style="margin-top:4px;"><strong>💡 רמז 2 (הקשר):</strong> ${word.hintContext}</div>` : '<div style="margin-top:4px; font-size:0.82rem;">לחצו שוב על "רמז" לרמז נוסף.</div>'}
          </div>
        `;
      });

      container.querySelectorAll('[data-choice-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.getAttribute('data-choice-idx'));
          const chosen = card.choices[idx];
          const feedbackArea = document.getElementById('feedback-area');

          if (chosen.isCorrect) {
            btn.classList.add('correct');
            container.querySelectorAll('[data-choice-idx]').forEach(b => b.disabled = true);
            speakEnglish(isRoundA ? word.en : word.shortEn);

            const m = getWordMastery(word.id);
            const wasClean = !card.flawed && !s.flawedWordIds.has(word.id);

            if (isRoundA && wasClean) {
              m.roundA = true;
            } else if (!isRoundA && wasClean && m.roundA) {
              m.roundB = true;
              m.mastered = true;
              removeFromReviewQueue('vocab', word.id);
            }
            saveState();

            feedbackArea.innerHTML = `
              <div class="feedback-banner success">
                <div>
                  ${wasClean
                    ? (isRoundA ? '✅ מעולה! עברתם את שלב 1 מתוך 2 למילה זו.' : '🎉 אימות כפול הושלם בהצלחה! המילה סומנה כ"נלמדה באמת"!')
                    : '✅ תשובה נכונה! (מכיוון שנעזרתם בניסיון נוסף/רמז, המילה תחכה לכם גם בחיזוק זיכרון 🔄)'}
                  <div style="font-size:0.9rem; font-weight:600; margin-top:4px;">
                    ${word.en} = ${word.he} · "${word.shortEn}" (${word.shortHe})
                  </div>
                </div>
                <button type="button" class="btn btn-success" id="btn-next-card">המשך ⬅️</button>
              </div>
            `;
            document.getElementById('btn-next-card').addEventListener('click', () => {
              s.currentIndex += 1;
              render();
            });
          } else {
            btn.classList.add('wrong');
            btn.disabled = true;
            card.flawed = true;
            s.flawedWordIds.add(word.id);
            const m = getWordMastery(word.id);
            m.mastered = false;
            addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'טעות בזיהוי');

            feedbackArea.innerHTML = `
              <div class="feedback-banner error">
                <div>
                  ❌ לא בדיוק. המילה <strong>${word.en}</strong> נוספה אוטומטית לתור <strong>חיזוק זיכרון 🔄</strong>.
                  <div>💡 רמז עזר: ${word.hintContext} — נסו לבחור את התשובה הנכונה!</div>
                </div>
              </div>
            `;
          }
        });
      });
      return;
    }

    // Round C: Mandatory Speaking & Self-Listening Station
    if (card.cardType === 'vocab-speak') {
      renderSpeakingCard(container, {
        topTitle: s.title,
        subTitle: 'סבב ג׳ (חובה): 🎤 תחנת דיבור ושמיעה עצמית!',
        dotsHtml,
        emoji: word.emoji,
        phraseEn: card.phraseToSpeak,
        phraseHe: `${word.en} (${word.he}) — "${card.phraseHe}"`,
        phonicsLegend,
        onPass: () => {
          s.currentIndex += 1;
          render();
        },
        onStruggle: () => {
          s.flawedWordIds.add(word.id);
          addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'חיזוק הגייה ודיבור');
          s.currentIndex += 1;
          render();
        },
        onExit: () => {
          activeSession = null;
          render();
        }
      });
    }
  }

  // Reusable Speaking & Automatic Self-Playback Station
  function renderSpeakingCard(container, opts) {
    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800; font-size:0.95rem;">${opts.topTitle}</div>
            <div style="font-size:0.84rem; color:var(--primary); font-weight:700;">${opts.subTitle}</div>
          </div>
          <div class="sprint-step-pills">${opts.dotsHtml || ''}</div>
          <button type="button" class="btn btn-secondary" id="btn-exit-speak" style="padding:6px 12px; font-size:0.82rem;">חזרה</button>
        </div>

        <div class="target-showcase">
          <div class="target-emoji">${opts.emoji || '🎤'}</div>
          <div style="font-size:0.95rem; color:var(--text-muted); margin-bottom:4px;">הקשיבו ואמרו בקול את המשפט הקצר:</div>
          <div class="ltr-sentence">${highlightPhonics(opts.phraseEn)}</div>
          <div style="font-size:1.05rem; font-weight:700; margin-top:6px;">${opts.phraseHe}</div>
          ${opts.phonicsLegend || ''}
          <div>
            <button type="button" class="audio-btn" id="btn-hear-model">🔊 שמעו קודם את ההגייה הנכונה</button>
          </div>
        </div>

        <div class="speech-box">
          <h3 style="font-size:1.1rem; margin-bottom:8px;">🎤 עכשיו תורכם להקליט ולשמוע את עצמכם!</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:14px;">
            ברגע שתסיימו להקליט, האפליקציה <strong>תשמיע לכם אוטומטית את הקול שלכם</strong> ומיד אחריו את ההגייה באנגלית כדי שתשמעו את עצמכם!
          </p>
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
            <button type="button" class="btn btn-primary" id="btn-start-record">
              🎤 הקליטו את עצמכם אומרים: "${opts.phraseEn}"
            </button>
            <button type="button" class="btn btn-warning" id="btn-stop-record" style="display:none;">
              ⏹️ סיימתי לדבר — השמעו לי את עצמי!
            </button>
          </div>
          <div class="speech-status" id="speech-status-msg"></div>
          <div id="self-playback-controls" style="margin-top:12px;"></div>
        </div>

        <div id="self-eval-box" style="display:none;">
          <div class="feedback-banner success" style="flex-direction:column; align-items:stretch; text-align:center;">
            <div>🎧 שמעתם את ההקלטה של עצמכם ואת ההגייה באנגלית. איך יצא לכם?</div>
            <div class="self-check-actions">
              <button type="button" class="btn btn-success" id="btn-speak-good">
                ✅ שמעתי את עצמי — הגיתי נכון! המשך ⬅️
              </button>
              <button type="button" class="btn btn-warning" id="btn-speak-retry">
                😅 התבלבלתי בהגייה — נחזיר לתרגול בחיזוק זיכרון 🔄
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-exit-speak').addEventListener('click', opts.onExit);
    document.getElementById('btn-hear-model').addEventListener('click', () => speakEnglish(opts.phraseEn));

    const startBtn = document.getElementById('btn-start-record');
    const stopBtn = document.getElementById('btn-stop-record');
    const statusMsg = document.getElementById('speech-status-msg');
    const playbackControls = document.getElementById('self-playback-controls');
    const evalBox = document.getElementById('self-eval-box');

    let recordedBlobUrl = null;
    let autoStopTimer = null;

    function finishAndPlaySelf(transcriptText) {
      startBtn.style.display = 'inline-flex';
      stopBtn.style.display = 'none';
      if (autoStopTimer) clearTimeout(autoStopTimer);

      statusMsg.textContent = '🔊 משמיע עכשיו את ההקלטה שלכם... הקשיבו לעצמכם!';

      const afterSelfPlayback = () => {
        statusMsg.textContent = `🔊 ועכשיו הגיית הדוגמה באנגלית: "${opts.phraseEn}"${transcriptText ? ` (זוהה בדיבור: "${transcriptText}")` : ''}`;
        speakEnglish(opts.phraseEn, () => {
          evalBox.style.display = 'block';
        });
      };

      if (recordedBlobUrl) {
        playbackControls.innerHTML = `
          <button type="button" class="btn btn-secondary" id="btn-replay-my-voice">
            🔁 השמע שוב את ההקלטה שלי + הגיית הדוגמה
          </button>
        `;
        const replayBtn = document.getElementById('btn-replay-my-voice');
        if (replayBtn) {
          replayBtn.addEventListener('click', () => {
            const a = new Audio(recordedBlobUrl);
            a.onended = () => speakEnglish(opts.phraseEn);
            a.play().catch(() => speakEnglish(opts.phraseEn));
          });
        }
        const audio = new Audio(recordedBlobUrl);
        audio.onended = afterSelfPlayback;
        audio.onerror = afterSelfPlayback;
        audio.play().catch(afterSelfPlayback);
      } else {
        afterSelfPlayback();
      }
    }

    startBtn.addEventListener('click', async () => {
      statusMsg.textContent = '🎙️ מקליט עכשיו... אמרו בקול: "' + opts.phraseEn + '"';
      startBtn.style.display = 'none';
      stopBtn.style.display = 'inline-flex';
      audioChunks = [];
      let sttText = '';

      // Optional browser SpeechRecognition in parallel
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          recognitionInstance = new SpeechRec();
          recognitionInstance.lang = 'en-US';
          recognitionInstance.interimResults = false;
          recognitionInstance.onresult = e => {
            if (e.results && e.results[0] && e.results[0][0]) {
              sttText = e.results[0][0].transcript;
            }
          };
          recognitionInstance.start();
        } catch (err) {
          // Ignore STT start error
        }
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) audioChunks.push(e.data);
          };
          mediaRecorder.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            if (audioChunks.length > 0) {
              const blob = new Blob(audioChunks, { type: 'audio/webm' });
              recordedBlobUrl = URL.createObjectURL(blob);
            }
            finishAndPlaySelf(sttText);
          };
          mediaRecorder.start();
          autoStopTimer = setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
              mediaRecorder.stop();
            }
          }, 3600);
          return;
        } catch (err) {
          // Fallback if mic permission denied or headless environment
        }
      }

      // Fallback when microphone stream isn't accessible
      autoStopTimer = setTimeout(() => {
        finishAndPlaySelf(sttText);
      }, 1500);
    });

    stopBtn.addEventListener('click', () => {
      if (recognitionInstance) {
        try { recognitionInstance.stop(); } catch (e) {}
      }
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      } else {
        finishAndPlaySelf('');
      }
    });

    document.getElementById('btn-speak-good').addEventListener('click', opts.onPass);
    document.getElementById('btn-speak-retry').addEventListener('click', opts.onStruggle);
  }

  function renderVocabSprintSummary(container) {
    const s = activeSession;
    const itemsHtml = s.batch.map(w => {
      const m = getWordMastery(w.id);
      const flawed = s.flawedWordIds.has(w.id);
      return `
        <div class="word-mini-card" style="border-color:${m.mastered && !flawed ? 'var(--success)' : '#fcd34d'};">
          <div class="word-mini-top">
            <strong style="direction:ltr;">${w.emoji} ${highlightPhonics(w.en)}</strong>
            <span>${w.he}</span>
          </div>
          <div style="font-size:0.84rem; color:var(--text-muted); direction:ltr;">"${w.shortEn}"</div>
          <div style="font-size:0.82rem; font-weight:700; color:${m.mastered && !flawed ? 'var(--success)' : '#b45309'};">
            ${m.mastered && !flawed ? '✅ נלמד באמת (אימות כפול נקי!)' : '🔄 ממתין בתור חיזוק זיכרון'}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="practice-card" style="text-align:center;">
        <h2 style="font-size:1.4rem; margin-bottom:8px;">🎉 סיימתם את ספרינט 5 המילים!</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">
          הנה סיכום האימות הכפול והדיבור עבור המילים שתרגלתם בספרינט:
        </p>
        <div class="word-list-grid" style="text-align:right; margin-bottom:20px;">${itemsHtml}</div>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          ${state.reviewQueue.length > 0 ? `
            <button type="button" class="btn btn-warning" id="btn-summary-review">
              🔄 תרגל עכשיו את תור חיזוק הזיכרון (${state.reviewQueue.length})
            </button>
          ` : ''}
          <button type="button" class="btn btn-primary" id="btn-summary-back">
            📚 חזרה למגירות אוצר המילים
          </button>
        </div>
      </div>
    `;

    const revBtn = document.getElementById('btn-summary-review');
    if (revBtn) revBtn.addEventListener('click', startReviewQueueSprint);
    document.getElementById('btn-summary-back').addEventListener('click', () => {
      activeSession = null;
      render();
    });
  }

  // Priority 1B: Lexical Chunks & Short Sentences Station
  function renderChunksMode(container) {
    if (!activeSession || activeSession.sessionType !== 'chunks') {
      activeSession = {
        sessionType: 'chunks',
        index: 0,
        speakingStep: false
      };
    }

    const idx = activeSession.index % CHUNKS_DRILLS.length;
    const drill = CHUNKS_DRILLS[idx];

    if (activeSession.speakingStep) {
      renderSpeakingCard(container, {
        topTitle: `1B. 🥪 תבניות ושיחה (${idx + 1} / ${CHUNKS_DRILLS.length})`,
        subTitle: `🎤 הקלטה ושמיעה עצמית של התבנית: ${drill.chunkTitle}`,
        emoji: '🗣️',
        phraseEn: drill.fullSpeakEn,
        phraseHe: drill.promptHe,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % CHUNKS_DRILLS.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('chunk', drill.id, drill.chunkTitle, 'חיזוק הגייה של תבנית שיחה');
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % CHUNKS_DRILLS.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          render();
        }
      });
      return;
    }

    const choices = shuffle(drill.choices);
    const choicesHtml = choices.map(ch => `
      <button type="button" class="choice-btn" data-chunk-ans="${ch.replace(/"/g, '&quot;')}">
        <span style="direction:ltr; display:inline-block;">${highlightPhonics(ch)}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800;">1B. 🥪 תבניות תקשורת ומשפטים קצרים (Lexical Chunks)</div>
            <div style="font-size:0.85rem; color:var(--primary); font-weight:700; direction:ltr; text-align:right;">
              Chunk: ${drill.chunkTitle}
            </div>
          </div>
          <span class="mastery-badge">שאלה ${idx + 1} מתוך ${CHUNKS_DRILLS.length}</span>
        </div>

        <div class="target-showcase">
          <div style="font-size:1.15rem; font-weight:800; margin-bottom:10px;">${drill.promptHe}</div>
          <div class="ltr-sentence">${highlightPhonics(drill.sentenceEn)}</div>
          <div>
            <button type="button" class="audio-btn" id="btn-chunk-audio">🔊 השמע את המשפט המלא</button>
          </div>
        </div>

        <div class="choices-grid">${choicesHtml}</div>

        <div class="support-bar">
          <button type="button" class="btn btn-warning" id="btn-chunk-hint">💡 רמז לתבנית</button>
          <span style="font-size:0.84rem; color:var(--text-muted);">בכל שאלה שלישית עוברים גם להקלטה ושמיעה עצמית! 🎤</span>
        </div>
        <div id="chunk-hint-box"></div>
        <div id="chunk-feedback-box"></div>
      </div>
    `;

    document.getElementById('btn-chunk-audio').addEventListener('click', () => speakEnglish(drill.fullSpeakEn));
    document.getElementById('btn-chunk-hint').addEventListener('click', () => {
      addToReviewQueue('chunk', drill.id, drill.chunkTitle, 'נעזרתי ברמז בתבנית');
      document.getElementById('chunk-hint-box').innerHTML = `<div class="hint-box">💡 ${drill.hint}</div>`;
    });

    container.querySelectorAll('[data-chunk-ans]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-chunk-ans');
        const fb = document.getElementById('chunk-feedback-box');
        if (val === drill.targetAnswer) {
          btn.classList.add('correct');
          container.querySelectorAll('[data-chunk-ans]').forEach(b => b.disabled = true);
          speakEnglish(drill.fullSpeakEn);
          if (!state.completedChunks.includes(drill.id)) {
            state.completedChunks.push(drill.id);
            saveState();
          }
          removeFromReviewQueue('chunk', drill.id);

          const shouldSpeakNext = (idx % 3 === 0);
          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ מדויק! <strong>${drill.fullSpeakEn}</strong></div>
              <button type="button" class="btn btn-success" id="btn-chunk-next">
                ${shouldSpeakNext ? '🎤 המשך להקלטה ושמיעה עצמית של המשפט' : 'המשך לשאלה הבאה ⬅️'}
              </button>
            </div>
          `;
          document.getElementById('btn-chunk-next').addEventListener('click', () => {
            if (shouldSpeakNext) {
              activeSession.speakingStep = true;
            } else {
              activeSession.index = (activeSession.index + 1) % CHUNKS_DRILLS.length;
            }
            render();
          });
        } else {
          btn.classList.add('wrong');
          btn.disabled = true;
          addToReviewQueue('chunk', drill.id, drill.chunkTitle, 'טעות בתבנית שיחה');
          fb.innerHTML = `
            <div class="feedback-banner error">
              <div>❌ לא בדיוק. התבנית נוספה לתור <strong>חיזוק זיכרון 🔄</strong>. רמז: ${drill.hint}</div>
            </div>
          `;
        }
      });
    });
  }

  // Priority 1C: Days of the Week + Yesterday/Today/Tomorrow + Capital Letter
  function renderDaysMode(container) {
    if (!activeSession || activeSession.sessionType !== 'days') {
      activeSession = {
        sessionType: 'days',
        index: 0,
        speakingStep: false
      };
    }

    const idx = activeSession.index % DAYS_TIMELINE_DRILLS.length;
    const drill = DAYS_TIMELINE_DRILLS[idx];
    const todayIdx = drill.todayIdx;
    const yesterdayIdx = (todayIdx + 6) % 7;
    const tomorrowIdx = (todayIdx + 1) % 7;

    if (activeSession.speakingStep) {
      renderSpeakingCard(container, {
        topTitle: `1C. 📅 ימות השבוע וזמן (${idx + 1} / ${DAYS_TIMELINE_DRILLS.length})`,
        subTitle: '🎤 הקלטה ושמיעה עצמית של משפט הזמן!',
        emoji: '📅',
        phraseEn: drill.speakEn,
        phraseHe: drill.questionHe,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % DAYS_TIMELINE_DRILLS.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('day', drill.id, drill.speakEn, 'חיזוק הגייה בימות השבוע');
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % DAYS_TIMELINE_DRILLS.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          render();
        }
      });
      return;
    }

    const trainHtml = DAYS_ORDER.map((d, i) => {
      let cls = '';
      let tag = '';
      if (i === todayIdx) {
        cls = 'highlight-today';
        tag = '⬇️ Today';
      } else if (i === yesterdayIdx) {
        cls = 'highlight-yesterday';
        tag = '⬅️ Yesterday';
      } else if (i === tomorrowIdx) {
        cls = 'highlight-tomorrow';
        tag = '➡️ Tomorrow';
      }
      return `
        <div class="day-wagon ${cls}">
          <div style="font-size:0.72rem; color:var(--text-muted);">${d.he}</div>
          <div style="font-size:0.95rem; margin:2px 0;">${highlightCapitalDay(d.en)}</div>
          <div style="font-size:0.7rem; font-weight:800;">${tag}</div>
        </div>
      `;
    }).join('');

    const choices = shuffle(drill.choices);
    const choicesHtml = choices.map(ch => `
      <button type="button" class="choice-btn" data-day-ans="${ch}">
        <span style="direction:ltr; display:inline-block;">${ch}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800;">1C. 📅 רכבת ימות השבוע · Yesterday / Today / Tomorrow · Capital Letter</div>
            <div style="font-size:0.84rem; color:var(--text-muted);">שימו לב: כל יום בשבוע מתחיל באות גדולה מודגשת בזהב (Capital Letter)!</div>
          </div>
          <span class="mastery-badge">חידה ${idx + 1} מתוך ${DAYS_TIMELINE_DRILLS.length}</span>
        </div>

        <div class="days-train">${trainHtml}</div>

        <div class="time-machine-grid">
          <div class="time-box">
            <div class="time-box-label">⬅️ Yesterday was (אתמול היה)</div>
            <div class="time-box-val">${highlightCapitalDay(DAYS_ORDER[yesterdayIdx].en)}</div>
          </div>
          <div class="time-box" style="border-color:var(--primary); background:var(--primary-soft);">
            <div class="time-box-label">⬇️ Today is (היום)</div>
            <div class="time-box-val">${highlightCapitalDay(DAYS_ORDER[todayIdx].en)}</div>
          </div>
          <div class="time-box">
            <div class="time-box-label">➡️ Tomorrow will be (מחר יהיה)</div>
            <div class="time-box-val">${highlightCapitalDay(DAYS_ORDER[tomorrowIdx].en)}</div>
          </div>
        </div>

        <div class="target-showcase">
          <div style="font-size:1.12rem; font-weight:800; margin-bottom:8px;">${drill.questionHe}</div>
          <div class="ltr-sentence">${drill.sentenceEn}</div>
          <div>
            <button type="button" class="audio-btn" id="btn-day-audio">🔊 השמע באנגלית</button>
          </div>
        </div>

        <div class="choices-grid">${choicesHtml}</div>

        <div class="support-bar">
          <button type="button" class="btn btn-warning" id="btn-day-hint">💡 רמז מסרגל הימים</button>
        </div>
        <div id="day-hint-box"></div>
        <div id="day-feedback-box"></div>
      </div>
    `;

    document.getElementById('btn-day-audio').addEventListener('click', () => speakEnglish(drill.speakEn));
    document.getElementById('btn-day-hint').addEventListener('click', () => {
      addToReviewQueue('day', drill.id, drill.speakEn, 'רמז בימות השבוע');
      document.getElementById('day-hint-box').innerHTML = `<div class="hint-box">💡 ${drill.hint}</div>`;
    });

    container.querySelectorAll('[data-day-ans]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-day-ans');
        const fb = document.getElementById('day-feedback-box');
        if (val === drill.targetAnswer) {
          btn.classList.add('correct');
          container.querySelectorAll('[data-day-ans]').forEach(b => b.disabled = true);
          speakEnglish(drill.speakEn);
          removeFromReviewQueue('day', drill.id);
          const shouldSpeak = (idx % 3 === 0);

          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ נהדר! <strong>${drill.speakEn}</strong></div>
              <button type="button" class="btn btn-success" id="btn-day-next">
                ${shouldSpeak ? '🎤 המשך להקלטה ושמיעה עצמית' : 'המשך לחידה הבאה ⬅️'}
              </button>
            </div>
          `;
          document.getElementById('btn-day-next').addEventListener('click', () => {
            if (shouldSpeak) {
              activeSession.speakingStep = true;
            } else {
              activeSession.index = (activeSession.index + 1) % DAYS_TIMELINE_DRILLS.length;
            }
            render();
          });
        } else {
          btn.classList.add('wrong');
          btn.disabled = true;
          addToReviewQueue('day', drill.id, drill.speakEn, 'טעות בימות השבוע');
          fb.innerHTML = `
            <div class="feedback-banner error">
              <div>❌ הסתכלו ברכבת הימים למעלה: ${drill.hint}</div>
            </div>
          `;
        }
      });
    });
  }

  // Priority 2: Phonics Lab (ch / sh / th)
  function renderPhonicsMode(container) {
    const phonicsWords = ALL_WORDS.filter(w => w.phonics);
    if (!activeSession || activeSession.sessionType !== 'phonics') {
      activeSession = {
        sessionType: 'phonics',
        index: 0,
        speakingStep: false
      };
    }

    const idx = activeSession.index % phonicsWords.length;
    const word = phonicsWords[idx];

    if (activeSession.speakingStep) {
      renderSpeakingCard(container, {
        topTitle: `2. 🔤 מעבדת הפונטיקה (${idx + 1} / ${phonicsWords.length})`,
        subTitle: `🎤 הקלטה ושמיעה עצמית של הצליל ${word.phonics.toUpperCase()}`,
        emoji: word.emoji,
        phraseEn: word.shortEn,
        phraseHe: `${word.en} (${word.he}) — "${word.shortHe}"`,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % phonicsWords.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('phonics', word.id, `${word.en} (${word.phonics})`, 'חיזוק הגיית ch/sh/th');
          activeSession.speakingStep = false;
          activeSession.index = (activeSession.index + 1) % phonicsWords.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          render();
        }
      });
      return;
    }

    const maskedWord = word.en.replace(new RegExp(word.phonics, 'i'), '__');

    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800;">2. 🔤 מעבדת הפונטיקה: צלילי <span class="ph-ch">ch</span> · <span class="ph-sh">sh</span> · <span class="ph-th">th</span></div>
            <div style="font-size:0.84rem; color:var(--text-muted);">
              🟧 <strong>ch</strong> = צ׳ (cheese, lunch) · 🟦 <strong>sh</strong> = שׁ (fish, wash) · 🟪 <strong>th</strong> = לשון בין השיניים 👅 (teeth, Thursday)
            </div>
          </div>
          <span class="mastery-badge">מילה ${idx + 1} מתוך ${phonicsWords.length}</span>
        </div>

        <div class="target-showcase">
          <div class="target-emoji">${word.emoji}</div>
          <div style="font-size:1.15rem; font-weight:700; margin-bottom:6px;">${word.he}</div>
          <div class="ltr-en">${maskedWord}</div>
          <div style="font-size:0.95rem; color:var(--text-muted); margin-top:6px; direction:ltr;">"${highlightPhonics(word.shortEn)}"</div>
          <div>
            <button type="button" class="audio-btn" id="btn-phonics-audio">🔊 הקשיבו למילה ובחרו את הצליל החסר</button>
          </div>
        </div>

        <div class="choices-grid" style="grid-template-columns: repeat(3, 1fr);">
          <button type="button" class="choice-btn" data-ph-choice="ch">
            <span class="ph-ch" style="font-size:1.35rem;">ch</span>
            <div style="font-size:0.82rem; margin-top:4px;">צליל צ׳</div>
          </button>
          <button type="button" class="choice-btn" data-ph-choice="sh">
            <span class="ph-sh" style="font-size:1.35rem;">sh</span>
            <div style="font-size:0.82rem; margin-top:4px;">צליל שׁ</div>
          </button>
          <button type="button" class="choice-btn" data-ph-choice="th">
            <span class="ph-th" style="font-size:1.35rem;">th</span>
            <div style="font-size:0.82rem; margin-top:4px;">לשון בין השיניים 👅</div>
          </button>
        </div>

        <div id="phonics-feedback-box"></div>
      </div>
    `;

    document.getElementById('btn-phonics-audio').addEventListener('click', () => speakEnglish(word.en));

    container.querySelectorAll('[data-ph-choice]').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-ph-choice');
        const fb = document.getElementById('phonics-feedback-box');
        if (chosen === word.phonics) {
          btn.classList.add('correct');
          container.querySelectorAll('[data-ph-choice]').forEach(b => b.disabled = true);
          speakEnglish(word.en);
          removeFromReviewQueue('phonics', word.id);
          const shouldSpeak = (idx % 2 === 0);

          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ מצוין! <strong>${highlightPhonics(word.en)}</strong> (${word.he}) — "${word.shortEn}"</div>
              <button type="button" class="btn btn-success" id="btn-ph-next">
                ${shouldSpeak ? '🎤 עכשיו הקליטו ושמעו את עצמכם!' : 'למילה הבאה ⬅️'}
              </button>
            </div>
          `;
          document.getElementById('btn-ph-next').addEventListener('click', () => {
            if (shouldSpeak) {
              activeSession.speakingStep = true;
            } else {
              activeSession.index = (activeSession.index + 1) % phonicsWords.length;
            }
            render();
          });
        } else {
          btn.classList.add('wrong');
          btn.disabled = true;
          addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, `בלבול בצליל ${word.phonics}`);
          fb.innerHTML = `
            <div class="feedback-banner error">
              <div>❌ הקשיבו שוב למילה! רמז: ${word.hintSound}</div>
            </div>
          `;
        }
      });
    });
  }

  function switchMode(newMode) {
    state.mode = newMode;
    activeSession = null;
    syncTabButtons();
    saveState();
    render();
  }

  function syncTabButtons() {
    document.querySelectorAll('.mode-tab').forEach(tab => {
      const m = tab.getAttribute('data-mode');
      tab.classList.toggle('active', m === state.mode);
    });
  }

  function render() {
    updateHeaderStats();
    const main = document.getElementById('app-main');
    if (!main) return;

    if (state.mode === 'vocab') {
      if (activeSession && activeSession.sessionType === 'vocab-sprint') {
        renderVocabSprint(main);
      } else {
        renderVocabOverview(main);
      }
    } else if (state.mode === 'chunks') {
      renderChunksMode(main);
    } else if (state.mode === 'days') {
      renderDaysMode(main);
    } else if (state.mode === 'phonics') {
      renderPhonicsMode(main);
    }
  }

  function init() {
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const m = tab.getAttribute('data-mode');
        switchMode(m);
      });
    });

    const revBtn = document.getElementById('btn-review-queue');
    if (revBtn) {
      revBtn.addEventListener('click', () => {
        if (state.reviewQueue.length === 0) {
          alert('תור חיזוק הזיכרון ריק כרגע! כל טעות או שימוש ברמז יתווספו לכאן אוטומטית.');
          return;
        }
        startReviewQueueSprint();
      });
    }

    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('האם לאפס את כל נתוני ההתקדמות ותור חיזוק הזיכרון?')) {
          localStorage.removeItem(STORAGE_KEY);
          state = defaultState();
          activeSession = null;
          syncTabButtons();
          render();
        }
      });
    }

    syncTabButtons();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
