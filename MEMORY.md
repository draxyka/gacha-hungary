# Project Memory

## feedback-translation-fixes

**Ne futtasd újra a translate scriptet kis javításokhoz — kézzel írd át a JSON-t**

Ha a fordításban kis hiba van (pl. egy szó rosszul fordult, hiányzik a glossaryból), NE futtasd újra az `npm run translate` scriptet — ez DeepL tokent pazarol.

**Miért:** A DeepL token véges, minden fordítás költséges.

**How to apply:** Kézzel szerkeszd a `src/features/news/translations/wuthering-waves.json` fájlt a releváns articleId kulcsnál. Csak akkor futtasd a scriptet, ha teljesen új cikkek fordítandók vagy nagy glossary-változás történt.
