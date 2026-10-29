# وثيقة عقد واجهات برمجة التطبيقات (API Contract)
## منصة البحث في الملفات وقواعد البيانات

> **تنبيه:** هذه الوثيقة توضح مواصفات الـ Endpoints التي تتوقعها واجهة React (Frontend) من خادم الـ Backend (مثل ASP.NET Core Web API) للربط المباشر.

---

### الإعدادات ومتغيرات البيئة
عند اكتمال الـ Backend، يكفي تعديل ملف `.env` في الواجهة فقط:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_USE_MOCK=false
```

---

### 1. جلب قائمة قواعد البيانات
* **المسار:** `GET /databases`
* **الاستجابة الناجحة (200 OK):**
```json
[
  {
    "id": "judgments",
    "name": "الأحكام القضائية",
    "count": 1420
  },
  {
    "id": "legislation",
    "name": "التشريعات والقوانين",
    "count": 890
  }
]
```

---

### 2. جلب خيارات الفلاتر للبحث المتقدم
* **المسار:** `GET /search/filters`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "sources": [
    "المحكمة العليا",
    "محكمة الاستئناف",
    "مجلس الدولة",
    "وزارة العدل"
  ],
  "fileTypes": [
    "حكم",
    "قانون",
    "فتوى",
    "قرار",
    "لائحة"
  ],
  "yearRange": {
    "min": 1995,
    "max": 2026
  }
}
```

---

### 3. البحث البسيط (Simple Search)
* **المسار:** `POST /search/simple`
* **جسم الطلب (Request Body):**
```json
{
  "query": "العقود التجارية",
  "databaseIds": ["judgments", "legislation"],
  "page": 1,
  "pageSize": 10
}
```
* **الاستجابة الناجحة (200 OK):**
```json
{
  "items": [
    {
      "id": "1",
      "fileNumber": "2023/452",
      "title": "حكم بشأن العقود التجارية والإخلال بالالتزام",
      "summary": "ملخص مختصر لمحتوى الوثيقة يظهر تحت العنوان...",
      "databaseId": "judgments",
      "databaseName": "الأحكام القضائية",
      "source": "المحكمة العليا",
      "fileType": "حكم",
      "date": "2023-04-15",
      "pages": 12
    }
  ],
  "totalCount": 85,
  "page": 1,
  "pageSize": 10,
  "totalPages": 9,
  "tookMs": 120
}
```

---

### 4. البحث المتقدم (Advanced Search)
* **المسار:** `POST /search/advanced`
* **جسم الطلب (Request Body):**
```json
{
  "keyword": "عقد توريد",
  "matchMode": "all",
  "fullText": true,
  "databaseId": "judgments",
  "source": "المحكمة العليا",
  "fileType": "حكم",
  "fileNumber": "2022/105",
  "fromYear": 2020,
  "toYear": 2024,
  "sortBy": "newest",
  "page": 1,
  "pageSize": 10
}
```
* **الاستجابة الناجحة (200 OK):**
نفس بنية استجابة البحث البسيط (`items`, `totalCount`, `page`, `pageSize`, `totalPages`, `tookMs`).

---

### 5. عرض تفاصيل ملف محدد
* **المسار:** `GET /files/{id}`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "id": "1",
  "fileNumber": "2023/452",
  "title": "حكم بشأن العقود التجارية",
  "databaseId": "judgments",
  "databaseName": "الأحكام القضائية",
  "source": "المحكمة العليا",
  "fileType": "حكم",
  "date": "2023-04-15",
  "pages": 12,
  "summary": "نص الخلاصة القانونية...",
  "content": "النص الكامل للحكم أو الوثيقة مقسم إلى فقرات...\n\nالفقرة الثانية...",
  "keywords": ["العقود التجارية", "حكم", "المحكمة العليا"]
}
```

---

### 6. معالجة الأخطاء (Error Handling)
تدعم الواجهة نمط **ProblemDetails** القياسي في ASP.NET Core:
```json
{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "يرجى اختيار قاعدة بيانات واحدة على الأقل.",
  "errors": {
    "databaseIds": ["الحقل مطلوب"]
  }
}
```
