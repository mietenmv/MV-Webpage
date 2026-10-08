import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteBase = "https://mvvermietung-langenfeld.de";
const specialDescriptions = {
  "index.html": "Werkzeug, Gerüste und Gartengeräte in Langenfeld mieten. Preise ansehen und direkt per Telefon oder WhatsApp bei MV-Vermietung anfragen.",
  "werkzeuge/index.html": "Werkzeuge und Geräte in Langenfeld mieten: Gerüste, Rüttelplatte, Leitern und Gartengeräte. Angebote entdecken und direkt anfragen.",
  "werkzeuge/akku-schlagschrauber/index.html": "Akku-Schlagschrauber in Langenfeld mieten. Preise und Kaution ansehen und direkt bei MV-Vermietung anfragen.",
  "werkzeuge/anwaermbrenner/index.html": "Anwärmbrenner und Gasbrenner in Langenfeld mieten. Preise ansehen und direkt per Telefon oder WhatsApp anfragen.",
  "werkzeuge/handstampfer/index.html": "Handstampfer in Langenfeld mieten. Preise und Kaution ansehen und direkt bei MV-Vermietung anfragen.",
  "werkzeuge/stromzange/index.html": "Stromzange in Langenfeld mieten. Preise und Kaution ansehen und direkt bei MV-Vermietung anfragen.",
  "werkzeuge/spuelstation-solarthermie/index.html": "Spül- und Befüllstation für Fußbodenheizungen, Wandheizungen und Solaranlagen. Geeignet zum Spülen, Befüllen und Entlüften geschlossener Heizkreise."
};
const specialTitles = {
  "werkzeuge/spuelstation-solarthermie/index.html": "Spül- und Befüllstation"
};

async function findHtml(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await findHtml(fullPath));
    else if (entry.name === "index.html") results.push(fullPath);
  }
  return results;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

const pages = [];
for (const file of await findHtml(dist)) {
  const relative = path.relative(dist, file).replaceAll(path.sep, "/");
  const contentPath = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
  const canonical = `${siteBase}${contentPath}`;
  let html = await readFile(file, "utf8");
  const titleMatch = html.match(/<title>(.*?)<\/title>/s);
  if (!titleMatch) throw new Error(`Missing title: ${relative}`);
  let title = titleMatch[1];
  if (specialTitles[relative]) title = specialTitles[relative];
  else if (relative === "index.html") title = "Werkzeugverleih in Langenfeld | MV-Vermietung";
  else if (relative === "werkzeuge/index.html") title = "Werkzeug & Geräte mieten in Langenfeld | MV-Vermietung";
  else if (relative.startsWith("werkzeuge/") && !relative.endsWith("werkzeuge/index.html")) {
    title = `${title.replace(/\s*\|\s*MV-Vermietung$/, "").replace(/\s+in Langenfeld$/, "")} in Langenfeld | MV-Vermietung`;
  }
  html = html.replace(titleMatch[0], `<title>${title}</title>`);

  const descriptionMatch = html.match(/<meta name="description" content="(.*?)">/s);
  const description = specialDescriptions[relative] || descriptionMatch?.[1] || `${title.replace(/\s+\|\s+MV-Vermietung$/, "")}. Mietpreise ansehen und direkt per Telefon oder WhatsApp anfragen.`;
  const descriptionTag = `<meta name="description" content="${escapeAttribute(description)}">`;
  if (descriptionMatch) html = html.replace(descriptionMatch[0], descriptionTag);
  else html = html.replace(/<title>.*?<\/title>/s, (match) => `${match}\n  ${descriptionTag}`);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MV-Vermietung",
    telephone: "+491633623280",
    url: `${siteBase}/`,
    image: `${siteBase}/assets/brand/logo-mv-vermietung.png`,
    logo: `${siteBase}/assets/brand/logo-mv-vermietung.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Stettiner Str. 18",
      addressLocality: "Langenfeld",
      addressRegion: "Nordrhein-Westfalen",
      postalCode: "40764",
      addressCountry: "DE"
    },
    email: "mv.vermietung18@gmail.com",
    areaServed: { "@type": "City", name: "Langenfeld" }
  };
  // Clear previous generated tags first so re-running this script stays idempotent.
  html = html
    .replace(/^\s*<meta name="robots"[^>]*>\s*$/gm, "")
    .replace(/^\s*<meta property="og:[^"]+"[^>]*>\s*$/gm, "")
    .replace(/^\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*$/gm, "");
  const metadata = [
    `<link rel="canonical" href="${canonical}">`,
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${escapeAttribute(title)}">`,
    `<meta property="og:description" content="${escapeAttribute(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<script type="application/ld+json">${JSON.stringify(businessSchema).replaceAll("<", "\\u003c")}</script>`
  ].join("\n  ");
  if (/  <link rel="canonical" href="[^"]*">/.test(html)) {
    html = html.replace(/  <link rel="canonical" href="[^"]*">/, `  ${metadata}`);
  } else {
    html = html.replace("</head>", `  ${metadata}\n</head>`);
  }
  await writeFile(file, html);
  pages.push(canonical);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteBase}/sitemap.xml\n`);
console.log(`Added Google search metadata to ${pages.length} existing pages without rebuilding the site.`);
