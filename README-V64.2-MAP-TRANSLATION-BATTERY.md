# Rahal V64.2 — Map entry, translation and battery fixes

## Changes
- Map page now opens in an immersive, map-first layout with the world and destinations visible immediately.
- Map controls are compact and do not block the main map view.
- Expanded bilingual translations for map controls, statuses, route messages and common dynamic text.
- Map dynamic messages now use the selected Arabic/English language instead of remaining Arabic after switching to English.
- Battery information now opens a clear modal with a large percentage, progress bar and charging status instead of a small toast.
- If the browser does not expose the Battery Status API, the modal explicitly explains that exact battery information is unavailable to the web page.
- JavaScript syntax checked with Node.js after changes.

## Note about Google Maps
The project still does not include a Google Maps API key. The map-first screen therefore uses the existing Leaflet/OpenStreetMap implementation and its offline fallback. This avoids the Google "API KEY REQUIRED" screen when no key is configured.
