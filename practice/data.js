const DRAWERS = [
  {
    id: 'sandwich',
    title: '🥪 מגירה 1: הכנת הכריך והירקות',
    subtitle: '14 מילים · לחם, גבינה, ירקות והכנת ארוחה',
    words: [
      { id: 'bread', en: 'bread', he: 'לחם', emoji: '🍞', drawerId: 'sandwich', phonics: null, shortEn: 'I need bread', shortHe: 'אני צריך לחם', hintSound: 'מתחיל ב-br (בְּרֶד)', hintContext: 'שמים בו גבינה או ריבה כדי להכין כריך' },
      { id: 'sandwich', en: 'sandwich', he: 'כריך', emoji: '🥪', drawerId: 'sandwich', phonics: 'ch', shortEn: 'Make a sandwich', shortHe: 'להכין כריך', hintSound: 'מסתיים בצליל ch (צ׳) — סֶנְדְוִויץ׳', hintContext: 'שתי פרוסות לחם וביניהן גבינה או ירקות' },
      { id: 'cheese', en: 'cheese', he: 'גבינה', emoji: '🧀', drawerId: 'sandwich', phonics: 'ch', shortEn: 'I want cheese', shortHe: 'אני רוצה גבינה', hintSound: 'מתחיל בצליל ch (צ׳יז)', hintContext: 'צהובה וטעימה בתוך טוסט או כריך' },
      { id: 'chicken', en: 'chicken', he: 'עוף', emoji: '🍗', drawerId: 'sandwich', phonics: 'ch', shortEn: 'Eat hot chicken', shortHe: 'לאכול עוף חם', hintSound: 'מתחיל בצליל ch (צ׳יקֶן)', hintContext: 'אוכלים בארוחת צהריים עם אורז או תפוחי אדמה' },
      { id: 'meat', en: 'meat', he: 'בשר', emoji: '🥩', drawerId: 'sandwich', phonics: null, shortEn: 'Bread and meat', shortHe: 'לחם ובשר', hintSound: 'נשמע כמו מִיט (m-ea-t)', hintContext: 'המבורגר או סטייק עשויים ממנו' },
      { id: 'fish', en: 'fish', he: 'דג', emoji: '🐟', drawerId: 'sandwich', phonics: 'sh', shortEn: 'Eat fresh fish', shortHe: 'לאכול דג טרי', hintSound: 'מסתיים בצליל sh (שׁ) — פִישׁ', hintContext: 'שוחה בים ובמים' },
      { id: 'vegetables', en: 'vegetables', he: 'ירקות', emoji: '🥦', drawerId: 'sandwich', phonics: null, shortEn: 'Eat green vegetables', shortHe: 'לאכול ירקות ירוקים', hintSound: 'מתחיל ב-veg (וֶג׳-טְבֶלְז)', hintContext: 'מלפפון, עגבנייה, גזר ופלפל הם...' },
      { id: 'salad', en: 'salad', he: 'סלט', emoji: '🥗', drawerId: 'sandwich', phonics: null, shortEn: 'Make a salad', shortHe: 'להכין סלט', hintSound: 'נשמע כמעט כמו בעברית: סָלָד', hintContext: 'חותכים ירקות לקערה ומערבבים' },
      { id: 'carrot', en: 'carrot', he: 'גזר', emoji: '🥕', drawerId: 'sandwich', phonics: null, shortEn: 'One orange carrot', shortHe: 'גזר כתום אחד', hintSound: 'מתחיל ב-ca (קָארוֹט)', hintContext: 'ירק כתום וארוך שארנבים אוהבים' },
      { id: 'tomato', en: 'tomato', he: 'עגבנייה', emoji: '🍅', drawerId: 'sandwich', phonics: null, shortEn: 'A red tomato', shortHe: 'עגבנייה אדומה', hintSound: 'נשמע כמו טוֹמֵייטוֹ', hintContext: 'ירק אדום ועסיסי בסלט ומכינים ממנו קטשופ' },
      { id: 'onion', en: 'onion', he: 'בצל', emoji: '🧅', drawerId: 'sandwich', phonics: null, shortEn: 'Cut the onion', shortHe: 'לחתוך את הבצל', hintSound: 'מתחיל ב-o ונשמע אוֹנְיוֹן', hintContext: 'ירק עם קליפות שלפעמים גורם לדמעות כשחותכים אותו' },
      { id: 'peppers', en: 'peppers', he: 'פלפלים', emoji: '🫑', drawerId: 'sandwich', phonics: null, shortEn: 'Put peppers here', shortHe: 'שים פלפלים כאן', hintSound: 'מתחיל ב-p (פֶּפֶּרְז)', hintContext: 'ירקות בצבע אדום, צהוב או ירוק בסלט' },
      { id: 'spinach', en: 'spinach', he: 'תרד', emoji: '🥬', drawerId: 'sandwich', phonics: 'ch', shortEn: 'Green spinach salad', shortHe: 'סלט תרד ירוק', hintSound: 'מסתיים בצליל ch (סְפִּינָץ׳)', hintContext: 'עלים ירוקים ובריאים שנותנים המון כוח' },
      { id: 'make', en: 'make', he: 'להכין', emoji: '👨‍🍳', drawerId: 'sandwich', phonics: null, shortEn: 'Make lunch today', shortHe: 'להכין צהריים היום', hintSound: 'נשמע כמו מֵייק (m-a-k-e)', hintContext: 'פעולה במטבח: ___ a sandwich' }
    ]
  },
  {
    id: 'treats',
    title: '🍫 מגירה 2: פינוקים, שתייה ורעב',
    subtitle: '15 מילים · מתוקים, משקאות, רעב וצמא',
    words: [
      { id: 'food', en: 'food', he: 'אוכל', emoji: '🍲', drawerId: 'treats', phonics: null, shortEn: 'My favorite food', shortHe: 'האוכל האהוב עליי', hintSound: 'מתחיל ב-f עם oo ארוכה (פוּד)', hintContext: 'כל מה שאנחנו אוכלים כשאנחנו רעבים' },
      { id: 'fruit', en: 'fruit', he: 'פרי / פירות', emoji: '🍎', drawerId: 'treats', phonics: null, shortEn: 'Eat sweet fruit', shortHe: 'לאכול פרי מתוק', hintSound: 'מתחיל ב-fr (פְרוּט)', hintContext: 'תפוח, בננה ותות הם...' },
      { id: 'jam', en: 'jam', he: 'ריבה', emoji: '🍓', drawerId: 'treats', phonics: null, shortEn: 'Bread with jam', shortHe: 'לחם עם ריבה', hintSound: 'מילה קצרה: ג׳אם (j-a-m)', hintContext: 'ממרח מתוק מתותים שמורחים על לחם' },
      { id: 'chips', en: 'chips', he: 'צ׳יפס', emoji: '🍟', drawerId: 'treats', phonics: 'ch', shortEn: 'I want chips', shortHe: 'אני רוצה צ׳יפס', hintSound: 'מתחיל בצליל ch (צ׳יפְּס)', hintContext: 'חטיף תפוחי אדמה פריך שמכירים גם בעברית' },
      { id: 'chocolate', en: 'chocolate', he: 'שוקולד', emoji: '🍫', drawerId: 'treats', phonics: 'ch', shortEn: 'Sweet chocolate cookie', shortHe: 'עוגיית שוקולד מתוקה', hintSound: 'מתחיל בצליל ch (צ׳וֹקְלֶט)', hintContext: 'ממתק חום ומתוק בקוביות' },
      { id: 'cookie', en: 'cookie', he: 'עוגייה', emoji: '🍪', drawerId: 'treats', phonics: null, shortEn: 'Share a cookie', shortHe: 'לחלוק עוגייה', hintSound: 'מתחיל ב-c (קוּקִי)', hintContext: 'מאפה מתוק ופריך ליד תה או חלב' },
      { id: 'water', en: 'water', he: 'מים', emoji: '💧', drawerId: 'treats', phonics: null, shortEn: 'Drink cold water', shortHe: 'לשתות מים קרים', hintSound: 'מתחיל ב-w (ווֹטֶר)', hintContext: 'המשקה השקוף והבריא ביותר כשאנחנו צמאים' },
      { id: 'juice', en: 'juice', he: 'מיץ', emoji: '🧃', drawerId: 'treats', phonics: null, shortEn: 'I want juice', shortHe: 'אני רוצה מיץ', hintSound: 'מתחיל ב-j (ג׳וּס)', hintContext: 'משקה מתוק שסוחטים מתפוזים או תפוחים' },
      { id: 'milkshake', en: 'milkshake', he: 'מילקשייק', emoji: '🥤', drawerId: 'treats', phonics: 'sh', shortEn: 'Drink a milkshake', shortHe: 'לשתות מילקשייק', hintSound: 'יש באמצע sh (מִילְק-שֵׁייק)', hintContext: 'משקה קר ומתוק מחלב וגלידה' },
      { id: 'tea', en: 'tea', he: 'תה', emoji: '🍵', drawerId: 'treats', phonics: null, shortEn: 'Drink hot tea', shortHe: 'לשתות תה חם', hintSound: 'מתחיל ב-t (טִי)', hintContext: 'משקה חם בספל ששותים בחורף' },
      { id: 'coffee', en: 'coffee', he: 'קפה', emoji: '☕', drawerId: 'treats', phonics: null, shortEn: 'Coffee for mom', shortHe: 'קפה בשביל אמא', hintSound: 'נשמע כמעט כמו בעברית: קוֹפִי', hintContext: 'משקה חם שמבוגרים אוהבים לשתות בבוקר' },
      { id: 'hungry', en: 'hungry', he: 'רעב', emoji: '😋', drawerId: 'treats', phonics: null, shortEn: "I'm hungry today", shortHe: 'אני רעב היום', hintSound: 'מתחיל ב-h (הַאנְגְרִי)', hintContext: 'איך מרגישים בבטן כשרוצים לאכול אוכל' },
      { id: 'thirsty', en: 'thirsty', he: 'צמא', emoji: '🥵', drawerId: 'treats', phonics: 'th', shortEn: "I'm thirsty now", shortHe: 'אני צמא עכשיו', hintSound: 'מתחיל בצליל th עם הלשון בין השיניים 👅 (ת׳ירְסְטִי)', hintContext: 'איך מרגישים כשחם ורוצים לשתות מים' },
      { id: 'eat', en: 'eat', he: 'לאכול', emoji: '🍴', drawerId: 'treats', phonics: null, shortEn: 'We eat lunch', shortHe: 'אנחנו אוכלים צהריים', hintSound: 'מילה קצרה שנשמעת אִיט (e-a-t)', hintContext: 'מה עושים עם כריך, סלט או תפוח' },
      { id: 'drink', en: 'drink', he: 'לשתות', emoji: '🥤', drawerId: 'treats', phonics: null, shortEn: 'Drink your water', shortHe: 'שתה את המים שלך', hintSound: 'מתחיל ב-dr (דְרִינְק)', hintContext: 'מה עושים עם מים, מיץ או תה' }
    ]
  },
  {
    id: 'party',
    title: '🍽️ מגירה 3: ארוחות, מקומות והמסיבה',
    subtitle: '13 מילים · בוקר, צהריים, ערב, מטבח ומסיבה',
    words: [
      { id: 'breakfast', en: 'breakfast', he: 'ארוחת בוקר', emoji: '🍳', drawerId: 'party', phonics: null, shortEn: 'Eat your breakfast', shortHe: 'תאכל את ארוחת הבוקר שלך', hintSound: 'מתחיל ב-br (בְּרֶקְפָסְט)', hintContext: 'הארוחה הראשונה שאוכלים כשקמים בבוקר' },
      { id: 'lunch', en: 'lunch', he: 'ארוחת צהריים', emoji: '🥪', drawerId: 'party', phonics: 'ch', shortEn: 'We eat lunch', shortHe: 'אנחנו אוכלים ארוחת צהריים', hintSound: 'מסתיים בצליל ch (לַאנְץ׳)', hintContext: 'הארוחה שאוכלים בצהריים אחרי בית הספר' },
      { id: 'dinner', en: 'dinner', he: 'ארוחת ערב', emoji: '🍝', drawerId: 'party', phonics: null, shortEn: 'Come for dinner', shortHe: 'בואו לארוחת ערב', hintSound: 'מתחיל ב-d (דִינֶר)', hintContext: 'הארוחה שאוכלים בערב עם המשפחה' },
      { id: 'kitchen', en: 'kitchen', he: 'מטבח', emoji: '🍳', drawerId: 'party', phonics: 'ch', shortEn: 'In the kitchen', shortHe: 'בתוך המטבח', hintSound: 'באמצע יש צליל ch (קִיצ׳-אֶן)', hintContext: 'החדר בבית שבו מבשלים ומכינים סלט וכריכים' },
      { id: 'restaurant', en: 'restaurant', he: 'מסעדה', emoji: '🍽️', drawerId: 'party', phonics: null, shortEn: 'At the restaurant', shortHe: 'במסעדה', hintSound: 'מתחיל ב-rest (רֶסְטוֹרַנְט)', hintContext: 'מקום עם מלצרים ותפריט שיוצאים לאכול בו' },
      { id: 'table', en: 'table', he: 'שולחן', emoji: '🪑', drawerId: 'party', phonics: null, shortEn: 'On the table', shortHe: 'על השולחן', hintSound: 'מתחיל ב-t (טֵייבֶּל)', hintContext: 'שמים עליו צלחות וכוסות כשאוכלים' },
      { id: 'shop', en: 'shop', he: 'חנות', emoji: '🏪', drawerId: 'party', phonics: 'sh', shortEn: 'At the shop', shortHe: 'בחנות', hintSound: 'מתחיל בצליל sh (שׁוֹפּ)', hintContext: 'מקום שבו קונים אוכל ומוצרים' },
      { id: 'party', en: 'party', he: 'מסיבה', emoji: '🎉', drawerId: 'party', phonics: null, shortEn: 'The sandwich party', shortHe: 'מסיבת הכריכים', hintSound: 'מתחיל ב-p (פָּארְטִי)', hintContext: 'חגיגה עם חברים, מוזיקה וכיבוד' },
      { id: 'birthday', en: 'birthday', he: 'יום הולדת', emoji: '🎂', drawerId: 'party', phonics: 'th', shortEn: 'My birthday party', shortHe: 'מסיבת יום ההולדת שלי', hintSound: 'באמצע יש th עם לשון בין השיניים 👅 + day (בֶּירְת׳-דֵיי)', hintContext: 'חוגגים פעם בשנה עם עוגה ונרות' },
      { id: 'children', en: 'children', he: 'ילדים', emoji: '👧👦', drawerId: 'party', phonics: 'ch', shortEn: 'The children eat', shortHe: 'הילדים אוכלים', hintSound: 'מתחיל בצליל ch (צ׳ילְדְרֶן)', hintContext: 'תלמידים ותלמידות בכיתה או במסיבה' },
      { id: 'we', en: 'we', he: 'אנחנו', emoji: '👫', drawerId: 'party', phonics: null, shortEn: 'We need food', shortHe: 'אנחנו צריכים אוכל', hintSound: 'מילה קצרה בת שתי אותיות: וִוי (w-e)', hintContext: 'אני והחברים שלי יחד = ___' },
      { id: 'favorite', en: 'favorite', he: 'אהוב / מועדף', emoji: '⭐', drawerId: 'party', phonics: null, shortEn: 'My favorite food', shortHe: 'האוכל האהוב עליי', hintSound: 'מתחיל ב-fav (פֵייבְרִיט)', hintContext: 'הדבר שאני הכי אוהב מכולם' },
      { id: 'for', en: 'for', he: 'בשביל / ל-', emoji: '🎁', drawerId: 'party', phonics: null, shortEn: 'Food for children', shortHe: 'אוכל בשביל ילדים', hintSound: 'נשמע כמו המספר 4 (פוֹר)', hintContext: 'מילת קישור קצרה: מתנה ___ אמא' }
    ]
  },
  {
    id: 'days',
    title: '📅 מגירה 4: ימות השבוע וזמן',
    subtitle: '14 מילים · 7 ימים (באות גדולה!) + אתמול, היום, מחר',
    words: [
      { id: 'Sunday', en: 'Sunday', he: 'יום ראשון', emoji: '1️⃣', drawerId: 'days', phonics: null, shortEn: 'Today is Sunday', shortHe: 'היום יום ראשון', hintSound: 'מתחיל ב-Sun (שמש) ואות גדולה S', hintContext: 'היום הראשון בשבוע (1)' },
      { id: 'Monday', en: 'Monday', he: 'יום שני', emoji: '2️⃣', drawerId: 'days', phonics: null, shortEn: 'Tomorrow is Monday', shortHe: 'מחר יום שני', hintSound: 'מתחיל ב-M גדולה (מַאנְדֵיי)', hintContext: 'היום שאחרי יום ראשון (2)' },
      { id: 'Tuesday', en: 'Tuesday', he: 'יום שלישי', emoji: '3️⃣', drawerId: 'days', phonics: null, shortEn: 'Today is Tuesday', shortHe: 'היום יום שלישי', hintSound: 'מתחיל ב-Tu (טְיוּזְדֵיי) — לא להתבלבל עם Thursday!', hintContext: 'היום השלישי בשבוע (3), פעמיים כי טוב' },
      { id: 'Wednesday', en: 'Wednesday', he: 'יום רביעי', emoji: '4️⃣', drawerId: 'days', phonics: null, shortEn: 'Today is Wednesday', shortHe: 'היום יום רביעי', hintSound: 'מתחיל ב-W גדולה (וֶונְזְדֵיי — האות d שקטה!)', hintContext: 'אמצע השבוע, היום הרביעי (4)' },
      { id: 'Thursday', en: 'Thursday', he: 'יום חמישי', emoji: '5️⃣', drawerId: 'days', phonics: 'th', shortEn: 'Today is Thursday', shortHe: 'היום יום חמישי', hintSound: 'מתחיל בצליל Th 👅 (ת׳רְזְדֵיי)', hintContext: 'היום החמישי בשבוע (5), לפני שישי' },
      { id: 'Friday', en: 'Friday', he: 'יום שישי', emoji: '6️⃣', drawerId: 'days', phonics: null, shortEn: 'Tomorrow is Friday', shortHe: 'מחר יום שישי', hintSound: 'מתחיל ב-Fr גדולה (פְרַיידֵיי)', hintContext: 'היום השישי בשבוע (6), ערב שבת' },
      { id: 'Saturday', en: 'Saturday', he: 'יום שבת', emoji: '7️⃣', drawerId: 'days', phonics: null, shortEn: 'Yesterday was Saturday', shortHe: 'אתמול היה יום שבת', hintSound: 'מתחיל ב-Sat (סָאטֶרְדֵיי)', hintContext: 'היום השביעי בשבוע (7), יום מנוחה' },
      { id: 'day', en: 'day', he: 'יום', emoji: '☀️', drawerId: 'days', phonics: null, shortEn: 'A happy day', shortHe: 'יום שמח', hintSound: 'מילה קצרה שמסתיימת ב-ay (דֵיי)', hintContext: 'מופיעה בסוף השם של כל אחד מימות השבוע!' },
      { id: 'week', en: 'week', he: 'שבוע', emoji: '🗓️', drawerId: 'days', phonics: null, shortEn: 'Days of week', shortHe: 'ימות השבוע', hintSound: 'מתחיל ב-w עם ee ארוכה (וִויק)', hintContext: 'יש בו 7 ימים מיום ראשון עד שבת' },
      { id: 'yesterday', en: 'yesterday', he: 'אתמול', emoji: '⬅️', drawerId: 'days', phonics: null, shortEn: 'Yesterday was Saturday', shortHe: 'אתמול היה יום שבת', hintSound: 'מתחיל ב-yes (יֶסְטֶרְדֵיי)', hintContext: 'היום שכבר עבר לפני היום (was)' },
      { id: 'today', en: 'today', he: 'היום', emoji: '⬇️', drawerId: 'days', phonics: null, shortEn: 'Today is Sunday', shortHe: 'היום יום ראשון', hintSound: 'to + day (טוּדֵיי)', hintContext: 'היום שאנחנו נמצאים בו עכשיו (is)' },
      { id: 'tomorrow', en: 'tomorrow', he: 'מחר', emoji: '➡️', drawerId: 'days', phonics: null, shortEn: 'Tomorrow will be', shortHe: 'מחר יהיה', hintSound: 'מתחיל ב-to (טוּמוֹרוֹ)', hintContext: 'היום שיגיע אחרי היום (will be)' },
      { id: 'time', en: 'time', he: 'זמן / שעה', emoji: '⏰', drawerId: 'days', phonics: null, shortEn: 'What time is', shortHe: 'מה השעה', hintSound: 'מתחיל ב-t (טַיים)', hintContext: 'שואלים עליו כשמסתכלים בשעון: What ___ is it?' },
      { id: 'letter', en: 'letter', he: 'אות', emoji: '🔤', drawerId: 'days', phonics: null, shortEn: 'Big capital letter', shortHe: 'אות גדולה', hintSound: 'מתחיל ב-l (לֶטֶר)', hintContext: 'A, B, C הן כולן... (capital ___)' }
    ]
  },
  {
    id: 'numbers',
    title: '🔢 מגירה 5: מספרים 11–20',
    subtitle: '10 מילים · המספרים מאחת-עשרה עד עשרים',
    words: [
      { id: 'eleven', en: 'eleven', he: '11 (אחת-עשרה)', emoji: '🕚', drawerId: 'numbers', phonics: null, shortEn: 'It is eleven', shortHe: 'השעה אחת-עשרה', hintSound: 'מתחיל ב-e (אִילֶבֶן)', hintContext: 'המספר שמגיע מיד אחרי 10' },
      { id: 'twelve', en: 'twelve', he: '12 (שתים-עשרה)', emoji: '🕛', drawerId: 'numbers', phonics: null, shortEn: 'It is twelve', shortHe: 'השעה שתים-עשרה', hintSound: 'מתחיל ב-tw כמו two (טְוֶולְב)', hintContext: '10 + 2 = ___' },
      { id: 'thirteen', en: 'thirteen', he: '13 (שלוש-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: 'th', shortEn: 'Thirteen green carrots', shortHe: 'שלושה-עשר גזרים ירוקים', hintSound: 'מתחיל בצליל th 👅 כמו three + teen (ת׳ירְטִין)', hintContext: '10 + 3 = ___' },
      { id: 'fourteen', en: 'fourteen', he: '14 (ארבע-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Fourteen red tomatoes', shortHe: 'ארבע-עשרה עגבניות אדומות', hintSound: 'four (4) + teen', hintContext: '10 + 4 = ___' },
      { id: 'fifteen', en: 'fifteen', he: '15 (חמש-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Fifteen big cookies', shortHe: 'חמש-עשרה עוגיות גדולות', hintSound: 'fif (מ-five) + teen (פִיפְטִין)', hintContext: '10 + 5 = ___' },
      { id: 'sixteen', en: 'sixteen', he: '16 (שש-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Sixteen children come', shortHe: 'שישה-עשר ילדים באים', hintSound: 'six (6) + teen', hintContext: '10 + 6 = ___' },
      { id: 'seventeen', en: 'seventeen', he: '17 (שבע-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Seventeen sweet fruits', shortHe: 'שבעה-עשר פירות מתוקים', hintSound: 'seven (7) + teen', hintContext: '10 + 7 = ___' },
      { id: 'eighteen', en: 'eighteen', he: '18 (שמונה-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Eighteen cups water', shortHe: 'שמונה-עשרה כוסות מים', hintSound: 'eight (8) + teen', hintContext: '10 + 8 = ___' },
      { id: 'nineteen', en: 'nineteen', he: '19 (תשע-עשרה)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Nineteen small chips', shortHe: 'תשעה-עשר צ׳יפסים קטנים', hintSound: 'nine (9) + teen', hintContext: '10 + 9 = ___' },
      { id: 'twenty', en: 'twenty', he: '20 (עשרים)', emoji: '🔢', drawerId: 'numbers', phonics: null, shortEn: 'Twenty sandwiches here', shortHe: 'עשרים כריכים כאן', hintSound: 'מתחיל ב-tw ומסתיים ב-ty (טְוֶונְטִי)', hintContext: '10 + 10 = ___' }
    ]
  },
  {
    id: 'actions',
    title: '🦷 מגירה 6: גוף ופעולות יומיומיות',
    subtitle: '10 מילים · פה, שיניים, לשטוף, לחלוק ופעולות למסיבה',
    words: [
      { id: 'mouth', en: 'mouth', he: 'פה', emoji: '👄', drawerId: 'actions', phonics: 'th', shortEn: 'Open your mouth', shortHe: 'פתח את הפה שלך', hintSound: 'מסתיים בצליל th עם לשון בין השיניים 👅 (מַאוּת׳)', hintContext: 'האיבר בפנים שדרכו אוכלים ומדברים' },
      { id: 'teeth', en: 'teeth', he: 'שיניים', emoji: '🦷', drawerId: 'actions', phonics: 'th', shortEn: 'Wash your teeth', shortHe: 'צחצח את השיניים שלך', hintSound: 'מסתיים בצליל th 👅 עם ee באמצע (טִית׳)', hintContext: 'לבנות וחזקות בתוך הפה, לועסים איתן אוכל' },
      { id: 'wash', en: 'wash', he: 'לשטוף / לצחצח', emoji: '🧼', drawerId: 'actions', phonics: 'sh', shortEn: 'Wash your teeth', shortHe: 'לשטוף / לצחצח שיניים', hintSound: 'מסתיים בצליל sh (וּוֹשׁ)', hintContext: 'לנקות ידיים או פירות במים וסבון' },
      { id: 'share', en: 'share', he: 'לחלוק / לשתף', emoji: '🤝', drawerId: 'actions', phonics: 'sh', shortEn: 'Share your sandwich', shortHe: 'תחלוק את הכריך שלך', hintSound: 'מתחיל בצליל sh (שֵׁייר)', hintContext: 'לתת לחבר חצי מהעוגייה או מהכריך שלי' },
      { id: 'bring', en: 'bring', he: 'להביא', emoji: '🤲', drawerId: 'actions', phonics: null, shortEn: 'Bring the salad', shortHe: 'תביא את הסלט', hintSound: 'מתחיל ב-br (בְּרִינְג)', hintContext: 'לקחת משהו ולהביא אותו לשולחן או למסיבה' },
      { id: 'come', en: 'come', he: 'לבוא', emoji: '🚶', drawerId: 'actions', phonics: null, shortEn: 'Come to dinner', shortHe: 'בואו לארוחת ערב', hintSound: 'מתחיל ב-c ונשמע קַאם', hintContext: 'להגיע למקום: ___ to the party!' },
      { id: 'want', en: 'want', he: 'לרצות', emoji: '🙏', drawerId: 'actions', phonics: null, shortEn: 'What you want', shortHe: 'מה שאתה רוצה', hintSound: 'מתחיל ב-w (וּוֹנְט)', hintContext: 'What do you ___? I ___ chocolate!' },
      { id: 'need', en: 'need', he: 'צריך / להזדקק', emoji: '📌', drawerId: 'actions', phonics: null, shortEn: 'What you need', shortHe: 'מה שאתה צריך', hintSound: 'מתחיל ב-n עם ee ארוכה (נִיד)', hintContext: 'כדי להכין כריך אנחנו צריכים לחם: I ___ bread' },
      { id: 'start', en: 'start', he: 'להתחיל', emoji: '🏁', drawerId: 'actions', phonics: null, shortEn: 'Start the party', shortHe: 'להתחיל את המסיבה', hintSound: 'מתחיל ב-st (סְטָארְט)', hintContext: 'ההפך מלסיים — כפתור ההתחלה במשחק' },
      { id: 'short', en: 'short', he: 'קצר', emoji: '📏', drawerId: 'actions', phonics: 'sh', shortEn: 'A short day', shortHe: 'יום קצר', hintSound: 'מתחיל בצליל sh (שׁוֹרְט)', hintContext: 'ההפך מארוך (long)' }
    ]
  }
];

const ALL_WORDS = DRAWERS.flatMap(d => d.words);

const CHUNKS_DRILLS = [
  {
    id: 'chunk-1',
    chunkTitle: "I'm hungry / I'm thirsty",
    promptHe: 'אתם ממש רעבים ורוצים כריך. איך תגידו זאת באנגלית?',
    sentenceEn: "___! I want a sandwich.",
    targetAnswer: "I'm hungry",
    choices: ["I'm hungry", "I'm thirsty", "It is twelve", "Yesterday was"],
    fullSpeakEn: "I'm hungry! I want a sandwich.",
    hint: "hungry = רעב (thirsty = צמא)"
  },
  {
    id: 'chunk-2',
    chunkTitle: "What do you want? I want...",
    promptHe: 'חבר שואל אתכם במסיבה: "What do you want?" (מה אתם רוצים?). מה תענו?',
    sentenceEn: "___ cheese and chips.",
    targetAnswer: "I want",
    choices: ["I want", "Yesterday was", "What time", "No, I don't"],
    fullSpeakEn: "I want cheese and chips.",
    hint: "כששואלים What do you want עונים באותו פועל: I want..."
  },
  {
    id: 'chunk-3',
    chunkTitle: "What do you need? I need...",
    promptHe: 'אנחנו מכינים סלט במטבח. השלימו את השאלה והתשובה: "מה אתה צריך? אני צריך עגבנייה."',
    sentenceEn: "What do you need? ___ a tomato.",
    targetAnswer: "I need",
    choices: ["I need", "No, I don't", "It is eleven", "Tomorrow will be"],
    fullSpeakEn: "I need a tomato.",
    hint: "need = צריך. השאלה עם need והתשובה עם I need"
  },
  {
    id: 'chunk-4',
    chunkTitle: "put (something) somewhere",
    promptHe: 'איך מבקשים באנגלית: "שים את הגבינה על השולחן"?',
    sentenceEn: "___ the cheese on the table.",
    targetAnswer: "Put",
    choices: ["Put", "Drink", "Twelve", "Wash"],
    fullSpeakEn: "Put the cheese on the table.",
    hint: "התבנית put (משהו) (איפשהו) משמעותה לשים משהו במקום מסוים"
  },
  {
    id: 'chunk-5',
    chunkTitle: "What is your favorite...? My favorite... is...",
    promptHe: 'שואלים אתכם: "What is your favorite food?" (מה האוכל האהוב עליכם?). איך תתחילו את התשובה?',
    sentenceEn: "___ is chocolate!",
    targetAnswer: "My favorite food",
    choices: ["My favorite food", "Tomorrow will be", "Wash your teeth", "What time is"],
    fullSpeakEn: "My favorite food is chocolate.",
    hint: "favorite = אהוב / מועדף. My favorite food is..."
  },
  {
    id: 'chunk-6',
    chunkTitle: "What time is it? It is ___ o'clock",
    promptHe: 'שואלים אתכם: "What time is it?" (מה השעה?), והשעון מראה 12:00. מה תענו?',
    sentenceEn: "___ twelve o'clock.",
    targetAnswer: "It is",
    choices: ["It is", "I need", "Yes, I do", "I want"],
    fullSpeakEn: "It is twelve o'clock.",
    hint: "בשעון תמיד עונים: It is ___ o'clock"
  },
  {
    id: 'chunk-7',
    chunkTitle: "Yes, I do. / No, I don't.",
    promptHe: 'שואלים אתכם: "Do you want fish?" ואתם דווקא כן רוצים! מה התשובה המתאימה?',
    sentenceEn: "Do you want fish? ___",
    targetAnswer: "Yes, I do.",
    choices: ["Yes, I do.", "No, I don't.", "Today is Sunday.", "It is twelve."],
    fullSpeakEn: "Yes, I do.",
    hint: "שאלה שמתחילה ב-Do you... נענית בחיוב עם Yes, I do."
  },
  {
    id: 'chunk-8',
    chunkTitle: "Yes, I do. / No, I don't.",
    promptHe: 'שואלים אתכם: "Do you want onion in your milkshake?" (בצל במילקשייק?! לא תודה!). מה תענו?',
    sentenceEn: "Do you want onion? ___",
    targetAnswer: "No, I don't.",
    choices: ["No, I don't.", "Yes, I do.", "It is fifteen.", "My favorite food."],
    fullSpeakEn: "No, I don't.",
    hint: "כשלא רוצים עונים: No, I don't."
  },
  {
    id: 'chunk-9',
    chunkTitle: "What day is it today? Today is...",
    promptHe: 'שואלים אתכם: "What day is it today?" (איזה יום היום?). השלימו את התשובה:',
    sentenceEn: "___ Sunday.",
    targetAnswer: "Today is",
    choices: ["Today is", "I want", "My favorite", "Open your"],
    fullSpeakEn: "Today is Sunday.",
    hint: "today = היום. Today is..."
  },
  {
    id: 'chunk-10',
    chunkTitle: "Yesterday was...",
    promptHe: 'איך אומרים באנגלית: "אתמול היה יום שבת"?',
    sentenceEn: "___ Saturday.",
    targetAnswer: "Yesterday was",
    choices: ["Yesterday was", "Tomorrow will be", "Today is", "I need"],
    fullSpeakEn: "Yesterday was Saturday.",
    hint: "yesterday = אתמול (זמן עבר הולך עם was)"
  },
  {
    id: 'chunk-11',
    chunkTitle: "Tomorrow will be...",
    promptHe: 'איך אומרים באנגלית: "מחר יהיה יום שני"?',
    sentenceEn: "___ Monday.",
    targetAnswer: "Tomorrow will be",
    choices: ["Tomorrow will be", "Yesterday was", "What time is", "No, I don't"],
    fullSpeakEn: "Tomorrow will be Monday.",
    hint: "tomorrow = מחר (זמן עתיד הולך עם will be)"
  },
  {
    id: 'chunk-12',
    chunkTitle: "capital letter",
    promptHe: 'באיזו אות חייבים להתחיל את שמות ימות השבוע באנגלית (כמו Sunday, Monday)?',
    sentenceEn: "Start days with a ___.",
    targetAnswer: "capital letter",
    choices: ["capital letter", "short salad", "green spinach", "sweet cookie"],
    fullSpeakEn: "Big capital letter",
    hint: "אות גדולה באנגלית נקראת capital letter"
  },
  {
    id: 'chunk-13',
    chunkTitle: "I'm thirsty + Drink water",
    promptHe: 'רצתם בחצר ואתם ממש צמאים למים קרים. מה תגידו?',
    sentenceEn: "___! Drink cold water.",
    targetAnswer: "I'm thirsty",
    choices: ["I'm thirsty", "I'm hungry", "Yesterday was", "It is eleven"],
    fullSpeakEn: "I'm thirsty! Drink cold water.",
    hint: "thirsty = צמא (עם th 👅)"
  },
  {
    id: 'chunk-14',
    chunkTitle: "Share + Make a sandwich",
    promptHe: 'איך נציע לחבר: "נכין כריך ונחלוק עוגייה"?',
    sentenceEn: "Make a sandwich and ___ a cookie.",
    targetAnswer: "share",
    choices: ["share", "wash", "thirteen", "sleep"],
    fullSpeakEn: "Share a cookie",
    hint: "לחלוק/לשתף באנגלית = share (מתחיל ב-sh)"
  }
];

const DAYS_ORDER = [
  { en: 'Sunday', he: 'יום א׳', shortHe: 'ראשון', num: 1 },
  { en: 'Monday', he: 'יום ב׳', shortHe: 'שני', num: 2 },
  { en: 'Tuesday', he: 'יום ג׳', shortHe: 'שלישי', num: 3 },
  { en: 'Wednesday', he: 'יום ד׳', shortHe: 'רביעי', num: 4 },
  { en: 'Thursday', he: 'יום ה׳', shortHe: 'חמישי', num: 5 },
  { en: 'Friday', he: 'יום ו׳', shortHe: 'שישי', num: 6 },
  { en: 'Saturday', he: 'שבת', shortHe: 'שבת', num: 7 }
];

const DAYS_TIMELINE_DRILLS = [
  {
    id: 'day-1',
    todayIdx: 0,
    questionHe: 'היום יום ראשון (Sunday). איזה יום יהיה מחר (Tomorrow will be)?',
    sentenceEn: 'Today is Sunday. Tomorrow will be ___.',
    targetAnswer: 'Monday',
    choices: ['Monday', 'Saturday', 'Friday', 'Wednesday'],
    speakEn: 'Tomorrow will be Monday.',
    hint: 'אחרי Sunday (יום א׳) מגיע יום שני: Monday'
  },
  {
    id: 'day-2',
    todayIdx: 0,
    questionHe: 'היום יום ראשון (Sunday). איזה יום היה אתמול (Yesterday was)?',
    sentenceEn: 'Today is Sunday. Yesterday was ___.',
    targetAnswer: 'Saturday',
    choices: ['Saturday', 'Tuesday', 'Wednesday', 'Thursday'],
    speakEn: 'Yesterday was Saturday.',
    hint: 'לפני יום ראשון (Sunday) נמצא יום שבת: Saturday'
  },
  {
    id: 'day-3',
    todayIdx: 2,
    questionHe: 'היום יום שלישי (Tuesday). איזה יום יהיה מחר (Tomorrow will be)?',
    sentenceEn: 'Today is Tuesday. Tomorrow will be ___.',
    targetAnswer: 'Wednesday',
    choices: ['Wednesday', 'Monday', 'Thursday', 'Sunday'],
    speakEn: 'Today is Tuesday.',
    hint: 'אחרי Tuesday (יום ג׳) מגיע יום רביעי: Wednesday'
  },
  {
    id: 'day-4',
    todayIdx: 4,
    questionHe: 'היום יום חמישי (Thursday). איזה יום יהיה מחר (Tomorrow will be)?',
    sentenceEn: 'Today is Thursday. Tomorrow will be ___.',
    targetAnswer: 'Friday',
    choices: ['Friday', 'Tuesday', 'Sunday', 'Wednesday'],
    speakEn: 'Today is Thursday.',
    hint: 'אחרי יום חמישי (Thursday) מגיע יום שישי: Friday'
  },
  {
    id: 'day-5',
    todayIdx: 3,
    questionHe: 'היום יום רביעי (Wednesday). איזה יום היה אתמול (Yesterday was)?',
    sentenceEn: 'Today is Wednesday. Yesterday was ___.',
    targetAnswer: 'Tuesday',
    choices: ['Tuesday', 'Thursday', 'Saturday', 'Monday'],
    speakEn: 'Today is Wednesday.',
    hint: 'לפני יום רביעי (Wednesday) היה יום שלישי: Tuesday'
  },
  {
    id: 'day-6',
    todayIdx: 5,
    questionHe: 'היום יום שישי (Friday). איזה יום יהיה מחר (Tomorrow will be)?',
    sentenceEn: 'Today is Friday. Tomorrow will be ___.',
    targetAnswer: 'Saturday',
    choices: ['Saturday', 'Thursday', 'Monday', 'Tuesday'],
    speakEn: 'Tomorrow is Friday.',
    hint: 'אחרי יום שישי (Friday) מגיע יום שבת: Saturday'
  },
  {
    id: 'day-7',
    todayIdx: 1,
    questionHe: 'אתמול היה יום ראשון (Sunday), ומחר יהיה יום שלישי (Tuesday). איזה יום היום (Today is)?',
    sentenceEn: 'Yesterday was Sunday. Today is ___.',
    targetAnswer: 'Monday',
    choices: ['Monday', 'Wednesday', 'Friday', 'Thursday'],
    speakEn: 'Today is Monday.',
    hint: 'בין Sunday ל-Tuesday נמצא יום שני: Monday'
  },
  {
    id: 'day-8',
    todayIdx: 3,
    questionHe: 'כל יום בשבוע באנגלית חייב להתחיל ב-Capital Letter (אות גדולה). איזו מילה כתובה נכון?',
    sentenceEn: 'Today is ___ (יום רביעי).',
    targetAnswer: 'Wednesday',
    choices: ['Wednesday', 'wednesday', 'wEDNESDAY', 'WEDNesday'],
    speakEn: 'Today is Wednesday.',
    hint: 'רק האות הראשונה היא Capital Letter גדולה: W'
  },
  {
    id: 'day-9',
    todayIdx: 4,
    questionHe: 'שימו לב להבדל בין יום שלישי ליום חמישי! איך כותבים "יום חמישי" (עם הצליל th 👅 ו-Capital Letter)?',
    sentenceEn: 'Today is ___ (יום חמישי).',
    targetAnswer: 'Thursday',
    choices: ['Thursday', 'Tuesday', 'thursday', 'tuesday'],
    speakEn: 'Today is Thursday.',
    hint: 'יום חמישי מתחיל ב-Th גדולה: Thursday'
  },
  {
    id: 'day-10',
    todayIdx: 6,
    questionHe: 'איזו מילה מתאימה למשפט על הזמן שכבר עבר (אתמול היה יום שבת)?',
    sentenceEn: '___ was Saturday.',
    targetAnswer: 'Yesterday',
    choices: ['Yesterday', 'Tomorrow', 'Today', 'Morning'],
    speakEn: 'Yesterday was Saturday.',
    hint: 'אתמול = Yesterday (והולך עם was)'
  }
];
