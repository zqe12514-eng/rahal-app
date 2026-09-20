# رحّال Explorer V2 — مشروع سياحي PWA

## ما تم تطويره
- Dashboard رئيسية حديثة.
- بحث وتصنيف وترتيب للوجهات.
- مفضلة + سجل الزيارات.
- تخطيط الرحلات مع التاريخ والميزانية.
- خريطة Leaflet/OpenStreetMap.
- GPS وأقرب وجهة.
- مشاركة الوجهات واتجاهات Google Maps.
- إحصائيات استخدام.
- لوحة إدارة لإضافة/حذف الوجهات.
- تصدير واستيراد نسخة JSON احتياطية.
- Dark/Light mode.
- إشعارات المتصفح.
- PWA + Service Worker.
- تخزين محلي للبيانات بدون قاعدة بيانات خارجية.

## التشغيل
استخدم VS Code + Live Server ثم افتح index.html.
ميزات GPS والإشعارات وPWA تعمل بصورة أفضل عبر HTTP/HTTPS وليس file://.

## ملاحظة
هذه النسخة Frontend كاملة وتستخدم localStorage للتخزين. إذا كان المطلوب لمشروع التخرج قاعدة بيانات حقيقية وتسجيل دخول متعدد المستخدمين، فالمرحلة التالية تكون ربطها بـ PHP/MySQL أو Node.js/API.


## Rahal Explorer V3 – Full Features
تمت إضافة صفحة `v3.html` كمركز موحد للنسخة المطورة، مع:
- Rahal AI (خطة أولية للرحلة)
- Smart Recommendations
- Smart Trip Planner
- Smart Budget
- AI Camera UI
- Achievements / Points
- Travel Safety
- Offline Mode
- Smart Weather
- Tourism Intelligence
- استمرار مميزات V2: GPS, Map, Favorites, Visits, PWA, Notifications, Statistics, Admin/local CRUD.

> النسخة الحالية لا تحتاج PHP/MySQL. البيانات الشخصية تحفظ محليًا في المتصفح. يمكن إضافة Backend لاحقًا دون إعادة بناء الواجهة.


## V3 Full Development
تم تفعيل محرك ميزات موحد `features-v3.js` وربطه بصفحات المشروع، مع لوحة V3 فعلية للتخطيط والميزانية والإنجازات والتوصيات وواجهة الكاميرا والـOffline والطقس والإحصائيات. لا توجد حاجة إلى PHP/MySQL في هذه المرحلة.


## V7 — رحّال الذكي
تم الحفاظ على هوية V3 وإضافة مخطط رحلة مبدئي يركز على الوجهات اليمنية، مع ميزانية ومدة واهتمام. هذه مرحلة UX وليست حجزًا فعليًا؛ الربط الحقيقي يحتاج Backend/APIs.


## V9 Smart Routes
- ترتيب الوجهات حسب المسافة (nearest-neighbor).
- حساب المسافة التقريبية وتكلفة المواصلات التقديرية.
- استخدام آخر موقع GPS محفوظ كنقطة انطلاق عند توفره.
- روابط مسار Google Maps مع origin عند توفر موقع المستخدم.
- زر "الأقرب لموقعي" في الخريطة.
- ملاحظة واضحة بأن الأسعار تقديرية وليست حجوزات فعلية.


V12: Smart destination intelligence integrated into original Rahal UI. Includes seasonal guidance, estimated daily budget, stay/food suggestions, activities and tips for key Yemen destinations.
