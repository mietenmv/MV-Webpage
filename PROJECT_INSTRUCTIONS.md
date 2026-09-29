# M.V. - Vermietung Website: Projekt-Instructions

Dieses Projekt ist eine statische Website für **M.V. - Vermietung** in Langenfeld. Zweck: Werkzeugverleih lokal präsentieren, Telefon/WhatsApp sehr prominent machen und Werkzeuge mit Detailseiten, Preisrechner und Kontaktmöglichkeit zeigen.

## Aktueller Stand

- Techstack: statische Website ohne Datenbank und ohne externe Runtime-Dependencies.
- Build-Ausgabe liegt in `dist/`.
- Quell-Dateien:
  - `src/data/tools.js`: zentrale Datenquelle für Unternehmen, Kategorien und Werkzeuge.
  - `scripts/build.mjs`: generiert alle HTML-Seiten nach `dist/`.
  - `public/styles.css`: komplettes Styling.
  - `public/app.js`: Filter, Sortierung, Preisrechner und statisches Kontaktformular.
  - `public/assets/brand/logo-mv-vermietung.png`: Logo-Datei der Website.
  - `public/assets/brand/favicon.svg`: Favicon der Website.
  - `public/assets/tools/`: vorgesehener Ordner für spätere Werkzeugfotos.
- Lokale Vorschau:
  - Build: `npm run build`
  - Preview: `npm start`
  - URL: `http://127.0.0.1:4173/`

## Inhalt und Business-Daten

- Unternehmen: `M.V. - Vermietung`
- Standort: `40764 Langenfeld`
- Telefon: `0163-3623280`
- WhatsApp: über `https://wa.me/491633623280`
- Google Maps: `https://maps.app.goo.gl/PXeYtEjLhdmM5ucu6`
- Fokus der Website: Telefon und WhatsApp vor Kontaktformular.
- Kontaktformular ist statisch: es öffnet WhatsApp oder die E-Mail-App, speichert aber keine Daten.
- Style: modern, industriell, blau/weiß/dunkelgrau passend zum Logo.

## Seitenstruktur

Generierte Seiten:

- `/` Startseite
- `/werkzeuge/` Werkzeugübersicht mit Suche, Filter und Sortierung
- `/werkzeuge/rollgeruest/`
- `/werkzeuge/ruettelplatte/`
- `/werkzeuge/treppengeruest/`
- `/werkzeuge/treppenleiter/`
- `/werkzeuge/hochentaster/`
- `/werkzeuge/heckenschere/`
- `/werkzeuge/spuelstation-solarthermie/`
- `/werkzeuge/abbruchhammer/`
- `/werkzeuge/zimmergeruest/`
- `/impressum/`
- `/datenschutz/`

## Werkzeugdaten

Alle Werkzeuge werden in `src/data/tools.js` gepflegt. Neue Werkzeuge sollten dort ergänzt werden. Danach `npm run build` ausführen.

Aktuell enthalten:

- Rollgerüst
- Rüttelplatte
- Treppengerüst
- Treppenleiter
- Hochentaster
- Heckenschere
- Spülstation für Solarthermie
- Abbruchhammer
- Zimmergerüst

Top-Werkzeuge auf der Startseite:

- Rollgerüst
- Rüttelplatte
- Abbruchhammer

Kategorien:

- Leiter & Gerüst
- Handwerkzeuge
- Garten
- Heizung/Solar

## Preisrechner

Der Preisrechner wird aus den `options` eines Werkzeugs generiert.

Wichtige Felder:

- `dayPrice`: Standardpreis pro Tag.
- `minimumDays`: Mindestmietdauer.
- `tiers`: nichtlineare Staffelpreise, z.B. Wochenende, 5 Tage, Woche.
- `deposit`: Kaution auf Werkzeugebene.
- `excludeFromStartingPrice`: Option nicht für den Karten-Startpreis verwenden, z.B. Zusatzoptionen.

Aktuelles Verhalten:

- Mietpreis wird dynamisch berechnet.
- Kaution wird separat gezeigt.
- Gesamtbetrag wird als bei Abholung fälliger Betrag angezeigt.
- `Effektiv pro Tag` wird als dezente Nebeninfo angezeigt und aus Mietpreis geteilt durch berechnete Tage berechnet, ohne Kaution.
- Werkzeuge ohne vollständige Preisdaten zeigen „Preis bitte kurz anfragen“ statt erfundener Preise.

Rollgerüst-Staffeln:

- 5,5 m: 30 €/Tag, 70 € Wochenende, 120 € für 5 Tage, 160 € pro Woche, Kaution 300 €.
- 6,5 m: 35 €/Tag, 90 € Wochenende, 140 € für 5 Tage, 200 € pro Woche, Kaution 300 €.
- 7,5 m: 40 €/Tag, 100 € Wochenende, 160 € für 5 Tage, 225 € pro Woche, Kaution 300 €.
- Seilzug: 10 €/Tag ohne Gerüst oder 10 € pauschal als Zusatz.

## Quellen

Kleinanzeigen-Links aus dem Auftrag wurden als Inhaltsquelle verwendet:

- Rollgerüst: `https://www.kleinanzeigen.de/s-anzeige/mieten-rollgeruest-ah-bis-7-5m-geruest-krause-baugeruest-seilzug/3501057430-239-1863`
- Treppengerüst/Treppenleiter: `https://www.kleinanzeigen.de/s-anzeige/treppengeruest-treppenleiter-geruest-anlegeleiter-buehne/3501071653-84-1863`
- Rüttelplatte: `https://www.kleinanzeigen.de/s-anzeige/mieten-ruettelplatte-28cm-12kn-77kg-verdichter-stampfer-vibration/3501062930-84-1863`
- Hochentaster/Heckenschere: `https://www.kleinanzeigen.de/s-anzeige/mieten-hochentaster-heckenschere-teleskop-kettensaege-makita-dux60/3473175019-84-1863`
- Spülstation: `https://www.kleinanzeigen.de/s-anzeige/mieten-befuellstation-spuelstation-solarthermie-fussbodenheizung/3473172205-239-1863`
- Abbruchhammer: `https://www.kleinanzeigen.de/s-anzeige/mieten-stemmhammer-abbruchhammer-inkl-meissel-bosch-gsh-11e/3473169583-84-1863`

## Rechtliches

Impressum und Datenschutz sind angelegt, aber noch nicht veröffentlichungsfertig.

Offene Pflichtangaben:

- vollständige ladungsfähige Anschrift
- E-Mail-Adresse, wahrscheinlich später `info@mv-vermietung.de`, falls Domain und Mailhosting eingerichtet sind

Kleinunternehmer-Hinweis ist bereits eingeplant:

> Als Kleinunternehmen wird gemäß § 19 UStG keine Umsatzsteuer ausgewiesen.

## Offene Punkte / Nächste Schritte

- Echte Produktbilder je Werkzeug vor dem Hochladen komprimieren, unter `public/assets/tools/` ablegen und dann in `src/data/tools.js` referenzieren.
- Vollständige Preisdaten und Kautionen für alle Werkzeuge prüfen/ergänzen.
- Impressum mit vollständiger Anschrift und E-Mail-Adresse finalisieren.
- Datenschutz final prüfen, sobald Hostinganbieter und ggf. Domain/E-Mail feststehen.
- Domain und E-Mail einrichten, falls `info@mv-vermietung.de` genutzt werden soll.
- Optional: weitere ca. 3 Werkzeuge ergänzen, um auf ca. 12 Detailseiten zu kommen.
- Optional: echte YouTube-Videos je Werkzeug ergänzen, falls vorhanden.
- Optional: Website veröffentlichen/hosting konfigurieren.

## Wichtige Hinweise für spätere Bearbeitung

- Nicht direkt in `dist/` arbeiten; `dist/` wird durch `npm run build` überschrieben.
- Sichtbare Inhalte, Preise und Kategorien zuerst in `src/data/tools.js` ändern.
- Layout und Design in `public/styles.css` ändern.
- Interaktionen und Preisrechner in `public/app.js` ändern.
- Produktbilder niemals als Handy-Originale ins Repository legen. Vorher auf ca. 1600 px Breite verkleinern und als WebP oder gut komprimiertes JPG exportieren; Zielgröße grob 200-600 KB pro Bild.
- Originalfotos außerhalb des Repositories aufbewahren; ins Repo gehören nur optimierte Webbilder.
- Nach jeder Änderung `npm run build` ausführen.
- Für Vorschau `npm start` starten und `http://127.0.0.1:4173/` öffnen.
