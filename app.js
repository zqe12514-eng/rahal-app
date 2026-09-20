'use strict';

const destinations = [
{id:"taiz",city:"تعز",en:"Taiz",country:"اليمن",flag:"🇾🇪",lat:13.5789,lng:44.0219,cat:"جبال",rating:4.8,img:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/City_of_Taiz%2C_Yemen.jpg/960px-City_of_Taiz%2C_Yemen.jpg",desc:"مدينة جبلية بطبيعة جميلة وأجواء مميزة."},
{id:"ibb",city:"إب",en:"Ibb",country:"اليمن",flag:"🇾🇪",lat:13.9667,lng:44.1833,cat:"طبيعة",rating:4.8,img:"https://upload.wikimedia.org/wikipedia/commons/d/d3/Ibb%2CYemen.jpg",desc:"وجهة خضراء معروفة بطبيعتها وجبالها."},
{id:"aden",city:"عدن",en:"Aden",country:"اليمن",flag:"🇾🇪",lat:12.7855,lng:45.0187,cat:"بحر",rating:4.7,img:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Street_Scene_Aden_Yemen.jpg/1280px-Street_Scene_Aden_Yemen.jpg",desc:"مدينة ساحلية تجمع الشواطئ والتاريخ."},
{id:"socotra",city:"سقطرى",en:"Socotra",country:"اليمن",flag:"🇾🇪",lat:12.4634,lng:53.8237,cat:"طبيعة",rating:4.9,img:"https://upload.wikimedia.org/wikipedia/commons/8/83/Socotra_dragon_tree.JPG",desc:"جزيرة فريدة بطبيعتها وتنوعها البيئي."},
{id:"shibam",city:"شبام حضرموت",en:"Shibam",country:"اليمن",flag:"🇾🇪",lat:15.9267,lng:48.6275,cat:"تراث",rating:4.8,img:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shibam_Hadramaut.jpg/1280px-Shibam_Hadramaut.jpg",desc:"مدينة تاريخية تشتهر بعمارتها الطينية الشاهقة."},
{id:"sanaa",city:"صنعاء",en:"Sanaa",country:"اليمن",flag:"🇾🇪",lat:15.3694,lng:44.1910,cat:"تراث",rating:4.8,img:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Old_City_of_Sana%27a-111108.jpg/1280px-Old_City_of_Sana%27a-111108.jpg",desc:"مدينة تاريخية وأسواق قديمة وعمارة مميزة."},
{id:"paris",city:"باريس",en:"Paris",country:"فرنسا",flag:"🇫🇷",lat:48.8566,lng:2.3522,cat:"تاريخ",rating:4.9,img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",desc:"مدينة الفن والعمارة والمقاهي الشهيرة."},
{id:"tokyo",city:"طوكيو",en:"Tokyo",country:"اليابان",flag:"🇯🇵",lat:35.6762,lng:139.6503,cat:"مدينة",rating:4.8,img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",desc:"مزيج مذهل من التكنولوجيا والثقافة اليابانية."},
{id:"dubai",city:"دبي",en:"Dubai",country:"الإمارات",flag:"🇦🇪",lat:25.2048,lng:55.2708,cat:"ترفيه",rating:4.7,img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",desc:"ناطحات سحاب وتجارب تسوق وترفيه عالمية."},
{id:"santorini",city:"سانتوريني",en:"Santorini",country:"اليونان",flag:"🇬🇷",lat:36.3932,lng:25.4615,cat:"بحر",rating:4.9,img:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",desc:"جزيرة ساحرة بمياه زرقاء وغروب استثنائي."},
{id:"newyork",city:"نيويورك",en:"New York",country:"الولايات المتحدة",flag:"🇺🇸",lat:40.7128,lng:-74.006,cat:"مدينة",rating:4.7,img:"https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1000&q=80",desc:"مدينة لا تنام ومعالم حضرية عالمية."},
{id:"london",city:"لندن",en:"London",country:"بريطانيا",flag:"🇬🇧",lat:51.5074,lng:-0.1278,cat:"تاريخ",rating:4.8,img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",desc:"تاريخ عريق ومتاحف ومعالم ملكية."},
{id:"bali",city:"بالي",en:"Bali",country:"إندونيسيا",flag:"🇮🇩",lat:-8.4095,lng:115.1889,cat:"طبيعة",rating:4.8,img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",desc:"طبيعة استوائية وشواطئ ومعابد."},
{id:"maldives",city:"المالديف",en:"Maldives",country:"المالديف",flag:"🇲🇻",lat:4.1755,lng:73.5093,cat:"بحر",rating:4.9,img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",desc:"جزر استوائية ومياه صافية ومنتجعات ساحلية."},
{id:"rome",city:"روما",en:"Rome",country:"إيطاليا",flag:"🇮🇹",lat:41.9028,lng:12.4964,cat:"تاريخ",rating:4.8,img:"https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=80",desc:"آثار الإمبراطورية الرومانية والفن الإيطالي."},
{id:"istanbul",city:"إسطنبول",en:"Istanbul",country:"تركيا",flag:"🇹🇷",lat:41.0082,lng:28.9784,cat:"تراث",rating:4.8,img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",desc:"مدينة تجمع بين قارتي آسيا وأوروبا."},
{id:"capetown",city:"كيب تاون",en:"Cape Town",country:"جنوب أفريقيا",flag:"🇿🇦",lat:-33.9249,lng:18.4241,cat:"جبال",rating:4.7,img:"https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80",desc:"جبال ومحيطات وطبيعة خلابة."},
{id:"barcelona",city:"برشلونة",en:"Barcelona",country:"إسبانيا",flag:"🇪🇸",lat:41.3874,lng:2.1686,cat:"تراث",rating:4.8,img:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",desc:"عمارة غاودي وشواطئ وأجواء متوسطية."},
{id:"sydney",city:"سيدني",en:"Sydney",country:"أستراليا",flag:"🇦🇺",lat:-33.8688,lng:151.2093,cat:"بحر",rating:4.8,img:"https://images.unsplash.com/photo-1506973035872-a4f9b3a9e0d1?auto=format&fit=crop&w=1000&q=80",desc:"دار الأوبرا والميناء والشواطئ."},
{id:"rio",city:"ريو دي جانيرو",en:"Rio de Janeiro",country:"البرازيل",flag:"🇧🇷",lat:-22.9068,lng:-43.1729,cat:"طبيعة",rating:4.7,img:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80",desc:"جبال خضراء وشواطئ وحياة نابضة."},
{id:"cairo",city:"القاهرة",en:"Cairo",country:"مصر",flag:"🇪🇬",lat:30.0444,lng:31.2357,cat:"تاريخ",rating:4.7,img:"https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80",desc:"الأهرامات والتاريخ المصري القديم."},
{id:"singapore",city:"سنغافورة",en:"Singapore",country:"سنغافورة",flag:"🇸🇬",lat:1.3521,lng:103.8198,cat:"مدينة",rating:4.8,img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",desc:"مدينة حديثة وحدائق وتجارب حضرية."},
{id:"queenstown",city:"كوينزتاون",en:"Queenstown",country:"نيوزيلندا",flag:"🇳🇿",lat:-45.0312,lng:168.6626,cat:"جبال",rating:4.9,img:"https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1000&q=80",desc:"جبال وبحيرات ومغامرات في الهواء الطلق."},
{id:"reykjavik",city:"ريكيافيك",en:"Reykjavik",country:"آيسلندا",flag:"🇮🇸",lat:64.1466,lng:-21.9426,cat:"طبيعة",rating:4.8,img:"https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1000&q=80",desc:"مناظر بركانية وشلالات وأضواء الشمال."},
{id:"seoul",city:"سيول",en:"Seoul",country:"كوريا الجنوبية",flag:"🇰🇷",lat:37.5665,lng:126.978,cat:"مدينة",rating:4.8,img:"https://images.unsplash.com/photo-1538485399081-7c897d6f0bd1?auto=format&fit=crop&w=1000&q=80",desc:"ثقافة عصرية وقصور وأسواق نابضة."},
{id:"lisbon",city:"لشبونة",en:"Lisbon",country:"البرتغال",flag:"🇵🇹",lat:38.7223,lng:-9.1393,cat:"تراث",rating:4.8,img:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80",desc:"أحياء تاريخية ومقاهٍ وإطلالات على الأطلسي."}
];


/* Rahal bilingual interface: Arabic is the default; English is optional. */
const LANG_KEY='rahal-language';
const countryEN={'اليمن':'Yemen','فرنسا':'France','اليابان':'Japan','الإمارات':'United Arab Emirates','اليونان':'Greece','الولايات المتحدة':'United States','بريطانيا':'United Kingdom','إندونيسيا':'Indonesia','المالديف':'Maldives','إيطاليا':'Italy','تركيا':'Turkey','جنوب أفريقيا':'South Africa','إسبانيا':'Spain','أستراليا':'Australia','البرازيل':'Brazil','مصر':'Egypt','سنغافورة':'Singapore','نيوزيلندا':'New Zealand','آيسلندا':'Iceland','كوريا الجنوبية':'South Korea','البرتغال':'Portugal','موقع مخصص':'Custom location'};
const catEN={'الكل':'All','تراث':'Heritage','تاريخ':'History','طبيعة':'Nature','بحر':'Sea','مدينة':'City','جبال':'Mountains','ترفيه':'Entertainment','مخصص':'Custom'};
const UI_EN={
 'منصة السفر الذكية':'Smart travel platform','الرئيسية':'Home','الخريطة':'Map','المواقع السياحية':'Tourist places','رحلاتي':'My trips','المفضلة':'Favorites','الصور':'Photos','الإحصائيات':'Statistics','الإعدادات':'Settings','الإدارة':'Admin','زكريا':'Zakaria',
 'ابحث عن مدينة أو وجهة...':'Search for a city or destination...','اكتشف اليمن، وخطّط رحلتك بذكاء.':'Discover Yemen and plan your trip smartly.','🌍 ابدأ الاستكشاف':'🌍 Start exploring','✈️ خطط رحلة':'✈️ Plan a trip','📍 موقعي':'📍 My location','أماكن مقترحة لك':'Recommended places for you','عرض الكل ←':'View all →','🌤️ الطقس للرحلة':'🌤️ Trip weather','بيانات الطقس والتوقعات تساعد رحّال على اختيار الأنشطة.':'Current weather and forecasts help Rahal choose activities.','تحديث':'Refresh','🧭 خطط رحلتك بذكاء':'🧭 Plan your trip smartly','رحّال يقترح لك رحلة مناسبة لوقتك وميزانيتك، مع تركيز على الوجهات اليمنية.':'Rahal suggests a trip that fits your time and budget, with a focus on Yemeni destinations.','أي اهتمام':'Any interest','✨ أنشئ لي رحلة':'✨ Create my trip','أدخل الأيام والميزانية وسأبني لك اقتراحًا مبدئيًا.':'Enter the days and budget and I will build a starter plan.','أقرب وجهة إليك':'Nearest destination','📍 احسب الأقرب':'📍 Find nearest','اسمح للموقع لمعرفة أقرب وجهة من بين جميع الوجهات.':'Allow location access to find the nearest destination.',
 '✈️ رحلاتي':'✈️ My trips','أنشئ خطط رحلاتك واحفظها محليًا.':'Create trip plans and save them locally.','🔔 فعّل وقت الرحلة ليتم تنبيهك: «حان موعد الرحلة».':'🔔 Set the trip time to receive a reminder: “It’s time for your trip”.','حفظ الرحلة':'Save trip','🗓️ تفاصيل الرحلة':'🗓️ Trip details','اختر رحلة محفوظة لعرض الجدول اليومي والتكلفة والمسار.':'Choose a saved trip to view its schedule, cost, and route.',
 '⚡ لوحة الإدارة':'⚡ Admin dashboard','إضافة وجهات وإدارة البيانات والنسخ الاحتياطية.':'Add destinations, manage data, and backups.','⬇️ تصدير نسخة':'⬇️ Export backup','إضافة وجهة جديدة':'Add a new destination','➕ إضافة الوجهة':'➕ Add destination','استيراد نسخة احتياطية':'Import backup','الوجهة':'Destination','الدولة':'Country','التصنيف':'Category','التقييم':'Rating','المصدر':'Source','إجراء':'Action',
 'المواقع السياحية':'Tourist places','اكتشف الوجهات حسب النوع والتقييم.':'Discover destinations by type and rating.','الترتيب الافتراضي':'Default order','الأعلى تقييمًا':'Highest rated','حسب الاسم':'By name',
 '📷 الصور':'📷 Photos','📷 التقط صور رحلاتك واحفظها على جهازك. تعمل الكاميرا عند استخدام HTTPS أو localhost ومنح الإذن.':'📷 Take trip photos and save them on your device. The camera works on HTTPS or localhost with permission.','📷 فتح الكاميرا':'📷 Open camera','⬆️ إضافة صورة':'⬆️ Add photo','📸 التقاط':'📸 Capture','إغلاق':'Close',
 '⚙️ الإعدادات':'⚙️ Settings','الخصوصية والبيانات':'Privacy & data','بيانات المفضلة والرحلات والوجهات المضافة تُحفظ محليًا في متصفحك.':'Favorites, trips, and added destinations are saved locally in your browser.','إدارة البيانات':'Data management','الأذونات':'Permissions','📍 اختبار GPS':'📍 Test GPS','🔔 اختبار الإشعارات':'🔔 Test notifications','↗ اختبار المشاركة':'↗ Test sharing','📱 تثبيت رحّال على هذا الجهاز':'📱 Install Rahal on this device','🔋 حالة البطارية':'🔋 Battery status',
 '🗺️ خريطة الوجهات':'🗺️ Destination map','استعرض الوجهات وحدد المسار من موقعك.':'Browse destinations and view routes from your location.','📍 تحديد موقعي':'📍 My location','🌍 عرض جميع الوجهات':'🌍 Show all destinations','📌 الأقرب لموقعي':'📌 Nearest to me','📌 اختر من الخريطة':'📌 Pick on map',
 '📊 الإحصائيات':'📊 Statistics','الوجهات':'Destinations','تمت زيارتها':'Visited','الرحلات':'Trips','ملخص الاستخدام':'Usage summary','الإحصائيات مبنية على البيانات المحفوظة في جهازك.':'Statistics are based on data saved on your device.',
 'جارٍ تحميل الوجهة...':'Loading destination...','الوجهة غير موجودة':'Destination not found','❤️ مفضلة':'❤️ Favorite','🧭 الاتجاهات':'🧭 Directions','↗ مشاركة':'↗ Share','← رجوع':'← Back',
 'PWA':'PWA','Offline':'Offline','GPS':'GPS','Smart Travel':'Smart Travel','🏠 التطبيق':'🏠 App','🗺️ استكشف':'🗺️ Explore','📍 الخريطة':'📍 Map','📊 لوحة الرحّال':'📊 Rahal dashboard','المستوى':'Level','أماكن محفوظة':'Saved places','أماكن زرتها':'Visited places','خطط محفوظة':'Saved plans','🤖 Rahal AI — مخطط الرحلة':'🤖 Rahal AI — Trip planner','المدة (أيام)':'Duration (days)','الميزانية':'Budget','الاهتمام':'Interest','تاريخ':'History','طبيعة':'Nature','تصوير':'Photography','عائلي':'Family','مغامرات':'Adventure','✨ إنشاء خطة ذكية':'✨ Create smart plan','💰 Smart Budget':'💰 Smart Budget','الفندق':'Hotel','الطعام':'Food','المواصلات':'Transport','الأنشطة':'Activities','احسب':'Calculate','🏆 الإنجازات':'🏆 Achievements','🚀 جميع المميزات':'🚀 All features','🧠 التوصيات الذكية':'🧠 Smart recommendations','تستفيد من المفضلة والزيارات لإظهار أماكن جديدة.':'Uses favorites and visits to show new places.','اقترح لي':'Suggest for me','📸 AI Camera':'📸 AI Camera','واجهة تصوير جاهزة لربط التعرف على المعالم.':'Camera interface ready for landmark recognition.','فتح الكاميرا':'Open camera','🌦️ Smart Weather':'🌦️ Smart Weather','الطقس مع نصيحة مناسبة للزيارة.':'Weather with a suitable travel tip.','نصيحة الطقس':'Weather advice','🚨 Travel Safety':'🚨 Travel Safety','وصول سريع لقسم الأمان والخدمات المهمة.':'Quick access to safety and important services.','فتح الخريطة':'Open map','📶 Offline':'📶 Offline','فحص حالة الاتصال واستخدام البيانات المحلية.':'Check connection','فحص الاتصال':'Check connection','📊 Tourism Intelligence':'📊 Tourism Intelligence','تحليل النشاط والزيارات والمفضلة.':'Analyze activity, visits, and favorites.','الإحصائيات':'Statistics'
};
Object.assign(UI_EN,{'تحديد موقعي':'My location','عرض جميع الوجهات':'Show all destinations','الأقرب لموقعي':'Nearest to me','اختر من الخريطة':'Pick on map','ابحث عن مدينة أو وجهة أو معلم مثل باريس...':'Search for a city, destination, or landmark such as Paris...','جاهز — اختر موقعًا أو حدد موقعك':'Ready — choose a place or locate yourself','الآن اضغط مرة واحدة على أي مكان في الخريطة.':'Now click once anywhere on the map.','اضغط تحديد موقعي أولًا لعرض المسافة والمسار.':'Set your location first to see distance and route.','حفظ كوجهة':'Save destination','الصور والمعلومات':'Photos & info','موقع محدد':'Selected location','تم حفظ الوجهة ضمن وجهاتك.':'Destination saved to your places.','الخريطة جاهزة — جميع الوجهات ظاهرة.':'Map ready — all destinations are visible.','هذا موقعك الحالي على الخريطة.':'This is your current location on the map.','عرض جميع الوجهات — تم مسح المسار القديم.':'Showing all destinations — old route cleared.','تم تحديد موقعك.':'Your location has been set.','حان موعد الرحلة':'It is time for your trip','جاري تحميل الخريطة...':'Loading map...','الخريطة جاهزة — يمكنك التكبير والتصغير.':'Map ready — you can zoom in and out.','جارٍ تحميل الخريطة...':'Loading map...','جارٍ تجربة مصدر خريطة بديل...':'Trying an alternative map source...','تم تشغيل الخريطة المحلية الاحتياطية — ستعود الخريطة الحقيقية تلقائيًا عند توفر الإنترنت.':'Offline backup map is active — the online map will return when internet is available.','الخريطة — رحّال Explorer V63.1':'Map — Rahal Explorer V63.1','الإصدار V63.1':'Version V63.1','البطارية':'Battery','قيد الشحن':'Charging','غير متاحة':'Unavailable','معلومات البطارية غير متاحة':'Battery information is unavailable','نسبة البطارية':'Battery level','حالة الشحن':'Charging status','متبقي':'remaining','موقعك الحالي':'Your current location','طريق فعلي':'Road route','تقدير':'Estimate', 'التفاصيل':'Details','مفضلة ♡':'Favorite ♡','إزالة ❤️':'Remove ❤️','○ زيارة':'○ Visit','✓ تمت الزيارة':'✓ Visited','لا توجد نتائج.':'No results.','تم تسجيل الزيارة ✓':'Visit recorded ✓','تم إلغاء الزيارة':'Visit removed','تمت الإضافة للمفضلة ❤️':'Added to favorites ❤️','تمت الإزالة من المفضلة':'Removed from favorites','جاري جلب الطقس…':'Loading weather…','تعذر جلب الطقس الآن. تحقق من الإنترنت ومنح صلاحية الموقع ثم حاول مرة أخرى.':'Unable to load weather. Check your internet connection and location permission.','مجاني':'Free','اليوم':'Day','مسافة طريق تقريبية':'Approx. road distance','وقت تنقل تقريبي':'Approx. travel time','مواصلات تقديرية':'Estimated transport','التكلفة المقدرة':'Estimated cost','عرض الخطة':'View plan','تفعيل التنبيه':'Enable reminder','التنبيه مفعّل':'Reminder enabled','حذف':'Delete','لم تضف أي رحلة بعد.':'No trips added yet.','تم حفظ الرحلة مع جدولها اليومي ✈️':'Trip saved with its daily plan ✈️'});
const UI_AR=Object.fromEntries(Object.entries(UI_EN).map(([a,e])=>[e,a]));
function lang(){return localStorage.getItem(LANG_KEY)||'ar'}
function tx(s){const v=String(s??'').trim(); return lang()==='en'?(UI_EN[v]||v):(UI_AR[v]||v)}
const descEN={taiz:'A mountain city with beautiful nature and a distinctive atmosphere.',ibb:'A green destination known for its nature and mountains.',aden:'A coastal city combining beaches and history.',socotra:'A unique island known for its distinctive nature and biodiversity.',shibam:'A historic city famous for its tall mud-brick architecture.',sanaa:'A historic city with old markets and distinctive architecture.',paris:'A city of art, architecture, and famous cafés.',tokyo:'A striking mix of technology and Japanese culture.',dubai:'Skyscrapers, shopping, and world-class entertainment.',santorini:'A charming island with blue waters and spectacular sunsets.',newyork:'A city that never sleeps, with world-famous urban landmarks.',london:'Rich history, museums, and royal landmarks.',bali:'Tropical nature, beaches, and temples.',maldives:'Tropical islands, clear waters, and coastal resorts.',rome:'Roman Empire ruins and Italian art.',istanbul:'A city connecting Asia and Europe.',capetown:'Mountains, oceans, and beautiful nature.',barcelona:'Gaudí architecture, beaches, and Mediterranean atmosphere.',sydney:'The Opera House, harbor, and beaches.',rio:'Green mountains, beaches, and vibrant life.',cairo:'The pyramids and ancient Egyptian history.',singapore:'A modern city with gardens and urban experiences.',queenstown:'Mountains, lakes, and outdoor adventures.',reykjavik:'Volcanic landscapes, waterfalls, and northern lights.',seoul:'Modern culture, palaces, and lively markets.',lisbon:'Historic neighborhoods, cafés, and Atlantic views.'};
function destinationName(d){return lang()==='en'?(d.en||d.city):(d.city||d.en)}
function destinationCountry(d){return lang()==='en'?(countryEN[d.country]||d.country):(d.country||'')}
function destinationCategory(d){return lang()==='en'?(catEN[d.cat]||d.cat):(d.cat||'')}
function addLanguageButton(){const actions=document.querySelector('.actions');if(!actions||document.getElementById('langBtn'))return;const b=document.createElement('button');b.className='circle lang-btn';b.id='langBtn';b.type='button';b.title=lang()==='ar'?'Switch to English':'التبديل إلى العربية';b.textContent=lang()==='ar'?'EN':'ع';b.onclick=()=>{localStorage.setItem(LANG_KEY,lang()==='ar'?'en':'ar');location.reload()};actions.insertBefore(b,actions.firstElementChild);}
function applyLanguage(){const isEn=lang()==='en';document.documentElement.lang=isEn?'en':'ar';document.documentElement.dir=isEn?'ltr':'rtl';document.title=lang()==='en'?(UI_EN[document.title]||document.title.replace(' — رحّال Explorer','')+' — Rahal Explorer'):(UI_AR[document.title]||document.title.replace(' — Rahal Explorer',' — رحّال Explorer'));addLanguageButton();const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement?.closest('script,style'))continue;const raw=n.nodeValue,trim=raw.trim();if(!trim)continue;const out=tx(trim);if(out!==trim)n.nodeValue=raw.replace(trim,out)}document.querySelectorAll('[placeholder]').forEach(el=>{const v=el.getAttribute('placeholder');el.setAttribute('placeholder',tx(v))});}

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const getFav=()=>read("rahal-favorites",[]);
const getVisited=()=>read("rahal-visited",[]);
const getTrips=()=>read("rahal-trips",[]);
const getReviews=()=>read("rahal-reviews",{});
const custom=()=>read("rahal-custom-destinations",[]);
const allDestinations=()=>[...destinations,...custom()];
const toast=t=>{const e=document.createElement("div");e.className="toast";e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),2600)};
function card(d){
 const fav=getFav().includes(d.id),vis=getVisited().includes(d.id),name=destinationName(d),country=destinationCountry(d),cat=destinationCategory(d);
 const desc=lang()==='en'?(descEN[d.id]||d.enDesc||d.desc):d.desc;
 return `<article class="card destination-card" data-id="${d.id}" data-cat="${d.cat}" data-city="${d.city} ${d.en} ${d.country} ${d.cat}"><img src="${d.img}" alt="${name}" loading="lazy" onerror="this.style.display='none'"><div class="cardbody"><h3>${d.flag} ${name}</h3><div class="muted">${country} · ${cat}</div><div class="meta"><span>★ ${d.rating}</span><span>${fav?"❤️":"♡"}</span></div><p>${desc}</p><div class="card-actions"><button class="btn primary js-details" data-id="${d.id}">${tx('التفاصيل')}</button><button class="btn js-fav" data-id="${d.id}">${fav?(lang()==='en'?'Remove ❤️':'إزالة ❤️'):(lang()==='en'?'Favorite ♡':'مفضلة ♡')}</button><button class="btn js-visit" data-id="${d.id}">${vis?(lang()==='en'?'✓ Visited':'✓ تمت الزيارة'):(lang()==='en'?'○ Visit':'○ زيارة')}</button></div></div></article>`;
}

function toggleFavorite(id){const a=getFav(),i=a.indexOf(id);i<0?a.push(id):a.splice(i,1);write("rahal-favorites",a);toast(i<0?"تمت الإضافة للمفضلة ❤️":"تمت الإزالة من المفضلة");return a}
function toggleVisited(id){const a=getVisited(),i=a.indexOf(id);i<0?a.push(id):a.splice(i,1);write("rahal-visited",a);toast(i<0?"تم تسجيل الزيارة ✓":"تم إلغاء الزيارة");return a}
function openDetails(id){location.href="details.html?id="+encodeURIComponent(id)}
function bindCards(){
 $$(".js-details").forEach(b=>b.onclick=()=>openDetails(b.dataset.id));
 $$(".js-fav").forEach(b=>b.onclick=()=>{toggleFavorite(b.dataset.id);renderCards();});
 $$(".js-visit").forEach(b=>b.onclick=()=>{toggleVisited(b.dataset.id);renderCards();});
}
function renderCards(selector="#placesGrid", list=allDestinations()){const el=$(selector);if(!el)return;el.innerHTML=list.map(card).join("")||'<div class="notice full">لا توجد نتائج.</div>';bindCards()}
function distanceKm(a,b,c,d){const R=6371,p=Math.PI/180,x=(c-a)*p,y=(d-b)*p;return 2*R*Math.asin(Math.sqrt(Math.sin(x/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin(y/2)**2))}
function nearest(lat,lng){return allDestinations().map(d=>({...d,dist:distanceKm(lat,lng,d.lat,d.lng)})).sort((a,b)=>a.dist-b.dist)[0]}
function locate(cb){if(!navigator.geolocation)return toast("المتصفح لا يدعم تحديد الموقع");toast("جارٍ تحديد موقعك...");navigator.geolocation.getCurrentPosition(p=>cb(p.coords.latitude,p.coords.longitude),()=>toast("تعذر تحديد الموقع؛ اسمح بالموقع من إعدادات المتصفح"),{enableHighAccuracy:true,timeout:10000})}
function routeTo(d){locate((lat,lng)=>{write("rahal-last-location",{lat,lng,at:new Date().toISOString()});location.href=`map.html?lat=${d.lat}&lng=${d.lng}`;})}
async function share(d){const text=`رحّال Explorer — ${d.flag} ${d.city}، ${d.country}`;try{if(navigator.share)await navigator.share({title:d.city,text,url:location.href});else{await navigator.clipboard.writeText(text+" "+location.href);toast("تم نسخ الرابط")}}catch{}}
async function requestNotifications(){
 if(!("Notification" in window)) throw new Error("unsupported");
 const p=await Notification.requestPermission();
 if(p!=="granted") throw new Error("denied");
 return true;
}
async function notify(){try{await requestNotifications();new Notification("رحّال Explorer",{body:"الإشعارات مفعلة. سأذكّرك بموعد رحلاتك.",icon:"images.png",tag:"rahal-test"});toast("تم تفعيل الإشعارات 🔔")}catch(e){toast(e.message==="denied"?"لم يتم السماح بالإشعارات":"الإشعارات غير مدعومة في هذا المتصفح")}}
const REMINDER_KEY="rahal-trip-reminders";
const reminderTimers=new Map();
function reminderDate(trip){
 if(!trip?.date) return null;
 const value=`${trip.date}T${trip.time||"09:00"}`;
 const d=new Date(value);
 return Number.isNaN(d.getTime())?null:d;
}
function getReminders(){return read(REMINDER_KEY,{});}
function setReminders(v){write(REMINDER_KEY,v);}
function formatTime12(value){
 const m=String(value||'').trim().match(/^(\d{1,2}):(\d{2})$/);
 if(!m)return value||'';
 let h=Number(m[1]); const min=m[2]; const ap=h>=12?'م':'ص'; h=h%12||12; return `${h}:${min} ${ap}`;
}
function normalizeTime12(value){
 const raw=String(value||'').trim().replace(/[أإآ]/g,'ا');
 if(!raw)return '09:00';
 let m=raw.match(/^(\d{1,2})(?::(\d{2}))?\s*(ص|م|am|pm)$/i);
 if(m){ let h=Number(m[1]); const min=Number(m[2]||0); const ap=m[3].toLowerCase(); if(h<1||h>12||min>59)return '09:00'; if(ap==='م'||ap==='pm') h=h===12?12:h+12; else h=h===12?0:h; return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`; }
 m=raw.match(/^(\d{1,2}):(\d{2})$/);
 if(m){const h=Number(m[1]),min=Number(m[2]); if(h>=0&&h<=23&&min<=59)return `${String(h).padStart(2,'0')}:${m[2]}`;}
 return '09:00';
}
async function scheduleTripReminder(trip,index,showToast=true){
 const when=reminderDate(trip);
 if(!when) {toast("حدد تاريخ ووقت الرحلة أولًا");return false;}
 try{await requestNotifications();}catch(e){toast("اسمح بالإشعارات أولًا من المتصفح");return false;}
 const id=String(index); const reminders=getReminders();
 reminders[id]={at:when.toISOString(),title:trip.title,destination:trip.destination,notified:false}; setReminders(reminders);
 if(reminderTimers.has(id)) clearTimeout(reminderTimers.get(id));
 const fire=()=>{
   const current=getReminders()[id];
   if(!current || current.notified) return;
   try{
     const n=new Notification("حان موعد الرحلة ✈️",{body:`حان موعد رحلتك: ${current.title}${current.destination?` — ${current.destination}`:""}`,icon:"images.png",tag:`rahal-trip-${id}`,requireInteraction:true});
     n.onclick=()=>{window.focus?.();location.href="trips.html";};
   }catch{}
   const next=getReminders(); if(next[id]){next[id].notified=true;setReminders(next);}
   toast(`حان موعد الرحلة: ${current.title}`);
 };
 const ms=when.getTime()-Date.now();
 if(ms<=0) fire(); else {
   const wait=Math.min(ms,2147483647);
   reminderTimers.set(id,setTimeout(()=>{if(when.getTime()-Date.now()>0){scheduleTripReminder(trip,index,false);}else fire();},wait));
 }
 if(showToast) toast(`تم تفعيل تنبيه «${trip.title}» ⏰`);
 return true;
}
function scheduleSavedReminders(){
 const trips=getTrips(), reminders=getReminders(), now=Date.now();
 Object.entries(reminders).forEach(([id,r])=>{
   if(r.notified || !r.at) return;
   const ms=new Date(r.at).getTime()-now;
   const fire=()=>{
     const cur=getReminders()[id]; if(!cur||cur.notified)return;
     try{const n=new Notification("حان موعد الرحلة ✈️",{body:`حان موعد رحلتك: ${cur.title}${cur.destination?` — ${cur.destination}`:""}`,icon:"images.png",tag:`rahal-trip-${id}`,requireInteraction:true});n.onclick=()=>{window.focus?.();location.href="trips.html";};}catch{}
     const all=getReminders();if(all[id]){all[id].notified=true;setReminders(all);} toast(`حان موعد الرحلة: ${cur.title}`);
   };
   if(ms<=0) fire(); else reminderTimers.set(id,setTimeout(()=>{if(new Date(r.at).getTime()-Date.now()>0){location.reload();}else fire();},Math.min(ms,2147483647)));
 });
}

function bindGlobal(){
 const theme=$("#themeBtn");if(theme)theme.onclick=()=>{document.documentElement.classList.toggle("light");write("rahal-theme",document.documentElement.classList.contains("light")?"light":"dark")};
 const bell=$("#notifyBtn");if(bell)bell.onclick=notify;
 const search=$("[data-search]");if(search)search.oninput=()=>{const q=search.value.toLowerCase();$$(".destination-card").forEach(x=>x.style.display=x.dataset.city.toLowerCase().includes(q)?"":"none")};
 $$(".chip").forEach(b=>b.onclick=()=>{const q=b.dataset.cat||b.textContent.trim();$$(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".destination-card").forEach(x=>x.style.display=(q==="الكل"||x.dataset.cat===q)?"":"none")});
 $$("[data-gps]").forEach(b=>b.onclick=()=>locate((lat,lng)=>{write("rahal-last-location",{lat,lng,at:new Date().toISOString()});toast("تم تحديد موقعك، جارٍ فتح الخريطة...");window.location.href=`map.html?lat=${lat}&lng=${lng}&locate=1`;}));
 const savedTheme=read("rahal-theme", "light"); document.documentElement.classList.toggle("light", savedTheme === "light");
}
function setupPlaces(){renderCards("#placesGrid");const sort=$("#sort");if(sort)sort.onchange=()=>{let a=[...allDestinations()];if(sort.value==="rating")a.sort((x,y)=>y.rating-x.rating);if(sort.value==="name")a.sort((x,y)=>x.city.localeCompare(y.city,"ar"));renderCards("#placesGrid",a)}}
function setupHome(){const grid=$("#homeGrid");if(grid){grid.innerHTML=allDestinations().slice(0,8).map(card).join("");bindCards()}const n=$("#nearestBtn"),box=$("#nearestBox");if(n)n.onclick=()=>locate((lat,lng)=>{const d=nearest(lat,lng);box.innerHTML=`<b>أقرب وجهة: ${d.flag} ${d.city}</b><br>المسافة: ${d.dist.toFixed(1)} كم<br><button class="btn primary" onclick="openDetails('${d.id}')">عرض التفاصيل</button>`})}
function setupFavorites(){const list=allDestinations().filter(d=>getFav().includes(d.id));renderCards("#favGrid",list)}
function haversineKm(a,b){
 const R=6371, p=Math.PI/180;
 const dLat=(b.lat-a.lat)*p, dLon=(b.lng-a.lng)*p;
 const x=Math.sin(dLat/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(dLon/2)**2;
 return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function orderDestinations(pool){
 const left=[...pool], ordered=[];
 if(!left.length)return ordered;
 let current=left.shift(); ordered.push(current);
 while(left.length){
   let best=0,bestDist=Infinity;
   left.forEach((d,i)=>{const dist=haversineKm(current,d);if(dist<bestDist){bestDist=dist;best=i;}});
   current=left.splice(best,1)[0]; ordered.push(current);
 }
 return ordered;
}
async function roadRoute(a,b){
  const fallback={distanceKm:haversineKm(a,b),durationMin:Math.round(haversineKm(a,b)/45*60),source:'تقدير'};
  try{
    const u=`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=false&steps=false`;
    const r=await fetch(u,{headers:{'Accept':'application/json'}}); if(!r.ok) return fallback;
    const j=await r.json(); const x=j.routes&&j.routes[0]; if(!x) return fallback;
    return {distanceKm:x.distance/1000,durationMin:Math.max(1,Math.round(x.duration/60)),source:'طريق فعلي'};
  }catch{return fallback;}
}
async function buildItinerary(destinationIds, days, budget, origin){
 const pool=orderDestinations(destinationIds.map(id=>allDestinations().find(d=>d.id===id)).filter(Boolean));
 if(!pool.length)return {days:[],total:0,perDay:0,distanceKm:0,transportCost:0,routeSource:'تقدير'};
 const n=Math.max(1,Number(days)||1), perDay=budget?Math.round(budget/n):0;
 const dailyDest=Array.from({length:n},(_,i)=>pool[i%pool.length]);
 let legs=[], totalDistance=0, totalMinutes=0;
 let prev=origin||null;
 for(const d of dailyDest){
   if(prev){ const rr=await roadRoute(prev,d); legs.push({from:prev,to:d, ...rr}); totalDistance+=rr.distanceKm; totalMinutes+=rr.durationMin; }
   prev={lat:d.lat,lng:d.lng};
 }
 const transportCost=Math.round(totalDistance*120);
 const activityBase=Math.max(0,perDay-Math.round(transportCost/n));
 const baseActivities=[
  {time:'08:00',title:'الإفطار والانطلاق',cost:.12},
  {time:'10:00',title:'استكشاف المعلم الرئيسي',cost:.25},
  {time:'13:00',title:'غداء محلي',cost:.22},
  {time:'15:30',title:'جولة وتصوير',cost:.16},
  {time:'18:00',title:'غروب الشمس / جلسة هادئة',cost:.10},
  {time:'20:00',title:'عشاء والعودة',cost:.15}
 ];
 const weatherByDay=await Promise.all(dailyDest.map(async d=>{
   try{
     const w=await fetchWeather(d.lat,d.lng);
     return {code:w.daily?.weather_code?.[0]??0,max:w.daily?.temperature_2m_max?.[0],rain:w.daily?.precipitation_probability_max?.[0]??0};
   }catch{return null;}
 }));
 const plan=dailyDest.map((d,i)=>{
   const leg=legs[i], w=weatherByDay[i];
   let activities=baseActivities.map(a=>({...a,cost:Math.round(activityBase*a.cost)}));
   if(w && w.rain>=50) activities=activities.map(a=>a.title.includes('جولة وتصوير')?{...a,title:'☔ نشاط مرن/مكان داخلي'}:a.title.includes('غروب الشمس')?{...a,title:'☔ جلسة داخلية أو غروب إذا تحسن الجو'}:a);
   if(w && Number(w.max)>=38) activities=activities.map(a=>a.title.includes('استكشاف')?{...a,time:'07:30',title:'🌤️ استكشاف المعلم الرئيسي مبكرًا'}:a);
   return {day:i+1,destination:d,from:i===0?(origin?'موقعك الحالي':'نقطة الانطلاق'):dailyDest[i-1].city,
     distanceKm:leg?leg.distanceKm:0,durationMin:leg?leg.durationMin:0,
     weather:w,activities};
 });
 const activityTotal=plan.reduce((s,x)=>s+x.activities.reduce((a,b)=>a+b.cost,0),0);
 const estimatedTotal=activityTotal+transportCost;
 const total=budget?Math.min(budget,estimatedTotal):estimatedTotal;
 return {days:plan,total,perDay,distanceKm:Math.round(totalDistance),transportCost,totalMinutes,routeSource:legs.some(x=>x.source==='طريق فعلي')?'طريق فعلي':'تقدير'};
}
function itineraryHTML(trip){
 if(!trip.itinerary)return '<div class="notice">هذه رحلة قديمة بدون جدول يومي. افتح الوجهة من الرحلة لعرض الصور والمعلومات.</div>';
 const t=trip.itinerary;
 const days=t.days||[];
 return `<div class="itinerary-head"><h2>🧭 ${trip.title}</h2><div class="muted">${trip.destination} · ${trip.days||days.length} أيام${trip.date?` · ${trip.date}`:''}${trip.time?` · ${formatTime12(trip.time)}`:''}</div></div>
 <div class="stats-grid"><div class="stat"><b>${days.length}</b><span>أيام الرحلة</span></div><div class="stat"><b>${Number(t.distanceKm||0).toLocaleString('ar-YE')} كم</b><span>المسافة التقريبية</span></div><div class="stat"><b>${Math.round(Number(t.totalMinutes||0)/60)} ساعة</b><span>وقت التنقل التقريبي</span></div><div class="stat"><b>${Number(t.total||0).toLocaleString('ar-YE')} ريال</b><span>التكلفة المقدرة</span></div></div>
 <div class="trip-destination-flow">${days.map(day=>`<article class="day-plan trip-destination-card"><h3>اليوم ${day.day} — ${day.destination.flag||'📍'} ${day.destination.city}</h3><p class="muted">${day.destination.country||''} · ${day.destination.desc||''}</p>${day.weather?`<div class="notice">🌤️ ${weatherLabel(day.weather.code)} · العظمى ${day.weather.max??'—'}° · احتمال المطر ${day.weather.rain}%</div>`:''}<div class="trip-flow-actions"><a class="btn primary" href="details.html?id=${encodeURIComponent(day.destination.id)}">📍 تفاصيل الوجهة والصور</a><a class="btn" href="photos.html">🖼️ الصور</a></div></article>`).join('')}</div>
 <div class="notice"><b>ℹ️</b> عند الحاجة إلى مسار، استخدم «الأقرب لموقعي» من الخريطة؛ يظهر المسار والاتجاهات لهذا الخيار فقط.</div>`;
}
function setupTrips(){
 const form=$("#tripForm"),list=$("#tripList"),preview=$("#itineraryPreview");if(!form||!list)return;
 const draw=()=>{const trips=getTrips();list.innerHTML=trips.map((t,i)=>`<div class="trip-item"><div><b>${t.title}</b><div class="muted">${t.destination} · ${t.days||1} أيام · ${t.date||"بدون تاريخ"}${t.time?` · ${formatTime12(t.time)}`:""}</div></div><div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn primary" data-view="${i}">عرض الخطة</button>${t.date?`<button class="btn" data-remind="${i}">🔔 ${getReminders()[String(i)]&&!getReminders()[String(i)].notified?"التنبيه مفعّل":"تفعيل التنبيه"}</button>`:""}<button class="btn danger" data-del="${i}">حذف</button></div></div>`).join("")||'<div class="notice">لم تضف أي رحلة بعد.</div>';
 $$('[data-del]').forEach(b=>b.onclick=()=>{const a=getTrips();a.splice(+b.dataset.del,1);write('rahal-trips',a);draw();if(preview)preview.innerHTML='<h2>🗓️ تفاصيل الرحلة</h2><p class="muted">اختر رحلة محفوظة لعرضها.</p>';toast('تم حذف الرحلة')});
 $$('[data-view]').forEach(b=>b.onclick=()=>{const t=getTrips()[+b.dataset.view];if(preview)preview.innerHTML=itineraryHTML(t);preview?.scrollIntoView({behavior:'smooth'});});
 $$('[data-remind]').forEach(b=>b.onclick=async()=>{const t=getTrips()[+b.dataset.remind];await scheduleTripReminder(t,+b.dataset.remind);draw();});};
 draw();
 form.onsubmit=async e=>{e.preventDefault();const f=new FormData(form),title=f.get('title'),destination=f.get('destination'),days=1,budget=0,date=f.get('date'),time=normalizeTime12(f.get('time'));const ids=destination.split('→').map(x=>allDestinations().find(d=>d.city.trim()===x.trim())?.id).filter(Boolean);const itinerary=await buildItinerary(ids.length?ids:[allDestinations()[0].id],days,budget);const a=getTrips();const trip={title,destination,date,budget,days,time,itinerary};a.push(trip);write('rahal-trips',a);form.reset();draw();toast('تم حفظ الرحلة مع جدولها اليومي ✈️');if(date) scheduleTripReminder(trip,a.length-1,false);};
}

function setupAdmin(){
 const form=$("#destinationForm"),tbody=$("#adminRows");if(!form||!tbody)return;
 let editingId=null;
 const setForm=(d)=>{
   ["city","en","country","flag","lat","lng","cat","rating","img","desc"].forEach(k=>{const el=form.elements[k];if(el)el.value=d?.[k]??""});
   editingId=d?.id||null;
   const submit=form.querySelector('button[type="submit"]');
   if(submit)submit.textContent=editingId?"💾 حفظ التعديل":"➕ إضافة الوجهة";
   let cancel=form.querySelector("[data-cancel-edit]");
   if(editingId&&!cancel){
     cancel=document.createElement("button");cancel.type="button";cancel.className="btn wide";cancel.dataset.cancelEdit="1";cancel.textContent="✕ إلغاء التعديل";
     submit?.insertAdjacentElement("afterend",cancel);cancel.onclick=()=>{editingId=null;form.reset();if(submit)submit.textContent="➕ إضافة الوجهة";cancel.remove()};
   }
   if(!editingId)cancel?.remove();
   form.scrollIntoView({behavior:"smooth",block:"center"});
 };
 const draw=()=>{
   const customs=custom();
   tbody.innerHTML=allDestinations().map(d=>{
     const isCustom=!destinations.some(x=>x.id===d.id);
     const actions=isCustom
       ? `<div class="admin-row-actions"><button class="btn" data-edit="${d.id}">✏️ تعديل</button><button class="btn danger" data-remove="${d.id}">🗑️ حذف</button></div>`
       : `<span class="muted">وجهة أساسية</span>`;
     return `<tr><td>${d.flag||"📍"} ${d.city||d.name||""}</td><td>${d.country||""}</td><td>${d.cat||"—"}</td><td>${d.rating??"—"}</td><td>${isCustom?"مضاف محليًا":"أساسي"}</td><td>${actions}</td></tr>`;
   }).join("");
   $$("[data-remove]").forEach(b=>b.onclick=()=>{
     if(!confirm("هل تريد حذف هذه الوجهة؟"))return;
     write("rahal-custom-destinations",custom().filter(x=>x.id!==b.dataset.remove));
     if(editingId===b.dataset.remove){editingId=null;form.reset()}
     draw();toast("تم حذف الوجهة");
   });
   $$("[data-edit]").forEach(b=>b.onclick=()=>{
     const d=custom().find(x=>x.id===b.dataset.edit);
     if(d)setForm(d);
   });
 };
 draw();
 form.onsubmit=e=>{
   e.preventDefault();
   const f=new FormData(form);
   const d={id:editingId||"custom-"+Date.now(),city:String(f.get("city")||"").trim(),en:String(f.get("en")||"").trim(),country:String(f.get("country")||"").trim(),flag:String(f.get("flag")||"📍").trim(),lat:+f.get("lat"),lng:+f.get("lng"),cat:String(f.get("cat")||"").trim(),rating:+f.get("rating")||4.5,img:String(f.get("img")||"images.png").trim(),desc:String(f.get("desc")||"").trim()};
   const a=custom();
   if(editingId){
     const i=a.findIndex(x=>x.id===editingId);
     if(i>=0)a[i]=d;
     toast("تم تعديل الوجهة بنجاح");
   }else{a.push(d);toast("تمت إضافة الوجهة بنجاح")}
   write("rahal-custom-destinations",a);editingId=null;form.reset();
   const submit=form.querySelector('button[type="submit"]');if(submit)submit.textContent="➕ إضافة الوجهة";
   form.querySelector("[data-cancel-edit]")?.remove();
   draw();
 };
 const exportBackup=()=>{const data={favorites:read("rahal-favorites",[]),visited:read("rahal-visited",[]),trips:read("rahal-trips",[]),reviews:read("rahal-reviews",[]),custom:custom(),settings:read("rahal-settings",{})};download("rahal-backup.json",JSON.stringify(data,null,2),"application/json")};
 const exportBtn=$("#exportBtn");if(exportBtn)exportBtn.onclick=exportBackup; const exportBtn2=$("#exportBtn2");if(exportBtn2)exportBtn2.onclick=exportBackup;
 const dc=$("#adminDestinationCount"),cc=$("#adminCustomCount");if(dc)dc.textContent=allDestinations().length;if(cc)cc.textContent=custom().length;
 const importInput=$("#importInput");if(importInput)importInput.onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const d=JSON.parse(await file.text());if(d.favorites)write("rahal-favorites",d.favorites);if(d.visited)write("rahal-visited",d.visited);if(d.trips)write("rahal-trips",d.trips);if(d.reviews)write("rahal-reviews",d.reviews);if(d.custom)write("rahal-custom-destinations",d.custom);draw();if(cc)cc.textContent=custom().length;toast("تم استيراد النسخة الاحتياطية")}catch{toast("ملف النسخة الاحتياطية غير صالح")}};
}

function download(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}

function setupSmartPlanner(){
 const form=$("#smartPlanForm"),box=$("#smartPlanResult"); if(!form||!box)return;
 form.onsubmit=async e=>{e.preventDefault();const days=Math.min(14,Math.max(1,Number(form.days.value||1))),budget=0,interest=form.interest.value;let pool=allDestinations().filter(d=>d.country==='اليمن');if(interest&&interest!=='الكل')pool=pool.filter(d=>d.cat===interest);if(!pool.length)pool=allDestinations().filter(d=>d.country==='اليمن');const base=pool.slice(0,Math.min(Math.max(days,2),6));const picks=orderDestinations(base);const loc=JSON.parse(localStorage.getItem('rahal-last-location')||'null');const itinerary=await buildItinerary(picks.map(d=>d.id),days,budget,loc?{lat:loc.lat,lng:loc.lng}:null);const trip={title:`رحلة رحّال الذكية — ${picks[0]?.city||'اليمن'}`,destination:picks.map(x=>x.city).join(' → '),date:'',budget,days,itinerary};const a=getTrips();a.push(trip);write('rahal-trips',a);box.innerHTML=`<h3>🧭 خطتك اليومية جاهزة</h3><p>تم توزيع ${days} أيام على ${picks.map(x=>x.city).join('، ')}.</p><a class="btn primary" href="trips.html">✈️ افتح الخطة التفصيلية</a>`;toast('تم إنشاء خطة يومية وحفظها في رحلاتي ✨');};
}


async function fetchWeather(lat,lng){
  const url=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&timezone=auto`;
  const r=await fetch(url,{headers:{Accept:'application/json'}});
  if(!r.ok) throw new Error('weather');
  return r.json();
}
function weatherLabel(code){
 const m={0:'صحو',1:'صحو غالبًا',2:'غائم جزئيًا',3:'غائم',45:'ضباب',48:'ضباب متجمد',51:'رذاذ خفيف',53:'رذاذ',55:'رذاذ كثيف',61:'مطر خفيف',63:'مطر',65:'مطر غزير',71:'ثلج خفيف',73:'ثلج',75:'ثلج غزير',80:'زخات مطر',81:'زخات مطر',82:'زخات قوية',95:'عواصف رعدية',96:'عاصفة مع برد',99:'عاصفة قوية'};
 return m[code]||'حالة جوية متغيرة';
}
function weatherIcon(code){
 if(code===0)return '☀️'; if(code<=2)return '⛅'; if(code===3)return '☁️'; if(code===45||code===48)return '🌫️'; if(code>=51&&code<=67)return '🌧️'; if(code>=71&&code<=77)return '❄️'; if(code>=80&&code<=82)return '🌦️'; if(code>=95)return '⛈️'; return '🌤️';
}
async function reverseWeatherPlace(lat,lng){
 try{
  const u=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=10&addressdetails=1`;
  const r=await fetch(u,{headers:{Accept:'application/json'}});
  if(!r.ok)return '';
  const d=await r.json(), a=d.address||{};
  return a.city||a.town||a.municipality||a.village||a.county||a.state||'موقعك الحالي';
 }catch{return 'موقعك الحالي'}
}
async function setupWeather(){
 const box=$("#weatherBox"),btn=$("#weatherRefresh"); if(!box)return;
 let busy=false;
 const dayNames=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
 const formatDate=(iso)=>{const d=new Date(iso+(/T/.test(iso)?'':'T00:00:00'));return `${dayNames[d.getDay()]}، ${d.getDate()} ${d.toLocaleDateString('ar-YE',{month:'long'})}`};
 const formatHour=(iso)=>{const d=new Date(iso);return d.toLocaleTimeString('ar-YE',{hour:'numeric',hour12:true}).replace('ص','ص').replace('م','م')};
 const weatherImage=(place)=>{
   const d=allDestinations().find(x=>x.city===place)||allDestinations().find(x=>x.id==='sanaa');
   return d?.img||'';
 };
 const load=async(manual=false)=>{
   if(busy)return; busy=true;
   if(manual) box.innerHTML='<div class="weather-loading">جاري تحديد موقعك وتحديث الطقس…</div>';
   try{
    let loc=read("rahal-last-location",null);
    if(navigator.geolocation){
      loc=await new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(p=>{const x={lat:p.coords.latitude,lng:p.coords.longitude,at:new Date().toISOString()};write("rahal-last-location",x);res(x)},()=>loc?res(loc):rej(new Error('location')),{enableHighAccuracy:true,timeout:8000,maximumAge:120000}));
    }
    if(!loc) throw new Error('location');
    const [w,place]=await Promise.all([fetchWeather(loc.lat,loc.lng),reverseWeatherPlace(loc.lat,loc.lng)]);
    const c=w.current, min=w.daily?.temperature_2m_min?.[0], max=w.daily?.temperature_2m_max?.[0], rain=w.daily?.precipitation_probability_max?.[0]||0;
    const currentHour=w.hourly?.time?.findIndex(t=>new Date(t)>=new Date());
    const hi=currentHour>=0?currentHour:0;
    const hours=w.hourly?.time?.slice(hi,hi+7)||[];
    const hourCards=hours.map((t,i)=>`<div class="weather-hour"><b>${Math.round(w.hourly.temperature_2m[hi+i])}°</b><span>${weatherIcon(w.hourly.weather_code[hi+i])}</span><small>${formatHour(t)}</small></div>`).join('');
    const days=w.daily?.time?.slice(0,7)||[];
    const dayCards=days.map((t,i)=>`<button class="weather-day ${i===0?'active':''}" type="button"><b>${i===0?'اليوم':dayNames[new Date(t+'T00:00:00').getDay()]}</b><span>${weatherIcon(w.daily.weather_code[i])}</span><small>${Math.round(w.daily.temperature_2m_max[i])}°/${Math.round(w.daily.temperature_2m_min[i])}°</small></button>`).join('');
    let advice='الجو مناسب للزيارة والأنشطة الخارجية.';
    if(c.precipitation>0 || (c.weather_code>=51 && c.weather_code<=99)) advice='🌧️ يُفضّل الانتباه لاحتمال المطر.';
    else if(c.apparent_temperature>=38) advice='☀️ الحرارة مرتفعة؛ يفضّل الخروج صباحًا أو مساءً.';
    const updated=new Date().toLocaleTimeString('ar-YE',{hour:'numeric',minute:'2-digit'});
    const img=weatherImage(place);
    box.innerHTML=`<div class="weather-modern-card">
      <div class="weather-card-head"><div><div class="weather-date">${formatDate(w.daily?.time?.[0]||new Date().toISOString().slice(0,10))}</div><div class="weather-place">📍 ${place||'موقعك الحالي'}</div></div><div class="weather-main-icon">${weatherIcon(c.weather_code)}</div></div>
      <div class="weather-main-temp"><strong>${Math.round(c.temperature_2m)}°</strong><div><b>${weatherLabel(c.weather_code)}</b><span>العظمى ${Math.round(max)}° / الصغرى ${Math.round(min)}°</span></div></div>
      <div class="weather-hours">${hourCards}</div>
      <div class="weather-scenery" ${img?`style="background-image:url('${img}')"`:''}></div>
      <div class="weather-days">${dayCards}</div>
      <div class="weather-details">
        <div><span>🌧️</span><b>الأمطار</b><strong>${rain}%</strong></div>
        <div><span>💨</span><b>الرياح</b><strong>${Math.round(c.wind_speed_10m)} كم/س</strong></div>
        <div><span>💧</span><b>الرطوبة</b><strong>${c.relative_humidity_2m}%</strong></div>
      </div>
      <div class="weather-advice-modern">${advice}</div>
      <small class="weather-updated">آخر تحديث: ${updated}</small>
    </div>`;
   }catch(e){box.innerHTML='<div class="weather-error">تعذر تحديد موقعك أو تحديث الطقس. فعّل إذن الموقع والاتصال بالإنترنت ثم اضغط تحديث.</div>';}
   finally{busy=false;}
 };
 btn?.addEventListener('click',()=>load(true));
 load(false);
}
document.addEventListener("DOMContentLoaded",()=>{applyLanguage();bindGlobal();setupHome();setupPlaces();setupFavorites();setupTrips();setupAdmin();setupSmartPlanner();setupWeather();scheduleSavedReminders();if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})});
