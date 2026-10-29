/**
 * ⚠️ بيانات تجريبية (DEMO DATA) — ليست بيانات حقيقية.
 * تُستخدم فقط لعرض الواجهة على العميل إلى أن يتوفر الـ Backend.
 * أسماء قواعد البيانات قابلة للتعديل لتطابق أسماء العميل الفعلية.
 */

export const DATABASES = [
  { id: 'judgments', name: 'الأحكام القضائية' },
  { id: 'legislation', name: 'التشريعات والقوانين' },
  { id: 'fatwas', name: 'الفتاوى' },
  { id: 'principles', name: 'المبادئ القانونية' },
  { id: 'gazette', name: 'الجريدة الرسمية' },
  { id: 'agreements', name: 'الاتفاقيات الدولية' },
  { id: 'decisions', name: 'القرارات الوزارية' },
  { id: 'regulations', name: 'اللوائح التنفيذية' },
  { id: 'circulars', name: 'التعاميم والمنشورات' },
  { id: 'memos', name: 'المذكرات التفسيرية' },
  { id: 'research', name: 'الأبحاث والدراسات' },
  { id: 'contracts', name: 'العقود والنماذج' },
];

export const SOURCES = [
  'المحكمة العليا',
  'محكمة الاستئناف',
  'مجلس الدولة',
  'وزارة العدل',
  'هيئة الخبراء',
  'مجلس الوزراء',
  'إدارة الفتوى والتشريع',
  'مركز الدراسات القانونية',
];

export const FILE_TYPES = ['حكم', 'قانون', 'فتوى', 'قرار', 'لائحة', 'تعميم', 'مذكرة', 'بحث', 'نموذج'];

const SUBJECTS = [
  'العقود التجارية', 'الملكية العقارية', 'العمل والعمال', 'الأحوال الشخصية', 'الضرائب والرسوم',
  'المناقصات الحكومية', 'التأمينات الاجتماعية', 'حماية المستهلك', 'الشركات التجارية', 'الإيجارات',
  'الملكية الفكرية', 'التحكيم التجاري', 'الجرائم المعلوماتية', 'الخدمة المدنية', 'البنوك والتمويل',
  'النقل البحري', 'الجمارك', 'البيئة', 'التعليم', 'الصحة العامة',
];

const TITLE_PATTERNS = [
  (s) => `بشأن ${s}`,
  (s) => `في شأن تنظيم ${s}`,
  (s) => `حول تفسير أحكام ${s}`,
  (s) => `بخصوص النزاعات المتعلقة بـ${s}`,
  (s) => `تعديل بعض أحكام ${s}`,
  (s) => `ضوابط وإجراءات ${s}`,
];

const PARAGRAPHS = [
  'وحيث إن المشرّع قد نص صراحة على وجوب مراعاة الإجراءات الشكلية المقررة قانونًا قبل النظر في الموضوع، فإن إغفال هذه الإجراءات يترتب عليه عدم قبول الطلب.',
  'ويُستفاد من النصوص المتقدمة أن الالتزام ينشأ من تاريخ إبرام العقد، ما لم يتفق الطرفان كتابةً على خلاف ذلك، مع مراعاة القواعد الآمرة.',
  'وقد استقر الرأي على أن الجهة الإدارية تلتزم بتسبيب قراراتها تسبيبًا كافيًا يمكّن جهة الرقابة من بسط رقابتها على مشروعية القرار.',
  'ويجوز للمتضرر المطالبة بالتعويض عن الضرر المادي والأدبي متى ثبت الخطأ وعلاقة السببية بينه وبين الضرر الواقع.',
  'وتسري أحكام هذا النص على الوقائع اللاحقة لتاريخ العمل به، ولا يكون له أثر رجعي إلا بنص صريح.',
  'وعلى الجهات المختصة اتخاذ ما يلزم لتنفيذ ما ورد في هذا الشأن، ورفع تقارير دورية بما تم إنجازه.',
];

/** مولّد أرقام شبه عشوائية ثابت (Deterministic) لتبقى البيانات نفسها في كل تشغيل */
function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildFiles(count = 260) {
  const rand = seeded(20261029);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const files = [];

  for (let i = 1; i <= count; i += 1) {
    const db = pick(DATABASES);
    const subject = pick(SUBJECTS);
    const type = pick(FILE_TYPES);
    const year = 1995 + Math.floor(rand() * 31); // 1995–2025
    const month = 1 + Math.floor(rand() * 12);
    const day = 1 + Math.floor(rand() * 28);
    const paragraphs = Array.from({ length: 3 }, () => pick(PARAGRAPHS));

    files.push({
      id: String(i),
      fileNumber: `${year}/${String(100 + Math.floor(rand() * 900))}`,
      title: `${type} ${pick(TITLE_PATTERNS)(subject)}`,
      subject,
      databaseId: db.id,
      databaseName: db.name,
      source: pick(SOURCES),
      fileType: type,
      year,
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      pages: 2 + Math.floor(rand() * 40),
      summary: paragraphs[0],
      content: paragraphs.join('\n\n'),
      keywords: [subject, type, db.name],
    });
  }
  return files;
}

export const FILES = buildFiles();
