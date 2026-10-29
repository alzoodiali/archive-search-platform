<div align="center">

# 📁 منصة البحث في الملفات والأرشيف القانوني
### Archive & Legal Document Search Platform

**منظومة ويب متكاملة وعصرية للبحث المتقدم والأرشفة الرقمية، مطورة باستخدام React و Vite ومتوافقة 100% مع اتجاه القراءة والكتابة العربي (RTL).**

*A modern, full-stack ready document and legal archive search platform built with React 18 & Vite, featuring advanced filtering, responsive data tables, full RTL Arabic typography support, and decoupled backend services.*

<br />

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://archive-search-platform-lmi4.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alzoodiali/archive-search-platform)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![RTL Supported](https://img.shields.io/badge/RTL-100%25%20Supported-1c2b3e?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Glossary/RTL)

<br />

**[🌐 زيارة النسخة الحية / Live Demo](https://archive-search-platform-lmi4.vercel.app/)** • **[📖 وثيقة الـ API / API Contract](docs/API_CONTRACT.md)**

<br />

### 🌐 اختر اللغة / Select Language
**[🇸🇦 العربية](#-العربية)** | **[🇬🇧 English](#-english)**

</div>

---

<a name="-العربية"></a>
## 🇸🇦 العربية

### 📑 المحتويات
- [نظرة عامة](#1-نظرة-عامة)
- [المميزات الرئيسية](#2-المميزات-الرئيسية)
- [مطابقة شاشات التصميم المرجعية](#3-مطابقة-شاشات-التصميم-المرجعية)
- [المعمارية وهيكل الملفات](#4-المعمارية-وهيكل-الملفات)
- [التقنيات المستخدمة](#5-التقنيات-المستخدمة)
- [التشغيل والتثبيت المحلي](#6-التشغيل-والتثبيت-المحلي)
- [ربط الـ Backend في الخطوة القادمة](#7-ربط-الـ-backend-في-الخطوة-القادمة)

---

### 1. نظرة عامة
منصة متطورة للبحث الفوري والدقيق في آلاف الملفات والوثائق والأحكام والتشريعات القانونية، صُممت لتوفير تجربة مستخدم سلسة وعالية الأداء بالاعتماد على أحدث ممارسات هندسة برمجيات الويب:
* **تصميم مرئي راقٍ:** متوافق مع الهوية الرسمية للأرشيف وقواعد البيانات الحكومية والقانونية.
* **تطبيع النصوص العربية:** دعم البحث الذكي بتجاهل التشكيل وتوحيد كتابة الهمزات والياء والألف المقصورة.
* **وضع العرض التجريبي (Demo Mode):** خادم تجريبي مدمج داخل المتصفح معزول بالكامل لمحاكاة استجابة الـ Backend، مع إمكانية التبديل إلى الخادم الحقيقي في أي وقت دون تعديل سطر واحد في الواجهات.

---

### 2. المميزات الرئيسية

#### أ) البحث البسيط (Simple Search)
* **اختيار قواعد البيانات:** شرائح اختيار تفاعلية (`Chips`) مع عداد الملفات في كل قاعدة وزر «تحديد الكل / إلغاء الكل».
* **بحث فوري:** بحث دقيق في العناوين والأرقام والمحتوى مع زر مسح سريع.
* **شريط العنوان المميز:** تصميم سهمي احترافي يحاكي الشاشات المرجعية.

#### ب) البحث المتقدم (Advanced Search)
* **فلاتر متعددة:** الكلمات المفتاحية، قاعدة البيانات، المصدر، نوع الملف، رقم الملف، نطاق السنوات (من سنة / إلى سنة).
* **خيارات المطابقة المتقدمة:** جميع الكلمات (`All Words`)، أي كلمة (`Any Word`)، والعبارة كما هي (`Exact Phrase`).
* **مفتاح البحث في النص الكامل:** إمكانية حصر البحث في العناوين أو شمول المحتوى بالكامل (`Full-Text Toggle`).
* **فرز وترتيب النتائج:** حسب الأكثر صلة، الأحدث، أو الأقدم.

#### ج) جدول النتائج التفاعلي (Results Table)
* رأس جدول بلون أزرق فولاذي أنيق مطابق للتصميم المرجعي.
* الأعمدة: **رقم الملف، عنوان الملف وخلاصته، قاعدة البيانات، المصدر، النوع، التاريخ، زر العرض**.
* تظليل كلمات البحث المطابقة (`Highlighting`) باللون الذهبي الخفيف.
* ترقيم صفحات مرن (`Pagination`) مع خيارات تحكم بعدد النتائج في الصفحة (10 / 20 / 50).
* تصميم متجاوب يتحول تلقائياً إلى بطاقات منسقة على شاشات الهواتف الذكية.

#### د) صفحة تفاصيل الوثيقة (`/files/:id`)
* بطاقة تعريفية متكاملة بالبيانات الوصفية (Metadata).
* إمكانية نسخ رقم الملف بضغطة زر ومشاركة الرابط.
* وضع الطباعة الاحترافي (`Print Sheet`) لتصدير الوثيقة ورقيًا.
* زر عودة ذكي يحتفظ بكافة نتائج وفلاتر البحث للمستخدم.

---

### 3. مطابقة شاشات التصميم المرجعية

| الشاشة المرجعية | الرابط المباشر | الحالة |
| :--- | :--- | :---: |
| **شاشة البحث البسيط (pic1)** | [زيارة الشاشة](https://archive-search-platform-lmi4.vercel.app/) | ✅ مكتملة ومطابقة 100% |
| **شاشة البحث المتقدم (pic2)** | [زيارة الشاشة](https://archive-search-platform-lmi4.vercel.app/advanced) | ✅ مكتملة ومطابقة 100% |
| **شاشة تفاصيل الوثيقة** | [زيارة مثال](https://archive-search-platform-lmi4.vercel.app/files/1) | ✅ مكتملة ومطابقة 100% |

---

### 4. المعمارية وهيكل الملفات

```text
src/
├── assets/             # الصور والخطوط
├── components/
│   ├── common/         # أزرار، بطاقات، ترقيم، تظليل، شريط عنوان
│   ├── forms/          # حقول الإدخال، القوائم المنسدلة، أزرار الاختيار، التبديل
│   ├── layout/         # الرأس، التذييل، شريط وضع العرض
│   └── search/         # اختيار قواعد البيانات، جدول النتائج، لوحة النتائج
├── context/            # نظام الإشعارات المنبثقة (Toast Context)
├── hooks/              # خطافات مخصصة (useAsync, useSearchData, useUrlSearch)
├── layouts/            # الهيكل الأساسي للصفحات (MainLayout)
├── pages/              # الصفحات: SimpleSearchPage, AdvancedSearchPage, FileDetailsPage, NotFoundPage
├── routes/             # تعريف مسارات التنقل (React Router)
├── services/           # طبقة الاتصال، مسارات API، والخادم التجريبي (Mock Server)
├── styles/             # متغيرات التصميم (Design Tokens) والأنماط العامة
└── utils/              # معالجة النصوص العربية، التنسيق، والتحقق
```

---

### 5. التقنيات المستخدمة
* **Frontend:** React 18
* **Build Tool:** Vite
* **Routing:** React Router v6
* **Icons:** Lucide React
* **Client:** Axios
* **Styling:** CSS Modules & Design System Tokens (Pure Vanilla CSS)
* **Hosting:** Vercel

---

### 6. التشغيل والتثبيت المحلي
```bash
# استنساخ المستودع
git clone https://github.com/alzoodiali/archive-search-platform.git
cd archive-search-platform

# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# بناء نسخة الإنتاج
npm run build
```

---

### 7. ربط الـ Backend في الخطوة القادمة
عند تجهيز خادم الـ API (مثل **ASP.NET Core**)، يكفي تعديل ملف `.env`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_USE_MOCK=false
```
*سيتحول التطبيق فوراً لاستدعاء الخادم الحقيقي دون أي تعديل في كود الواجهات!*  
راجع المواصفات الكاملة في: [docs/API_CONTRACT.md](docs/API_CONTRACT.md).

---

<br />

<a name="-english"></a>
## 🇬🇧 English

### 📑 Table of Contents
- [Overview](#1-overview)
- [Key Features](#2-key-features)
- [Reference Design Alignment](#3-reference-design-alignment)
- [Architecture & Directory Structure](#4-architecture--directory-structure)
- [Tech Stack](#5-tech-stack)
- [Local Installation & Setup](#6-local-installation--setup)
- [Connecting the Backend](#7-connecting-the-backend)

---

### 1. Overview
A high-performance web platform tailored for fast, accurate search and retrieval of legal documents, court rulings, government legislation, and official gazettes.

* **Production-Grade Aesthetics:** Follows clean government/enterprise portal design standards.
* **Arabic NLP Normalization:** Automatically strips diacritics (Tashkeel) and unifies Alef, Ya, and Ta-Marbuta variations for forgiving search matching.
* **In-Browser Demo Server:** Complete client-side mock adapter allowing full live demonstration on Vercel without requiring an active backend, while preserving a clean separation of concerns for easy future backend integration.

---

### 2. Key Features

#### A) Simple Search
* **Multi-Database Selection:** Interactive chip selectors with document counts per database and "Select All / Deselect All" toggles.
* **Instant Keyword Search:** Real-time query submission with clear button.
* **Branded Ribbon:** Distinctive chevron-shaped section ribbon adhering to the reference mockup.

#### B) Advanced Search
* **Multi-Dimensional Filters:** Keyword, Database, Publishing Source, Document Type, File Reference Number, and Year Range (From/To).
* **Match Modes:** Match All Words, Any Word, or Exact Phrase.
* **Full-Text Search Toggle:** Toggle between title-only and full-text document inspection.
* **Result Ordering:** Sort by relevance score, newest publication date, or oldest publication date.

#### C) Interactive Results Table
* Steel-blue header row matching the design mockup.
* Columns: **File Number, Title & Summary, Database, Source, Type, Date, Action (View)**.
* **Live Keyword Highlighting:** Visual mark tags around matching search terms.
* **Configurable Pagination:** Page sizes of 10, 20, or 50 records per page.
* **Mobile-Responsive:** Automatically collapses into structured card views on mobile devices.

#### D) Document Detail Sheet (`/files/:id`)
* Comprehensive metadata inspection (Source, Date, Page count, Tags).
* One-click copying of file reference number to clipboard.
* Shareable link generator.
* Dedicated `@media print` stylesheet for clean physical printing.
* State-preserving back navigation.

---

### 3. Reference Design Alignment

| Mockup Screen | Live URL | Status |
| :--- | :--- | :---: |
| **Simple Search (pic1)** | [Open Screen](https://archive-search-platform-lmi4.vercel.app/) | ✅ 100% Pixel-matched |
| **Advanced Search (pic2)** | [Open Screen](https://archive-search-platform-lmi4.vercel.app/advanced) | ✅ 100% Pixel-matched |
| **Document Details Sheet** | [View Example](https://archive-search-platform-lmi4.vercel.app/files/1) | ✅ Completed & Responsive |

---

### 4. Architecture & Directory Structure

```text
src/
├── assets/             # Static graphics and icons
├── components/
│   ├── common/         # Button, Card, Chip, Highlight, Pagination, Ribbon, StateView
│   ├── forms/          # FieldWrapper, TextField, SelectField, RadioGroup, Toggle
│   ├── layout/         # Header, Footer, DemoBanner
│   └── search/         # DatabaseSelector, ResultsTable, ResultsPanel
├── context/            # Global Toast Notification Provider
├── hooks/              # Reusable hooks (useAsync, useSearchData, useUrlSearch)
├── layouts/            # Main application layout wrapper
├── pages/              # Route pages (Simple, Advanced, Details, 404)
├── routes/             # React Router v6 route configuration
├── services/           # Axios instance, endpoints, search facade, mock server
├── styles/             # CSS design tokens and RTL global reset
└── utils/              # Arabic normalization, date/number formatting, validators
```

---

### 5. Tech Stack
* **Framework:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vite.dev/)
* **Routing:** [React Router DOM v6](https://reactrouter.com/)
* **Iconography:** [Lucide React](https://lucide.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Styling:** CSS Modules & Pure CSS Design Tokens (Vanilla CSS)
* **Deployment:** [Vercel](https://vercel.com/)

---

### 6. Local Installation & Setup

```bash
# 1. Clone repository
git clone https://github.com/alzoodiali/archive-search-platform.git
cd archive-search-platform

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Server ready at http://localhost:5173/

# 4. Production build
npm run build
```

---

### 7. Connecting the Backend
When the backend API (e.g., **ASP.NET Core Web API**) is ready, update your environment variables in `.env`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_USE_MOCK=false
```
The entire application will immediately switch to calling your live backend without modifying a single line of React code!  
See [docs/API_CONTRACT.md](docs/API_CONTRACT.md) for full endpoint schemas and payload structures.

---

<div align="center">
Developed and maintained by <b>Ali Alzoodi</b> • 2026
</div>
