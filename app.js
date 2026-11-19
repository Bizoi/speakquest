// קוסמו באי האנגלית — SpeakQuest (כיתה ב׳ + כיתה ד׳)

const GRADE_DATA = {
  '2': {
    title: 'כיתה ב׳',
    subtitle: 'צעדים ראשונים: חיות, צבעים, מספרים ומשפחה 🌟',
    words: [
      {
        id: 'g2_cat',
        en: 'cat',
        he: 'חתול',
        emoji: '🐱🐾',
        phonetic: 'קֶאט',
        tip: 'פתחו פה רחב באמצע לצליל אֶ-אֲ כמו במילה קֶאט!',
        phrase: 'big cat',
        phraseHe: 'חתול גדול',
        accept: ['cat', 'cats', 'kat'],
        close: ['cet', 'cut', 'ket'],
        distractors: {
          cut: 'אמרתם cut (לחתוך ✂️)! פתחו את הפה רחב יותר עבור cat (חתול 🐱)!',
          dog: 'אמרתם dog (כלב 🐶)! המטרה שלנו עכשיו היא cat (חתול 🐱)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: כמה שעות ביממה חתולים ישנים בממוצע? אמרו את המילה נכון (2-3 כוכבים) כדי לגלות!',
        curiosityFact: '🐱 גיליתם את הסוד! חתולים ישנים בין 12 ל-16 שעות ביום — יותר מחצי מהחיים שלהם! מילת בונוס: Kitten (קִי-טֶן - גור חתולים)!'
      },
      {
        id: 'g2_dog',
        en: 'dog',
        he: 'כלב',
        emoji: '🐶🦴',
        phonetic: 'דּוֹג',
        tip: 'עגלו שפתיים לצליל אוֹ ברור: דּוֹג!',
        phrase: 'happy dog',
        phraseHe: 'כלב שמח',
        accept: ['dog', 'dogs', 'doggy'],
        close: ['dug', 'dag', 'dok'],
        distractors: {
          duck: 'אמרתם duck (ברווז 🦆)! סיימו בצליל ג׳ חזק עבור dog (כלב 🐶)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: איזה איבר בגוף של כלב הוא חד פי 10,000 משל בני אדם? אמרו dog נכון כדי לפתוח!',
        curiosityFact: '🐶 גיליתם את הסוד! האף של הכלב חזק פי 10,000 משלנו וכל אף של כלב מיוחד כמו טביעת אצבע! מילת בונוס: Puppy (פַּא-פִּי - גור כלבים)!'
      },
      {
        id: 'g2_red',
        en: 'red',
        he: 'אדום',
        emoji: '🔴🍓',
        phonetic: 'רֶד',
        tip: 'ה-R באנגלית עגולה ורכה — אל תגלגלו את הלשון: רֶד!',
        phrase: 'red ball',
        phraseHe: 'כדור אדום',
        accept: ['red', 'read'],
        close: ['rad', 'rid', 'ret'],
        distractors: {
          bed: 'אמרתם bed (מיטה 🛏️)! התחילו בצליל R עגול עבור red (אדום 🔴)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: איזה כוכב לכת בחלל של קוסמו נקרא "הכוכב האדום"? אמרו red נכון כדי לגלות!',
        curiosityFact: '🔴 גיליתם את הסוד! כוכב הלכת מאדים (Mars) נקרא "הכוכב האדום" כי האדמה שלו מלאה בחלודה אדומה! מילת בונוס: Mars (מָארְס - מאדים)!'
      },
      {
        id: 'g2_blue',
        en: 'blue',
        he: 'כחול',
        emoji: '🔵🐳',
        phonetic: 'בְּלוּ',
        tip: 'חברו בְּ ו-לוּ ביחד בשפתיים מעוגלות: בְּלוּ!',
        phrase: 'blue fish',
        phraseHe: 'דג כחול',
        accept: ['blue', 'blew', 'blu'],
        close: ['blo', 'blow', 'bloo'],
        distractors: {},
        curiosityQuestion: '🔒 חידת סקרנות: איזו חיה כחולה בים היא החיה הכי גדולה שחיה אי פעם על כדור הארץ? אמרו blue נכון!',
        curiosityFact: '🐳 גיליתם את הסוד! הלווייתן הכחול (Blue Whale) גדול יותר מכל דינוזאור — הלב שלו בגודל של מכונית! מילת בונוס: Whale (ווֵייל - לווייתן)!'
      },
      {
        id: 'g2_sun',
        en: 'sun',
        he: 'שמש',
        emoji: '☀️🌻',
        phonetic: 'סַאן',
        tip: 'אותו צליל כמו המילה son: פה פתוח ל-סַאן!',
        phrase: 'yellow sun',
        phraseHe: 'שמש צהובה',
        accept: ['sun', 'son', 'san'],
        close: ['soon', 'sung', 'sum'],
        distractors: {
          sand: 'אמרתם sand (חול 🏖️)! עצרו ב-N בלי ד׳ בסוף עבור sun (שמש ☀️)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: כמה דקות לוקח לאור מהשמש להגיע עד לכדור הארץ? אמרו sun נכון כדי לפתוח!',
        curiosityFact: '☀️ גיליתם את הסוד! לאור השמש לוקח 8 דקות ו-20 שניות לטוס בחלל עד אלינו! מילת בונוס: Star (סְטָאר - כוכב)!'
      },
      {
        id: 'g2_three',
        en: 'three',
        he: 'שלוש',
        emoji: '3️⃣🎈',
        phonetic: 'תְ׳רִי',
        tip: 'אתגר ה-TH! 👅 הוציאו קצה לשון בין השיניים לפני ה-R: תְ׳רִי!',
        phrase: 'three cats',
        phraseHe: 'שלושה חתולים',
        accept: ['three', '3'],
        close: ['free', 'thre', 'sri', 'tri'],
        distractors: {
          tree: 'אמרתם tree (עץ 🌳)! בשביל המספר three (שלוש 3️⃣) הוציאו קצה לשון בין השיניים בהתחלה!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: לכמה לבבות יש לתמנון שחי בים? אמרו three נכון כדי לגלות!',
        curiosityFact: '🐙 גיליתם את הסוד! לתמנון יש בדיוק שלושה (Three) לבבות בגוף! מילת בונוס: Octopus (אוֹקְ-טוֹ-פּוּס - תמנון)!'
      },
      {
        id: 'g2_mom',
        en: 'mom',
        he: 'אמא',
        emoji: '👩❤️',
        phonetic: 'מָאם',
        tip: 'סגרו שפתיים בהתחלה ובסוף לצליל M חם: מָאם!',
        phrase: 'hello mom',
        phraseHe: 'שלום אמא',
        accept: ['mom', 'mum', 'mommy', 'mama'],
        close: ['mam', 'man', 'mon'],
        distractors: {
          moon: 'אמרתם moon (ירח 🌙)! פתחו פה ל-מָאם עבור mom (אמא ❤️)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: למה המילה לאמא מתחילה באות M כמעט בכל השפות בעולם? אמרו mom נכון!',
        curiosityFact: '👩❤️ גיליתם את הסוד! צליל ה-"מממ" (M) הוא הצליל הראשון והכי קל שתינוקות יודעים לעשות בשפתיים! מילת בונוס: Love (לָאב - אהבה)!'
      },
      {
        id: 'g2_fish',
        en: 'fish',
        he: 'דג',
        emoji: '🐠🌊',
        phonetic: 'פִישׁ',
        tip: 'התחילו בנשיפת F עדינה וסיימו ב-שְׁ ארוכה: פִישׁ!',
        phrase: 'small fish',
        phraseHe: 'דג קטן',
        accept: ['fish', 'fishes'],
        close: ['fis', 'fesh', 'dish'],
        distractors: {
          dish: 'אמרתם dish (צלחת 🍽️)! נשפו שפה תחתונה לצליל F בהתחלה עבור fish (דג 🐠)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: איך דגים ישנים בלילה אם אין להם עפעפיים לעצום עיניים? אמרו fish נכון!',
        curiosityFact: '🐠 גיליתם את הסוד! דגים באמת ישנים עם עיניים פקוחות כי אין להם עפעפיים — הם פשוט מרחפים בשקט במים! מילת בונוס: Sea (סִי - ים)!'
      }
    ],
    sentences: [
      {
        en: 'A red ball',
        he: 'כדור אדום',
        emoji: '🔴 ⚽',
        words: ['A', 'red', 'ball']
      },
      {
        en: 'One big dog',
        he: 'כלב גדול אחד',
        emoji: '1️⃣ 🐶',
        words: ['One', 'big', 'dog']
      },
      {
        en: 'The sun is yellow',
        he: 'השמש צהובה',
        emoji: '☀️ 💛',
        words: ['The', 'sun', 'is', 'yellow']
      },
      {
        en: 'Three blue fish',
        he: 'שלושה דגים כחולים',
        emoji: '3️⃣ 🔵 🐠',
        words: ['Three', 'blue', 'fish']
      }
    ],
    bossTurns: [
      {
        qEn: 'Say hello to Cosmo!',
        qHe: 'אמרו שלום לקוסמו!',
        options: [
          { en: 'Hello happy dog', he: 'שלום כלב שמח', emoji: '👋🐶' },
          { en: 'Hello mom', he: 'שלום אמא', emoji: '👋❤️' },
          { en: 'A big cat', he: 'חתול גדול', emoji: '🐱✨' }
        ]
      },
      {
        qEn: 'What animal is this? 🐶',
        qHe: 'איזו חיה זאת? 🐶',
        options: [
          { en: 'A happy dog', he: 'כלב שמח', emoji: '🐶😄' },
          { en: 'A small fish', he: 'דג קטן', emoji: '🐠🌊' },
          { en: 'Three cats', he: 'שלושה חתולים', emoji: '3️⃣🐱' }
        ]
      },
      {
        qEn: 'What color is the sun? ☀️',
        qHe: 'באיזה צבע השמש? ☀️',
        options: [
          { en: 'Yellow sun', he: 'שמש צהובה', emoji: '☀️💛' },
          { en: 'Red ball', he: 'כדור אדום', emoji: '🔴⚽' },
          { en: 'Blue fish', he: 'דג כחול', emoji: '🔵🐠' }
        ]
      }
    ]
  },

  '4': {
    title: 'כיתה ד׳',
    subtitle: 'אוצר מילים, משפטים ושיחה באנגלית ⭐',
    words: [
      {
        id: 'vegetables',
        en: 'vegetables',
        he: 'ירקות',
        emoji: '🥦🥕',
        phonetic: 'וֶגְ׳-טֶ-בְּלְס',
        tip: 'שימו לב! ה-e השנייה שקטה לגמרי — אומרים וֶגְ׳-טֶבְּלְס (3 הברות בלבד)!',
        phrase: 'green vegetables',
        phraseHe: 'ירקות ירוקים',
        accept: ['vegetables', 'vegetable', 'veggies'],
        close: ['vegtables', 'vegtable', 'veggie', 'vegetebles'],
        distractors: {
          table: 'אמרתם table (שולחן 🍽️)! זכרו להתחיל ב-וֶגְ׳ עבור vegetables (ירקות 🥦)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: באיזה צבע היו הגזרים הראשונים בעולם לפני 1,000 שנה? אמרו vegetables נכון כדי לגלות!',
        curiosityFact: '🥕 גיליתם את הסוד! הגזרים הראשונים בעולם היו בכלל סגולים וצהובים — לא כתומים! מילת בונוס: Carrot (קֶא-רוֹט - גזר)!'
      },
      {
        id: 'teeth',
        en: 'teeth',
        he: 'שיניים',
        emoji: '🦷✨',
        phonetic: 'טִית׳',
        tip: 'אתגר ה-TH! 👅 הוציאו קצה לשון בין השיניים ונשפו אוויר עדין בסוף המילה!',
        phrase: 'white teeth',
        phraseHe: 'שיניים לבנות',
        accept: ['teeth', 'tooth'],
        close: ['teef', 'teth', 'teet', 'tith'],
        distractors: {
          tree: 'אמרתם tree (עץ 🌳)! בשביל teeth (שיניים 🦷) הוציאו קצה לשון בין השיניים בסוף המילה!',
          tea: 'אמרתם tea (תה ☕)! אל תשכחו את צליל ה-TH בסוף המילה teeth (שיניים 🦷)!',
          three: 'אמרתם three (שלוש 3️⃣)! במילה teeth מתחילים ב-ט׳ רגילה והלשון יוצאת רק בסוף!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: לאיזו חיה בים יש 3,000 שיניים שמתחלפות כל הזמן? אמרו את המילה נכון במיקרופון כדי לפתוח את הסוד!',
        curiosityFact: '🦈 גיליתם את הסוד! לכריש יש עד 3,000 שיניים בפה בשורות, והן מתחלפות כל החיים! מילת בונוס: Shark (שָׁארְק - כריש)!'
      },
      {
        id: 'table',
        en: 'table',
        he: 'שולחן',
        emoji: '🍽️🪑',
        phonetic: 'טֵיי-בְּל',
        tip: 'מתחיל בצליל ארוך טֵיי (כמו המילה Day) ואז בְּל!',
        phrase: 'big table',
        phraseHe: 'שולחן גדול',
        accept: ['table', 'tables'],
        close: ['taibel', 'tabel', 'teble'],
        distractors: {
          cable: 'אמרתם cable (כבל 🔌)! התחילו בצליל ט׳ עבור table (שולחן 🍽️)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: איזה הר מפורסם באפריקה שטוח לגמרי למעלה כמו שולחן ענק? אמרו table נכון כדי לפתוח!',
        curiosityFact: '⛰️ גיליתם את הסוד! בדרום אפריקה יש הר אמיתי שנקרא "הר השולחן" (Table Mountain) כי הפסגה שלו שטוחה כמו שולחן והעננים נראים כמו מפה! מילת בונוס: Mountain (מַאוּנְ-טֶן - הר)!'
      },
      {
        id: 'friends',
        en: 'friends',
        he: 'חברים',
        emoji: '👫🎉',
        phonetic: 'פְרֶנְדְס',
        tip: 'האות i שקטה לגמרי — אל תגידו פְרִיינְדְס אלא פְרֶנְדְס!',
        phrase: 'good friends',
        phraseHe: 'חברים טובים',
        accept: ['friends', 'friend'],
        close: ['frends', 'frands', 'frend', 'freinds'],
        distractors: {},
        curiosityQuestion: '🔒 חידת סקרנות: איזו חיה ימית מחזיקה ידיים עם החברים שלה בזמן השינה כדי לא להיסחף? אמרו friends נכון!',
        curiosityFact: '🦦 גיליתם את הסוד! לוטרות ים מחזיקות כפות ידיים עם החברים שלהן כשהן ישנות על המים! מילת בונוס: Otter (אוֹ-טֶר - לוטרה)!'
      },
      {
        id: 'ball',
        en: 'ball',
        he: 'כדור',
        emoji: '⚽🏀',
        phonetic: 'בּוֹל',
        tip: 'למרות שכותבים A, לפני דאבל-L קוראים את זה בּוֹל (עם חולם)!',
        phrase: 'red ball',
        phraseHe: 'כדור אדום',
        accept: ['ball', 'balls'],
        close: ['bol', 'bowl', 'bal', 'bawl'],
        distractors: {
          wall: 'אמרתם wall (קיר 🧱)! סגרו שפתיים בהתחלה לצליל בּ׳ עבור ball (כדור ⚽)!',
          tall: 'אמרתם tall (גבוה 🦒)! התחילו בצליל בּ׳ עבור ball (כדור ⚽)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: באיזה צבע היו כדורי הכדורסל הראשונים בעולם? אמרו ball נכון כדי לגלות!',
        curiosityFact: '🏀 גיליתם את הסוד! כדורי הכדורסל הראשונים היו חומים כהים, ורק לפני 65 שנה צבעו אותם בכתום כדי שהקהל יראה אותם! מילת בונוס: Bounce (בַּאוּנְס - לקפוץ)!'
      },
      {
        id: 'water',
        en: 'water',
        he: 'מים',
        emoji: '💧🥤',
        phonetic: 'ווֹ-טֶר',
        tip: 'עגלו שפתיים בהתחלה כמו נשיקה לצליל W (לא V!): ווֹ-טֶר!',
        phrase: 'cold water',
        phraseHe: 'מים קרים',
        accept: ['water', 'waters'],
        close: ['woter', 'wata', 'wader'],
        distractors: {
          waiter: 'אמרתם waiter (מלצר 🤵)! אמרו ווֹ-טֶר (לא ווֵיי-טֶר) עבור water (מים 💧)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: האם המים שאנחנו שותים היום הם אותם מים ששתו הדינוזאורים? אמרו water נכון!',
        curiosityFact: '🦕💧 גיליתם את הסוד! כן! כדור הארץ ממחזר את אותם המים כבר מיליארדי שנים — אולי שתיתם היום טיפה ששתה טי-רקס! מילת בונוס: Ocean (אוֹ-שֶׁן - אוקיינוס)!'
      },
      {
        id: 'happy',
        en: 'happy',
        he: 'שמח',
        emoji: '😄🌟',
        phonetic: 'הֶא-פִּי',
        tip: 'נשפו אוויר עדין ב-H בהתחלה ופתחו פה רחב: הֶא-פִּי!',
        phrase: 'happy dog',
        phraseHe: 'כלב שמח',
        accept: ['happy'],
        close: ['hapi', 'hepi', 'hapy'],
        distractors: {
          hippie: 'אמרתם hippie! פתחו את הפה לצליל הֶא בהתחלה עבור happy (שמח 😄)!'
        },
        curiosityQuestion: '🔒 חידת סקרנות: איזו חיה מחייכת מאוזן לאוזן נחשבת ל"חיה הכי שמחה בעולם"? אמרו happy נכון!',
        curiosityFact: '🦘😄 גיליתם את הסוד! הקוואקה (Quokka) מאוסטרליה תמיד נראית מחייכת ומאושרת! מילת בונוס: Smile (סְמַייל - חיוך)!'
      },
      {
        id: 'apple',
        en: 'apple',
        he: 'תפוח',
        emoji: '🍎🍏',
        phonetic: 'אֶ-פֶּל',
        tip: 'פתחו פה רחב בהתחלה והדגישו את ה-P: אֶ-פֶּל!',
        phrase: 'red apple',
        phraseHe: 'תפוח אדום',
        accept: ['apple', 'apples'],
        close: ['apel', 'eppel', 'aple'],
        distractors: {},
        curiosityQuestion: '🔒 חידת סקרנות: אם נזרוק תפוח לתוך קערת מים — הוא ישקע או יצוף? אמרו apple נכון כדי לגלות!',
        curiosityFact: '🍎💦 גיליתם את הסוד! תפוח תמיד צף במים כי רבע מהתפוח עשוי מבועות אוויר קטנטנות! מילת בונוס: Float (פְלוֹט - לצוף)!'
      }
    ],
    sentences: [
      {
        en: 'The ball is on the table',
        he: 'הכדור על השולחן',
        emoji: '⚽ ➡️ 🍽️',
        words: ['The', 'ball', 'is', 'on', 'the', 'table']
      },
      {
        en: 'I like green vegetables',
        he: 'אני אוהב ירקות ירוקים',
        emoji: '😋 🥦🥕',
        words: ['I', 'like', 'green', 'vegetables']
      },
      {
        en: 'I have good friends',
        he: 'יש לי חברים טובים',
        emoji: '👫💛🎉',
        words: ['I', 'have', 'good', 'friends']
      },
      {
        en: 'My teeth are white',
        he: 'השיניים שלי לבנות',
        emoji: '🦷✨😁',
        words: ['My', 'teeth', 'are', 'white']
      }
    ],
    bossTurns: [
      {
        qEn: 'What is on the table?',
        qHe: 'מה נמצא על השולחן?',
        options: [
          { en: 'Vegetables are on the table', he: 'ירקות נמצאים על השולחן', emoji: '🥦🍽️' },
          { en: 'The ball is on the table', he: 'הכדור נמצא על השולחן', emoji: '⚽🍽️' },
          { en: 'Cold water is on the table', he: 'מים קרים על השולחן', emoji: '💧🍽️' }
        ]
      },
      {
        qEn: 'What do we do after dinner?',
        qHe: 'מה אנחנו עושים אחרי ארוחת ערב?',
        options: [
          { en: 'I brush my teeth', he: 'אני מצחצח את השיניים שלי', emoji: '🪥🦷' },
          { en: 'I eat green vegetables', he: 'אני אוכל ירקות ירוקים', emoji: '🥦😋' },
          { en: 'I clean the big table', he: 'אני מנקה את השולחן הגדול', emoji: '🧽🍽️' }
        ]
      },
      {
        qEn: 'Who do you play with?',
        qHe: 'עם מי אתה משחק?',
        options: [
          { en: 'I play ball with my friends', he: 'אני משחק כדור עם החברים שלי', emoji: '⚽👫' },
          { en: 'My friends are very happy', he: 'החברים שלי שמחים מאוד', emoji: '😄👫' },
          { en: 'I share an apple with friends', he: 'אני חולק תפוח עם חברים', emoji: '🍎👫' }
        ]
      }
    ]
  }
};

// Common phonetic substitutions for Israeli learners
const CLOSE_PHONETIC_MAP = {
  the: ['de', 'ze', 'da'],
  three: ['free', 'thre', 'sri', 'tri'],
  teeth: ['teef', 'teth', 'teet', 'tith'],
  vegetables: ['vegtables', 'vegtable', 'vegetebles'],
  table: ['taibel', 'tabel', 'teble'],
  friends: ['frends', 'frands', 'frend', 'freinds'],
  ball: ['bol', 'bowl', 'bal'],
  water: ['woter', 'wata', 'wader'],
  happy: ['hapi', 'hepi', 'hapy'],
  apple: ['apel', 'eppel', 'aple'],
  yellow: ['yelow', 'yello'],
  green: ['grin', 'gren'],
  white: ['wite', 'wait'],
  small: ['smol', 'smal'],
  hello: ['helo', 'halo']
};

const GLOBAL_DISTRACTOR_HINTS = {
  tree: 'אמרתם "tree" (עץ 🌳)! כדי לבטא TH נכון הוציאו קצה לשון בין השיניים!',
  banana: 'אמרתם "banana" (בננה 🍌) — זו מילה טעימה, אבל לא המילה שעל הכרטיסייה!',
  pizza: 'אמרתם "pizza" (פיצה 🍕) — קוסמו רעב, אבל נסו לקרוא את המילה באנגלית שעל המסך!'
};

const SHOP_ITEMS = [
  { id: 'shades', name: 'משקפי שמש', emoji: '😎', cost: 20, svgId: 'acc-shades' },
  { id: 'crown', name: 'כתר זהב', emoji: '👑', cost: 30, svgId: 'acc-crown' },
  { id: 'cape', name: 'גלימת גיבור', emoji: '🦸', cost: 35, svgId: 'acc-cape' },
  { id: 'wizard', name: 'כובע קוסם', emoji: '🎩', cost: 40, svgId: 'acc-wizard' }
];

const state = {
  grade: '4',
  screen: 'hub',
  coins: 25,
  stars: 0,
  mood: 75,
  mastered: new Set(),
  unlockedSecrets: new Set(),
  wordIdx: 0,
  phraseMode: false,
  sentenceIdx: 0,
  builtWords: [],
  bankWords: [],
  bossIdx: 0,
  bossChoice: 0,
  ownedItems: new Set(),
  equippedItems: new Set(),
  daily: { echo: false, sentence: false, feed: false },
  lastAudioUrl: null
};

function currentGrade() {
  return GRADE_DATA[state.grade];
}

// Web Audio API Synthesizer
let audioCtx = null;
function playTone(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const notes = {
      pop: [[520, 0.08]],
      coin: [[880, 0.09], [1175, 0.14]],
      success: [[523, 0.1], [659, 0.1], [784, 0.18]],
      fanfare: [[523, 0.1], [659, 0.1], [784, 0.1], [1046, 0.25]],
      retry: [[392, 0.12], [349, 0.18]],
      wrong: [[260, 0.14], [196, 0.22]]
    }[type] || [[440, 0.1]];

    let offset = 0;
    notes.forEach(([freq, dur]) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type === 'wrong' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + offset);
      gain.gain.setValueAtTime(0.16, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + dur);
      offset += dur * 0.9;
    });
  } catch (_) {}
}

// Speech Synthesis (TTS)
function speakEnglish(text, rate = 0.92) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  u.pitch = 1.08;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && /Samantha|Google|Natural|Zira/i.test(v.name))
    || voices.find(v => v.lang.startsWith('en'));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

// Levenshtein edit distance for phonetic near-miss detection
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length];
}

// Strict Word-Boundary + Levenshtein Phonetic Speech Examination Engine
function evaluateSpeech(targetText, spokenRaw, wordObj = null) {
  const clean = s => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const targetWords = clean(targetText).split(/\s+/).filter(Boolean);
  const spokenClean = clean(spokenRaw);
  const spokenWords = spokenClean.split(/\s+/).filter(Boolean);

  if (!spokenWords.length || !targetWords.length) {
    return {
      accuracy: 0,
      stars: 0,
      coins: 0,
      results: targetWords.map(w => ({ word: w, status: 'miss', score: 0 })),
      spoken: spokenRaw || '(שקט)',
      diagnostic: 'לא נשמעה מילה ברורה במיקרופון. נסו לדבר קרוב יותר או להקשיב לקוסמו קודם!'
    };
  }

  let totalScore = 0;
  const results = targetWords.map(tw => {
    const isFocusWord = wordObj && clean(wordObj.en) === tw;
    const exactList = [tw, ...(isFocusWord && wordObj.accept ? wordObj.accept.map(clean) : [])];
    const closeList = [
      ...(CLOSE_PHONETIC_MAP[tw] || []),
      ...(isFocusWord && wordObj.close ? wordObj.close.map(clean) : [])
    ];

    // Check known distractors first so they are never accidentally marked 'close'
    const isKnownDistractor = isFocusWord && wordObj.distractors &&
      spokenWords.some(sw => Object.prototype.hasOwnProperty.call(wordObj.distractors, sw));

    const isExact = spokenWords.some(sw => exactList.includes(sw));
    if (isExact) {
      totalScore += 1.0;
      return { word: tw, status: 'exact', score: 1.0 };
    }

    if (!isKnownDistractor) {
      const isClose = spokenWords.some(sw =>
        closeList.includes(sw) ||
        (tw.length >= 4 && sw.length >= 3 && levenshtein(tw, sw) === 1)
      );
      if (isClose) {
        totalScore += 0.65;
        return { word: tw, status: 'close', score: 0.65 };
      }
    }

    return { word: tw, status: 'miss', score: 0.0 };
  });

  const accuracy = Math.round((totalScore / targetWords.length) * 100);
  let stars = 0;
  let coins = 0;
  if (accuracy >= 85) {
    stars = 3;
    coins = 15;
  } else if (accuracy >= 55) {
    stars = 2;
    coins = 8;
  } else if (accuracy >= 25) {
    stars = 1;
    coins = 0;
  } else {
    stars = 0;
    coins = 0;
  }

  // Build specific diagnostic coaching if needed
  let diagnostic = '';
  if (wordObj && wordObj.distractors) {
    for (const sw of spokenWords) {
      if (wordObj.distractors[sw]) {
        diagnostic = wordObj.distractors[sw];
        break;
      }
    }
  }
  if (!diagnostic) {
    for (const sw of spokenWords) {
      if (GLOBAL_DISTRACTOR_HINTS[sw] && !targetWords.includes(sw)) {
        diagnostic = GLOBAL_DISTRACTOR_HINTS[sw];
        break;
      }
    }
  }
  if (!diagnostic && stars < 3) {
    const missed = results.filter(r => r.status !== 'exact').map(r => r.word);
    if (wordObj && wordObj.tip && stars <= 2) {
      diagnostic = `💡 טיפ לשיפור: ${wordObj.tip}`;
    } else if (missed.length) {
      diagnostic = `💡 שימו לב להגייה של: "${missed.join(', ')}" — לחצו על 🐢 מהירות צב והקשיבו שוב!`;
    }
  }

  return { accuracy, stars, coins, results, spoken: spokenRaw, diagnostic };
}

// Optional Self-Voice Recorder (MediaRecorder) + Web Speech Recognition
let activeMediaRecorder = null;
let activeStream = null;

async function startSelfRecording() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
    return;
  }
  try {
    activeStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    activeMediaRecorder = new MediaRecorder(activeStream);
    activeMediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    activeMediaRecorder.onstop = () => {
      if (chunks.length) {
        if (state.lastAudioUrl) URL.revokeObjectURL(state.lastAudioUrl);
        const blob = new Blob(chunks, { type: activeMediaRecorder.mimeType || 'audio/webm' });
        state.lastAudioUrl = URL.createObjectURL(blob);
      }
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
        activeStream = null;
      }
    };
    activeMediaRecorder.start();
  } catch (_) {
    // Graceful fallback if mic recording permission denied
  }
}

function stopSelfRecording() {
  try {
    if (activeMediaRecorder && activeMediaRecorder.state !== 'inactive') {
      activeMediaRecorder.stop();
    }
  } catch (_) {}
}

window.playSelfRecording = function(fallbackSpokenText) {
  if (state.lastAudioUrl) {
    const audio = new Audio(state.lastAudioUrl);
    audio.play();
  } else if (fallbackSpokenText) {
    speakEnglish(fallbackSpokenText, 0.85);
  }
};

function listenOnce(onResult, onStatus) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    onStatus('הדפדפן לא תומך במיקרופון ישיר — השתמשו ב"מעבדת בדיקת דיבור" למטה 🧪');
    return;
  }
  startSelfRecording();
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  onStatus('listening');
  rec.onresult = e => {
    const topTranscript = e.results[0][0].transcript;
    stopSelfRecording();
    setTimeout(() => onResult(topTranscript), 120);
  };
  rec.onerror = () => {
    stopSelfRecording();
    onStatus('לא שמענו חזק מספיק 😊 נסו שוב או בדקו ב"מעבדת בדיקת דיבור" 🧪');
  };
  rec.onend = () => {
    stopSelfRecording();
    onStatus('idle');
  };
  rec.start();
}

function setCosmoSay(text) {
  const el = document.getElementById('cosmo-bubble');
  if (el) el.textContent = text;
}

function applyEvaluationRewards(res, taskKey, wordObj = null) {
  if (res.stars >= 2) {
    state.coins += res.coins;
    state.stars += res.stars;
    state.mood = Math.min(100, state.mood + (res.stars === 3 ? 6 : 3));
    if (wordObj) {
      state.unlockedSecrets.add(wordObj.id);
      if (res.stars === 3) {
        state.mastered.add(wordObj.id);
      }
    }
    if (taskKey && !state.daily[taskKey]) {
      state.daily[taskKey] = true;
      state.coins += 10;
    }
    playTone(res.stars === 3 ? 'success' : 'coin');
  } else if (res.stars === 1) {
    playTone('retry');
  } else {
    playTone('wrong');
  }
  updateHeaderAndCosmo();
}

function renderFeedbackCard(res, targetText) {
  const pillsHtml = res.results.map(r => {
    const cls = r.status === 'exact' ? 'word-ok' : r.status === 'close' ? 'word-close' : 'word-miss';
    const icon = r.status === 'exact' ? '✓' : r.status === 'close' ? '~' : '✗';
    return `<span class="word-pill ltr ${cls}">${r.word} ${icon}</span>`;
  }).join('');

  const safeSpoken = String(res.spoken || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const selfPlayBtn = `
    <button class="btn btn-soft btn-sm" style="margin-top:0.45rem" onclick="playSelfRecording('${safeSpoken}')">
      🔁 הקשיבו להקלטה שלכם (${state.lastAudioUrl ? 'קולכם האמיתי 🎙️' : 'הדמיה 🔊'})
    </button>
  `;

  if (res.stars === 3) {
    return `
      <div class="feedback-box feedback-3">
        <div style="font-size:1.25rem;font-weight:900">⭐⭐⭐ מושלם! דיוק: ${res.accuracy}% (+${res.coins} 🪙)</div>
        <div style="margin-top:0.3rem">${pillsHtml}</div>
        <div style="font-size:0.86rem;margin-top:0.35rem">🎧 קוסמו שמע: <strong class="ltr">"${res.spoken}"</strong></div>
        ${selfPlayBtn}
      </div>
    `;
  }

  if (res.stars === 2) {
    return `
      <div class="feedback-box feedback-2">
        <div style="font-size:1.2rem;font-weight:900">⭐⭐ כמעט מושלם! דיוק: ${res.accuracy}% (+${res.coins} 🪙)</div>
        <div style="margin-top:0.3rem">${pillsHtml}</div>
        <div style="font-size:0.86rem;margin-top:0.35rem">🎧 קוסמו שמע: <strong class="ltr">"${res.spoken}"</strong> | 🎯 המטרה: <strong class="ltr">"${targetText}"</strong></div>
        ${res.diagnostic ? `<div style="margin-top:0.35rem;font-weight:700">${res.diagnostic}</div>` : ''}
        ${selfPlayBtn}
      </div>
    `;
  }

  if (res.stars === 1) {
    return `
      <div class="feedback-box feedback-1">
        <div style="font-size:1.18rem;font-weight:900">⭐ בכיוון הנכון — נסו שוב! (דיוק: ${res.accuracy}% | +0 🪙)</div>
        <div style="margin-top:0.3rem">${pillsHtml}</div>
        <div style="font-size:0.86rem;margin-top:0.35rem">🎧 קוסמו שמע: <strong class="ltr">"${res.spoken}"</strong> | 🎯 המטרה: <strong class="ltr">"${targetText}"</strong></div>
        ${res.diagnostic ? `<div style="margin-top:0.35rem;font-weight:700">${res.diagnostic}</div>` : ''}
        ${selfPlayBtn}
      </div>
    `;
  }

  return `
    <div class="feedback-box feedback-0">
      <div style="font-size:1.18rem;font-weight:900">❌ לא המילה הנכונה — 0 נקודות (+0 🪙)</div>
      <div style="margin-top:0.3rem">${pillsHtml}</div>
      <div style="font-size:0.9rem;margin-top:0.4rem">
        🎧 קוסמו שמע: <strong class="ltr">"${res.spoken}"</strong> &nbsp;|&nbsp; 🎯 המטרה: <strong class="ltr">"${targetText}"</strong>
      </div>
      ${res.diagnostic ? `<div style="margin-top:0.4rem;font-weight:800;background:#fee2e2;padding:0.45rem 0.7rem;border-radius:10px">${res.diagnostic}</div>` : ''}
      ${selfPlayBtn}
    </div>
  `;
}

function updateHeaderAndCosmo() {
  const gWords = currentGrade().words;
  const gradeMasteredCount = gWords.filter(w => state.mastered.has(w.id)).length;
  const gradeSecretsCount = gWords.filter(w => state.unlockedSecrets.has(w.id)).length;

  document.getElementById('stat-coins').textContent = state.coins;
  document.getElementById('stat-stars').textContent = state.stars;
  document.getElementById('stat-mastered').textContent = `${gradeMasteredCount}/${gWords.length}`;
  const secretsEl = document.getElementById('stat-secrets');
  if (secretsEl) secretsEl.textContent = `${gradeSecretsCount}/${gWords.length}`;
  document.getElementById('mood-fill').style.width = `${state.mood}%`;

  const tasks = [
    ['daily-echo', state.daily.echo, '🎤 אמרו מילה נכון בקול'],
    ['daily-sentence', state.daily.sentence, '🧩 בנו וקראו משפט נכון'],
    ['daily-feed', state.daily.feed, '🥦 האכילו את קוסמו ירקות']
  ];
  tasks.forEach(([id, done, label]) => {
    const li = document.getElementById(id);
    if (li) {
      li.className = `daily-item ${done ? 'done' : ''}`;
      li.innerHTML = `<span>${label}</span><span>${done ? '✅ בוצע!' : '+10 🪙'}</span>`;
    }
  });

  SHOP_ITEMS.forEach(item => {
    const svgEl = document.getElementById(item.svgId);
    if (svgEl) svgEl.classList.toggle('hidden', !state.equippedItems.has(item.id));
  });
}

// Switch between Grade 2 and Grade 4
function switchGrade(newGrade) {
  if (!GRADE_DATA[newGrade]) return;
  state.grade = newGrade;
  state.wordIdx = 0;
  state.sentenceIdx = 0;
  state.bossIdx = 0;
  state.bossChoice = 0;
  playTone('fanfare');

  document.querySelectorAll('.grade-pill[data-grade]').forEach(btn => {
    const isCurrent = btn.dataset.grade === newGrade;
    btn.classList.toggle('active', isCurrent);
    if (isCurrent) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  const hubTitle = document.getElementById('hub-title');
  if (hubTitle) {
    hubTitle.textContent = `🏝️ ברוכים הבאים לאי הדיבור — ${currentGrade().title}! (${currentGrade().subtitle})`;
  }
  setCosmoSay(`עברנו אל ${currentGrade().title}! בואו נגלה את המילים והסודות החדשים! 🚀`);
  updateHeaderAndCosmo();
  switchScreen(state.screen);
}

// Navigation between screens
function switchScreen(screenName) {
  state.screen = screenName;
  playTone('pop');
  document.querySelectorAll('.screen-pane').forEach(p => p.classList.add('hidden'));
  document.getElementById(`screen-${screenName}`).classList.remove('hidden');
  document.querySelectorAll('.nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === screenName);
  });

  if (screenName === 'hub') renderHub();
  if (screenName === 'echo') renderEcho();
  if (screenName === 'builder') initBuilder(state.sentenceIdx);
  if (screenName === 'boss') renderBoss();
}

function renderHub() {
  const g = currentGrade();
  const hubTitle = document.getElementById('hub-title');
  if (hubTitle) {
    hubTitle.textContent = `🏝️ ברוכים הבאים לאי הדיבור — ${g.title}!`;
  }
  const grid = document.getElementById('hub-words-grid');
  grid.innerHTML = g.words.map((w, i) => `
    <div class="word-mini ${state.mastered.has(w.id) ? 'mastered' : ''}" onclick="openWordInEcho(${i})">
      <div style="font-size:1.8rem">${w.emoji}</div>
      <div class="ltr" style="font-weight:900;color:#5b21b6;font-size:1.1rem">${w.en}</div>
      <div style="font-size:0.85rem;color:#475569">${w.he}</div>
      <div style="font-size:0.78rem;color:#6d28d9;font-weight:700">${w.phonetic}</div>
      <div style="font-size:0.74rem;margin-top:0.2rem">${state.unlockedSecrets.has(w.id) ? '🔮 סוד נפתח!' : '🥚 סוד נעול'}</div>
    </div>
  `).join('');
}

window.openWordInEcho = function(idx) {
  state.wordIdx = idx;
  switchScreen('echo');
};

// Screen 1: Echo Magic + Curiosity Mystery Box
function renderCuriosityBox(w) {
  const box = document.getElementById('echo-curiosity-box');
  if (!box) return;
  const unlocked = state.unlockedSecrets.has(w.id);
  box.className = `curiosity-box ${unlocked ? 'curiosity-unlocked' : 'curiosity-locked'}`;
  if (unlocked) {
    box.innerHTML = `
      <div style="font-weight:900;font-size:1rem;margin-bottom:0.25rem">🥚✨ תיבת הסודות והסקרנות של קוסמו — הסוד נפתח!</div>
      <div style="font-size:0.93rem;font-weight:700">${w.curiosityFact}</div>
    `;
  } else {
    box.innerHTML = `
      <div style="font-weight:900;font-size:0.98rem;margin-bottom:0.25rem">🥚 תיבת הסודות והסקרנות של קוסמו</div>
      <div style="font-size:0.9rem">${w.curiosityQuestion}</div>
    `;
  }
}

function renderEcho() {
  const words = currentGrade().words;
  const w = words[state.wordIdx];
  const targetEn = state.phraseMode ? w.phrase : w.en;
  const targetHe = state.phraseMode ? w.phraseHe : w.he;

  document.getElementById('echo-counter').textContent = `${currentGrade().title} — מילה ${state.wordIdx + 1} מתוך ${words.length}`;
  document.getElementById('echo-emoji').textContent = w.emoji;
  document.getElementById('echo-en').textContent = targetEn;
  document.getElementById('echo-he').textContent = targetHe;
  document.getElementById('echo-phonetic').textContent = w.phonetic;
  document.getElementById('echo-tip').textContent = `💡 טיפ הגייה: ${w.tip}`;
  document.getElementById('echo-feedback').innerHTML = '';
  document.getElementById('mode-word-btn').classList.toggle('active', !state.phraseMode);
  document.getElementById('mode-phrase-btn').classList.toggle('active', state.phraseMode);
  renderCuriosityBox(w);
}

function handleEchoResult(spokenText) {
  const words = currentGrade().words;
  const w = words[state.wordIdx];
  const targetEn = state.phraseMode ? w.phrase : w.en;
  const res = evaluateSpeech(targetEn, spokenText, w);

  applyEvaluationRewards(res, 'echo', w);
  document.getElementById('echo-feedback').innerHTML = renderFeedbackCard(res, targetEn);
  renderCuriosityBox(w);

  if (res.stars === 3) {
    setCosmoSay(`מושלם! אמרתם "${targetEn}" בדיוק של ${res.accuracy}% ופתחתם את סוד הסקרנות! 🌟`);
  } else if (res.stars === 2) {
    setCosmoSay(`כמעט מושלם! קיבלתם 2 כוכבים ופתחתם את תיבת הסקרנות! נסו שוב ל-3 כוכבים! ✨`);
  } else if (res.stars === 1) {
    setCosmoSay(`אתם בכיוון הנכון! הקשיבו למילה במהירות צב 🐢 ונסו שוב כדי לזכות במטבעות!`);
  } else {
    setCosmoSay(`אופס! שמעתי "${spokenText}" במקום "${targetEn}". 0 נקודות — בדקו את הטיפ ונסו שוב! 💪`);
  }
}

// Screen 2: Sentence Builder
function initBuilder(idx) {
  const sentences = currentGrade().sentences;
  state.sentenceIdx = (idx + sentences.length) % sentences.length;
  const s = sentences[state.sentenceIdx];
  state.builtWords = [];
  state.bankWords = [...s.words].sort(() => Math.random() - 0.5);
  document.getElementById('builder-feedback').innerHTML = '';
  renderBuilderUI();
}

function renderBuilderUI() {
  const sentences = currentGrade().sentences;
  const s = sentences[state.sentenceIdx];
  document.getElementById('builder-counter').textContent = `${currentGrade().title} — משפט ${state.sentenceIdx + 1} מתוך ${sentences.length}`;
  document.getElementById('builder-emoji').textContent = s.emoji;
  document.getElementById('builder-he').textContent = s.he;

  document.getElementById('sentence-slot').innerHTML = state.builtWords.length
    ? state.builtWords.map((w, i) => `<button class="word-tile ltr" onclick="unpickTile(${i})">${w}</button>`).join('')
    : '<span style="color:#64748b">לחצו על המילים למטה לפי הסדר הנכון...</span>';

  document.getElementById('tile-bank').innerHTML = state.bankWords
    .map((w, i) => `<button class="word-tile ltr" onclick="pickTile(${i})">${w}</button>`).join('');

  const isComplete = state.builtWords.join(' ').toLowerCase() === s.en.toLowerCase();
  document.getElementById('builder-speak-zone').classList.toggle('hidden', !isComplete);
  if (isComplete) {
    setCosmoSay('מעולה! הרכבתם את המשפט! עכשיו קראו אותו בקול רם 🎤');
  }
}

window.pickTile = function(i) {
  playTone('pop');
  state.builtWords.push(state.bankWords.splice(i, 1)[0]);
  renderBuilderUI();
};

window.unpickTile = function(i) {
  playTone('pop');
  state.bankWords.push(state.builtWords.splice(i, 1)[0]);
  renderBuilderUI();
};

function handleBuilderSpeech(spokenText) {
  const s = currentGrade().sentences[state.sentenceIdx];
  const res = evaluateSpeech(s.en, spokenText);
  applyEvaluationRewards(res, 'sentence');
  document.getElementById('builder-feedback').innerHTML = renderFeedbackCard(res, s.en);
  if (res.stars >= 2) {
    setCosmoSay(`כל הכבוד! קראתם את המשפט "${s.en}" בדיוק של ${res.accuracy}%! 🎉`);
  } else {
    setCosmoSay(`שמעתי רק חלק מהמשפט ("${spokenText}"). נסו לקרוא את כל המילים ברצף! 🎤`);
  }
}

// Screen 3: Boss Chat with Cosmo
function renderBoss() {
  const turns = currentGrade().bossTurns;
  const t = turns[state.bossIdx];
  document.getElementById('boss-step').textContent = `${currentGrade().title} — שאלה ${state.bossIdx + 1} מתוך ${turns.length}`;
  document.getElementById('boss-q-en').textContent = t.qEn;
  document.getElementById('boss-q-he').textContent = t.qHe;
  document.getElementById('boss-feedback').innerHTML = '';

  document.getElementById('boss-options').innerHTML = t.options.map((opt, i) => `
    <div class="zone-card ${state.bossChoice === i ? 'active' : ''}"
         style="border-color:${state.bossChoice === i ? '#f59e0b' : '#c4b5fd'}"
         onclick="selectBossOption(${i})">
      <div style="font-size:1.6rem">${opt.emoji}</div>
      <div class="ltr" style="font-weight:900;font-size:1.1rem;color:#4c1d95">${opt.en}</div>
      <div style="font-size:0.86rem;color:#475569">${opt.he}</div>
    </div>
  `).join('');
}

window.selectBossOption = function(i) {
  state.bossChoice = i;
  const opt = currentGrade().bossTurns[state.bossIdx].options[i];
  speakEnglish(opt.en, 0.9);
  renderBoss();
};

function handleBossSpeech(spokenText) {
  const opt = currentGrade().bossTurns[state.bossIdx].options[state.bossChoice];
  const res = evaluateSpeech(opt.en, spokenText);
  applyEvaluationRewards(res, 'sentence');
  if (res.stars === 3) playTone('fanfare');
  document.getElementById('boss-feedback').innerHTML = renderFeedbackCard(res, opt.en);
  if (res.stars >= 2) {
    setCosmoSay(`🏆 קוסמו ענה: "Awesome! הבנתי את התשובה שלכם מצוין!"`);
  } else {
    setCosmoSay(`🐶 קוסמו מטה אוזן: לא הצלחתי להבין את המשפט. נסו לומר "${opt.en}" שוב!`);
  }
}

// Feed Cosmo & Shop
function feedCosmoVegetables() {
  if (state.coins < 5) {
    setCosmoSay('אספו עוד כמה מטבעות בדברכם באנגלית ואז נאכל ירקות! 🥦');
    return;
  }
  state.coins -= 5;
  state.coins += 15;
  state.stars += 1;
  state.mood = Math.min(100, state.mood + 8);
  if (!state.daily.feed) {
    state.daily.feed = true;
    state.coins += 10;
  }
  playTone('success');
  updateHeaderAndCosmo();
  speakEnglish('Yummy green vegetables!', 0.95);
  setCosmoSay('יאמי! Green vegetables נותנים לי כוח-על! 🥦✨ (+10 מטבעות בונוס!)');
}

function renderShop() {
  const box = document.getElementById('shop-items-list');
  box.innerHTML = SHOP_ITEMS.map(item => {
    const owned = state.ownedItems.has(item.id);
    const equipped = state.equippedItems.has(item.id);
    return `
      <div class="daily-item" style="align-items:center;padding:0.65rem">
        <span><strong>${item.emoji} ${item.name}</strong> (${item.cost} 🪙)</span>
        <button class="btn ${equipped ? 'btn-green' : 'btn-amber'}" style="padding:0.35rem 0.75rem;font-size:0.85rem"
          onclick="toggleShopItem('${item.id}')">
          ${!owned ? `קנו (${item.cost} 🪙)` : equipped ? 'לבוש ✓' : 'לבשו'}
        </button>
      </div>
    `;
  }).join('');
}

window.toggleShopItem = function(itemId) {
  const item = SHOP_ITEMS.find(x => x.id === itemId);
  if (!state.ownedItems.has(itemId)) {
    if (state.coins < item.cost) {
      setCosmoSay(`חסרים עוד ${item.cost - state.coins} מטבעות עבור ${item.name}! 🪙`);
      return;
    }
    state.coins -= item.cost;
    state.ownedItems.add(itemId);
    state.equippedItems.add(itemId);
    playTone('coin');
  } else if (state.equippedItems.has(itemId)) {
    state.equippedItems.delete(itemId);
  } else {
    state.equippedItems.add(itemId);
  }
  updateHeaderAndCosmo();
  renderShop();
};

// Wire up events
window.addEventListener('DOMContentLoaded', () => {
  updateHeaderAndCosmo();
  renderHub();

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchScreen(btn.dataset.screen));
  });

  // Unlocked Grade pills (Grade 2 & Grade 4)
  document.querySelectorAll('.grade-pill[data-grade]').forEach(btn => {
    btn.addEventListener('click', () => switchGrade(btn.dataset.grade));
  });

  // Locked Grade pills (Grades 3, 5, 6)
  document.querySelectorAll('.grade-pill[data-locked="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('locked-grade-name').textContent = btn.textContent;
      document.getElementById('grade-dialog').showModal();
    });
  });

  // Echo controls
  document.getElementById('mode-word-btn').onclick = () => { state.phraseMode = false; renderEcho(); };
  document.getElementById('mode-phrase-btn').onclick = () => { state.phraseMode = true; renderEcho(); };
  document.getElementById('echo-prev').onclick = () => {
    const len = currentGrade().words.length;
    state.wordIdx = (state.wordIdx - 1 + len) % len;
    renderEcho();
  };
  document.getElementById('echo-next').onclick = () => {
    const len = currentGrade().words.length;
    state.wordIdx = (state.wordIdx + 1) % len;
    renderEcho();
  };
  document.getElementById('echo-listen').onclick = () => {
    const w = currentGrade().words[state.wordIdx];
    speakEnglish(state.phraseMode ? w.phrase : w.en, 0.92);
  };
  document.getElementById('echo-turtle').onclick = () => {
    const w = currentGrade().words[state.wordIdx];
    speakEnglish(state.phraseMode ? w.phrase : w.en, 0.58);
  };
  document.getElementById('echo-mic').onclick = () => {
    const wave = document.getElementById('echo-wave');
    listenOnce(
      txt => { wave.classList.add('hidden'); handleEchoResult(txt); },
      st => {
        wave.classList.toggle('hidden', st !== 'listening');
        if (st !== 'listening' && st !== 'idle') setCosmoSay(st);
      }
    );
  };

  // Echo Speech Lab (3 outcomes + free text input)
  document.getElementById('echo-sim-exact').onclick = () => {
    const w = currentGrade().words[state.wordIdx];
    const target = state.phraseMode ? w.phrase : w.en;
    speakEnglish(target, 0.95);
    handleEchoResult(target);
  };
  document.getElementById('echo-sim-partial').onclick = () => {
    const w = currentGrade().words[state.wordIdx];
    const closeSample = state.phraseMode
      ? w.phrase.split(' ')[0] + ' ' + ((w.close && w.close[0]) || w.en)
      : ((w.close && w.close[0]) || w.en.slice(0, -1));
    speakEnglish(closeSample, 0.88);
    handleEchoResult(closeSample);
  };
  document.getElementById('echo-sim-wrong').onclick = () => {
    const w = currentGrade().words[state.wordIdx];
    const wrongSample = (w.distractors && Object.keys(w.distractors)[0]) || 'tree banana';
    speakEnglish(wrongSample, 0.9);
    handleEchoResult(wrongSample);
  };
  document.getElementById('echo-custom-btn').onclick = () => {
    const inp = document.getElementById('echo-custom-input');
    const val = inp.value.trim() || 'banana';
    handleEchoResult(val);
  };
  document.getElementById('echo-custom-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('echo-custom-btn').click();
    }
  });

  // Builder controls
  document.getElementById('builder-listen').onclick = () => speakEnglish(currentGrade().sentences[state.sentenceIdx].en, 0.88);
  document.getElementById('builder-next').onclick = () => initBuilder(state.sentenceIdx + 1);
  document.getElementById('builder-mic').onclick = () => {
    listenOnce(txt => handleBuilderSpeech(txt), st => { if (st !== 'listening' && st !== 'idle') setCosmoSay(st); });
  };
  document.getElementById('builder-sim-exact').onclick = () => {
    const en = currentGrade().sentences[state.sentenceIdx].en;
    speakEnglish(en, 0.92);
    handleBuilderSpeech(en);
  };
  document.getElementById('builder-sim-partial').onclick = () => {
    const words = currentGrade().sentences[state.sentenceIdx].words;
    const partial = words.slice(0, Math.max(1, Math.ceil(words.length * 0.6))).join(' ');
    speakEnglish(partial, 0.9);
    handleBuilderSpeech(partial);
  };
  document.getElementById('builder-sim-wrong').onclick = () => {
    const wrong = 'banana pizza tree';
    speakEnglish(wrong, 0.9);
    handleBuilderSpeech(wrong);
  };

  // Boss controls
  document.getElementById('boss-listen-q').onclick = () => speakEnglish(currentGrade().bossTurns[state.bossIdx].qEn, 0.9);
  document.getElementById('boss-next').onclick = () => {
    const turns = currentGrade().bossTurns;
    state.bossIdx = (state.bossIdx + 1) % turns.length;
    state.bossChoice = 0;
    renderBoss();
  };
  document.getElementById('boss-mic').onclick = () => {
    listenOnce(txt => handleBossSpeech(txt), st => { if (st !== 'listening' && st !== 'idle') setCosmoSay(st); });
  };
  document.getElementById('boss-sim-exact').onclick = () => {
    const opt = currentGrade().bossTurns[state.bossIdx].options[state.bossChoice];
    speakEnglish(opt.en, 0.92);
    handleBossSpeech(opt.en);
  };
  document.getElementById('boss-sim-partial').onclick = () => {
    const opt = currentGrade().bossTurns[state.bossIdx].options[state.bossChoice];
    const words = opt.en.split(' ');
    const partial = words.slice(0, Math.max(1, Math.ceil(words.length * 0.65))).join(' ');
    speakEnglish(partial, 0.9);
    handleBossSpeech(partial);
  };
  document.getElementById('boss-sim-wrong').onclick = () => {
    const wrong = 'banana tree';
    speakEnglish(wrong, 0.9);
    handleBossSpeech(wrong);
  };

  // Feed & Shop
  document.getElementById('feed-veg-btn').onclick = feedCosmoVegetables;
  document.getElementById('open-shop-btn').onclick = () => {
    renderShop();
    document.getElementById('shop-dialog').showModal();
  };
});
