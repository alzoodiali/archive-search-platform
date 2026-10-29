<div align="center">

# 📁 منصة البحث في الملفات والأرشيف القانوني
### Archive & Legal Document Search Platform

**منظومة ويب متكاملة وعصرية للبحث المتقدم والأرشفة الرقمية، مطورة باستخدام React و Vite ومتوافقة 100% مع اتجاه القراءة والكتابة العربي (RTL).**

<br />

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://archive-search-platform-lmi4.vercel.app/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![RTL Supported](https://img.shields.io/badge/RTL-Supported-1c2b3e?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Glossary/RTL)

<br />

### 🌐 [زيارة النسخة التجريبية المباشرة (Live Demo)](https://archive-search-platform-lmi4.vercel.app/)

</div>

---

## 📑 المحتويات
- [نظرة عامة](#-نظرة-عامة)
- [المميزات الرئيسية](#-المميزات-الرئيسية)
- [مطابقة شاشات التصميم المرجعية](#-مطابقة-شاشات-التصميم-المرجعية)
- [معمارية المشروع وهيكل الملفات](#-معمارية-المشروع-وهيكل-الملفات)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [التشغيل والتثبيت المحلي](#-التشغيل-والتثبيت-المحلي)
- [ربط الـ Backend في الخطوة القادمة](#-ربط-الـ-backend-في-الخطوة-القادمة)
- [المساهمة والتطوير](#-الترخيص)

---

## 🔍 نظرة عامة

منصة متطورة للبحث الفوري والدقيق في آلاف الملفات والوثائق والأحكام والتشريعات القانونية، صُممت لتوفير تجربة مستخدم سلسة وعالية الأداء بالاعتماد على أحدث ممارسات هندسة برمجيات الويب:

* **تصميم مرئي راقٍ:** متوافق مع الهوية الرسمية للأرشيف وقواعد البيانات الحكومية والقانونية.
* **تطبيع النصوص العربية:** دعم البحث الذكي بتجاهل التشكيل وتوحيد كتابة الهمزات والياء والألف المقصورة.
* **وضع العرض التجريبي (Demo Mode):** خادم تجريبي مدمج داخل المتصفح معزول بالكامل لمحاكاة استجابة الـ Backend، مع إمكانية التبديل إلى الخادم الحقيقي في أي وقت دون تعديل سطر واحد في الواجهات.

---

## ✨ المميزات الرئيسية

### 1. البحث البسيط (Simple Search)
* **اختيار قواعد البيانات:** شرائح اختيار تفاعلية (`Chips`) مع عداد الملفات في كل قاعدة وزر «تحديد الكل / إلغاء الكل».
* **بحث فوري:** بحث دقيق في العناوين والأرقام والمحتوى مع زر مسح سريع.
* **شريط العنوان المميز:** تصميم سهمي احترافي يحاكي الشاشات المرجعية.

### 2. البحث المتقدم (Advanced Search)
* **فلاتر متعددة:**
  * الكلمات المفتاحية (`Keywords`).
  * قاعدة البيانات المستهدفة (`Database`).
  * الجهة المصدرة (`Source`).
  * نوع الملف (`File Type`).
  * رقم الملف (`File Number`).
  * نطاق السنوات (`Year Range: From - To`).
* **خيارات المطابقة المتقدمة:**
  * جميع الكلمات (`All Words`).
  * أي كلمة (`Any Word`).
  * العبارة كما هي (`Exact Phrase`).
* **مفتاح البحث في النص الكامل:** إمكانية حصر البحث في العناوين أو شمول المحتوى بالكامل (`Full-Text Toggle`).
* **فرز وترتيب النتائج:** حسب الأكثر صلة، الأحدث، أو الأقدم.

### 3. جدول النتائج التفاعلي (Results Table)
* رأس جدول بلون أزرق فولاذي أنيق كما في الصورة المرجعية.
* الأعمدة: **رقم الملف، عنوان الملف وخلاصته، قاعدة البيانات، المصدر، النوع، التاريخ، زر العرض**.
* تظليل كلمات البحث المطابقة (`Highlighting`) باللون الذهبي الخفيف.
* ترقيم صفحات مرن (`Pagination`) مع خيارات تحكم بعدد النتائج في الصفحة (10 / 20 / 50).
* تصميم متجاوب يتحول تلقائياً إلى بطاقات منسقة على شاشات الهواتف الذكية.

### 4. صفحة تفاصيل الوثيقة (`/files/:id`)
* بطاقة تعريفية متكاملة بالبيانات الوصفية (Metadata).
* إمكانية نسخ رقم الملف بضغطة زر.
* مشاركة الرابط المباشر للملف.
* وضع الطباعة الاحترافي (`Print Sheet`) لتصدير الوثيقة ورقيًا.
* زر عودة ذكي يحتفظ بكافة نتائج وفلاتر البحث للمستخدم.

---

## 🎯 مطابقة شاشات التصميم المرجعية

| الشاشة | الرابط | الحالة |
| :--- | :--- | :---: |
| **شاشة البحث البسيط (pic1)** | [عرض الشاشة](https://archive-search-platform-lmi4.vercel.app/) | ✅ مكتملة ومطابقة 100% |
| **شاشة البحث المتقدم (pic2)** | [عرض الشاشة](https://archive-search-platform-lmi4.vercel.app/advanced) | ✅ مكتملة ومطابقة 100% |
| **شاشة تفاصيل الملف** | [مثال لملف](https://archive-search-platform-lmi4.vercel.app/files/1) | ✅ مكتملة ومطابقة 100% |

---

## 🏛️ معمارية المشروع وهيكل الملفات

تم تنظيم المشروع باتباع مبادئ هندسة البرمجيات النظيفة وفصل المسؤوليات (Clean Architecture & MVC Separation):

```text
archive-search-platform/
├── docs/
│   └── API_CONTRACT.md         # المواصفات الفنية لربط Backend (ASP.NET Core)
├── public/
│   ├── favicon.svg             # أيقونة التطبيق
│   └── icons.svg
├── src/
│   ├── components/             # المكونات القابلة لإعادة الاستخدام
│   │   ├── common/             # Button, Card, Chip, Highlight, Pagination, Ribbon, StateView
│   │   ├── forms/              # FieldWrapper, TextField, SelectField, RadioGroup, Toggle
│   │   ├── layout/             # Header, Footer, DemoBanner
│   │   └── search/             # DatabaseSelector, ResultsTable, ResultsPanel
│   ├── context/
│   │   └── ToastContext.jsx    # إدارة الإشعارات والتنبيهات العامة
│   ├── hooks/                  # خطافات مخصصة (useAsync, useSearchData, useUrlSearch, ...)
│   ├── layouts/
│   │   └── MainLayout.jsx      # الهيكل الأساسي للصفحات
│   ├── pages/                  # الصفحات الرئيسية
│   │   ├── SimpleSearchPage.jsx
│   │   ├── AdvancedSearchPage.jsx
│   │   ├── FileDetailsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   └── index.jsx           # تعريف مسارات التنقل (React Router)
│   ├── services/               # طبقة الاتصال والخدمات
│   │   ├── api.js              # إعداد عميل Axios مع اعتراض الطلبات والأخطاء
│   │   ├── config.js           # قراءة المتغيرات المركزية
│   │   ├── endpoints.js        # مسارات الخادم
│   │   ├── searchService.js    # الواجهة الموحدة للاستدعاء
│   │   └── mock/               # خادم المحاكاة للبيانات التجريبية
│   ├── styles/                 # نظام التصميم والمتغيرات (Design Tokens)
│   │   ├── variables.css
│   │   └── global.css
│   ├── utils/                  # أدوات معالجة النصوص العربية، التحقق، والتنسيق
│   │   ├── arabic.js
│   │   ├── format.js
│   │   ├── searchParams.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example                # نموذج متغيرات البيئة
├── vercel.json                 # إعدادات إعادة التوجيه لـ Vercel SPA Routing
├── vite.config.js
└── package.json
```

---

## 🛠️ التقنيات المستخدمة

* **الواجهة الأمامية:** [React 18](https://react.dev/)
* **أداة البناء والتطوير:** [Vite](https://vite.dev/)
* **إدارة التوجيه والمسارات:** [React Router DOM v6](https://reactrouter.com/)
* **الأيقونات:** [Lucide React](https://lucide.dev/)
* **التواصل مع الخادم:** [Axios](https://axios-http.com/)
* **التنسيق والأنماط:** CSS Modules & Pure CSS مع Design Tokens
* **الاستضافة والنشر:** [Vercel](https://vercel.com/)

---

## 💻 التشغيل والتثبيت المحلي

### المتطلبات المسبقة:
* بيئة [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث).
* مدير الحزم `npm` أو `pnpm` أو `yarn`.

### خطوات التشغيل:
1. **استنساخ المستودع:**
   ```bash
   git clone https://github.com/alzoodiali/archive-search-platform.git
   cd archive-search-platform
   ```

2. **تثبيت الحزم:**
   ```bash
   npm install
   ```

3. **تشغيل الخادم المحلي:**
   ```bash
   npm run dev
   ```
   افتح المتصفح على: `http://localhost:5173/`

4. **بناء نسخة الإنتاج:**
   ```bash
   npm run build
   ```

---

## 🔌 ربط الـ Backend في الخطوة القادمة

عندما يصبح خادم الـ API (مثل **ASP.NET Core**) جاهزاً، كل ما عليك فعله هو:

1. إنشاء ملف `.env` محلياً (أو في إعدادات استضافة Vercel).
2. تعيين المتغيرات كالتالي:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com/api
   VITE_USE_MOCK=false
   ```
3. **انتهى الأمر!** سيقوم التطبيق تلقائياً بالاتصال بالـ Backend الحقيقي دون الحاجة لتعديل أي مكون أو صفحة في كود الواجهة.
4. راجع ملف التوثيق الفني الكامل للـ API: [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) للاطلاع على تفاصيل كل Endpoint ونماذج الـ JSON المدخلة والمخرجة.

---

<div align="center">
تم التطوير والتوثيق بواسطة <b>علي الزودي</b> • 2026
</div>
