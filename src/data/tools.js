export const business = {
  name: "M.V. - Vermietung",
  legalName: "M.V. - Vermietung",
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
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
    slug: "spuelstation-solarthermie",
    title: "Spülstation für Solarthermie",
    category: "Heizung/Solar",
    top: false,
    popularity: 64,
    deposit: null,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-befuellstation-spuelstation-solarthermie-fussbodenheizung/3473172205-239-1863",
    summary:
      "Befüll- und Spülstation für Solarthermie, Fußbodenheizung und geschlossene Heizsysteme.",
    description:
      "Spül- und Befüllstation für Solaranlagen, Solarthermie, Fußbodenheizung und Heizkreise. Geeignet zum Spülen, Entlüften und Befüllen.",
    specs: ["Für Solarthermie und Fußbodenheizung", "Befüllen, Spülen, Entlüften", "Abholung in Langenfeld"],
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
    options: [
      {
        id: "standard",
        label: "Spülstation",
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
    deposit: 300,
    sourceUrl:
      "https://www.kleinanzeigen.de/s-anzeige/mieten-rollgeruest-ah-bis-7-5m-geruest-krause-baugeruest-seilzug/3501057430-239-1863",
    summary:
      "Kompaktes Gerüst für Innenarbeiten, Decken, Wände, Malerarbeiten und Renovierung.",
    description:
      "Das Rollgerüst kann je nach Aufbau auch als Zimmergerüst für Innenbereiche genutzt werden. Praktisch für Arbeiten an Decken, Wänden und höher gelegenen Stellen.",
    specs: ["Innenbereich geeignet", "Arbeitsbühne 2,50 m x 0,75 m", "Aufbau nach Projektbedarf"],
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "M.V. - Vermietung Logo" }],
    options: [
      {
        id: "zimmer",
        label: "Zimmergerüst",
        dayPrice: 30,
        minimumDays: 2,
        tiers: [
          { days: 3, price: 70, label: "Wochenende" },
          { days: 5, price: 120, label: "5 Tage" },
          { days: 7, price: 160, label: "Woche" }
        ]
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "MV-Vermietung Logo" }],
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
    images: [{ src: "/assets/brand/logo-mv-vermietung.png", alt: "MV-Vermietung Logo" }],
    options: [{ id: "standard", label: "Handstampfer 15 kg", dayPrice: 5, minimumDays: 1, tiers: [] }]
  }
];
