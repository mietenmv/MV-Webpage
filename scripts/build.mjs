import { mkdir, copyFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { business, categories, tools } from "../src/data/tools.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const siteBase = process.env.SITE_BASE || "";
const publicUrl = (url) => `${siteBase}${url}`;
const isToolPhoto = (url) => url.includes("/assets/tools/");
const imageVariant = (url, width) => isToolPhoto(url) ? url.replace(/\.(?:png|jpe?g)$/i, `-${width}.webp`) : url;
const imageSet = (url) => (isToolPhoto(url) ? [640, 1600]
  .map((width) => `${publicUrl(imageVariant(url, width)).replaceAll(",", "%2C")} ${width}w`)
  .join(", ") : `${publicUrl(url)} 640w`);
const publicDir = path.join(root, "public");
const toolsDir = path.join(dist, "werkzeuge");

const euro = (value) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

const htmlEscape = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slugUrl = (slug) => `${siteBase}/werkzeuge/${slug}/`;
const fromRoot = (pagePath) => {
  const parts = pagePath.split("/").filter(Boolean);
  return parts.length === 0 ? "." : Array(parts.length).fill("..").join("/");
};

function lowestPrice(tool) {
  const prices = tool.options
    .filter((option) => !option.excludeFromStartingPrice)
    .map((option) => option.dayPrice)
    .filter((price) => Number.isFinite(price));
  return prices.length ? Math.min(...prices) : null;
}

function jsonData(tool) {
  return htmlEscape(JSON.stringify(tool));
}

function layout({ title, description, page = "/", body, extraClass = "" }) {
  const prefix = fromRoot(page);
  const canonical = `${siteBase}${page}`;
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${htmlEscape(title)}</title>
  <meta name="description" content="${htmlEscape(description)}">
  <link rel="icon" type="image/svg+xml" href="${prefix}/assets/brand/favicon.svg">
  <link rel="stylesheet" href="${prefix}/styles.css">
  <script defer src="${prefix}/app.js"></script>
  <link rel="canonical" href="${canonical}">
</head>
<body class="${extraClass}">
  <header class="site-header">
    <a class="brand" href="${prefix}/">
      <img src="${prefix}${business.logo}" alt="${business.name} Logo">
      <span>
        <strong>${business.name}</strong>
        <small>${business.location}</small>
      </span>
    </a>
    <nav aria-label="Hauptnavigation">
      <a href="${prefix}/werkzeuge/">Werkzeuge</a>
      <a href="${prefix}/#kontakt">Kontakt</a>
      <a href="${business.mapsUrl}">Route</a>
    </nav>
    <a class="header-phone" href="tel:${business.phoneHref}">${business.phone}</a>
  </header>
  <main>
    ${body}
  </main>
  <footer class="site-footer">
    <div>
      <strong>${business.name}</strong>
      <p>${business.location} · Werkzeugverleih für Haus, Garten und Renovierung.</p>
    </div>
    <div class="footer-links">
      <a href="tel:${business.phoneHref}">${business.phone}</a>
      <a href="${whatsAppUrl("Hallo, ich möchte ein Werkzeug mieten.")}">WhatsApp</a>
      <a href="${prefix}/impressum/">Impressum</a>
      <a href="${prefix}/datenschutz/">Datenschutz</a>
    </div>
  </footer>
  <div class="mobile-contact" aria-label="Schnellkontakt">
    <a href="tel:${business.phoneHref}">Anrufen</a>
    <a href="${whatsAppUrl("Hallo, ich möchte ein Werkzeug mieten.")}">WhatsApp</a>
    <a href="${prefix}/werkzeuge/">Werkzeuge</a>
  </div>
</body>
</html>`;
}

function whatsAppUrl(message) {
  return `https://wa.me/${business.phoneHref.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

function toolCard(tool, featured = false) {
  const price = lowestPrice(tool);
  return `<article class="tool-card${featured ? " featured-card" : ""}" data-category="${htmlEscape(tool.category)}" data-title="${htmlEscape(tool.title.toLowerCase())}" data-price="${price ?? 999999}" data-popularity="${tool.popularity}">
    <a href="${slugUrl(tool.slug)}" class="tool-card-media">
      <img src="${publicUrl(imageVariant(tool.images[0].src, 640))}" srcset="${imageSet(tool.images[0].src)}" sizes="(max-width: 760px) 92vw, 320px" alt="${htmlEscape(tool.images[0].alt)}" loading="lazy" decoding="async">
    </a>
    <div class="tool-card-body">
      <span class="pill">${htmlEscape(tool.category)}</span>
      <h3><a href="${slugUrl(tool.slug)}">${htmlEscape(tool.title)}</a></h3>
      <p>${htmlEscape(tool.summary)}</p>
      <div class="card-meta">
        <strong>${price ? `ab ${euro(price)} / Tag` : "Preis auf Anfrage"}</strong>
        ${Number.isFinite(tool.deposit) ? `<span>Kaution ${euro(tool.deposit)}</span>` : "<span>Kaution auf Anfrage</span>"}
      </div>
      <a class="text-link" href="${slugUrl(tool.slug)}">Details ansehen</a>
    </div>
  </article>`;
}

function contactSection(context = "", tool = null) {
  const isDynamicDetailContact = ["stromzange", "anwaermbrenner", "handstampfer", "akku-schlagschrauber", "zimmergeruest"].includes(tool?.slug);
  const contactCopy = isDynamicDetailContact
    ? "Schreib kurz, welches Werkzeug du brauchst und für welchen Zeitraum. Nutze dafür gerne die vorgefertigte Nachricht im Kontaktformular, mit wenigen Klicks sind alle benötigten Infos enthalten. Bei Abholung bitte Kaution, Mietpreis und Personalausweis einplanen."
    : "Schreib kurz, welches Werkzeug du brauchst und für wie viele Tage. Bei Abholung bitte Kaution und Mietpreis einplanen.";
  const remainingToolNames = [
    "Rüttelplatte 77 kg",
    "Abbruchhammer 10,1 kg",
    "Treppengerüst",
    "Treppenleiter",
    "Hochentaster Makita DUX60",
    "Heckenschere Makita DUX60",
    "Spülstation für Solarthermie",
    "Zimmergerüst",
    "Akku-Schlagschrauber",
    "Stromzange",
    "Handstampfer 15 kg",
    "Anwärmbrenner/Gasbrenner"
  ].filter((name) => name !== tool?.title);
  const prioritizedTools = [tool?.title, "Rollgerüst", ...remainingToolNames].filter(Boolean);
  const toolRequestForm = `<form class="contact-form" data-contact-form data-contact-mode="${tool?.slug || "stromzange"}">
      <label>Werkzeug
        <select name="tool" data-default-tool="${htmlEscape(tool?.title || "Stromzange")}">
          <option value="">Bitte Werkzeug auswählen</option>
          ${prioritizedTools.map((name, index) => `<option value="${htmlEscape(name)}" data-popularity="${200 - index}"${name === tool?.title ? " selected" : ""}>${htmlEscape(name)}</option>`).join("")}
        </select>
      </label>
      ${tool?.slug === "akku-schlagschrauber" ? `<label data-schlagschrauber-option-field>Schlagnüsse
        <select name="rental-option"><option value="set">Ein Schlagnuss-Set nach Wahl inklusive</option><option value="both">Beide Schlagnuss-Sets (+5,00 € pauschal)</option></select>
      </label>` : ""}
      <label>Lieferung
        <select name="delivery" data-delivery-option>
          <option value="pickup">Abholung</option>
          <option value="delivery">Lieferung</option>
        </select>
      </label>
      <fieldset class="date-range">
        <legend>Mietzeitraum</legend>
        <label>Von<input type="date" name="start-date" data-start-date required></label>
        <label>Bis<input type="date" name="end-date" data-end-date required></label>
      </fieldset>
      <label>Nachricht<textarea name="message" rows="6" placeholder="Die Nachricht wird nach Auswahl automatisch vorbereitet.">Hallo MV-Vermietung,

ich interessiere mich für die Miete von ${htmlEscape(tool?.title || "Stromzange")}.

Mein gewünschter Mietzeitraum wäre vom [TT.MM.JJ] bis zum [TT.MM.JJ] ([Anzahl Tage] Tage).

Über eine kurze Rückmeldung würde ich mich freuen.</textarea></label>
      <p class="form-error" data-form-error role="alert" hidden></p>
      <div class="form-actions">
        <button class="btn whatsapp" type="submit" data-channel="whatsapp">Per WhatsApp vorbereiten</button>
        <button class="btn secondary" type="submit" data-channel="mailto">Als E-Mail vorbereiten</button>
      </div>
      <p class="form-note">Das Formular öffnet deine WhatsApp- oder E-Mail-App. Es speichert keine Daten.</p>
    </form>`;
  const regularForm = `<form class="contact-form" data-contact-form>
      <label>Werkzeug
        <input name="tool" value="${htmlEscape(context)}" placeholder="z.B. Rollgerüst">
      </label>
      <label>Mietdauer
        <input name="days" placeholder="z.B. 3 Tage">
      </label>
      <label>Nachricht
        <textarea name="message" rows="4" placeholder="Kurze Beschreibung deines Projekts"></textarea>
      </label>
      <div class="form-actions">
        <button class="btn primary" type="submit" data-channel="whatsapp">Per WhatsApp vorbereiten</button>
        <button class="btn secondary" type="submit" data-channel="mailto">Als E-Mail vorbereiten</button>
      </div>
      <p class="form-note">Das Formular öffnet deine WhatsApp- oder E-Mail-App. Es speichert keine Daten.</p>
    </form>`;
  return `<section class="contact-band" id="kontakt">
    <div>
      <span class="eyebrow">Schnell anfragen</span>
      <h2>Am einfachsten per Telefon oder WhatsApp.</h2>
      <p>${contactCopy}</p>
      <div class="cta-row">
        <a class="btn primary" href="tel:${business.phoneHref}">${business.phone}</a>
        <a class="btn whatsapp" href="${whatsAppUrl(context || "Hallo, ich möchte ein Werkzeug mieten.")}">WhatsApp schreiben</a>
        <a class="btn ghost" href="${business.mapsUrl}">Route planen</a>
      </div>
    </div>
    ${isDynamicDetailContact ? toolRequestForm : regularForm}
  </section>`;
}

function homePage() {
  const topTools = tools.filter((tool) => tool.top).slice(0, 3);
  const body = `<section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">Werkzeugverleih in Langenfeld</span>
      <h1>${business.name}</h1>
      <p class="lead">Gerüst und Geräte für dein Hausprojekt: unkompliziert mieten, lokal abholen und bei Fragen direkt anrufen.</p>
      <div class="hero-phone">
        <span>Direkt erreichbar</span>
        <a href="tel:${business.phoneHref}">${business.phone}</a>
      </div>
      <div class="cta-row">
        <a class="btn primary" href="tel:${business.phoneHref}">Jetzt anrufen</a>
        <a class="btn whatsapp" href="${whatsAppUrl("Hallo, ich interessiere mich für eine Werkzeugmiete.")}">WhatsApp</a>
        <a class="btn ghost" href="${siteBase}/werkzeuge/">Alle Werkzeuge</a>
      </div>
    </div>
    <div class="hero-logo">
      <img src="${publicUrl(business.logo)}" alt="${business.name} Logo">
    </div>
  </section>
  <section class="quick-tools">
    <div class="section-heading">
      <span class="eyebrow">Oft angefragt</span>
      <h2>Beliebte Werkzeuge direkt oben.</h2>
      <a class="text-link" href="${siteBase}/werkzeuge/">Zur kompletten Werkzeugübersicht</a>
    </div>
    <div class="tool-grid top-grid">${topTools.map((tool) => toolCard(tool, true)).join("")}</div>
  </section>
  <section class="info-strip">
    <article><strong>Lokal</strong><span>Abholung in ${business.location}</span></article>
    <article><strong>Transparent</strong><span>Preisrechner mit Kaution auf Detailseiten</span></article>
    <article><strong>Direkt</strong><span>Telefon und WhatsApp stehen im Vordergrund</span></article>
  </section>
  ${contactSection("Hallo, ich möchte ein Werkzeug mieten.")}`;
  return layout({
    title: `${business.name} | Werkzeugverleih in Langenfeld`,
    description: "Werkzeug, Gerüste und Gartengerate in Langenfeld mieten. Telefon und WhatsApp im Fokus.",
    page: "/",
    body
  });
}

function overviewPage() {
  const body = `<section class="page-hero compact">
    <span class="eyebrow">Werkzeugübersicht</span>
    <h1>Werkzeug mieten in Langenfeld</h1>
    <p>Filtere nach Kategorie, suche nach Werkzeugen und sortiere nach Beliebtheit oder Preis.</p>
  </section>
  <section class="catalog-controls" aria-label="Werkzeuge filtern">
    <label>Suche
      <input type="search" id="tool-search" placeholder="Rollgerüst, Rüttelplatte ...">
    </label>
    <label>Kategorie
      <select id="category-filter">
        <option value="all">Alle Kategorien</option>
        ${categories.map((category) => `<option value="${htmlEscape(category)}">${htmlEscape(category)}</option>`).join("")}
      </select>
    </label>
    <label>Sortierung
      <select id="sort-tools">
        <option value="popularity">Beliebtheit</option>
        <option value="price">Preis aufsteigend</option>
        <option value="category">Kategorie</option>
      </select>
    </label>
  </section>
  <section class="tool-grid catalog-grid" id="tool-list">
    ${tools.map((tool) => toolCard(tool)).join("")}
  </section>
  <p class="empty-state" id="empty-tools" hidden>Kein Werkzeug passt zu deiner Auswahl. Ruf gern an, oft findet sich trotzdem eine Lösung.</p>
  ${contactSection("Hallo, ich habe eine Frage zu einem Werkzeug.")}`;
  return layout({
    title: `Werkzeuge mieten | ${business.name}`,
    description: "Alle Werkzeuge von M.V. - Vermietung mit Filter, Suche und Sortierung.",
    page: "/werkzeuge/",
    body,
    extraClass: "catalog-page"
  });
}

function calculator(tool) {
  const hasKnownPrice = tool.options.some((option) => Number.isFinite(option.dayPrice));
  const noSelectableExtras = ["stromzange", "anwaermbrenner", "zimmergeruest"].includes(tool.slug);
  const isSchlagschrauber = tool.slug === "akku-schlagschrauber";
  if (!hasKnownPrice) {
    return `<section class="calculator inquiry-only">
      <span class="eyebrow">Preisberechnung</span>
      <h2>Preis bitte kurz anfragen</h2>
      <p>Der passende Umfang hangt bei diesem Werkzeug vom Projekt ab. Ruf an oder schreib per WhatsApp, dann bekommst du schnell ein konkretes Angebot.</p>
      <div class="cta-row">
        <a class="btn primary" href="tel:${business.phoneHref}">${business.phone}</a>
        <a class="btn whatsapp" href="${whatsAppUrl(`Hallo, ich interessiere mich für ${tool.title}.`)}">WhatsApp Anfrage</a>
      </div>
    </section>`;
  }
  return `<section class="calculator" data-calculator data-tool="${jsonData(tool)}">
    <span class="eyebrow">Preisrechner</span>
    <h2>${tool.slug === "anwaermbrenner" ? "Preisrechner Anwärmbrenner" : tool.slug === "stromzange" ? "Preisrechner Stromzange" : tool.slug === "zimmergeruest" ? "Preisrechner Zimmergerüst" : "Mietdauer auswählen"}</h2>
    <div class="calculator-grid">
      ${isSchlagschrauber
        ? `<label>Schlagnüsse<select data-treppenleiter-additional>${tool.addons.map((addon) => `<option value="${htmlEscape(addon.id)}">${htmlEscape(addon.id === "both" ? "Beide Schlagnuss-Sets (+5,00 € pauschal)" : "Ein Schlagnuss-Set nach Wahl inklusive")}</option>`).join("")}</select></label>`
        : noSelectableExtras
        ? `<input type="hidden" value="${htmlEscape(tool.options[0].id)}" data-option>`
        : `<label>Option / Umfang<select data-option>${tool.options.map((option) => `<option value="${htmlEscape(option.id)}">${htmlEscape(option.label)}</option>`).join("")}</select></label>`}
      ${isSchlagschrauber ? `<input type="hidden" value="${htmlEscape(tool.options[0].id)}" data-option>` : ""}
      <label>Anzahl Tage
        <input type="number" min="1" value="${tool.options[0].minimumDays || 1}" data-days>
      </label>
    </div>
    <div class="price-result" data-result aria-live="polite"></div>
    <div class="cta-row">
      <a class="btn primary" href="tel:${business.phoneHref}">${business.phone}</a>
      <a class="btn whatsapp" href="${whatsAppUrl(`Hallo, ich interessiere mich für ${tool.title}.`)}" data-price-whatsapp>WhatsApp Anfrage</a>
    </div>
  </section>`;
}

function toolGallery(tool) {
  const count = tool.images.length;
  return `<div class="gallery" data-gallery aria-label="Bildergalerie">
    <div class="gallery-main">
      <button class="gallery-arrow gallery-prev" type="button" aria-label="Vorheriges Bild" data-gallery-prev>‹</button>
      <figure class="gallery-stage">
        <button class="gallery-image-button" type="button" aria-label="Bild vergrößern" data-gallery-open>
          <img src="${publicUrl(imageVariant(tool.images[0].src, 640))}" srcset="${imageSet(tool.images[0].src)}" sizes="(max-width: 760px) 92vw, 48vw" alt="${htmlEscape(tool.images[0].alt)}" data-gallery-image fetchpriority="high" decoding="async">
        </button>
      </figure>
      <button class="gallery-arrow gallery-next" type="button" aria-label="Nächstes Bild" data-gallery-next>›</button>
    </div>
    <div class="gallery-toolbar"><span data-gallery-counter>1 / ${count}</span><span>Zum Vergrößern anklicken</span></div>
    <div class="gallery-sources" data-gallery-sources>
      ${tool.images.map((image) => `<img alt="${htmlEscape(image.alt)}" data-src="${publicUrl(imageVariant(image.src, 640))}" data-srcset="${imageSet(image.src)}" data-sizes="(max-width: 760px) 92vw, 48vw" data-gallery-item>`).join("")}
    </div>
    <div class="gallery-lightbox" data-gallery-lightbox hidden role="dialog" aria-modal="true" aria-label="Bildergalerie Vollbild">
      <button class="gallery-lightbox-close" type="button" aria-label="Vollbildansicht schließen" data-gallery-close>×</button>
      <button class="gallery-arrow gallery-prev" type="button" aria-label="Vorheriges Bild" data-gallery-lightbox-prev>‹</button>
      <figure class="gallery-lightbox-stage"><img alt="" data-gallery-lightbox-image></figure>
      <button class="gallery-arrow gallery-next" type="button" aria-label="Nächstes Bild" data-gallery-lightbox-next>›</button>
      <span class="gallery-lightbox-counter" data-gallery-lightbox-counter>1 / ${count}</span>
    </div>
  </div>`;
}

function toolPage(tool) {
  const price = lowestPrice(tool);
  const body = `<section class="tool-detail-hero">
    <div>
      <a class="back-link" href="${siteBase}/werkzeuge/">Alle Werkzeuge</a>
      <span class="pill">${htmlEscape(tool.category)}</span>
      <h1>${tool.slug === "anwaermbrenner" ? "Anwärmbrenner<br>/ Gasbrenner" : htmlEscape(tool.title)}</h1>
      <p class="lead">${htmlEscape(tool.summary)}</p>
      <div class="detail-meta">
        <strong>${price ? `ab ${euro(price)} / Tag` : "Preis auf Anfrage"}</strong>
        <span>${Number.isFinite(tool.deposit) ? `Kaution ${euro(tool.deposit)}` : "Kaution auf Anfrage"}</span>
      </div>
      <div class="cta-row">
        <a class="btn primary" href="tel:${business.phoneHref}">${business.phone}</a>
        <a class="btn whatsapp" href="${whatsAppUrl(`Hallo, ich interessiere mich für ${tool.title}.`)}">WhatsApp</a>
      </div>
    </div>
    ${toolGallery(tool)}
  </section>
  <section class="detail-content">
    <article class="copy-block">
      <h2>Beschreibung</h2>
      <p>${htmlEscape(tool.description).replace(/\n\n/g, "</p><p>")}</p>
      <h2>Details</h2>
      <ul>${tool.specs.map((spec) => `<li>${htmlEscape(spec)}</li>`).join("")}</ul>
      ${tool.included?.length ? `<h2>${htmlEscape(tool.includedTitle || "Inklusive")}</h2>${tool.included.map((item) => `<p>${htmlEscape(item)}</p>`).join("")}` : ""}
      ${tool.notes?.length ? `<h2>Weitere Hinweise</h2>${tool.notes.map((note) => `<p>${htmlEscape(note)}</p>`).join("")}` : ""}
      ${tool.sourceUrl ? `<p class="source-note">Weitere Originalangaben stammen aus der bestehenden Kleinanzeigen-Anzeige.</p>` : ""}
    </article>
    ${calculator(tool)}
  </section>
  ${contactSection(`Hallo, ich interessiere mich für ${tool.title}.`, tool)}`;
  return layout({
    title: `${tool.title} mieten | ${business.name}`,
    description: `${tool.title} in Langenfeld mieten. Preisrechner, Kaution und schnelle Anfrage per Telefon oder WhatsApp.`,
    page: `/werkzeuge/${tool.slug}/`,
    body,
    extraClass: "detail-page"
  });
}

function legalPage(kind) {
  const isPrivacy = kind === "datenschutz";
  const title = isPrivacy ? "Datenschutz" : "Impressum";
  const body = isPrivacy
    ? `<section class="page-hero compact legal">
        <h1>Datenschutz</h1>
        <p>Diese statische Website speichert keine Kontaktformulardaten und nutzt keine Datenbank.</p>
      </section>
      <section class="legal-copy">
        <h2>Allgemeine Hinweise</h2>
        <p>Beim Aufruf einer Website werden technisch notwendige Zugriffsdaten durch den Hostinganbieter verarbeitet. Diese Daten sind erforderlich, um die Seite auszuliefern.</p>
        <h2>Kontaktaufnahme</h2>
        <p>Kontakt erfolgt direkt per Telefon, WhatsApp oder E-Mail-App. Das Formular auf dieser Website bereitet nur eine Nachricht in deiner App vor und überträgt selbst keine Daten an einen Server dieser Website.</p>
        <h2>Externe Links</h2>
        <p>Links zu WhatsApp, Google Maps und Kleinanzeigen fuhren zu externen Anbietern. Dort gelten die Datenschutzbestimmungen des jeweiligen Dienstes.</p>
        <h2>Verantwortlicher</h2>
        <p>${business.legalName}, ${business.location}. Bitte vollständige Anschrift und E-Mail-Adresse vor Veröffentlichung ergänzen.</p>
      </section>`
    : `<section class="page-hero compact legal">
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 TMG.</p>
      </section>
      <section class="legal-copy">
        <h2>Anbieter</h2>
        <p><strong>${business.legalName}</strong><br>${business.location}<br><mark>Bitte vollständige ladungsfähige Anschrift ergänzen.</mark></p>
        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:${business.phoneHref}">${business.phone}</a><br>E-Mail: <mark>Bitte E-Mail-Adresse ergänzen.</mark></p>
        <h2>Umsatzsteuer</h2>
        <p>${business.kleinunternehmerNote}</p>
        <h2>Hinweis</h2>
        <p>Die aus Kleinanzeigen ableitbaren Daten reichen nicht sicher für ein vollständiges Impressum. Die markierten Angaben sollten vor der Veröffentlichung geprüft und erganzt werden.</p>
      </section>`;
  return layout({
    title: `${title} | ${business.name}`,
    description: `${title} von ${business.name}.`,
    page: `/${kind}/`,
    body,
    extraClass: "legal-page"
  });
}

async function copyPublic(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  for (const entry of await readdir(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyPublic(src, dest);
    } else {
      await copyFile(src, dest);
    }
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(toolsDir, { recursive: true });
await copyPublic(publicDir, dist);
await writeFile(path.join(dist, "index.html"), homePage());
await mkdir(path.join(dist, "werkzeuge"), { recursive: true });
await writeFile(path.join(dist, "werkzeuge", "index.html"), overviewPage());
for (const tool of tools) {
  const pageDir = path.join(toolsDir, tool.slug);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, "index.html"), toolPage(tool));
}
for (const page of ["impressum", "datenschutz"]) {
  const pageDir = path.join(dist, page);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, "index.html"), legalPage(page));
}

console.log(`Built ${tools.length + 4} pages into ${path.relative(root, dist)}`);
