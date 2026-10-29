const DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;

/** تطبيع النص العربي لتحسين نتائج البحث (إزالة التشكيل وتوحيد الحروف) */
export function normalizeArabic(text = '') {
  return String(text)
    .replace(DIACRITICS, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export const tokenize = (text = '') => text.split(' ').filter((w) => w.length > 1);

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** يبني تعبيرًا منتظمًا يطابق الكلمة مع تجاهل التشكيل واختلاف الهمزات */
function looseWordPattern(word) {
  return [...word]
    .map((ch) => {
      if (ch === 'ا') return '[اإأآٱ]';
      if (ch === 'ي') return '[يىئ]';
      if (ch === 'ه') return '[هة]';
      if (ch === 'و') return '[وؤ]';
      return escapeRegExp(ch);
    })
    .join('[\\u064B-\\u065F\\u0640]*');
}

/** يقسم النص إلى أجزاء مع تحديد ما يطابق كلمات البحث (لتمييزها في الواجهة) */
export function splitHighlight(text = '', query = '') {
  const words = tokenize(normalizeArabic(query));
  if (!words.length || !text) return [{ text, match: false }];
  const regex = new RegExp(`(${words.map(looseWordPattern).join('|')})`, 'i');
  // مع مجموعة الالتقاط، العناصر ذات الفهرس الفردي هي المطابقات دائمًا
  return String(text)
    .split(regex)
    .map((part, i) => ({ text: part, match: i % 2 === 1 }))
    .filter((p) => p.text);
}
