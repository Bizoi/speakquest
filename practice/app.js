(function () {
  const STORAGE_KEY = 'sandwich_party_progress_v1';

  const defaultState = () => ({
    mode: 'vocab',
    wordMastery: {}, // { [wordId]: { roundA: false, roundB: false, roundC: false, mastered: false } }
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
      state.wordMastery[wordId] = { roundA: false, roundB: false, roundC: false, mastered: false };
    } else if (typeof state.wordMastery[wordId].roundC === 'undefined') {
      state.wordMastery[wordId].roundC = Boolean(state.wordMastery[wordId].mastered);
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

  function pickDistractors(targetWord, pool, count = 3) {
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

  function levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  }

  const KID_PHONETIC_ALIASES = {
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
    '20': 'twenty',
    'teef': 'teeth',
    'tith': 'teeth',
    'tooth': 'teeth',
    'veggies': 'vegetables',
    'vegetable': 'vegetables',
    'frends': 'friends',
    'friend': 'friends',
    'sandwitch': 'sandwich',
    'sandwiches': 'sandwich',
    'toms': 'tomato',
    'tomatos': 'tomato',
    'tomatoes': 'tomato'
  };

  function normalizeReadingToken(rawToken) {
    const clean = String(rawToken || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    return KID_PHONETIC_ALIASES[clean] || clean;
  }

  function evaluateReadingAloud(targetPhrase, transcriptRaw) {
    const rawDisplayWords = String(targetPhrase || '')
      .trim()
      .split(/\s+/)
      .map(w => w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9']+$/g, ''))
      .filter(Boolean);

    const targetWords = rawDisplayWords.map(w => ({
      display: w,
      norm: normalizeReadingToken(w)
    })).filter(w => w.norm.length > 0);

    const rawSpokenTokens = String(transcriptRaw || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, ' ')
      .split(/\s+/)
      .map(t => normalizeReadingToken(t))
      .filter(Boolean);

    const spokenSet = new Set(rawSpokenTokens);
    // Support contractions & multi-word kid aliases ("im" <-> "i am", "dont" <-> "do not")
    if (spokenSet.has('i') && spokenSet.has('am')) spokenSet.add('im');
    if (spokenSet.has('im')) {
      spokenSet.add('i');
      spokenSet.add('am');
    }
    if (spokenSet.has('do') && spokenSet.has('not')) spokenSet.add('dont');
    if (spokenSet.has('dont')) {
      spokenSet.add('do');
      spokenSet.add('not');
    }

    const spokenList = Array.from(spokenSet);

    const words = targetWords.map(tw => {
      let ok = false;
      if (spokenSet.has(tw.norm)) {
        ok = true;
      } else if (tw.norm === 'im' && spokenSet.has('i') && spokenSet.has('am')) {
        ok = true;
      } else if (tw.norm === 'dont' && spokenSet.has('do') && spokenSet.has('not')) {
        ok = true;
      } else if (tw.norm.length >= 4) {
        const maxDist = tw.norm.length >= 7 ? 2 : 1;
        ok = spokenList.some(sp => sp.length >= 3 && levenshteinDistance(tw.norm, sp) <= maxDist);
      }
      return { word: tw.display, ok };
    });

    const matchedCount = words.filter(w => w.ok).length;
    const accuracy = words.length > 0 ? Math.round((matchedCount / words.length) * 100) : 0;
    const passed = accuracy >= 70;

    return {
      words,
      matchedCount,
      totalCount: words.length,
      accuracy,
      passed
    };
  }

  // Build a 5-word Micro-Sprint with Triple Spaced Verification + Reading Aloud Every 4 Questions
  function startVocabSprint(wordsList, title, isReviewSprint = false) {
    const batch = wordsList.slice(0, 5);
    const drawerPool = ALL_WORDS.filter(w => w.drawerId === (batch[0]?.drawerId || 'sandwich'));

    const mcCards = [];
    // Step 1 (Round A — 1/3): Recognition (English + Audio -> Hebrew)
    batch.forEach(word => {
      const distractors = pickDistractors(word, drawerPool, 3);
      mcCards.push({
        cardType: 'vocab-round-a',
        word,
        choices: shuffle([
          { label: `${word.he} ${word.emoji}`, isCorrect: true, value: word.id },
          ...distractors.map(d => ({ label: `${d.he} ${d.emoji}`, isCorrect: false, value: d.id }))
        ]),
        flawed: false,
        hintLevel: 0,
        answered: false,
        isRetry: false,
        retryInjected: false
      });
    });

    // Step 2 (Round B — 2/3): Context Verification inside a 3-4 word sentence (Shuffled order)
    shuffle(batch).forEach(word => {
      const distractors = pickDistractors(word, drawerPool, 3);
      mcCards.push({
        cardType: 'vocab-round-b',
        word,
        blankedSentence: blankWordInSentence(word.shortEn, word.en),
        choices: shuffle([
          { label: word.en, isCorrect: true, value: word.id },
          ...distractors.map(d => ({ label: d.en, isCorrect: false, value: d.id }))
        ]),
        flawed: false,
        hintLevel: 0,
        answered: false,
        isRetry: false,
        retryInjected: false
      });
    });

    // Step 3 (Round C — 3/3 Spaced Retrieval): Hebrew + Emoji -> Retrieve English word from memory (Shuffled order)
    shuffle(batch).forEach(word => {
      const distractors = pickDistractors(word, drawerPool, 3);
      mcCards.push({
        cardType: 'vocab-round-c',
        word,
        choices: shuffle([
          { label: word.en, isCorrect: true, value: word.id },
          ...distractors.map(d => ({ label: d.en, isCorrect: false, value: d.id }))
        ]),
        flawed: false,
        hintLevel: 0,
        answered: false,
        isRetry: false,
        retryInjected: false
      });
    });

    // Interleave a vocab-speak Reading Aloud & Verification card after every 4 MC questions (#4, #8, #12, and at the end #15)
    const cards = [];
    let speakWordIdx = 0;
    mcCards.forEach((mcCard, idx) => {
      const qNum = idx + 1;
      const posInCycle = ((qNum - 1) % 4) + 1;
      const isLastMc = qNum === mcCards.length;
      const remainingInCycle = isLastMc && (qNum % 4 !== 0)
        ? 0
        : (4 - posInCycle);
      mcCard.mcQuestionNum = qNum;
      mcCard.posInCycle = posInCycle;
      mcCard.untilNextSpeak = remainingInCycle;
      cards.push(mcCard);

      if (qNum % 4 === 0 || isLastMc) {
        const speakWord = batch[speakWordIdx % batch.length];
        speakWordIdx += 1;
        cards.push({
          cardType: 'vocab-speak',
          word: speakWord,
          speakStationNum: speakWordIdx,
          afterQuestionNum: qNum,
          phraseToSpeak: speakWord.shortEn,
          phraseHe: speakWord.shortHe,
          recordedUrl: null,
          hasListenedToSelf: false,
          sttTranscript: '',
          answered: false
        });
      }
    });

    activeSession = {
      sessionType: 'vocab-sprint',
      title,
      isReviewSprint,
      batch,
      drawerPool,
      cards,
      currentIndex: 0,
      flawedWordIds: new Set()
    };
    render();
  }

  function injectDelayedRetryCard(session, sourceCard) {
    if (!session || !sourceCard || sourceCard.retryInjected) return;
    sourceCard.retryInjected = true;
    const word = sourceCard.word;
    const pool = session.drawerPool || ALL_WORDS;
    const distractors = pickDistractors(word, pool, 3);
    session.cards.push({
      cardType: 'vocab-round-c',
      word,
      choices: shuffle([
        { label: word.en, isCorrect: true, value: word.id },
        ...distractors.map(d => ({ label: d.en, isCorrect: false, value: d.id }))
      ]),
      flawed: false,
      hintLevel: 0,
      answered: false,
      isRetry: true,
      retryInjected: true
    });
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
      return { text: '● ● ● נלמד באמת! ✅ (3/3)', isMastered: true };
    }
    if (m.roundA && m.roundB && !isFlawedNow) {
      return { text: '● ● ○ שלב 2 מתוך 3 (מחכה לאימות שלישי בהמשך!)', isMastered: false };
    }
    if (m.roundA && !isFlawedNow) {
      return { text: '● ○ ○ שלב 1 מתוך 3', isMastered: false };
    }
    if (isFlawedNow) {
      return { text: '◐ ○ ○ נעזרנו ברמז/ניסיון — ייכנס לחיזוק זיכרון 🔄', isMastered: false };
    }
    return { text: '○ ○ ○ מילה חדשה (0/3)', isMastered: false };
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
        <h2 style="font-size:1.2rem; margin-bottom:6px;">איך עובד אימון הזיכרון שלנו? (אימות משולש ● ● ● 3/3 + 4 אפשרויות + הקראה כל 4 שאלות!)</h2>
        <p style="color:var(--text-muted); font-size:0.93rem;">
          בכל ספרינט מתרגלים רק <strong>5 מילים קצרות</strong> עם <strong>4 אפשרויות בחירה</strong> בכל שאלה ו<strong>אימות משולש ומרווח (3/3)</strong>:
          <strong>(1)</strong> זיהוי משמעות המילה ←
          <strong>(2)</strong> שיבוץ במשפט קצר (3–4 מילים) ←
          <strong>(3)</strong> אימות שלישי מרווח בהמשך (שליפה מעברית לאנגלית מהזיכרון),
          כש<strong>כל 4 שאלות מופיעה תחנת הקראה של הילד ובקרה מילה-מילה שמקריא נכון</strong>!
          מילה מסומנת כ<strong>"נלמד באמת ✅ (3/3)"</strong> רק כשמצליחים בכל 3 ההופעות ובהקראה בלי לנחש ובלי רמז.
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
            ${m.mastered ? '● ● ● נלמד באמת ✅ (3/3)' : '○ ○ ○ טרם הושלם אימות משולש (3/3)'}
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

    if (card.cardType === 'vocab-round-a' || card.cardType === 'vocab-round-b' || card.cardType === 'vocab-round-c') {
      const isRoundA = card.cardType === 'vocab-round-a';
      const isRoundB = card.cardType === 'vocab-round-b';
      const isRoundC = card.cardType === 'vocab-round-c';

      let untilSpeak = 0;
      for (let i = s.currentIndex + 1; i < s.cards.length; i++) {
        if (s.cards[i].cardType === 'vocab-speak') {
          break;
        }
        untilSpeak += 1;
      }
      const nextIsSpeak = s.cards[s.currentIndex + 1]?.cardType === 'vocab-speak';

      const roundBadge = card.isRetry
        ? '🔁 הופעה חוזרת בסוף הספרינט (חיזוק מילה שטעינו/ביקשנו רמז!)'
        : isRoundA
        ? 'אימות 1/3 (סבב א׳): זיהוי משמעות המילה (אנגלית ➔ עברית)'
        : isRoundB
        ? 'אימות 2/3 (סבב ב׳): שיבוץ המילה בתוך משפט קצר (3–4 מילים)'
        : 'אימות 3/3 מרווח (סבב ג׳): שליפה הפוכה מהזיכרון (עברית ➔ אנגלית)';

      const showcaseHtml = isRoundA
        ? `
          <div class="target-showcase">
            <div>
              <span class="target-emoji">${word.emoji}</span>
              <span class="ltr-en">${highlightPhonics(word.en)}</span>
            </div>
            ${phonicsLegend}
            <div>
              <button type="button" class="audio-btn" id="btn-play-target-audio">🔊 השמע הגייה באנגלית</button>
            </div>
          </div>
          <h2 class="question-prompt" style="text-align:center;">מה המשמעות של המילה <strong>${word.en}</strong>?</h2>
        `
        : isRoundB
        ? `
          <div class="target-showcase">
            <div style="font-size:1.05rem; font-weight:800; margin-bottom:2px;">
              <span class="target-emoji">${word.emoji}</span> "${word.shortHe}"
            </div>
            <div class="ltr-sentence">${highlightPhonics(card.blankedSentence)}</div>
            ${phonicsLegend}
            <div>
              <button type="button" class="audio-btn" id="btn-play-target-audio">🔊 השמע את המשפט המלא</button>
            </div>
          </div>
          <h2 class="question-prompt" style="text-align:center;">איזו מילה באנגלית משלימה נכון את המשפט הקצר?</h2>
        `
        : `
          <div class="target-showcase">
            <div>
              <span class="target-emoji">${word.emoji}</span>
              <span style="font-size:1.45rem; font-weight:900; vertical-align:middle; color:var(--text-main);">${word.he}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">🧠 אימות שלישי מרווח מהזיכרון (בלי לראות את המילה כתובה למעלה!)</div>
            ${phonicsLegend}
            <div>
              <button type="button" class="audio-btn" id="btn-play-target-audio">🔊 רמז שמע: הקשיבו למילה באנגלית</button>
            </div>
          </div>
          <h2 class="question-prompt" style="text-align:center;">איך אומרים באנגלית: <strong>${word.he}</strong>?</h2>
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
              <div style="font-weight:800; font-size:0.92rem;">${s.title}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${roundBadge}</div>
            </div>
            <span class="speak-cadence-badge">🎤 הקראה ובדיקת דיבור: כל 4 שאלות (עוד ${untilSpeak} שאלות להקראה)</span>
            <div class="sprint-step-pills">${dotsHtml}</div>
            <span class="mastery-badge ${masteryInfo.isMastered ? 'mastered' : ''}">${masteryInfo.text}</span>
            <button type="button" class="btn btn-secondary" id="btn-exit-sprint" style="padding:4px 10px; font-size:0.78rem;">יציאה למגירות</button>
          </div>

          ${showcaseHtml}

          <div class="choices-grid" id="choices-box">${choicesHtml}</div>

          <div id="feedback-area"></div>

          <div class="support-bar">
            <button type="button" class="btn btn-warning" id="btn-show-hint">
              💡 רמז מדורג (יוסיף את המילה לחיזוק זיכרון)
            </button>
            <span style="font-size:0.82rem; color:var(--text-muted);">כרטיס ${s.currentIndex + 1} מתוך ${s.cards.length}</span>
          </div>

          <div id="hint-area"></div>
        </div>
      `;

      document.getElementById('btn-exit-sprint').addEventListener('click', () => {
        activeSession = null;
        render();
      });

      document.getElementById('btn-play-target-audio').addEventListener('click', () => {
        speakEnglish(isRoundB ? word.shortEn : word.en);
      });

      document.getElementById('btn-show-hint').addEventListener('click', () => {
        card.flawed = true;
        s.flawedWordIds.add(word.id);
        addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'ביקשתי רמז');
        injectDelayedRetryCard(s, card);
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
            speakEnglish(isRoundB ? word.shortEn : word.en);

            const m = getWordMastery(word.id);
            const wasClean = !card.flawed && !s.flawedWordIds.has(word.id);

            if (isRoundA && wasClean) {
              m.roundA = true;
            } else if (isRoundB && wasClean && m.roundA) {
              m.roundB = true;
            } else if (isRoundC && wasClean && m.roundA && m.roundB) {
              m.roundC = true;
              m.mastered = true;
              removeFromReviewQueue('vocab', word.id);
            }
            saveState();

            const cleanMsg = isRoundA
              ? '✅ מעולה! עברתם את שלב 1 מתוך 3 למילה זו.'
              : isRoundB
              ? '✅ יופי! עברתם את שלב 2 מתוך 3 (במשפט קצר). בהמשך תופיע הופעה שלישית מרווחת מהזיכרון!'
              : '🎉 אימות משולש (3/3) הושלם בהצלחה! זכרתם את המילה גם בהופעה השלישית המרווחת — סומנה כ"נלמד באמת ✅"!';

            feedbackArea.innerHTML = `
              <div class="feedback-banner success">
                <div>
                  ${wasClean
                    ? cleanMsg
                    : '✅ תשובה נכונה! (מכיוון שנעזרתם בניסיון נוסף/רמז, המילה תחכה לכם להופעה חוזרת ובחיזוק זיכרון 🔄)'}
                  <div style="font-size:0.88rem; font-weight:600; margin-top:2px;">
                    ${word.en} = ${word.he} · "${word.shortEn}" (${word.shortHe})
                  </div>
                </div>
                <button type="button" class="btn btn-success" id="btn-next-card">
                  ${nextIsSpeak ? '🎤 המשך להקראה ובדיקת דיבור ⬅️' : 'המשך ⬅️'}
                </button>
              </div>
            `;
            feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
            m.roundA = false;
            m.roundB = false;
            m.roundC = false;
            m.mastered = false;
            addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'טעות בזיהוי');
            injectDelayedRetryCard(s, card);

            feedbackArea.innerHTML = `
              <div class="feedback-banner error">
                <div>
                  ❌ לא בדיוק. המילה <strong>${word.en}</strong> נוספה אוטומטית לתור <strong>חיזוק זיכרון 🔄</strong> ותחזור להופעה נוספת בסוף הספרינט!
                  <div>💡 רמז עזר: ${word.hintContext} — נסו לבחור את התשובה הנכונה!</div>
                </div>
              </div>
            `;
            feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });
      return;
    }

    // Interleaved every 4 questions: Mandatory Reading Aloud & Pronunciation Control Station
    if (card.cardType === 'vocab-speak') {
      renderSpeakingCard(container, {
        topTitle: s.title,
        subTitle: `🎤 הקראה של הילד ובקרה שמקריא נכון (כל 4 שאלות — תחנת הקראה ${card.speakStationNum || 1})`,
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
          const m = getWordMastery(word.id);
          m.mastered = false;
          addToReviewQueue('vocab', word.id, `${word.en} (${word.he})`, 'חיזוק הגייה והקראה בקול');
          injectDelayedRetryCard(s, card);
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

  // Reusable Speaking, Self-Playback & Word-by-Word Reading Verification Station
  function renderSpeakingCard(container, opts) {
    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800; font-size:0.92rem;">${opts.topTitle}</div>
            <div style="font-size:0.8rem; color:var(--primary); font-weight:700;">${opts.subTitle}</div>
          </div>
          <span class="speak-cadence-badge">🎤 כל 4 שאלות — הקראה ובקרת קריאה</span>
          <div class="sprint-step-pills">${opts.dotsHtml || ''}</div>
          <button type="button" class="btn btn-secondary" id="btn-exit-speak" style="padding:4px 10px; font-size:0.78rem;">חזרה</button>
        </div>

        <div class="target-showcase">
          <div style="font-size:0.84rem; color:var(--text-muted); margin-bottom:2px;">הקריאו בקול ובברור את המשפט באנגלית:</div>
          <div>
            <span class="target-emoji">${opts.emoji || '🎤'}</span>
            <span class="ltr-sentence">${highlightPhonics(opts.phraseEn)}</span>
          </div>
          <div style="font-size:0.94rem; font-weight:700; margin-top:3px;">${opts.phraseHe}</div>
          ${opts.phonicsLegend || ''}
          <div>
            <button type="button" class="audio-btn" id="btn-hear-model">🔊 שמעו קודם את ההגייה הנכונה</button>
          </div>
        </div>

        <div class="speech-box">
          <div style="font-size:0.88rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">
            🎤 הקליטו את עצמכם מקריאים — תשמעו את קולכם והמערכת תבדוק מילה-מילה בירוק/אדום!
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn btn-primary" id="btn-start-record">
              🎤 הקליטו את עצמכם אומרים: "${opts.phraseEn}"
            </button>
            <button type="button" class="btn btn-warning" id="btn-stop-record" style="display:none;">
              ⏹️ סיימתי להקריא — בדקו אותי והשמיעו לי את עצמי!
            </button>
            <span id="self-playback-controls" style="display:inline-flex;"></span>
          </div>
          <div class="speech-status" id="speech-status-msg"></div>
        </div>

        <div id="self-eval-box" style="display:none;"></div>

        <div class="reading-demo-bar">
          <div class="reading-demo-title">🧪 בדיקת מנגנון הבקרה (ללא מיקרופון):</div>
          <div class="reading-demo-actions">
            <button type="button" class="btn btn-secondary" id="btn-demo-read-pass" style="font-size:0.8rem; padding:5px 10px;">
              ✅ הדגם הקראה תקינה של הילד
            </button>
            <button type="button" class="btn btn-secondary" id="btn-demo-read-fail" style="font-size:0.8rem; padding:5px 10px;">
              ❌ הדגם טעות בהקראה של הילד
            </button>
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

    function renderVerificationUI(transcriptText) {
      const cleanTranscript = String(transcriptText || '').trim();
      const hasTranscript = cleanTranscript.length > 0;
      const evalRes = evaluateReadingAloud(opts.phraseEn, cleanTranscript);

      evalBox.style.display = 'block';

      // Case A: STT transcript captured and passed (accuracy >= 70%)
      if (hasTranscript && evalRes.passed) {
        const pillsHtml = evalRes.words.map(w => `
          <span class="${w.ok ? 'read-word-ok' : 'read-word-miss'}">
            ${w.word} ${w.ok ? '✓' : '✗ חסר/שגוי'}
          </span>
        `).join('');

        evalBox.innerHTML = `
          <div class="reading-verify-box verify-pass">
            <div style="font-size:1.02rem; font-weight:800; color:#14532d; margin-bottom:3px;">
              ✅ בקרת הקראה אוטומטית: מצוין! (${evalRes.accuracy}% דיוק)
            </div>
            <div style="font-size:0.88rem; font-weight:700; color:var(--text-main);">
              🎧 המיקרופון זיהה: <span style="direction:ltr; display:inline-block;">"${cleanTranscript}"</span>
            </div>
            <div class="reading-words-row">${pillsHtml}</div>
            <div class="self-check-actions">
              <button type="button" class="btn btn-success" id="btn-speak-good">
                ✅ מעולה! המשך לשאלה הבאה ⬅️
              </button>
            </div>
          </div>
        `;
        evalBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const passBtn = document.getElementById('btn-speak-good');
        if (passBtn) passBtn.addEventListener('click', opts.onPass);
        return;
      }

      // Case B: STT transcript captured and failed (accuracy < 70%)
      if (hasTranscript && !evalRes.passed) {
        const pillsHtml = evalRes.words.map(w => `
          <span class="${w.ok ? 'read-word-ok' : 'read-word-miss'}">
            ${w.word} ${w.ok ? '✓' : '✗ חסר/שגוי'}
          </span>
        `).join('');

        evalBox.innerHTML = `
          <div class="reading-verify-box verify-fail">
            <div style="font-size:1.02rem; font-weight:800; color:#7f1d1d; margin-bottom:3px;">
              ❌ בקרת הקראה: לא זוהתה קריאה מדויקת (${evalRes.accuracy}% דיוק)
            </div>
            <div style="font-size:0.86rem; font-weight:700; color:var(--text-main); margin-bottom:2px;">
              🎧 המיקרופון שמע: <span style="direction:ltr; display:inline-block;">"${cleanTranscript || 'לא זוהו מילים ברורות'}"</span>
              &nbsp;מול&nbsp;
              🎯 צריך להקריא: <span style="direction:ltr; display:inline-block;">"${opts.phraseEn}"</span>
            </div>
            <div class="reading-words-row">${pillsHtml}</div>
            <div style="font-size:0.82rem; color:#7f1d1d; font-weight:700; margin-bottom:6px;">
              🔊 הקשיבו שוב להגייה האיטית באנגלית ונסו להקריא שוב את המילים המסומנות באדום:
            </div>
            <div class="self-check-actions">
              <button type="button" class="btn btn-primary" id="btn-speak-rerecord">
                🎤 נסו להקריא שוב עכשיו
              </button>
              <button type="button" class="btn btn-warning" id="btn-speak-retry">
                🔄 הוסף לחיזוק זיכרון והמשך
              </button>
            </div>
          </div>
        `;
        evalBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const rerecordBtn = document.getElementById('btn-speak-rerecord');
        if (rerecordBtn) {
          rerecordBtn.addEventListener('click', () => {
            evalBox.style.display = 'none';
            startBtn.click();
          });
        }
        const struggleBtn = document.getElementById('btn-speak-retry');
        if (struggleBtn) struggleBtn.addEventListener('click', opts.onStruggle);
        return;
      }

      // Case C: Browser didn't return STT transcript (e.g., Safari/offline mic where only MediaRecorder ran)
      const manualWords = evalRes.words.map(w => ({ word: w.word, ok: false }));
      function renderManualWordTapStep() {
        const checkedCount = manualWords.filter(w => w.ok).length;
        const manualAccuracy = manualWords.length > 0 ? Math.round((checkedCount / manualWords.length) * 100) : 100;
        const manualPassed = manualAccuracy >= 70;

        const tapPillsHtml = manualWords.map((w, idx) => `
          <button type="button" class="${w.ok ? 'read-word-ok' : 'read-word-miss'} read-word-tap" data-manual-word="${idx}">
            ${w.word} ${w.ok ? '✓ קראתי נכון' : '👆 לחצו אם ביטאתם נכון'}
          </button>
        `).join('');

        evalBox.innerHTML = `
          <div class="reading-verify-box verify-manual">
            <div style="font-size:0.98rem; font-weight:800; color:#92400e; margin-bottom:3px;">
              🎧 בקרת הקראה עצמית מילה-מילה (${manualAccuracy}% אומתו)
            </div>
            <div style="font-size:0.84rem; color:var(--text-main); margin-bottom:4px;">
              הדפדפן השמיע את ההקלטה שלכם מול הגיית הדוגמה. <strong>לחצו על כל מילה</strong> ששמעתם את עצמכם הוגים נכון וברור:
            </div>
            <div class="reading-words-row">${tapPillsHtml}</div>
            <div class="self-check-actions">
              ${manualPassed ? `
                <button type="button" class="btn btn-success" id="btn-speak-good">
                  ✅ מעולה! המשך לשאלה הבאה ⬅️
                </button>
              ` : ''}
              <button type="button" class="btn btn-primary" id="btn-speak-rerecord">
                🎤 נסו להקריא שוב עכשיו
              </button>
              <button type="button" class="btn btn-warning" id="btn-speak-retry">
                🔄 הוסף לחיזוק זיכרון והמשך
              </button>
            </div>
          </div>
        `;
        evalBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        evalBox.querySelectorAll('[data-manual-word]').forEach(btn => {
          btn.addEventListener('click', () => {
            const i = Number(btn.getAttribute('data-manual-word'));
            manualWords[i].ok = !manualWords[i].ok;
            renderManualWordTapStep();
          });
        });

        const passBtn = document.getElementById('btn-speak-good');
        if (passBtn) passBtn.addEventListener('click', opts.onPass);
        const rerecordBtn = document.getElementById('btn-speak-rerecord');
        if (rerecordBtn) {
          rerecordBtn.addEventListener('click', () => {
            evalBox.style.display = 'none';
            startBtn.click();
          });
        }
        const struggleBtn = document.getElementById('btn-speak-retry');
        if (struggleBtn) struggleBtn.addEventListener('click', opts.onStruggle);
      }

      renderManualWordTapStep();
    }

    function finishAndPlaySelf(transcriptText) {
      startBtn.style.display = 'inline-flex';
      stopBtn.style.display = 'none';
      if (autoStopTimer) clearTimeout(autoStopTimer);

      renderVerificationUI(transcriptText);

      statusMsg.textContent = '🔊 משמיע עכשיו את ההקלטה שלכם... הקשיבו לעצמכם!';

      const afterSelfPlayback = () => {
        statusMsg.textContent = `🔊 ועכשיו הגיית הדוגמה באנגלית: "${opts.phraseEn}"${transcriptText ? ` (זוהה בדיבור: "${transcriptText}")` : ''}`;
        speakEnglish(opts.phraseEn);
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

    const demoPassBtn = document.getElementById('btn-demo-read-pass');
    if (demoPassBtn) {
      demoPassBtn.addEventListener('click', () => {
        finishAndPlaySelf(opts.phraseEn);
      });
    }

    const demoFailBtn = document.getElementById('btn-demo-read-fail');
    if (demoFailBtn) {
      demoFailBtn.addEventListener('click', () => {
        finishAndPlaySelf('wrong word banana');
      });
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
            ${m.mastered && !flawed ? '✅ נלמד באמת (אימות משולש 3/3 נקי!)' : '🔄 ממתין בתור חיזוק זיכרון'}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="practice-card" style="text-align:center;">
        <h2 style="font-size:1.4rem; margin-bottom:8px;">🎉 סיימתם את ספרינט 5 המילים!</h2>
        <p style="color:var(--text-muted); margin-bottom:16px;">
          הנה סיכום האימות המשולש (3/3) והדיבור עבור המילים שתרגלתם בספרינט:
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
        questionsSinceSpeak: 0,
        lastCountedIndex: -1,
        speakingStep: false
      };
    }

    const idx = activeSession.index % CHUNKS_DRILLS.length;
    const drill = CHUNKS_DRILLS[idx];

    if (activeSession.speakingStep) {
      renderSpeakingCard(container, {
        topTitle: `1B. 🥪 תבניות ושיחה (${idx + 1} / ${CHUNKS_DRILLS.length})`,
        subTitle: `🎤 הקראה של הילד ובקרה שמקריא נכון (כל 4 שאלות): ${drill.chunkTitle}`,
        emoji: '🗣️',
        phraseEn: drill.fullSpeakEn,
        phraseHe: drill.promptHe,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % CHUNKS_DRILLS.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('chunk', drill.id, drill.chunkTitle, 'חיזוק הגייה של תבנית שיחה');
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % CHUNKS_DRILLS.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          render();
        }
      });
      return;
    }

    if (activeSession.lastCountedIndex !== activeSession.index) {
      activeSession.questionsSinceSpeak = (activeSession.questionsSinceSpeak || 0) + 1;
      activeSession.lastCountedIndex = activeSession.index;
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
            <div style="font-weight:800; font-size:0.92rem;">1B. 🥪 תבניות תקשורת ומשפטים קצרים (Lexical Chunks)</div>
            <div style="font-size:0.8rem; color:var(--primary); font-weight:700; direction:ltr; text-align:right;">
              Chunk: ${drill.chunkTitle}
            </div>
          </div>
          <span class="speak-cadence-badge">🎤 הקראה בקול: כל 4 שאלות (שאלה ${activeSession.questionsSinceSpeak}/4)</span>
          <span class="mastery-badge">שאלה ${idx + 1} מתוך ${CHUNKS_DRILLS.length}</span>
        </div>

        <div class="target-showcase">
          <div style="font-size:1.05rem; font-weight:800; margin-bottom:4px;">${drill.promptHe}</div>
          <div class="ltr-sentence">${highlightPhonics(drill.sentenceEn)}</div>
          <div>
            <button type="button" class="audio-btn" id="btn-chunk-audio">🔊 השמע את המשפט המלא</button>
          </div>
        </div>

        <div class="choices-grid">${choicesHtml}</div>

        <div id="chunk-feedback-box"></div>

        <div class="support-bar">
          <button type="button" class="btn btn-warning" id="btn-chunk-hint">💡 רמז לתבנית</button>
          <span style="font-size:0.82rem; color:var(--text-muted);">כל 4 שאלות — הקראה של הילד ובקרה שמקריא נכון! 🎤</span>
        </div>
        <div id="chunk-hint-box"></div>
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

          const shouldSpeakNext = activeSession.questionsSinceSpeak >= 4;
          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ מדויק! <strong>${drill.fullSpeakEn}</strong></div>
              <button type="button" class="btn btn-success" id="btn-chunk-next">
                ${shouldSpeakNext ? '🎤 המשך להקראה ובדיקת דיבור (כל 4 שאלות)' : 'המשך לשאלה הבאה ⬅️'}
              </button>
            </div>
          `;
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          document.getElementById('btn-chunk-next').addEventListener('click', () => {
            if (shouldSpeakNext) {
              activeSession.speakingStep = true;
              activeSession.questionsSinceSpeak = 0;
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
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        questionsSinceSpeak: 0,
        lastCountedIndex: -1,
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
        subTitle: '🎤 הקראה של הילד ובקרה שמקריא נכון (כל 4 שאלות)!',
        emoji: '📅',
        phraseEn: drill.speakEn,
        phraseHe: drill.questionHe,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % DAYS_TIMELINE_DRILLS.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('day', drill.id, drill.speakEn, 'חיזוק הגייה בימות השבוע');
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % DAYS_TIMELINE_DRILLS.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          render();
        }
      });
      return;
    }

    if (activeSession.lastCountedIndex !== activeSession.index) {
      activeSession.questionsSinceSpeak = (activeSession.questionsSinceSpeak || 0) + 1;
      activeSession.lastCountedIndex = activeSession.index;
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
          <div style="font-size:0.68rem; color:var(--text-muted);">${d.he}</div>
          <div style="font-size:0.86rem; margin:1px 0;">${highlightCapitalDay(d.en)}</div>
          <div style="font-size:0.66rem; font-weight:800;">${tag}</div>
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
            <div style="font-weight:800; font-size:0.92rem;">1C. 📅 רכבת ימות השבוע · Yesterday / Today / Tomorrow · Capital Letter</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">שימו לב: כל יום בשבוע מתחיל באות גדולה מודגשת בזהב (Capital Letter)!</div>
          </div>
          <span class="speak-cadence-badge">🎤 הקראה בקול: כל 4 שאלות (שאלה ${activeSession.questionsSinceSpeak}/4)</span>
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
          <div style="font-size:1.04rem; font-weight:800; margin-bottom:4px;">${drill.questionHe}</div>
          <div class="ltr-sentence">${drill.sentenceEn}</div>
          <div>
            <button type="button" class="audio-btn" id="btn-day-audio">🔊 השמע באנגלית</button>
          </div>
        </div>

        <div class="choices-grid">${choicesHtml}</div>

        <div id="day-feedback-box"></div>

        <div class="support-bar">
          <button type="button" class="btn btn-warning" id="btn-day-hint">💡 רמז מסרגל הימים</button>
          <span style="font-size:0.82rem; color:var(--text-muted);">כל 4 שאלות — הקראה של הילד ובקרה שמקריא נכון! 🎤</span>
        </div>
        <div id="day-hint-box"></div>
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
          const shouldSpeak = activeSession.questionsSinceSpeak >= 4;

          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ נהדר! <strong>${drill.speakEn}</strong></div>
              <button type="button" class="btn btn-success" id="btn-day-next">
                ${shouldSpeak ? '🎤 המשך להקראה ובדיקת דיבור (כל 4 שאלות)' : 'המשך לחידה הבאה ⬅️'}
              </button>
            </div>
          `;
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          document.getElementById('btn-day-next').addEventListener('click', () => {
            if (shouldSpeak) {
              activeSession.speakingStep = true;
              activeSession.questionsSinceSpeak = 0;
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
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // Priority 2: Phonics Lab (ch / sh / th + 4th distractor)
  function renderPhonicsMode(container) {
    const phonicsWords = ALL_WORDS.filter(w => w.phonics);
    if (!activeSession || activeSession.sessionType !== 'phonics') {
      activeSession = {
        sessionType: 'phonics',
        index: 0,
        questionsSinceSpeak: 0,
        lastCountedIndex: -1,
        speakingStep: false
      };
    }

    const idx = activeSession.index % phonicsWords.length;
    const word = phonicsWords[idx];

    if (activeSession.speakingStep) {
      renderSpeakingCard(container, {
        topTitle: `2. 🔤 מעבדת הפונטיקה (${idx + 1} / ${phonicsWords.length})`,
        subTitle: `🎤 הקראה של הילד ובקרה שמקריא נכון (כל 4 שאלות — צליל ${word.phonics.toUpperCase()})`,
        emoji: word.emoji,
        phraseEn: word.shortEn,
        phraseHe: `${word.en} (${word.he}) — "${word.shortHe}"`,
        onPass: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % phonicsWords.length;
          render();
        },
        onStruggle: () => {
          addToReviewQueue('phonics', word.id, `${word.en} (${word.phonics})`, 'חיזוק הגיית ch/sh/th');
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          activeSession.index = (activeSession.index + 1) % phonicsWords.length;
          render();
        },
        onExit: () => {
          activeSession.speakingStep = false;
          activeSession.questionsSinceSpeak = 0;
          render();
        }
      });
      return;
    }

    if (activeSession.lastCountedIndex !== activeSession.index) {
      activeSession.questionsSinceSpeak = (activeSession.questionsSinceSpeak || 0) + 1;
      activeSession.lastCountedIndex = activeSession.index;
    }

    const maskedWord = word.en.replace(new RegExp(word.phonics, 'i'), '__');

    container.innerHTML = `
      <div class="practice-card">
        <div class="sprint-topbar">
          <div>
            <div style="font-weight:800; font-size:0.92rem;">2. 🔤 מעבדת הפונטיקה: צלילי <span class="ph-ch">ch</span> · <span class="ph-sh">sh</span> · <span class="ph-th">th</span></div>
            <div style="font-size:0.78rem; color:var(--text-muted);">
              🟧 <strong>ch</strong> = צ׳ (cheese, lunch) · 🟦 <strong>sh</strong> = שׁ (fish, wash) · 🟪 <strong>th</strong> = לשון בין השיניים 👅 (teeth, Thursday)
            </div>
          </div>
          <span class="speak-cadence-badge">🎤 הקראה בקול: כל 4 שאלות (שאלה ${activeSession.questionsSinceSpeak}/4)</span>
          <span class="mastery-badge">מילה ${idx + 1} מתוך ${phonicsWords.length}</span>
        </div>

        <div class="target-showcase">
          <div>
            <span class="target-emoji">${word.emoji}</span>
            <span class="ltr-en">${maskedWord}</span>
          </div>
          <div style="font-size:0.95rem; font-weight:700; margin-top:2px;">
            ${word.he} · <span style="font-size:0.88rem; color:var(--text-muted); direction:ltr; display:inline-block;">"${highlightPhonics(word.shortEn)}"</span>
          </div>
          <div>
            <button type="button" class="audio-btn" id="btn-phonics-audio">🔊 הקשיבו למילה ובחרו את הצליל החסר</button>
          </div>
        </div>

        <div class="choices-grid">
          <button type="button" class="choice-btn" data-ph-choice="ch">
            <span class="ph-ch" style="font-size:1.15rem;">ch</span>
            <div style="font-size:0.78rem; margin-top:2px;">צליל צ׳</div>
          </button>
          <button type="button" class="choice-btn" data-ph-choice="sh">
            <span class="ph-sh" style="font-size:1.15rem;">sh</span>
            <div style="font-size:0.78rem; margin-top:2px;">צליל שׁ</div>
          </button>
          <button type="button" class="choice-btn" data-ph-choice="th">
            <span class="ph-th" style="font-size:1.15rem;">th</span>
            <div style="font-size:0.78rem; margin-top:2px;">לשון בין השיניים 👅</div>
          </button>
          <button type="button" class="choice-btn" data-ph-choice="st">
            <span style="font-size:1.15rem; font-weight:900; color:var(--text-muted);">st / צליל אחר</span>
            <div style="font-size:0.78rem; margin-top:2px;">צליל סְט / אחר</div>
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
          const shouldSpeak = activeSession.questionsSinceSpeak >= 4;

          fb.innerHTML = `
            <div class="feedback-banner success">
              <div>✅ מצוין! <strong>${highlightPhonics(word.en)}</strong> (${word.he}) — "${word.shortEn}"</div>
              <button type="button" class="btn btn-success" id="btn-ph-next">
                ${shouldSpeak ? '🎤 המשך להקראה ובדיקת דיבור (כל 4 שאלות)' : 'למילה הבאה ⬅️'}
              </button>
            </div>
          `;
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          document.getElementById('btn-ph-next').addEventListener('click', () => {
            if (shouldSpeak) {
              activeSession.speakingStep = true;
              activeSession.questionsSinceSpeak = 0;
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
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
