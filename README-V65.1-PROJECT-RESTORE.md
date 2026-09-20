# Rahal V65.1 — Project Restore + Destination Controls

V65.1 restores the complete V64.3 project package (HTML, CSS, JavaScript, map scripts, auth, service worker, manifest, etc.) and applies only the destination-control visual change requested for V65.

## Fix
- Restored missing project assets/scripts from V64.3.
- Kept all existing map functionality.
- Kept the four map actions: تحديد موقعي، عرض جميع الوجهات، الأقرب لموقعي، اختر وجهة.
- Styled the four actions as compact horizontal map controls instead of large stacked cards.
- Moved the new CSS into `<head>` so the HTML remains structurally valid.
