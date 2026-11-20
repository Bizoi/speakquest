/* SpeakQuest V2 — מבצע חילוץ החללית של קוסמו */

const CURRICULUM = {
  g2: {
    label: 'כיתה ב׳',
    words: [
      { id: 'cat', en: 'cat', he: 'חתול', emoji: '🐱', phonetic: 'קאט (ca-t)', partialSim: 'ca', fact: '🐱 הידעתם? לחתולים יש 32 שרירים בכל אוזן והם יכולים לסובב אותן כמו רדאר של חללית!' },
      { id: 'dog', en: 'dog', he: 'כלב', emoji: '🐶', phonetic: 'דוג (do-g)', partialSim: 'do', fact: '🐶 הידעתם? טביעת האף של כל כלב היא ייחודית בעולם — בדיוק כמו טביעת אצבע של אסטרונאוט!' },
      { id: 'red', en: 'red', he: 'אדום', emoji: '🔴', phonetic: 'רֶד (re-d)', partialSim: 're', fact: '🔴 הידעתם? כוכב הלכת מאדים נקרא "הכוכב האדום" (The Red Planet) בגלל אבק ברזל על פניו!' },
      { id: 'blue', en: 'blue', he: 'כחול', emoji: '🔵', phonetic: 'בּלוּ (bl-ue)', partialSim: 'bu', fact: '🔵 הידעתם? כדור הארץ נראה כמו גולה כחולה מהחלל כי רובו מכוסה באוקיינוסים!' },
      { id: 'sun', en: 'sun', he: 'שמש', emoji: '☀️', phonetic: 'סַאן (su-n)', partialSim: 'su', fact: '☀️ הידעתם? לאור מהשמש לוקח בדיוק 8 דקות ו-20 שניות להגיע בחללית לכדור הארץ!' },
      { id: 'three', en: 'three', he: 'שלוש (3)', emoji: '3️⃣', phonetic: 'ת׳רי (th-ree)', partialSim: 'tree', fact: '3️⃣ הידעתם? לתמנון יש שלושה לבבות (Three hearts)!' },
      { id: 'mom', en: 'mom', he: 'אמא', emoji: '👩', phonetic: 'מָאם (mo-m)', partialSim: 'mo', fact: '👩 הידעתם? כמעט בכל השפות בעולם המילה לאמא מתחילה בצליל מ׳!' },
      { id: 'fish', en: 'fish', he: 'דג', emoji: '🐟', phonetic: 'פִיש (fi-sh)', partialSim: 'fi', fact: '🐟 הידעתם? יש דגים מעופפים שיכולים לדאות מעל פני המים למרחק של 200 מטרים!' }
    ],
    sentences: [
      { id: 'g2_s1', en: 'The cat is red', he: 'החתול הוא אדום', words: ['The', 'cat', 'is', 'red'], partialSim: 'The cat red' },
      { id: 'g2_s2', en: 'I see a blue fish', he: 'אני רואה דג כחול', words: ['I', 'see', 'a', 'blue', 'fish'], partialSim: 'I see blue fish' },
      { id: 'g2_s3', en: 'My dog is happy', he: 'הכלב שלי שמח', words: ['My', 'dog', 'is', 'happy'], partialSim: 'My dog happy' },
      { id: 'g2_s4', en: 'I see the sun', he: 'אני רואה את השמש', words: ['I', 'see', 'the', 'sun'], partialSim: 'I see sun' }
    ],
    bossQuestions: [
      {
        id: 'g2_b1',
        qHe: 'זורג שואל: "איזו חיה נובחת וטסה איתי בחללית?"',
        qEn: 'Who says woof in the spaceship?',
        options: [
          { en: 'The dog', he: 'הכלב' },
          { en: 'The fish', he: 'הדג' },
          { en: 'The sun', he: 'השמש' }
        ],
        correctEn: 'The dog',
        partialSim: 'dog',
        hitQuote: '👾 זורג: "אוי ויי! המגן הראשון שלי נסדק! באמת כלב אומר הב-הב!"'
      },
      {
        id: 'g2_b2',
        qHe: 'זורג שואל: "באיזה צבע השמיים והים של כדור הארץ?"',
        qEn: 'What color is the big ocean?',
        options: [
          { en: 'It is blue', he: 'הוא כחול' },
          { en: 'It is three', he: 'הוא שלוש' },
          { en: 'It is mom', he: 'הוא אמא' }
        ],
        correctEn: 'It is blue',
        partialSim: 'blue',
        hitQuote: '👾 זורג: "בום! 💥 גם המגן השני התנפץ! נשאר לי רק מגן אחד אחרון!"'
      },
      {
        id: 'g2_b3',
        qHe: 'זורג שואל: "מה זורח בשמיים ומאיר על החללית ביום?"',
        qEn: 'What shines in the sky?',
        options: [
          { en: 'The sun', he: 'השמש' },
          { en: 'The cat', he: 'החתול' },
          { en: 'The red fish', he: 'הדג האדום' }
        ],
        correctEn: 'The sun',
        partialSim: 'sun',
        hitQuote: '👾 זורג: "אאאאההה! כל 3 המגנים שלי נשברו! החללית שלכם משוחררת להמריא לחלל! 🚀"'
      }
    ]
  },
  g4: {
    label: 'כיתה ד׳',
    words: [
      { id: 'vegetables', en: 'vegetables', he: 'ירקות', emoji: '🥦', phonetic: 'וֶג׳-טְבּוּלְז (veg-ta-bles)', partialSim: 'vegetable', fact: '🥦 הידעתם? האסטרונאוטים בתחנת החלל הבינלאומית הצליחו לגדל חסה וירקות בלי כוח כבידה!' },
      { id: 'teeth', en: 'teeth', he: 'שיניים', emoji: '🦷', phonetic: 'טִית׳ (tee-th)', partialSim: 'teet', fact: '🦷 הידעתם? לכריש יכולות לצמוח יותר מ-20,000 שיניים חדשות במהלך חייו!' },
      { id: 'table', en: 'table', he: 'שולחן', emoji: '🪑', phonetic: 'טֵיי-בּוֹל (ta-ble)', partialSim: 'tabel', fact: '🪑 הידעתם? בחללית השולחן מצויד בסקוטש ובמגנטים כדי שהצלחות לא ירחפו באוויר!' },
      { id: 'friends', en: 'friends', he: 'חברים', emoji: '🧑‍🤝‍🧑', phonetic: 'פְרֶנְדְז (frien-ds)', partialSim: 'friend', fact: '🧑‍🤝‍🧑 הידעתם? לוטרות ים מחזיקות ידיים עם החברים שלהן בזמן השינה כדי לא להיסחף!' },
      { id: 'ball', en: 'ball', he: 'כדור', emoji: '⚽', phonetic: 'בּוֹל (ba-ll)', partialSim: 'bal', fact: '⚽ הידעתם? בחלל כדור שזורקים לא נופל לרצפה אלא ממשיך לרחף בקו ישר!' },
      { id: 'water', en: 'water', he: 'מים', emoji: '💧', phonetic: 'ווֹ-טֶר (wa-ter)', partialSim: 'wate', fact: '💧 הידעתם? בחלל טיפות מים מרחפות כמו כדורי בדולח ואסטרונאוטים שותים אותן עם קשית מיוחדת!' },
      { id: 'happy', en: 'happy', he: 'שמח', emoji: '😄', phonetic: 'הַא-פִּי (ha-ppy)', partialSim: 'hapi', fact: '😄 הידעתם? חיוך מפעיל מיד חומרים משמחים במוח גם כשאנחנו מתרגלים אנגלית!' },
      { id: 'apple', en: 'apple', he: 'תפוח', emoji: '🍎', phonetic: 'אֵפּ-אֶל (ap-ple)', partialSim: 'apel', fact: '🍎 הידעתם? תפוחים צפים במים כי 25% מהנפח של התפוח הוא בכלל אוויר!' }
    ],
    sentences: [
      { id: 'g4_s1', en: 'I eat healthy vegetables', he: 'אני אוכל ירקות בריאים', words: ['I', 'eat', 'healthy', 'vegetables'], partialSim: 'I eat vegetables' },
      { id: 'g4_s2', en: 'We brush our teeth', he: 'אנחנו מצחצחים את השיניים שלנו', words: ['We', 'brush', 'our', 'teeth'], partialSim: 'We brush teeth' },
      { id: 'g4_s3', en: 'The apple is on the table', he: 'התפוח נמצא על השולחן', words: ['The', 'apple', 'is', 'on', 'the', 'table'], partialSim: 'apple on table' },
      { id: 'g4_s4', en: 'I play ball with my friends', he: 'אני משחק בכדור עם החברים שלי', words: ['I', 'play', 'ball', 'with', 'my', 'friends'], partialSim: 'I play ball friends' }
    ],
    bossQuestions: [
      {
        id: 'g4_b1',
        qHe: 'זורג שואל: "מה אסטרונאוטים חייבים לעשות כל בוקר וערב כדי לשמור על השיניים?"',
        qEn: 'How do you keep your teeth clean?',
        options: [
          { en: 'We brush our teeth', he: 'אנחנו מצחצחים שיניים' },
          { en: 'We jump on the table', he: 'אנחנו קופצים על השולחן' },
          { en: 'We throw a ball', he: 'אנחנו זורקים כדור' }
        ],
        correctEn: 'We brush our teeth',
        partialSim: 'brush our teeth',
        hitQuote: '👾 זורג: "קראק! 💥 המגן הראשון נשבר! אנגלית מצוינת של כיתה ד׳!"'
      },
      {
        id: 'g4_b2',
        qHe: 'זורג שואל: "מה שותים האסטרונאוטים בחללית כשאין מיץ?"',
        qEn: 'What do astronauts drink in space?',
        options: [
          { en: 'They drink clean water', he: 'הם שותים מים נקיים' },
          { en: 'They drink a table', he: 'הם שותים שולחן' },
          { en: 'They drink a ball', he: 'הם שותים כדור' }
        ],
        correctEn: 'They drink clean water',
        partialSim: 'drink clean water',
        hitQuote: '👾 זורג: "בזזזט! 💥 המגן השני התפוצץ! נשאר לי רק מגן אחד!"'
      },
      {
        id: 'g4_b3',
        qHe: 'זורג שואל: "עם מי הכי כיף לשחק כדורגל אחרי הנחיתה?"',
        qEn: 'Who do you play ball with?',
        options: [
          { en: 'I play with my friends', he: 'אני משחק עם החברים שלי' },
          { en: 'I play with my teeth', he: 'אני משחק עם השיניים שלי' },
          { en: 'I play with vegetables', he: 'אני משחק עם ירקות' }
        ],
        correctEn: 'I play with my friends',
        partialSim: 'play with my friends',
        hitQuote: '👾 זורג: "בום טראח! 💥 כל 3 המגנים שלי נשברו! אתם קפטנים אמיתיים של אנגלית! 🚀"'
      }
    ]
  }
};

const SHOP_ITEMS = [
  { id: 'helmet', name: 'קסדת חלל', emoji: '🧑‍🚀', price: 0 },
  { id: 'glasses', name: 'משקפי טייס', emoji: '🕶️', price: 15 },
  { id: 'crown', name: 'כתר קפטן הגלקסיה', emoji: '👑', price: 25 },
  { id: 'wizard', name: 'כובע קוסם כוכבים', emoji: '🎩', price: 30 },
  { id: 'supernova', name: 'מסיכת סופר-נובה', emoji: '🦸', price: 40 }
];

const CHEST_REWARDS = {
  star: { title: '🎁 תיבת כוכב', coins: 50, itemId: 'glasses', itemName: 'משקפי טייס כוכביים 🕶️' },
  galaxy: { title: '🎁 תיבת גלקסיה', coins: 50, itemId: 'crown', itemName: 'כתר קפטן הגלקסיה 👑' },
  supernova: { title: '🎁 תיבת סופר-נובה', coins: 50, itemId: 'supernova', itemName: 'מסיכת סופר-נובה נדירה 🦸' }
};

const STORAGE_KEY = 'speakquest_v2_state';

function createDefaultGradeProgress() {
  return {
    chargedWords: {},
    fixedSentences: {},
    bossShieldsBroken: 0,
    bossRoundIndex: 0,
    chestClaimed: null,
    notifiedStage2: false,
    notifiedStage3: false
  };
}

let state = {
  grade: 'g2',
  unlockAll: false,
  storyDismissed: false,
  stars: 0,
  coins: 20,
  streak: 0,
  turtleShieldActive: false,
  ownedItems: ['helmet'],
  equippedItem: 'helmet',
  activeScreen: 'screen-hub',
  s1WordIndex: 0,
  s2SentenceIndex: 0,
  s2Assembled: [],
  s3SelectedOptionEn: '',
  lastRecordedAudioUrl: null,
  lastSpokenTarget: '',
  progress: {
    g2: createDefaultGradeProgress(),
    g4: createDefaultGradeProgress()
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...state,
        ...parsed,
        progress: {
          g2: { ...createDefaultGradeProgress(), ...(parsed.progress?.g2 || {}) },
          g4: { ...createDefaultGradeProgress(), ...(parsed.progress?.g4 || {}) }
        }
      };
    }
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

function getGradeData() {
  return CURRICULUM[state.grade];
}

function getGradeProg() {
  return state.progress[state.grade];
}

/* Counts & Stage Unlock Logic */
function getCrystalsCount() {
  return Object.keys(getGradeProg().chargedWords).length;
}

function getEnginesCount() {
  return Object.keys(getGradeProg().fixedSentences).length;
}

function getBossBrokenCount() {
  return getGradeProg().bossShieldsBroken || 0;
}

function isStage2Unlocked() {
  return state.unlockAll || getCrystalsCount() >= 4;
}

function isStage3Unlocked() {
  return state.unlockAll || (getCrystalsCount() >= 4 && getEnginesCount() >= 2);
}

function isVictoryUnlocked() {
  return state.unlockAll || getBossBrokenCount() >= 3;
}

function computeRepairPercent() {
  const c = Math.min(4, getCrystalsCount());
  const e = Math.min(2, getEnginesCount());
  const b = Math.min(3, getBossBrokenCount());
  if (c === 4 && e === 2 && b === 3) return 100;
  const crystalPct = Math.round((c / 4) * 33);
  const enginePct = Math.round((e / 2) * 33);
  const bossPct = Math.round((b / 3) * 34);
  return Math.min(99, crystalPct + enginePct + bossPct);
}

/* Strict Levenshtein Speech Examiner */
function levenshtein(a, b) {
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

function normalizeText(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarityRatio(a, b) {
  const s1 = normalizeText(a);
  const s2 = normalizeText(b);
  if (!s1 && !s2) return 1;
  if (!s1 || !s2) return 0;
  const maxLen = Math.max(s1.length, s2.length);
  const dist = levenshtein(s1, s2);
  return Math.max(0, (maxLen - dist) / maxLen);
}

function evaluateSpeech(targetText, spokenText) {
  const cleanTarget = normalizeText(targetText);
  const cleanSpoken = normalizeText(spokenText);

  const targetWords = cleanTarget.split(' ').filter(Boolean);
  const spokenWords = cleanSpoken.split(' ').filter(Boolean);

  const wordBreakdown = targetWords.map((tWord, idx) => {
    let bestSim = 0;
    const candidate = spokenWords[idx];
    if (candidate) {
      bestSim = similarityRatio(tWord, candidate);
    }
    for (const sw of spokenWords) {
      const sim = similarityRatio(tWord, sw);
      if (sim > bestSim) bestSim = sim;
    }
    let status = 'miss';
    if (bestSim >= 0.84) status = 'ok';
    else if (bestSim >= 0.5) status = 'close';
    return { word: tWord, status, sim: bestSim };
  });

  const overallCharSim = similarityRatio(cleanTarget, cleanSpoken);
  const avgWordSim = wordBreakdown.length
    ? wordBreakdown.reduce((acc, w) => acc + w.sim, 0) / wordBreakdown.length
    : 0;
  const scorePct = Math.round(((overallCharSim * 0.55) + (avgWordSim * 0.45)) * 100);

  let stars = 0;
  let baseCoins = 0;
  let verdictTitle = '';

  if (scorePct >= 85) {
    stars = 3;
    baseCoins = 10;
    verdictTitle = '🌟 ביצוע מושלם! 3 כוכבים!';
  } else if (scorePct >= 55) {
    stars = 2;
    baseCoins = 6;
    verdictTitle = '⭐⭐ קרוב מאוד! 2 כוכבים — הגביש נטען!';
  } else if (scorePct >= 25) {
    stars = 1;
    baseCoins = 0;
    verdictTitle = '⭐ כוכב 1 (0 נק׳) — כמעט! בואו ננסה שוב עם מגן הצב!';
  } else {
    stars = 0;
    baseCoins = 0;
    verdictTitle = '❌ לא זוהתה המילה הנכונה (0 נק׳) — מגן הצב של קוסמו הופעל!';
  }

  return {
    targetText,
    spokenText: spokenText || '(לא נשמע קול)',
    scorePct,
    stars,
    baseCoins,
    verdictTitle,
    wordBreakdown
  };
}

/* Text-To-Speech Helper */
function speakEnglish(text, rate = 0.95) {
  state.lastSpokenTarget = text;
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn('TTS error:', e);
  }
}

/* Confetti Effect */
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = Array.from({ length: 75 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 120,
    w: 8 + Math.random() * 6,
    h: 10 + Math.random() * 8,
    vy: 3 + Math.random() * 4,
    vx: -2 + Math.random() * 4,
    color: ['#f59e0b', '#10b981', '#ec4899', '#38bdf8', '#a855f7'][Math.floor(Math.random() * 5)]
  }));
  let frame = 0;
  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    frame++;
    if (frame < 110) {
      requestAnimationFrame(step);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(step);
}

/* Update HUD, Spaceship Repair Meter, Rank, Streak, and Stage Tabs */
function renderHUDAndMeter() {
  document.getElementById('hud-stars').textContent = state.stars;
  document.getElementById('hud-coins').textContent = state.coins;
  document.getElementById('active-grade-label').textContent = getGradeData().label;

  // Grade pill buttons
  document.getElementById('btn-grade-g2').classList.toggle('active', state.grade === 'g2');
  document.getElementById('btn-grade-g4').classList.toggle('active', state.grade === 'g4');

  // Teacher override checkbox
  document.getElementById('unlock-all-toggle').checked = state.unlockAll;

  // Story banner visibility
  document.getElementById('story-banner').classList.toggle('hidden', state.storyDismissed);

  // Equipped Cosmo accessory
  const itemObj = SHOP_ITEMS.find(i => i.id === state.equippedItem) || SHOP_ITEMS[0];
  document.getElementById('cosmo-accessory-emoji').textContent = itemObj.emoji;

  // Spaceship Repair & Launch Meter (0% - 100%)
  const crystals = Math.min(4, getCrystalsCount());
  const engines = Math.min(2, getEnginesCount());
  const brokenShields = Math.min(3, getBossBrokenCount());
  const remainingShields = Math.max(0, 3 - brokenShields);
  const pct = computeRepairPercent();

  document.getElementById('spaceship-meter-pct').textContent = `${pct}%`;
  document.getElementById('spaceship-meter-fill').style.width = `${pct}%`;
  document.getElementById('spaceship-progressbar').setAttribute('aria-valuenow', String(pct));

  document.getElementById('cp-crystals').textContent = `💎 גבישי קול: ${crystals}/4`;
  document.getElementById('cp-engines').textContent = `🔧 מנועי משפט: ${engines}/2`;
  document.getElementById('cp-shields').textContent = `🛡️ מגני זורג שנשברו: ${brokenShields}/3`;

  const shipVisual = document.getElementById('spaceship-visual');
  const stateText = document.getElementById('spaceship-state-text');
  const rankBadge = document.getElementById('player-rank-badge');

  shipVisual.classList.toggle('launching', pct >= 67);

  if (pct === 100) {
    shipVisual.textContent = '🌟🚀';
    stateText.textContent = '🌟🚀 ניצחון! החללית שוגרה לחלל!';
    rankBadge.textContent = 'דרגה: קפטן אנגלית 🥇';
  } else if (crystals >= 4 && engines >= 2) {
    shipVisual.textContent = '🚀🔥';
    stateText.textContent = `🚀🔥 החללית מוכנה! הביסו את זורג שומר השער (${remainingShields} מגנים ${'🛡️'.repeat(remainingShields)})`;
    rankBadge.textContent = 'דרגה: טייס משנה 🥈';
  } else if (crystals >= 4) {
    shipVisual.textContent = '🔋⚡';
    stateText.textContent = `🔋⚡ הסוללה נטענה! עכשיו מתקנים את המנוע (${engines}/2 משפטים)`;
    rankBadge.textContent = 'דרגה: טייס משנה 🥈';
  } else {
    shipVisual.textContent = '🛸💨';
    stateText.textContent = `🛸💨 חללית כבויה — צריכה 4 גבישי מילים (${crystals}/4)`;
    rankBadge.textContent = 'דרגה: טירון חלל 🥉';
  }

  // Combo Fire Streak & Turtle Rescue Shield Badges
  const streakEl = document.getElementById('streak-badge');
  if (state.streak >= 2) {
    streakEl.textContent = `🔥 רצף x${state.streak}! בונוס מטבעות כפול!`;
    streakEl.classList.add('hot');
  } else {
    streakEl.textContent = `🔥 רצף x${state.streak}`;
    streakEl.classList.remove('hot');
  }

  const turtleEl = document.getElementById('turtle-shield-badge');
  turtleEl.classList.toggle('hidden', !state.turtleShieldActive);

  // Stage Tabs & Hub Ladder
  const s2Open = isStage2Unlocked();
  const s3Open = isStage3Unlocked();
  const vicOpen = isVictoryUnlocked();

  document.getElementById('tab-crystals-count').textContent = `${crystals}/4`;
  document.getElementById('tab-engines-count').textContent = `${engines}/2`;
  document.getElementById('tab-boss-count').textContent = `${remainingShields}🛡️`;

  const tab2 = document.getElementById('tab-stage2');
  const tab3 = document.getElementById('tab-stage3');
  const tabVic = document.getElementById('tab-victory');

  tab2.classList.toggle('locked-tab', !s2Open);
  document.getElementById('tab-stage2-lock').textContent = s2Open ? '🟢' : '🔒';

  tab3.classList.toggle('locked-tab', !s3Open);
  document.getElementById('tab-stage3-lock').textContent = s3Open ? '🟢' : '🔒';

  tabVic.classList.toggle('hidden', !vicOpen);

  // Hub Cards
  const totalWords = getGradeData().words.length;
  document.getElementById('hub-progress-stage1').textContent =
    `💎 התקדמות: ${crystals} / 4 גבישים טעונים (מתוך ${totalWords} מילים)`;
  document.getElementById('hub-card-stage1').classList.toggle('completed', crystals >= 4);
  document.getElementById('hub-pill-stage1').textContent =
    crystals >= 4 ? 'שלב 1 — הושלם! ✅' : 'שלב 1 — פתוח! 🟢';

  const card2 = document.getElementById('hub-card-stage2');
  const btn2 = document.getElementById('btn-enter-stage2');
  card2.classList.toggle('locked', !s2Open);
  card2.classList.toggle('unlocked', s2Open && engines < 2);
  card2.classList.toggle('completed', engines >= 2);
  document.getElementById('hub-pill-stage2').textContent =
    engines >= 2 ? 'שלב 2 — הושלם! ✅' : (s2Open ? 'שלב 2 — פתוח! 🟢' : 'שלב 2 — נעול 🔒');
  document.getElementById('hub-progress-stage2').textContent = s2Open
    ? `🔧 התקדמות: ${engines} / 2 מנועי משפט תוקנו`
    : `🔒 דרישה לפתיחה: טענו 4 גבישי קול בשלב 1 (${crystals}/4)`;
  btn2.disabled = !s2Open;
  btn2.textContent = s2Open ? '🚀 כניסה לשלב 2' : '🔒 השלימו את שלב 1 קודם';

  const card3 = document.getElementById('hub-card-stage3');
  const btn3 = document.getElementById('btn-enter-stage3');
  card3.classList.toggle('locked', !s3Open);
  card3.classList.toggle('unlocked', s3Open && brokenShields < 3);
  card3.classList.toggle('completed', brokenShields >= 3);
  document.getElementById('hub-pill-stage3').textContent =
    brokenShields >= 3 ? 'שלב 3 — הבוס הובס! 🏆' : (s3Open ? 'שלב 3 — פתוח! 🟢' : 'שלב 3 — נעול 🔒');
  document.getElementById('hub-progress-stage3').textContent = s3Open
    ? `🛡️ מגני זורג שנשברו: ${brokenShields} / 3`
    : '🔒 דרישה לפתיחה: תקנו 2 מנועי משפט בשלב 2';
  btn3.disabled = !s3Open;
  btn3.textContent = s3Open ? '⚔️ כניסה לקרב הבוס זורג!' : '🔒 השלימו את שלב 2 קודם';
}

/* Switch Active Screen */
function navigateToScreen(screenId) {
  if (screenId === 'screen-stage2' && !isStage2Unlocked()) {
    setCosmoSpeech('🔒 כדי להיכנס למוסך קודי המנוע, טענו קודם 4 גבישי קול בשלב 1 (או הפעילו "מצב מורה/בדיקה" למעלה)!');
    return;
  }
  if (screenId === 'screen-stage3' && !isStage3Unlocked()) {
    setCosmoSpeech('🔒 כדי להילחם בבוס זורג, תקנו קודם 2 מנועי משפט בשלב 2 (או הפעילו "מצב מורה/בדיקה" למעלה)!');
    return;
  }

  state.activeScreen = screenId;
  document.querySelectorAll('.screen').forEach(sec => {
    sec.classList.toggle('active', sec.id === screenId);
  });
  document.querySelectorAll('.stage-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.target === screenId);
  });

  if (screenId === 'screen-stage1') renderStage1();
  if (screenId === 'screen-stage2') renderStage2();
  if (screenId === 'screen-stage3') renderStage3();
  if (screenId === 'screen-victory') renderVictoryScreen();
  saveState();
}

function setCosmoSpeech(text) {
  document.getElementById('cosmo-speech-text').textContent = text;
}

function showFanfare(message, nextScreenId) {
  const banner = document.getElementById('fanfare-banner');
  document.getElementById('fanfare-text').textContent = message;
  const btn = document.getElementById('btn-fanfare-go');
  btn.onclick = () => {
    banner.classList.add('hidden');
    navigateToScreen(nextScreenId);
  };
  banner.classList.remove('hidden');
  fireConfetti();
}

/* Render Feedback Card (Shared across Stages 1, 2, 3) */
function renderFeedbackCard(containerId, evalResult, bonusNotesHtml) {
  const box = document.getElementById(containerId);
  box.className = `feedback-card stars-${evalResult.stars}`;
  const starsVisual = evalResult.stars > 0 ? '⭐'.repeat(evalResult.stars) : '🐢';

  const pillsHtml = evalResult.wordBreakdown
    .map(w => `<span class="word-pill ${w.status}">${w.word}</span>`)
    .join('');

  const turtleHtml = evalResult.stars <= 1
    ? `<div class="turtle-rescue-alert">🐢 מגן הצלה הופעל! הקשיבו להגייה האיטית ונסו שוב על <strong>+5 🪙 בונוס קאמבק!</strong></div>`
    : '';

  box.innerHTML = `
    <div class="feedback-header">
      <strong>${evalResult.verdictTitle} (דיוק: ${evalResult.scorePct}%)</strong>
      <span class="stars-display">${starsVisual}</span>
    </div>
    <div class="heard-transcript-box">
      <div>🎧 קוסמו שמע: <strong class="ltr">"${evalResult.spokenText}"</strong></div>
      <div style="margin-top:4px; font-size:0.84rem; color:#475569;">פירוק מילים (ירוק=מדויק, צהוב=קרוב, אדום=דורש תיקון):</div>
      <div class="word-pills-row">${pillsHtml}</div>
    </div>
    ${bonusNotesHtml ? `<div style="font-weight:800; color:#047857; margin-top:6px;">${bonusNotesHtml}</div>` : ''}
    ${turtleHtml}
    <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
      <button type="button" class="btn btn-outline" data-replay-self="${evalResult.targetText}">
        🔁 הקשיבו להקלטה שלכם
      </button>
    </div>
  `;

  const replayBtn = box.querySelector('[data-replay-self]');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      if (state.lastRecordedAudioUrl) {
        const audio = new Audio(state.lastRecordedAudioUrl);
        audio.play();
      } else {
        speakEnglish(evalResult.spokenText || evalResult.targetText, 0.9);
      }
    });
  }
}

/* Process Speech Attempt Outcome (Streaks, Turtle Shield, Comeback Bonus, Stage Progression) */
function processSpeechAttempt(targetText, spokenText, stageNumber) {
  const result = evaluateSpeech(targetText, spokenText);
  const prog = getGradeProg();
  let bonusHtml = '';

  if (result.stars >= 2) {
    state.streak += 1;
    let earnedCoins = result.baseCoins;

    if (state.turtleShieldActive) {
      earnedCoins += 5;
      bonusHtml += '🐢✨ +5 🪙 בונוס קאמבק ממגן הצב! ';
      state.turtleShieldActive = false;
    }

    if (state.streak >= 2) {
      earnedCoins += 5;
      bonusHtml += `🔥 רצף אש x${state.streak}! בונוס מטבעות! `;
    }

    state.stars += result.stars;
    state.coins += earnedCoins;
    bonusHtml = `+${earnedCoins} 🪙 | +${result.stars} ⭐ ${bonusHtml}`;

    if (stageNumber === 1) {
      const currentWord = getGradeData().words[state.s1WordIndex];
      prog.chargedWords[currentWord.id] = Math.max(prog.chargedWords[currentWord.id] || 0, result.stars);
      setCosmoSpeech(`💎 נהדר! הגביש של "${currentWord.en}" נטען באנרגיית קול! (${Math.min(4, getCrystalsCount())}/4 גבישים)`);

      if (getCrystalsCount() >= 4 && !prog.notifiedStage2) {
        prog.notifiedStage2 = true;
        showFanfare('🎉 טענתם 4 גבישי קול! סוללת החללית מלאה ושלב 2 (מוסך קודי המנוע) נפתח!', 'screen-stage2');
      }
    } else if (stageNumber === 2) {
      const currentSent = getGradeData().sentences[state.s2SentenceIndex];
      prog.fixedSentences[currentSent.id] = Math.max(prog.fixedSentences[currentSent.id] || 0, result.stars);
      setCosmoSpeech(`🔧 מעולה! מנוע המשפט "${currentSent.en}" תוקן בהצלחה! (${Math.min(2, getEnginesCount())}/2 מנועים)`);

      if (getEnginesCount() >= 2 && !prog.notifiedStage3) {
        prog.notifiedStage3 = true;
        showFanfare('🎉 תיקנתם 2 מנועי משפט! שלב 3: קרב הבוס מול זורג שומר השער נפתח!', 'screen-stage3');
      }
    } else if (stageNumber === 3) {
      const questions = getGradeData().bossQuestions;
      const currentQ = questions[prog.bossRoundIndex] || questions[0];
      if (prog.bossShieldsBroken < 3) {
        prog.bossShieldsBroken += 1;
      }
      const zorgAvatar = document.getElementById('zorg-avatar');
      zorgAvatar.classList.remove('hit');
      void zorgAvatar.offsetWidth;
      zorgAvatar.classList.add('hit');
      document.getElementById('zorg-speech').textContent = currentQ.hitQuote;
      setCosmoSpeech(`⚡ פגיעה ישירה! קרן הלייזר הקולית שלכם שברה מגן של זורג! (${prog.bossShieldsBroken}/3)`);

      if (prog.bossShieldsBroken >= 3) {
        fireConfetti();
        showFanfare('🏆 ניצחון אדיר! כל 3 המגנים של זורג נשברו! בואו לפתוח תיבת אוצר במסך הניצחון!', 'screen-victory');
      } else if (prog.bossRoundIndex < questions.length - 1) {
        prog.bossRoundIndex += 1;
      }
    }
  } else {
    // 0 or 1 star -> Activate Turtle Rescue Shield
    state.streak = 0;
    state.turtleShieldActive = true;
    setCosmoSpeech('הפעלתי מגן צב! 🐢 הקשיבו לאט וננסה שוב על בונוס קאמבק! (+5 🪙)');
    speakEnglish(targetText, 0.65);
  }

  saveState();
  renderHUDAndMeter();
  renderFeedbackCard(`feedback-s${stageNumber}`, result, bonusHtml);
  if (stageNumber === 1) renderStage1WordGrid();
  if (stageNumber === 2) renderStage2SentenceGrid();
  if (stageNumber === 3) renderStage3BossStatus();
}

/* STAGE 1 RENDERING */
function renderStage1WordGrid() {
  const grid = document.getElementById('stage1-word-grid');
  const words = getGradeData().words;
  const prog = getGradeProg();

  grid.innerHTML = words.map((w, idx) => {
    const stars = prog.chargedWords[w.id] || 0;
    const isCharged = stars >= 2;
    const isActive = idx === state.s1WordIndex;
    return `
      <button type="button" class="word-chip-btn ${isActive ? 'active' : ''} ${isCharged ? 'charged' : ''}" data-s1-idx="${idx}">
        <span style="font-size:1.4rem;">${w.emoji}</span>
        <span>${w.en}</span>
        <span style="font-size:0.78rem;">${isCharged ? '💎 טעון!' : '⚪ לא טעון'}</span>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-s1-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.s1WordIndex = Number(btn.dataset.s1Idx);
      document.getElementById('feedback-s1').classList.add('hidden');
      document.getElementById('s1-mystery-text').classList.add('hidden');
      renderStage1();
    });
  });
}

function renderStage1() {
  const words = getGradeData().words;
  if (state.s1WordIndex >= words.length) state.s1WordIndex = 0;
  const w = words[state.s1WordIndex];

  renderStage1WordGrid();
  document.getElementById('s1-word-emoji').textContent = w.emoji;
  document.getElementById('s1-word-en').textContent = w.en;
  document.getElementById('s1-word-he').textContent = `פירוש: ${w.he}`;
  document.getElementById('s1-word-phonetic').textContent = `הגייה בעברית: ${w.phonetic}`;
  document.getElementById('s1-mystery-text').textContent = w.fact;
}

/* STAGE 2 RENDERING */
function renderStage2SentenceGrid() {
  const grid = document.getElementById('stage2-sentence-grid');
  const sentences = getGradeData().sentences;
  const prog = getGradeProg();

  grid.innerHTML = sentences.map((s, idx) => {
    const isFixed = (prog.fixedSentences[s.id] || 0) >= 2;
    const isActive = idx === state.s2SentenceIndex;
    return `
      <button type="button" class="word-chip-btn ${isActive ? 'active' : ''} ${isFixed ? 'charged' : ''}" data-s2-idx="${idx}">
        <span>🔧 מנוע ${idx + 1}</span>
        <span style="font-size:0.8rem; font-family:var(--font-he);">${s.he}</span>
        <span style="font-size:0.75rem;">${isFixed ? '✅ מתוקן!' : '⚙️ ממתין'}</span>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-s2-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.s2SentenceIndex = Number(btn.dataset.s2Idx);
      state.s2Assembled = [];
      document.getElementById('feedback-s2').classList.add('hidden');
      renderStage2();
    });
  });
}

function renderStage2() {
  const sentences = getGradeData().sentences;
  if (state.s2SentenceIndex >= sentences.length) state.s2SentenceIndex = 0;
  const s = sentences[state.s2SentenceIndex];

  renderStage2SentenceGrid();
  document.getElementById('s2-prompt-he').textContent = `הרכיבו וקראו באנגלית: "${s.he}" (${s.en})`;

  const slotsEl = document.getElementById('s2-assembled-slots');
  if (state.s2Assembled.length === 0) {
    slotsEl.innerHTML = `<span style="color:#64748b; font-family:var(--font-he);">לחצו על המילים למטה כדי להרכיב את המשפט...</span>`;
  } else {
    slotsEl.innerHTML = state.s2Assembled.map((wordObj, idx) => `
      <button type="button" class="tile-btn" data-remove-idx="${idx}">${wordObj.text}</button>
    `).join('');
    slotsEl.querySelectorAll('[data-remove-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.s2Assembled.splice(Number(btn.dataset.removeIdx), 1);
        renderStage2();
      });
    });
  }

  // Deterministic scramble so tiles stay stable
  const bankEl = document.getElementById('s2-word-bank');
  const indexedWords = s.words.map((t, i) => ({ text: t, origIdx: i }));
  const scrambled = [...indexedWords].reverse();

  bankEl.innerHTML = scrambled.map(item => {
    const isUsed = state.s2Assembled.some(a => a.origIdx === item.origIdx);
    return `
      <button type="button" class="tile-btn ${isUsed ? 'used' : ''}" data-bank-idx="${item.origIdx}" data-bank-text="${item.text}">
        ${item.text}
      </button>
    `;
  }).join('');

  bankEl.querySelectorAll('[data-bank-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const origIdx = Number(btn.dataset.bankIdx);
      const text = btn.dataset.bankText;
      if (!state.s2Assembled.some(a => a.origIdx === origIdx)) {
        state.s2Assembled.push({ origIdx, text });
        speakEnglish(text, 0.95);
        renderStage2();
      }
    });
  });
}

/* STAGE 3 RENDERING (BOSS BATTLE WITH ZORG) */
function renderStage3BossStatus() {
  const prog = getGradeProg();
  const broken = Math.min(3, prog.bossShieldsBroken || 0);
  const intact = Math.max(0, 3 - broken);
  const shieldsVisual = [
    ...Array(intact).fill('🛡️'),
    ...Array(broken).fill('💥')
  ].join(' ');
  document.getElementById('zorg-shields-display').textContent = shieldsVisual;
}

function renderStage3() {
  const prog = getGradeProg();
  const questions = getGradeData().bossQuestions;
  if (prog.bossRoundIndex >= questions.length) prog.bossRoundIndex = 0;
  const q = questions[prog.bossRoundIndex];

  renderStage3BossStatus();
  document.getElementById('zorg-round-label').textContent =
    `שאלה ${prog.bossRoundIndex + 1} מתוך ${questions.length} | מגנים שנותרו לזורג: ${Math.max(0, 3 - prog.bossShieldsBroken)}`;
  document.getElementById('s3-question-he').textContent = q.qHe;
  document.getElementById('s3-question-en').textContent = q.qEn;

  if (!state.s3SelectedOptionEn || !q.options.some(o => o.en === state.s3SelectedOptionEn)) {
    state.s3SelectedOptionEn = q.correctEn;
  }

  const grid = document.getElementById('s3-options-grid');
  grid.innerHTML = q.options.map(opt => {
    const selected = opt.en === state.s3SelectedOptionEn;
    return `
      <button type="button" class="boss-option-btn ${selected ? 'selected' : ''}" data-boss-opt="${opt.en}">
        <div class="ltr" style="font-size:1.15rem; color:var(--primary);">${opt.en}</div>
        <div style="font-size:0.88rem; color:var(--text-muted); margin-top:4px;">${opt.he}</div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-boss-opt]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.s3SelectedOptionEn = btn.dataset.bossOpt;
      speakEnglish(state.s3SelectedOptionEn, 0.95);
      renderStage3();
    });
  });

  document.getElementById('s3-selected-target').innerHTML =
    `התשובה שנבחרה לאמירה בקול: <strong class="ltr">"${state.s3SelectedOptionEn}"</strong>`;
}

/* SCREEN 4: GRAND VICTORY & TREASURE CHESTS */
function renderVictoryScreen() {
  const prog = getGradeProg();
  const chestsGrid = document.getElementById('victory-chests-grid');
  const rewardBox = document.getElementById('victory-chest-reward');

  chestsGrid.querySelectorAll('[data-chest-id]').forEach(btn => {
    const cId = btn.dataset.chestId;
    const isClaimed = prog.chestClaimed === cId;
    btn.classList.toggle('opened', isClaimed);
    btn.querySelector('.chest-icon').textContent = isClaimed ? '💎' : '🎁';
  });

  if (prog.chestClaimed && CHEST_REWARDS[prog.chestClaimed]) {
    const r = CHEST_REWARDS[prog.chestClaimed];
    rewardBox.classList.remove('hidden');
    rewardBox.innerHTML = `
      <div style="font-size:1.2rem; font-weight:800; color:#047857;">
        🎉 פתחתם את ${r.title}!
      </div>
      <p style="margin-top:6px; font-weight:700;">
        קיבלתם <strong>+${r.coins} 🪙 מטבעות חלל</strong> + אביזר נדיר במתנה לקוסמו: <strong>${r.itemName}</strong>!
      </p>
    `;
  } else {
    rewardBox.classList.add('hidden');
  }
}

/* Web Speech Recognition + Self-Voice Audio Recorder */
function triggerMicrophoneCapture(targetText, stageNumber, btnEl) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setCosmoSpeech('💡 הדפדפן הזה לא תומך בזיהוי קול ישיר — השתמשו בכפתורי סימולטור בוחן הדיבור למטה (✅ מדויק / 🟡 קרוב / ❌ שגוי)!');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  btnEl.classList.add('listening');
  const originalLabel = btnEl.textContent;
  btnEl.textContent = '🔴 מקשיב... דברו באנגלית!';

  // Optional MediaRecorder for self-voice playback
  let mediaRecorder = null;
  let chunks = [];
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        state.lastRecordedAudioUrl = URL.createObjectURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
    }).catch(() => {});
  }

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    processSpeechAttempt(targetText, transcript, stageNumber);
  };

  recognition.onerror = () => {
    setCosmoSpeech('🎙️ לא הצלחתי לשמוע בבירור — נסו שוב או השתמשו בסימולטור בוחן הדיבור למטה!');
  };

  recognition.onend = () => {
    btnEl.classList.remove('listening');
    btnEl.textContent = originalLabel;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  recognition.start();
}

/* Cosmo Space Shop Dialog */
function renderShopModal() {
  document.getElementById('shop-coins-count').textContent = state.coins;
  const grid = document.getElementById('shop-items-grid');

  grid.innerHTML = SHOP_ITEMS.map(item => {
    const owned = state.ownedItems.includes(item.id);
    const equipped = state.equippedItem === item.id;
    return `
      <div class="shop-item-card ${equipped ? 'equipped' : ''}">
        <div style="font-size:2.2rem;">${item.emoji}</div>
        <strong>${item.name}</strong>
        <div style="font-size:0.85rem; color:var(--text-muted);">
          ${owned ? 'ברשותכם ✅' : `מחיר: ${item.price} 🪙`}
        </div>
        <button type="button" class="btn ${equipped ? 'btn-green' : 'btn-primary'}" style="width:100%; padding:7px 10px; font-size:0.85rem;" data-shop-item="${item.id}">
          ${equipped ? 'לבוש כעת ✨' : (owned ? 'הלבש' : `קנה (${item.price} 🪙)`)}
        </button>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-shop-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.shopItem;
      const item = SHOP_ITEMS.find(i => i.id === id);
      if (!item) return;
      if (state.ownedItems.includes(id)) {
        state.equippedItem = id;
        setCosmoSpeech(`✨ איזה יופי! עכשיו אני לובש את "${item.name}"!`);
      } else if (state.coins >= item.price) {
        state.coins -= item.price;
        state.ownedItems.push(id);
        state.equippedItem = id;
        setCosmoSpeech(`🛍️ תודה רבה! קניתם לי את "${item.name}"!`);
      } else {
        setCosmoSpeech(`🪙 חסרים לכם עוד ${item.price - state.coins} מטבעות כדי לקנות את "${item.name}". דברו באנגלית כדי להרוויח מטבעות!`);
      }
      saveState();
      renderHUDAndMeter();
      renderShopModal();
    });
  });
}

/* Wire All Event Listeners */
function initApp() {
  loadState();

  // Story Intro Banner dismiss & reopen
  document.getElementById('btn-dismiss-story').addEventListener('click', () => {
    state.storyDismissed = true;
    saveState();
    renderHUDAndMeter();
  });

  document.getElementById('btn-open-story').addEventListener('click', () => {
    state.storyDismissed = false;
    saveState();
    renderHUDAndMeter();
  });

  // Grade Switcher (2nd Grade & 4th Grade)
  document.querySelectorAll('.grade-btn[data-grade]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newGrade = btn.dataset.grade;
      if (!CURRICULUM[newGrade]) return;
      state.grade = newGrade;
      state.s1WordIndex = 0;
      state.s2SentenceIndex = 0;
      state.s2Assembled = [];
      state.s3SelectedOptionEn = '';
      setCosmoSpeech(`עברנו אל ${CURRICULUM[newGrade].label}! בואו נטען גבישי קול ונתקן את החללית!`);
      saveState();
      renderHUDAndMeter();
      navigateToScreen(state.activeScreen);
    });
  });

  // Teacher / Parent "Unlock All" Override Toggle
  document.getElementById('unlock-all-toggle').addEventListener('change', e => {
    state.unlockAll = e.target.checked;
    setCosmoSpeech(
      state.unlockAll
        ? '🔓 מצב מורה/בדיקה הופעל: כל 3 השלבים ומסך הניצחון פתוחים כעת לבדיקה חופשית!'
        : '🔒 מצב התקדמות רגיל הופעל: השלבים נפתחים לפי סדר המשימה.'
    );
    saveState();
    renderHUDAndMeter();
  });

  // Stage Tabs & Hub Navigation
  document.querySelectorAll('.stage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      navigateToScreen(tab.dataset.target);
    });
  });

  document.getElementById('btn-enter-stage1').addEventListener('click', () => navigateToScreen('screen-stage1'));
  document.getElementById('btn-enter-stage2').addEventListener('click', () => navigateToScreen('screen-stage2'));
  document.getElementById('btn-enter-stage3').addEventListener('click', () => navigateToScreen('screen-stage3'));

  document.querySelectorAll('[data-back-hub]').forEach(btn => {
    btn.addEventListener('click', () => navigateToScreen('screen-hub'));
  });

  // Stage 1 Controls
  document.getElementById('btn-s1-listen-normal').addEventListener('click', () => {
    const w = getGradeData().words[state.s1WordIndex];
    speakEnglish(w.en, 0.95);
  });

  document.getElementById('btn-s1-listen-slow').addEventListener('click', () => {
    const w = getGradeData().words[state.s1WordIndex];
    speakEnglish(w.en, 0.6);
  });

  document.getElementById('btn-s1-mystery').addEventListener('click', () => {
    document.getElementById('s1-mystery-text').classList.toggle('hidden');
  });

  document.getElementById('btn-s1-mic').addEventListener('click', e => {
    const w = getGradeData().words[state.s1WordIndex];
    triggerMicrophoneCapture(w.en, 1, e.currentTarget);
  });

  // Stage 2 Controls
  document.getElementById('btn-s2-clear').addEventListener('click', () => {
    state.s2Assembled = [];
    renderStage2();
  });

  document.getElementById('btn-s2-listen-normal').addEventListener('click', () => {
    const s = getGradeData().sentences[state.s2SentenceIndex];
    speakEnglish(s.en, 0.95);
  });

  document.getElementById('btn-s2-listen-slow').addEventListener('click', () => {
    const s = getGradeData().sentences[state.s2SentenceIndex];
    speakEnglish(s.en, 0.65);
  });

  document.getElementById('btn-s2-mic').addEventListener('click', e => {
    const s = getGradeData().sentences[state.s2SentenceIndex];
    triggerMicrophoneCapture(s.en, 2, e.currentTarget);
  });

  // Stage 3 Controls
  document.getElementById('btn-s3-listen-normal').addEventListener('click', () => {
    const q = getGradeData().bossQuestions[getGradeProg().bossRoundIndex] || getGradeData().bossQuestions[0];
    speakEnglish(state.s3SelectedOptionEn || q.correctEn, 0.95);
  });

  document.getElementById('btn-s3-listen-slow').addEventListener('click', () => {
    const q = getGradeData().bossQuestions[getGradeProg().bossRoundIndex] || getGradeData().bossQuestions[0];
    speakEnglish(state.s3SelectedOptionEn || q.correctEn, 0.65);
  });

  document.getElementById('btn-s3-mic').addEventListener('click', e => {
    const q = getGradeData().bossQuestions[getGradeProg().bossRoundIndex] || getGradeData().bossQuestions[0];
    triggerMicrophoneCapture(q.correctEn, 3, e.currentTarget);
  });

  // 3-Outcome Speech Examiner Simulator Buttons (Exact / Partial / Wrong + Free Text)
  document.querySelectorAll('[data-sim-stage]').forEach(btn => {
    btn.addEventListener('click', () => {
      const stageNum = Number(btn.dataset.simStage);
      const mode = btn.dataset.simMode;
      let target = '';
      let partialText = '';

      if (stageNum === 1) {
        const w = getGradeData().words[state.s1WordIndex];
        target = w.en;
        partialText = w.partialSim;
      } else if (stageNum === 2) {
        const s = getGradeData().sentences[state.s2SentenceIndex];
        target = s.en;
        partialText = s.partialSim;
      } else if (stageNum === 3) {
        const q = getGradeData().bossQuestions[getGradeProg().bossRoundIndex] || getGradeData().bossQuestions[0];
        target = q.correctEn;
        partialText = q.partialSim;
      }

      let simulatedTranscript = target;
      if (mode === 'partial') simulatedTranscript = partialText;
      if (mode === 'wrong') simulatedTranscript = 'banana spaceship wrong';

      processSpeechAttempt(target, simulatedTranscript, stageNum);
    });
  });

  document.getElementById('btn-sim-custom-s1').addEventListener('click', () => {
    const w = getGradeData().words[state.s1WordIndex];
    const val = document.getElementById('sim-input-s1').value.trim();
    processSpeechAttempt(w.en, val, 1);
  });

  document.getElementById('btn-sim-custom-s2').addEventListener('click', () => {
    const s = getGradeData().sentences[state.s2SentenceIndex];
    const val = document.getElementById('sim-input-s2').value.trim();
    processSpeechAttempt(s.en, val, 2);
  });

  document.getElementById('btn-sim-custom-s3').addEventListener('click', () => {
    const q = getGradeData().bossQuestions[getGradeProg().bossRoundIndex] || getGradeData().bossQuestions[0];
    const val = document.getElementById('sim-input-s3').value.trim();
    processSpeechAttempt(q.correctEn, val, 3);
  });

  // Victory Treasure Chests
  document.querySelectorAll('[data-chest-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const chestId = btn.dataset.chestId;
      const prog = getGradeProg();
      const reward = CHEST_REWARDS[chestId];
      if (!reward) return;

      if (!prog.chestClaimed) {
        prog.chestClaimed = chestId;
        state.coins += reward.coins;
        if (!state.ownedItems.includes(reward.itemId)) {
          state.ownedItems.push(reward.itemId);
        }
        state.equippedItem = reward.itemId;
        fireConfetti();
        setCosmoSpeech(`🎁 וואו! פתחתם את ${reward.title}! קיבלתם +${reward.coins} 🪙 ואת "${reward.itemName}"!`);
      } else {
        prog.chestClaimed = chestId;
      }
      saveState();
      renderHUDAndMeter();
      renderVictoryScreen();
    });
  });

  // Shop Dialog with Light Dismiss
  const shopDialog = document.getElementById('shop-dialog');
  document.getElementById('btn-open-shop').addEventListener('click', () => {
    renderShopModal();
    shopDialog.showModal();
  });

  document.getElementById('btn-victory-open-shop').addEventListener('click', () => {
    renderShopModal();
    shopDialog.showModal();
  });

  document.getElementById('btn-close-shop').addEventListener('click', () => {
    shopDialog.close();
  });

  shopDialog.addEventListener('click', e => {
    if (e.target === shopDialog) {
      shopDialog.close();
    }
  });

  // Reset & Play Again
  function resetCurrentGradeMission() {
    state.progress[state.grade] = createDefaultGradeProgress();
    state.streak = 0;
    state.turtleShieldActive = false;
    state.s1WordIndex = 0;
    state.s2SentenceIndex = 0;
    state.s2Assembled = [];
    document.getElementById('fanfare-banner').classList.add('hidden');
    saveState();
    renderHUDAndMeter();
    navigateToScreen('screen-hub');
    setCosmoSpeech('🔄 המשימה אופסה! בואו נטען מחדש 4 גבישי קול ונתקן את החללית של קוסמו!');
  }

  document.getElementById('btn-reset-progress').addEventListener('click', resetCurrentGradeMission);
  document.getElementById('btn-victory-play-again').addEventListener('click', resetCurrentGradeMission);

  // Initial Render
  renderHUDAndMeter();
  renderStage1();
  renderStage2();
  renderStage3();
  navigateToScreen(state.activeScreen || 'screen-hub');
}

document.addEventListener('DOMContentLoaded', initApp);
