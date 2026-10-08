export const business = {
  name: "MV-Vermietung",
  legalName: "MV-Vermietung",
  tagline: "Gerüst & Geräte für dein Hausprojekt",
  phone: "0163-3623280",
  phoneHref: "+491633623280",
  location: "40764 Langenfeld",
  mapsUrl: "https://maps.app.goo.gl/PXeYtEjLhdmM5ucu6",
  email: "",
  logo: "/assets/brand/logo-mv-vermietung.png",
  kleinunternehmerNote:
    "Als Kleinunternehmen wird gemäß § 19 UStG keine Umsatzsteuer ausgewiesen."
};

export const categories = [
  "Leiter & Gerüst",
  "Handwerkzeuge",
  "Garten",
  "Heizung/Solar",
  "Messen"
];

export const tools = [
  {
    slug: "rollgeruest",
    title: "Rollgerüst",
    category: "Leiter & Gerüst",
    top: true,
    popularity: 100,
    deposit: 300,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-rollgeruest-ah-bis-7-5m-geruest-krause-baugeruest-seilzug/3501057430-239-1863",
    summary:
      "Aluminium-Rollgerüst von Krause für Fassadenarbeiten, Fenster, Gartenarbeiten und Innenbereiche.",
    description:
      "Arbeitsbühne 2,50 m x 0,75 m. Verfügbar mit 5,5 m, 6,5 m oder 7,5 m Arbeitshöhe. Einfach aufzubauen und auf Rollen beweglich. Auf Anfrage ist nach Absprache auch Lieferung möglich.",
    specs: [
      "Arbeitshöhe: 5,5 m / 6,5 m / 7,5 m",
      "Standhöhe: 3,5 m / 4,5 m / 5,5 m",
      "Grundfläche aufgebaut ca. 1,97 x 2,6 m",
      "Längstes Transportteil ca. 3,12 m",
      "Mindestmietdauer Gerüst: 2 Tage"
    ],
    images: ["Rollgeruest-gesamt-7,5m-seilzug-01", "Rollgeruest-hoehen-6,5m-02", "Rollgeruest-6,5m-03", "Rollgeruest-Treppe-04", "Rollgeruest-4,5m-05", "Rollgeruest-7,5m-06", "Rollgeruest-5,5m-07", "Rollgeruest-Rollen-08", "Rollgeruest-5,5m-09", "Rollgeruest-Teile-10", "Rollgeruest-Seilzug-11", "Rollgeruest-6,5m-12"].map((name, i) => ({ src: `/assets/tools/rollgeruest/${name}.png`, alt: `Rollgerüst – Bild ${i + 1}` })),
    options: [
      {
        id: "55m",
        label: "Arbeitshöhe 5,5 m",
        dayPrice: 30,
        minimumDays: 2,
        tiers: [
          { days: 3, price: 70, label: "Wochenende Freitag bis Sonntag" },
          { days: 5, price: 120, label: "5 Tage" },
          { days: 7, price: 160, label: "Woche Montag bis Sonntag" }
        ]
      },
      {
        id: "65m",
        label: "Arbeitshöhe 6,5 m",
        dayPrice: 35,
        minimumDays: 2,
        tiers: [
          { days: 3, price: 90, label: "Wochenende Freitag bis Sonntag" },
          { days: 5, price: 140, label: "5 Tage" },
          { days: 7, price: 200, label: "Woche Montag bis Sonntag" }
        ]
      },
      {
        id: "75m",
        label: "Arbeitshöhe 7,5 m",
        dayPrice: 40,
        minimumDays: 2,
        tiers: [
          { days: 3, price: 100, label: "Wochenende Freitag bis Sonntag" },
          { days: 5, price: 160, label: "5 Tage" },
          { days: 7, price: 225, label: "Woche Montag bis Sonntag" }
        ]
      },
      {
        id: "seilzug",
        label: "Bauaufzug / Seilzug ohne Gerüst",
        dayPrice: 10,
        excludeFromStartingPrice: true,
        minimumDays: 1,
        tiers: []
      },
      {
        id: "geruest-seilzug",
        label: "Gerüst plus Seilzug",
        dayPrice: 30,
        excludeFromStartingPrice: true,
        minimumDays: 2,
        surcharge: 10,
        surchargeLabel: "Seilzug pauschal",
        tiers: [
          { days: 3, price: 70, label: "5,5 m Wochenende plus Seilzug" },
          { days: 5, price: 120, label: "5,5 m 5 Tage plus Seilzug" },
          { days: 7, price: 160, label: "5,5 m Woche plus Seilzug" }
        ]
      }
    ]
  },
  {
    slug: "ruettelplatte",
    title: "Rüttelplatte 28 cm / 12 kN / 77 kg",
    category: "Handwerkzeuge",
    top: true,
    popularity: 90,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-ruettelplatte-28cm-12kn-77kg-verdichter-stampfer-vibration/3501062930-84-1863",
    summary:
      "Kompakte Rüttelplatte für Pflaster, Wege, Höfe und Verdichtungsarbeiten rund um Haus und Garten.",
    description:
      "Vorwärts laufende Rüttelplatte mit 28 cm Arbeitsbreite, 12 kN Verdichtungskraft und ca. 77 kg Gewicht. Gut geeignet für kleinere Flächen und private Bauprojekte.",
    specs: ["Arbeitsbreite: 28 cm", "Verdichtung: 12 kN", "Gewicht: ca. 77 kg"],
    images: ["Ruettelplatte-01", "Ruettelplatte-02", "Ruettelplatte-03", "Ruettelplatte-04", "Ruettelplatte-05", "Ruettelplatte-06"].map((name, i) => ({ src: `/assets/tools/ruettelplatte/${name}.png`, alt: `Rüttelplatte 77 kg – Bild ${i + 1}` })),
    options: [
      {
        id: "standard",
        label: "Standardumfang",
        dayPrice: 25,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "abbruchhammer",
    title: "Abbruchhammer Bosch GSH 11E",
    category: "Handwerkzeuge",
    top: true,
    popularity: 85,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-stemmhammer-abbruchhammer-inkl-meissel-bosch-gsh-11e/3473169583-84-1863",
    summary:
      "Stemmhammer / Abbruchhammer inklusive Meißel für Beton, Estrich, Fliesen und Stemmarbeiten.",
    description:
      "Leistungsstarker Bosch GSH 11E für Arbeiten rund ums Haus und den Umbau. Inklusive passender Meißel, ideal für Abbruch- und Stemmarbeiten.",
    specs: ["Bosch GSH 11E", "Inklusive Meißel", "Transport im Koffer"],
    images: ["Abbruchhamer-01", "Abbruchhamer-02", "Abbruchhamer-03", "Abbruchhamer-04", "Abbruchhamer-05"].map((name, i) => ({ src: `/assets/tools/abbruchhammer/${name}.png`, alt: `Abbruchhammer – Bild ${i + 1}` })),
    options: [
      {
        id: "standard",
        label: "Abbruchhammer inkl. Meißel",
        dayPrice: 30,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "treppengeruest",
    title: "Treppengerüst",
    category: "Leiter & Gerüst",
    top: false,
    popularity: 80,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/treppengeruest-treppenleiter-geruest-anlegeleiter-buehne/3501071653-84-1863",
    summary:
      "Aluminium-Kleingerüst für Treppenhäuser, unebene Standorte und Arbeiten in der Höhe.",
    description:
      "Flexibles Treppengerüst für Innenausbau, Renovierung und Arbeiten an Treppen. Je nach Projekt kann das passende Setup angefragt werden.",
    specs: ["Aluminium-Kleingerüst", "Für Treppen und Innenbereiche", "Umfang nach Absprache"],
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
    options: [
      {
        id: "anfrage",
        label: "Umfang nach Absprache",
        dayPrice: null,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "treppenleiter",
    title: "Treppenleiter",
    category: "Leiter & Gerüst",
    top: false,
    popularity: 72,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/treppengeruest-treppenleiter-geruest-anlegeleiter-buehne/3501071653-84-1863",
    summary:
      "Treppenleiter / Anlegeleiter für Renovierung, Malerarbeiten und Arbeiten im Treppenhaus.",
    description:
      "Praktische Leiterlosung für Treppen und schwer erreichbare Stellen. Der genaue Mietumfang wird passend zum Projekt abgestimmt.",
    specs: ["Treppenhaus geeignet", "Auch als Anlegeleiter nutzbar", "Umfang nach Absprache"],
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
    options: [
      {
        id: "anfrage",
        label: "Umfang nach Absprache",
        dayPrice: null,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "hochentaster",
    title: "Hochentaster Makita DUX60",
    category: "Garten",
    top: false,
    popularity: 70,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-hochentaster-heckenschere-teleskop-kettensaege-makita-dux60/3473175019-84-1863",
    summary:
      "Makita Akku-Multitool DUX60 als Hochentaster für Baumschnitt und Gartenpflege.",
    description:
      "Akku-Multitool von Makita für Arbeiten an höheren Ästen und schwer erreichbaren Stellen im Garten. Ideal, wenn sich ein Kauf für einzelne Einsätze nicht lohnt.",
    specs: ["Makita DUX60 36 V", "Teleskop-/Hochentaster-Aufsatz", "Für Garten- und Baumschnitt"],
    images: ["hochentaster-01.png", "hochentaster-02.jpg", "hochentaster-03.png", "hochentaster-04.png", "hochentaster-05.jpg", "hochentaster-06.png", "hochentaster-07.png", "hochentaster-08.png", "akkus-DUX60.jpg", "DUX60-alles.jpg", "DUX60-alles-2.jpg"].map((file, i) => ({ src: `/assets/tools/hochentaster/${file}`, alt: `Hochentaster – Bild ${i + 1}` })),
    options: [
      {
        id: "hochentaster",
        label: "Hochentaster",
        dayPrice: 20,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "heckenschere",
    title: "Heckenschere Makita DUX60",
    category: "Garten",
    top: false,
    popularity: 68,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-hochentaster-heckenschere-teleskop-kettensaege-makita-dux60/3473175019-84-1863",
    summary:
      "Makita DUX60 als Teleskop-Heckenschere für hohe Hecken und Gartenarbeiten.",
    description:
      "Teleskop-Heckenschere für horizontale und vertikale Schnitte an höheren Hecken. Die Akku-Lösung eignet sich besonders für flexible Gartenarbeiten.",
    specs: ["Makita DUX60 36 V", "Teleskop-Heckenscheren-Aufsatz", "Für hohe Hecken"],
    images: ["heckenschere-01.png", "heckenschere-02.png", "heckenschere-03.png", "heckenschere-04.png", "heckenschere-05.png", "heckenschere-06.png", "akkus-DUX60.jpg", "DUX60-alles.jpg", "DUX60-alles-2.jpg"].map((file, i) => ({ src: `/assets/tools/heckenschere/${file}`, alt: `Heckenschere – Bild ${i + 1}` })),
    options: [
      {
        id: "heckenschere",
        label: "Heckenschere",
        dayPrice: 20,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "sense-freischneider",
    title: "Sense / Freischneider",
    category: "Garten",
    top: false,
    popularity: 66,
    deposit: 150,
    pricingMode: "garden-multifunction",
    summary: "Makita Akku-Freischneider für den Rückschnitt von Gras und leichtem Bewuchs rund um Haus und Garten.",
    description: "Angeboten wird ein Makita Akku-Multifunktionsgerät mit Freischneider-Aufsatz und Mähfaden. Die Schnittbreite mit Mähfaden beträgt ca. 42 cm.\n\nBei Bedarf können zwei Unkrautbürsten-Aufsätze mitgegeben werden: eine Drahtbürste und eine Nylonbürste.",
    specs: ["Schnittbreite mit Mähfaden: ca. 42 cm", "2 × 5-Ah-Akkus inklusive", "Doppelladegerät inklusive", "Transporttasche: ca. 120 × 25 × 30 cm", "Weiterer Arbeitsaufsatz: 10 € pro Tag"],
    notes: ["Das Gerät inklusive Zubehör wird sauber übergeben und sollte auch sauber zurückkommen. Für verschmutzte Maschinen und Geräte wird je nach Aufwand eine Reinigungspauschale berechnet."],
    images: ["sense-01.jpg", "sense-02.jpg", "sense-03.jpg", "akkus-DUX60.jpg", "DUX60-alles.jpg", "DUX60-alles-2.jpg"].map((file, i) => ({ src: `/assets/tools/sense/${file}`, alt: `Sense / Freischneider – Bild ${i + 1}` })),
    options: [{ id: "standard", label: "Sense / Freischneider", dayPrice: 20, minimumDays: 1, tiers: [] }],
    addons: [{ id: "none", label: "Ohne weiteren Arbeitsaufsatz", dayPrice: 0 }, { id: "additional", label: "Mit weiterem Arbeitsaufsatz", dayPrice: 10 }]
  },
  {
    slug: "kultivator-bodenhacke",
    title: "Kultivator / Bodenhacke",
    category: "Garten",
    top: false,
    popularity: 65,
    deposit: 150,
    pricingMode: "garden-multifunction",
    summary: "Makita Akku-Kultivator zum Auflockern und Vorbereiten von Beeten und kleineren Gartenflächen.",
    description: "Angeboten wird ein Makita Akku-Multifunktionsgerät mit Kultivator-Aufsatz. Damit lässt sich der Boden in Beeten und kleineren Gartenflächen auflockern und für die Bepflanzung vorbereiten.\n\nDie Arbeitsbreite beträgt ca. 22 cm. Der Aufsatz eignet sich besonders für kleinere Flächen und Arbeiten zwischen bestehenden Pflanzreihen.",
    specs: ["Kultivierungsbreite: ca. 22 cm", "Arbeitstiefe: ca. 22 cm", "2 × 5-Ah-Akkus inklusive", "Doppelladegerät inklusive", "Transporttasche: ca. 120 × 25 × 30 cm", "Weiterer Arbeitsaufsatz: 10 € pro Tag"],
    notes: ["Das Gerät inklusive Zubehör wird sauber übergeben und sollte auch sauber zurückkommen. Für verschmutzte Maschinen und Geräte wird je nach Aufwand eine Reinigungspauschale berechnet."],
    images: ["kultivator-01.jpg", "kultivator-02.jpg", "kultivator-03.jpg", "kultivator-04.jpg", "akkus-DUX60.jpg", "DUX60-alles.jpg", "akkus-DUX60-2.jpg"].map((file, i) => ({ src: `/assets/tools/kultivator/${file}`, alt: `Kultivator / Bodenhacke – Bild ${i + 1}` })),
    options: [{ id: "standard", label: "Kultivator / Bodenhacke", dayPrice: 20, minimumDays: 1, tiers: [] }],
    addons: [{ id: "none", label: "Ohne weiteren Arbeitsaufsatz", dayPrice: 0 }, { id: "additional", label: "Mit weiterem Arbeitsaufsatz", dayPrice: 10 }]
  },
  {
    slug: "rasenkantenschneider",
    title: "Rasenkantenschneider",
    category: "Garten",
    top: false,
    popularity: 63,
    deposit: 150,
    pricingMode: "garden-multifunction",
    summary: "Makita Akku-Rasenkantenschneider für saubere Kanten entlang von Wegen, Beeten und Rasenflächen.",
    description: "Angeboten wird ein Makita Akku-Multifunktionsgerät mit Rasenkantenschneider-Aufsatz. Das Metallmesser schneidet eine klare Rasenkante entlang von Wegen, Beeten und anderen Abgrenzungen.\n\nDie Einrad-Führungshilfe unterstützt beim Führen des Geräts entlang der Kante.",
    specs: ["Metallmesser mit ca. 20 cm Durchmesser", "Einrad-Führungshilfe", "2 × 5-Ah-Akkus inklusive", "Doppelladegerät inklusive", "Transporttasche: ca. 120 × 25 × 30 cm", "Weiterer Arbeitsaufsatz: 10 € pro Tag"],
    notes: ["Das Gerät inklusive Zubehör wird sauber übergeben und sollte auch sauber zurückkommen. Für verschmutzte Maschinen und Geräte wird je nach Aufwand eine Reinigungspauschale berechnet."],
    images: ["rasenkante-01.jpg", "rasenkante-02.jpg", "rasenkante-03.jpg", "akkus-DUX60.jpg", "DUX60-alles.jpg", "akkus-DUX60-2.jpg"].map((file, i) => ({ src: `/assets/tools/rasenkante/${file}`, alt: `Rasenkantenschneider – Bild ${i + 1}` })),
    options: [{ id: "standard", label: "Rasenkantenschneider", dayPrice: 20, minimumDays: 1, tiers: [] }],
    addons: [{ id: "none", label: "Ohne weiteren Arbeitsaufsatz", dayPrice: 0 }, { id: "additional", label: "Mit weiterem Arbeitsaufsatz", dayPrice: 10 }]
  },
  {
    slug: "spuelstation-solarthermie",
    title: "Spül- und Befüllstation",
    seoTitle: "Spül- und Befüllstation",
    heading: "Spülstation für Heizung & Solar",
    category: "Heizung/Solar",
    top: false,
    popularity: 64,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-befuellstation-spuelstation-solarthermie-fussbodenheizung/3473172205-239-1863",
    summary:
      "Die Station eignet sich zum Spülen, Befüllen und Entlüften geschlossener Heizkreise – zum Beispiel bei Fußbodenheizungen, Wandheizungen und Solaranlagen.",
    description:
      "Die Station besteht aus einem stabilen Wagen mit Pumpe, 30-Liter-Behälter, Schläuchen, Filter und Absperrhahn.",
    specs: ["Für Fußbodenheizungen, Wandheizungen und Solaranlagen", "Spülen, Befüllen und Entlüften geschlossener Heizkreise", "Abholung in Langenfeld"],
    images: ["spuelstation-01.jpg", "spuelstation-02.jpg", "spuelstation-03.jpg", "spuelstation-04.jpg", "spuelstation-05.jpg", "spuelstation-06.jpg"].map((file, i) => ({ src: `/assets/tools/spuelstation/${file}`, alt: `Spülstation – Bild ${i + 1}` })),
    options: [
      {
        id: "standard",
        label: "Spül- und Befüllstation",
        dayPrice: 30,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "zimmergeruest",
    title: "Zimmergerüst",
    category: "Leiter & Gerüst",
    top: false,
    popularity: 58,
    deposit: 150,
    summary:
      "Kompaktes KRAUSE-Alu-Faltgerüst für Innenarbeiten, Decken, Wände, Malerarbeiten und Renovierungen.",
    description:
      "Das kompakte Zimmergerüst eignet sich besonders für Arbeiten im Innenbereich. Durch die klappbare Grundeinheit lässt es sich schnell aufbauen, einfach verschieben und platzsparend transportieren.\n\nMit einer Arbeitshöhe von ca. 2,90 m ist es praktisch für Arbeiten an Decken, Wänden und höher gelegenen Stellen. Die gebremsten Fahrrollen ermöglichen ein einfaches Verfahren auf ebenen Flächen.",
    specs: [
      "Arbeitshöhe bis ca. 2,90 m",
      "Plattformhöhe ca. 0,90 m",
      "Gerüsthöhe ca. 1,80 m",
      "Arbeitsbühne ca. 2,00 m × 0,60 m",
      "Belastbarkeit bis 200 kg/m²",
      "Klappbare Grundeinheit",
      "Gebremste Fahrrollen",
      "Für Innen- und Außenarbeiten geeignet",
      "Mindestmietdauer: 1 Tag",
      "Transportmaß im gefalteten Zustand: ca. 2,15 m Länge × 1,00 m Breite × 0,35 m Tiefe",
      "Gewicht ca. 39 kg"
    ],
    notes: [
      "Das Gerüst wird sauber übergeben und sollte auch sauber zurückgegeben werden. Bei starker Verschmutzung kann eine Reinigungsgebühr anfallen.",
      "Bei Abholung bring bitte einen gültigen Personalausweis sowie die Kaution und die Kosten für die Mietdauer mit.",
      "Die Kaution beträgt 150,00 €.",
      "Ein Miettag entspricht 24 Stunden. Es erfolgt keine minutengenaue Abrechnung.",
      "Vor Ort gibt es eine Einweisung mit den wichtigsten Punkten zur Bedienung und Handhabung. Auch während der Mietzeit bin ich bei Fragen oder Problemen erreichbar.",
      "Für den Aufbau wird keine Haftung übernommen. Der Aufbau und die Nutzung müssen entsprechend der Aufbau- und Verwendungsanleitung erfolgen.",
      "Abholung und Anlieferung sind ausschließlich nach Absprache möglich."
    ],
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "MV-Vermietung – Platzhalter für Zimmergerüst-Fotos" }],
    pricingMode: "staged",
    options: [
      {
        id: "standard",
        label: "Zimmergerüst",
        dayPrice: 15,
        minimumDays: 1,
        tiers: []
      }
    ]
  },
  {
    slug: "stromzange",
    title: "Stromzange",
    category: "Messen",
    top: false,
    popularity: 54,
    deposit: 50,
    summary: "Stromzange für Gleich- und Wechselstrommessungen an elektrischen Anlagen, Photovoltaikanlagen und Fahrzeugen.",
    description: "Angeboten wird eine digitale Stromzange für vielseitige Messungen rund um Haus, Fahrzeug und elektrische Anlagen. Durch die Zangenmessung können Ströme berührungslos gemessen werden, ohne die Leitung zu trennen. Die Stromzange eignet sich unter anderem für Messungen an Photovoltaikanlagen, Fahrzeugen, Batterien und elektrischen Verbrauchern. Auch kleine Ströme, zum Beispiel bei der Ruhestrommessung am Fahrzeug, können damit geprüft werden.",
    specs: [
      "Gleich- und Wechselstrommessung bis 300 A",
      "Gleichstrom: 10 mA bis 300 A",
      "Wechselstrom: 100 mA bis 300 A",
      "Gleichspannung: 0,1 mV bis 600 V",
      "Wechselspannung: 1 mV bis 600 V",
      "Widerstand: 0,1 Ω bis 40 MΩ",
      "Maximale Zangenöffnung: ca. 25 mm",
      "Messfunktionen HOLD und MAX"
    ],
    images: [
      { src: "/assets/tools/stromzange/stromzange-01.png", alt: "Stromzange – Bild 1" },
      { src: "/assets/tools/stromzange/stromzange-02.png", alt: "Stromzange – Bild 2" },
      { src: "/assets/tools/stromzange/stromzange-03.png", alt: "Stromzange – Bild 3" },
      { src: "/assets/tools/stromzange/stromzange-04.png", alt: "Stromzange – Bild 4" }
    ],
    options: [
      { id: "standard", label: "Stromzange", dayPrice: 5, minimumDays: 1, tiers: [] }
    ]
  },
  {
    slug: "anwaermbrenner",
    title: "Anwärmbrenner/Gasbrenner",
    category: "Garten",
    top: false,
    popularity: 52,
    deposit: 50,
    pricingMode: "staged",
    summary: "Anwärmbrenner für Abflamm-, Anwärm- und Dacharbeiten sowie zur Unkraut- und Moosbeseitigung.",
    description: "Angeboten wird ein Anwärmbrenner für Arbeiten rund um Haus, Garten und Baustelle. Der Brenner eignet sich zum Erwärmen, Abflammen und Verschweißen sowie für Arbeiten an Bitumenbahnen, Folien, Teer und Dachisolierungen. Auch zum Auftauen gefrorener Leitungen sowie zur chemiefreien Unkraut- und Moosbeseitigung kann der Brenner eingesetzt werden.",
    specs: [
      "Flammentemperatur bis ca. 1.060 °C",
      "Brennerkopf ca. 60 mm",
      "Gasdruck bis maximal 4 bar",
      "Gasverbrauch bis ca. 8 kg/h",
      "5 m Propangasschlauch",
      "Brennerkopf mit Flammenstabilisator",
      "Einstellbare Flamme",
      "Ergonomischer Griff"
    ],
    notes: [
      "Das Gerät wird sauber übergeben und sollte auch sauber zurückgegeben werden. Bei starker Verschmutzung kann eine Reinigungsgebühr anfallen.",
      "Bei Abholung bring bitte einen gültigen Personalausweis sowie die Kaution und die Kosten für die Mietdauer mit.",
      "Die Kaution beträgt 50,00 €.",
      "Ein Miettag entspricht 24 Stunden. Es erfolgt keine minutengenaue Abrechnung.",
      "Vor Ort gibt es eine Einweisung mit den wichtigsten Punkten zur Bedienung und Handhabung. Auch während der Mietzeit bin ich bei Fragen oder Problemen erreichbar.",
      "Bei Arbeiten mit offener Flamme bitte auf ausreichenden Abstand zu brennbaren Materialien achten.",
      "Abholung und Anlieferung sind ausschließlich nach Absprache möglich."
    ],
    images: [
      { src: "/assets/tools/anwaermbrenner/anwaermbrenner-01.jpg", alt: "Anwärmbrenner – Bild 1" },
      { src: "/assets/tools/anwaermbrenner/anwaermbrenner-02.jpg", alt: "Anwärmbrenner – Bild 2" },
      { src: "/assets/tools/anwaermbrenner/anwaermbrenner-03.jpg", alt: "Anwärmbrenner – Bild 3" }
    ],
    options: [
      { id: "standard", label: "Anwärmbrenner/Gasbrenner", dayPrice: 5, minimumDays: 1, tiers: [] }
    ]
  },
  {
    slug: "akku-schlagschrauber",
    title: "Akku-Schlagschrauber",
    category: "Handwerkzeuge",
    pricingMode: "schlagschrauber",
    top: false,
    popularity: 55,
    deposit: 150,
    summary: "Bosch Professional Akku-Schlagschrauber mit 1/2″-Aufnahme und bis zu 350 Nm Drehmoment für Arbeiten rund um Haus, Garage und Fahrzeug.",
    description: "Angeboten wird ein Bosch Professional Akku-Schlagschrauber mit 1/2″-Werkzeugaufnahme.\n\nMit bis zu 350 Nm Drehmoment eignet sich das Gerät zum Lösen und Anziehen von Schrauben und Muttern. Die drei Drehmomentstufen ermöglichen eine passende Einstellung für unterschiedliche Arbeiten. Das maximale Losbrechmoment liegt bei bis zu 560 Nm.",
    specs: ["Max. Drehmoment: 350 Nm", "Max. Losbrechmoment: 560 Nm", "Drei Drehmomentstufen: 85 / 200 / 350 Nm", "Leerlaufdrehzahl bis 2.300 U/min", "Schlagzahl bis 3.400/min", "Werkzeugaufnahme: 1/2″-Vierkant"],
    includedTitle: "Schlagnüsse",
    included: ["Ein Schlagnuss-Set nach Wahl ist im Mietpreis enthalten.", "Beide Sets können zusammen gegen eine Pauschale von 5,00 € mitgemietet werden."],
    notes: ["Das Gerät wird sauber übergeben und sollte auch sauber zurückgegeben werden. Bei starker Verschmutzung kann eine Reinigungsgebühr anfallen.", "Bei Abholung bring bitte einen gültigen Personalausweis sowie die Kaution und die Kosten für die Mietdauer mit.", "Die Kaution beträgt 150,00 €.", "Ein Miettag entspricht 24 Stunden. Es erfolgt keine minutengenaue Abrechnung.", "Vor Ort gibt es eine Einweisung mit den wichtigsten Punkten zur Bedienung und Handhabung. Auch während der Mietzeit bin ich bei Fragen oder Problemen erreichbar.", "Bei sicherheitsrelevanten Schraubverbindungen, zum Beispiel an Fahrzeugen, sollte der abschließende Anzug immer mit einem passenden Drehmomentschlüssel erfolgen.", "Abholung und Anlieferung sind ausschließlich nach Absprache möglich."],
    images: [
      { src: "/assets/tools/akku-schlagschrauber/schlagschrauber-01.jpg", alt: "Akku-Schlagschrauber mit Schlagnuss-Sets – Bild 1" },
      { src: "/assets/tools/akku-schlagschrauber/schlagschrauber-02.jpg", alt: "Akku-Schlagschrauber und Zubehör – Bild 2" },
      { src: "/assets/tools/akku-schlagschrauber/schlagschrauber-03.jpg", alt: "Akku-Schlagschrauber im Koffer – Bild 3" },
      { src: "/assets/tools/akku-schlagschrauber/schlagschrauber-04.jpg", alt: "Akku-Schlagschrauber – Bild 4" }
    ],
    options: [{ id: "standard", label: "Akku-Schlagschrauber", dayPrice: 15, minimumDays: 1, tiers: [] }],
    addons: [{ id: "set", label: "Ein Schlagnuss-Set nach Wahl inklusive", surcharge: 0 }, { id: "both", label: "Beide Schlagnuss-Sets", surcharge: 5 }]
  },
  {
    slug: "handstampfer",
    title: "Handstampfer 15 kg",
    category: "Garten",
    pricingMode: "staged",
    top: false,
    popularity: 53,
    deposit: 50,
    summary: "Zum Verdichten kleiner Flächen, Kanten und schmaler Stellen.",
    description: "Handstampfer für Verdichtungsarbeiten an kleinen Flächen, Kanten und schmalen Stellen.",
    specs: ["Gewicht: ca. 15 kg"],
    images: [
      { src: "/assets/tools/handstampfer/handstampfer-01.jpg", alt: "Handstampfer 15 kg – Bild 1" },
      { src: "/assets/tools/handstampfer/handstampfer-02.jpg", alt: "Handstampfer 15 kg – Bild 2" }
    ],
    options: [{ id: "standard", label: "Handstampfer 15 kg", dayPrice: 5, minimumDays: 1, tiers: [] }]
  }
];
