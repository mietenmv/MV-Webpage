const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const phone = "491633623280";

// Die Review-Version wird direkt aus dem dist-Ordner geöffnet. Absolute Pfade
// würden unter file:// auf das Laufwerksverzeichnis zeigen; deshalb werden sie
// hier auf den Ordner der gebauten Website zurückgeführt.
function makeFilePreviewLinksPortable() {
  if (window.location.protocol !== "file:") return;

  const appScript = document.querySelector('script[src$="app.js"]');
  if (!appScript) return;
  const siteRoot = new URL(".", appScript.src);

  document.querySelectorAll('[href^="/"], [src^="/"]').forEach((element) => {
    const attribute = element.hasAttribute("href") ? "href" : "src";
    const originalPath = element.getAttribute(attribute);
    if (originalPath) element.setAttribute(attribute, new URL(originalPath.slice(1), siteRoot).href);
  });
  document.querySelectorAll('[data-src^="/"]').forEach((element) => {
    const originalPath = element.getAttribute("data-src");
    if (originalPath) element.setAttribute("data-src", new URL(originalPath.slice(1), siteRoot).href);
  });
  document.querySelectorAll("[srcset], [data-srcset]").forEach((element) => {
    for (const attribute of ["srcset", "data-srcset"]) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const portable = value.split(",").map((candidate) => {
        const [url, ...descriptor] = candidate.trim().split(/\s+/);
        const resolved = url.startsWith("/") ? new URL(url.slice(1), siteRoot).href : url;
        return [resolved, ...descriptor].join(" ");
      }).join(", ");
      element.setAttribute(attribute, portable);
    }
  });
}

function initKnowledgeNavigation() {
  document.querySelectorAll('.site-header a[href*="#ueber-uns"], .mobile-contact a[href*="#ueber-uns"]').forEach((link) => {
    link.href = link.getAttribute("href").replace("#ueber-uns", "#gut-zu-wissen");
    link.textContent = "Gut zu wissen";
  });
}

function initGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const sources = [...gallery.querySelectorAll("[data-gallery-item]")].map((image) => ({
      src: image.dataset.src || image.getAttribute("src"),
      srcSet: image.dataset.srcset || image.getAttribute("srcset"),
      sizes: image.dataset.sizes || image.getAttribute("sizes"),
      alt: image.getAttribute("alt") || "Rollgerüst"
    }));
    if (!sources.length) return;

    const image = gallery.querySelector("[data-gallery-image]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    const lightbox = gallery.querySelector("[data-gallery-lightbox]");
    const lightboxImage = gallery.querySelector("[data-gallery-lightbox-image]");
    const lightboxCounter = gallery.querySelector("[data-gallery-lightbox-counter]");
    const openButton = gallery.querySelector("[data-gallery-open]");
    const closeButton = gallery.querySelector("[data-gallery-close]");
    let currentIndex = 0;
    let touchStartX = null;
    let lastFocusedElement = null;

    function render() {
      const current = sources[currentIndex];
      if (current.sizes) image.sizes = current.sizes;
      if (current.srcSet) image.srcset = current.srcSet;
      else image.removeAttribute("srcset");
      image.src = current.src;
      image.alt = current.alt;
      counter.textContent = `${currentIndex + 1} / ${sources.length}`;
      if (lightboxImage && !lightbox.hidden) {
        if (current.srcSet) lightboxImage.srcset = current.srcSet;
        else lightboxImage.removeAttribute("srcset");
        lightboxImage.sizes = "100vw";
        lightboxImage.src = current.src;
        lightboxImage.alt = current.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${sources.length}`;
      }
    }

    function showImage(nextIndex) {
      currentIndex = (nextIndex + sources.length) % sources.length;
      render();
    }

    function openLightbox() {
      lastFocusedElement = document.activeElement;
      lightbox.hidden = false;
      document.body.classList.add("gallery-open");
      render();
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove("gallery-open");
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    gallery.querySelector("[data-gallery-prev]").addEventListener("click", () => showImage(currentIndex - 1));
    gallery.querySelector("[data-gallery-next]").addEventListener("click", () => showImage(currentIndex + 1));
    openButton.addEventListener("click", openLightbox);
    closeButton.addEventListener("click", closeLightbox);
    gallery.querySelector("[data-gallery-lightbox-prev]").addEventListener("click", () => showImage(currentIndex - 1));
    gallery.querySelector("[data-gallery-lightbox-next]").addEventListener("click", () => showImage(currentIndex + 1));

    gallery.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    gallery.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 50) showImage(currentIndex + (distance < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });

    render();
  });
}

function encodeMessage(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function calculateOption(option, days) {
  if (!Number.isFinite(option.dayPrice)) return null;
  const minimumDays = option.minimumDays || 1;
  const billableDays = Math.max(days, minimumDays);
  const exactTier = (option.tiers || []).find((tier) => tier.days === billableDays);
  if (exactTier) {
    return {
      days: billableDays,
      rent: exactTier.price + (option.surcharge || 0),
      label: exactTier.label
    };
  }

  const weeklyTier = (option.tiers || []).find((tier) => tier.days === 7);
  if (weeklyTier && billableDays > 7) {
    const fullWeeks = Math.floor(billableDays / 7);
    const restDays = billableDays % 7;
    return {
      days: billableDays,
      rent: fullWeeks * weeklyTier.price + restDays * option.dayPrice + (option.surcharge || 0),
      label: `${fullWeeks} Woche(n) plus ${restDays} Tag(e)`
    };
  }

  return {
    days: billableDays,
    rent: billableDays * option.dayPrice + (option.surcharge || 0),
    label: "Tagespreis"
  };
}

function calculateRollgeruestOption(option, days, ropeMode) {
  const billableDays = Math.max(days, 2);
  let dailyRate = option.dayPrice;
  let stage = "Tagespreis";

  if (billableDays >= 3) {
    dailyRate *= 0.9;
    stage = "3-Tagespreis";
  }
  if (billableDays >= 5) {
    dailyRate *= 0.9;
    stage = "5-Tagespreis";
  }
  if (billableDays >= 7) {
    dailyRate *= 0.96;
    stage = "Wochenpreis";
  }
  if (billableDays >= 14) {
    dailyRate *= 0.96;
    stage = "2-Wochenpreis";
  }

  const surcharge = ropeMode === "rope" && option.id !== "seilzug" ? 10 : 0;
  const rent = Math.round((dailyRate * billableDays + surcharge) / 5) * 5;
  return {
    days: billableDays,
    rent,
    effectiveDayPrice: dailyRate,
    stage,
    optionLabel: ropeMode === "rope" ? "Mit Seilzug (+10 € Pauschal)" : "Ohne Seilzug"
  };
}

function calculateRuettelplatteOption(option, days, addon) {
  const billableDays = Math.max(days, 1);
  let dailyRate = option.dayPrice;
  let stage = "Tagespreis";
  if (billableDays >= 3) {
    dailyRate *= 0.9;
    stage = "3-Tagespreis";
  }
  if (billableDays >= 5) {
    dailyRate *= 0.9;
    stage = "5-Tagespreis";
  }
  if (billableDays >= 7) {
    dailyRate *= 0.96;
    stage = "Wochenpreis";
  }
  if (billableDays >= 14) {
    dailyRate *= 0.96;
    stage = "2-Wochenpreis";
  }
  const surcharge = Number(addon?.surcharge) || 0;
  const rent = Math.round((dailyRate * billableDays + surcharge) / 5) * 5;
  return {
    days: billableDays,
    rent,
    effectiveDayPrice: dailyRate,
    stage,
    optionLabel: addon?.label || "Ohne Zusatz"
  };
}

function calculateAbbruchhammerOption(option, days) {
  const billableDays = Math.max(days, 1);
  let dailyRate = option.dayPrice;
  let stage = "Tagespreis";
  if (billableDays >= 3) { dailyRate *= 0.9; stage = "3-Tagespreis"; }
  if (billableDays >= 5) { dailyRate *= 0.9; stage = "5-Tagespreis"; }
  if (billableDays >= 7) { dailyRate *= 0.96; stage = "Wochenpreis"; }
  if (billableDays >= 14) { dailyRate *= 0.96; stage = "2-Wochenpreis"; }
  return { days: billableDays, rent: Math.round((dailyRate * billableDays) / 5) * 5, effectiveDayPrice: dailyRate, stage, optionLabel: "5 Meißel inklusive" };
}

function calculateTreppenleiterOption(option, days, addon) {
  const billableDays = Math.max(days, 1);
  let dailyRate = option.dayPrice;
  let stage = "Tagespreis";
  if (billableDays >= 3) { dailyRate *= 0.9; stage = "3-Tagespreis"; }
  if (billableDays >= 5) { dailyRate *= 0.9; stage = "5-Tagespreis"; }
  if (billableDays >= 7) { dailyRate *= 0.96; stage = "Wochenpreis"; }
  if (billableDays >= 14) { dailyRate *= 0.96; stage = "2-Wochenpreis"; }
  const surcharge = Number(addon?.surcharge) || 0;
  return { days: billableDays, rent: Math.round((dailyRate * billableDays + surcharge) / 5) * 5, effectiveDayPrice: dailyRate, stage, surcharge, optionLabel: option.label, addonLabel: addon?.label || "Ohne Alu-Tritt/Ablage" };
}

function calculateSchlagschrauberOption(option, days, addon) {
  const billableDays = Math.max(days, 1);
  const surcharge = Number(addon?.surcharge) || 0;
  if (billableDays === 2) {
    return { days: 2, rent: 25, effectiveDayPrice: 12.5, stage: "2-Tagespreis", optionLabel: addon?.label || option.label, surcharge };
  }
  const calculation = calculateTreppenleiterOption({ dayPrice: option.dayPrice }, billableDays, { surcharge: 0 });
  return { ...calculation, surcharge, optionLabel: addon?.label || option.label };
}

function initCalculators() {
  document.querySelectorAll("[data-calculator]").forEach((calculator) => {
    const tool = JSON.parse(calculator.dataset.tool || "{}");
    const optionInput = calculator.querySelector("[data-option]");
    const daysInput = calculator.querySelector("[data-days]");
    const ropeInput = calculator.querySelector("[data-rope-option]");
    const additionalInput = calculator.querySelector("[data-additional-option]");
    const treppenleiterAdditionalInput = calculator.querySelector("[data-treppenleiter-additional]");
    const result = calculator.querySelector("[data-result]");
    const whatsApp = calculator.querySelector("[data-price-whatsapp]");
    const updateWhatsApp = (message) => {
      if (whatsApp) whatsApp.href = encodeMessage(message);
    };

    function render() {
      const option = tool.options.find((candidate) => candidate.id === optionInput.value) || tool.options[0];
      const days = Math.max(1, Number.parseInt(daysInput.value, 10) || 1);

      if (tool.pricingMode === "rollgeruest") {
        const ropeOnly = option.id === "seilzug";
        if (ropeInput) {
          ropeInput.disabled = ropeOnly;
          if (ropeOnly) ropeInput.value = "none";
        }
        const ropeMode = ropeOnly ? "none" : (ropeInput?.value || "none");
        const calculation = calculateRollgeruestOption(option, days, ropeMode);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + deposit;
        const effectiveDayPrice = calculation.effectiveDayPrice;
        const depositText = Number.isFinite(tool.deposit) ? euro.format(deposit) : "auf Anfrage";
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${depositText}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>2 Tage</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          <div><span>Option</span><strong>${calculation.optionLabel}</strong></div>
          <div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>
        `;
        updateWhatsApp(
          `Hallo, ich interessiere mich für das Rollgerüst, Arbeitshöhe: ${option.label}, Option: ${calculation.optionLabel}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`
        );
        return;
      }

      if (tool.pricingMode === "ruettelplatte") {
        const addon = (tool.addons || []).find((candidate) => candidate.id === additionalInput?.value) || tool.addons?.[0] || { label: "Ohne Zusatz", surcharge: 0 };
        const calculation = calculateRuettelplatteOption(option, days, addon);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + deposit;
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${euro.format(deposit)}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>1 Tag</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          <div><span>Option</span><strong>${calculation.optionLabel}</strong></div>
          <div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>
        `;
        updateWhatsApp(
          `Hallo, ich interessiere mich für ${tool.title}. Option: ${calculation.optionLabel}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`
        );
        return;
      }

      if (tool.pricingMode === "abbruchhammer" || tool.pricingMode === "staged") {
        const calculation = calculateAbbruchhammerOption(option, days);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + deposit;
        const depositText = Number.isFinite(tool.deposit) ? euro.format(deposit) : "auf Anfrage";
        const totalText = Number.isFinite(tool.deposit) ? euro.format(total) : "auf Anfrage";
        const stageList = "";
        const includedRow = tool.pricingMode === "abbruchhammer" ? `<div><span>Inklusive</span><strong>5 Meißel inklusive</strong></div>` : "";
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${depositText}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>1 Tag</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          ${includedRow}
          <div class="total"><span>Bei Abholung fällig</span><strong>${totalText}</strong></div>
          ${stageList}
        `;
        updateWhatsApp(`Hallo, ich interessiere mich für ${tool.title}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`);
        return;
      }

      if (tool.pricingMode === "treppenleiter") {
        const addon = (tool.addons || []).find((candidate) => candidate.id === treppenleiterAdditionalInput?.value) || tool.addons?.[0] || { label: "Ohne Alu-Tritt/Ablage", surcharge: 0 };
        const calculation = calculateTreppenleiterOption(option, days, addon);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + deposit;
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${euro.format(deposit)}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>1 Tag</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          <div><span>Umfang</span><strong>${calculation.optionLabel}</strong></div>
          <div><span>Zusatz</span><strong>${calculation.addonLabel}</strong></div>
          ${calculation.surcharge ? `<div><span>Pauschale</span><strong>${euro.format(calculation.surcharge)}</strong></div>` : ""}
          <div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>
        `;
        const addonMessage = calculation.surcharge ? `${calculation.addonLabel} (5 € Pauschale)` : calculation.addonLabel;
        updateWhatsApp(`Hallo MV-Vermietung, ich interessiere mich für die Miete der ${calculation.optionLabel} und ${addonMessage} für ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`);
        return;
      }

      if (tool.pricingMode === "hochentaster") {
        const calculation = calculateTreppenleiterOption(option, days, { label: option.label, surcharge: 0 });
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + deposit;
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${euro.format(deposit)}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>1 Tag</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          <div><span>Option</span><strong>${calculation.optionLabel}</strong></div>
          <div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>
        `;
        updateWhatsApp(`Hallo MV-Vermietung, ich interessiere mich für die Miete von Hochentaster ${calculation.optionLabel} für ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`);
        return;
      }

      if (tool.pricingMode === "schlagschrauber") {
        const addon = (tool.addons || []).find((candidate) => candidate.id === treppenleiterAdditionalInput?.value) || tool.addons?.[0] || { label: "1 Schlagnuss-Set nach Wahl inklusive", surcharge: 0 };
        const calculation = calculateSchlagschrauberOption(option, days, addon);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + calculation.surcharge + deposit;
        result.innerHTML = `
          <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
          <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div>
          <div><span>Kaution</span><strong>${euro.format(deposit)}</strong></div>
          <div class="subtle-line"><span>Mindestmietdauer</span><strong>1 Tag</strong></div>
          <div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div>
          <div><span>Schlagnüsse</span><strong>${calculation.optionLabel}</strong></div>
          ${calculation.surcharge ? `<div><span>Pauschale</span><strong>${euro.format(calculation.surcharge)}</strong></div>` : ""}
          <div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>
        `;
        updateWhatsApp(`Hallo MV-Vermietung, ich interessiere mich für die Miete von Akku-Schlagschrauber. ${calculation.optionLabel}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent + calculation.surcharge)}.`);
        return;
      }

      const calculation = calculateOption(option, days);
      if (!calculation) {
        result.innerHTML = "<strong>Preis bitte anfragen</strong><span>Für diese Option wird ein individuelles Angebot erstellt.</span>";
        updateWhatsApp(`Hallo, ich interessiere mich für ${tool.title}, Option: ${option.label}.`);
        return;
      }

      const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
      const total = calculation.rent + deposit;
      const effectiveDayPrice = calculation.rent / calculation.days;
      const minimumNote = calculation.days > days ? `<span>Mindestmietdauer: ${calculation.days} Tage</span>` : "";
      const depositText = Number.isFinite(tool.deposit) ? euro.format(deposit) : "auf Anfrage";
      result.innerHTML = `
        <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
        <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(effectiveDayPrice)}</strong></div>
        <div><span>Kaution</span><strong>${depositText}</strong></div>
        <div class="total"><span>Bei Abholung fällig</span><strong>${Number.isFinite(tool.deposit) ? euro.format(total) : euro.format(calculation.rent)}</strong></div>
        <p>${calculation.label}${minimumNote}</p>
      `;
      updateWhatsApp(
        `Hallo, ich interessiere mich für ${tool.title}. Option: ${option.label}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`
      );
    }

    optionInput.addEventListener("change", render);
    ropeInput?.addEventListener("change", render);
    additionalInput?.addEventListener("change", render);
    treppenleiterAdditionalInput?.addEventListener("change", render);
    daysInput.addEventListener("input", render);
    render();
  });
}

function initCatalog() {
  const list = document.querySelector("#tool-list");
  const cards = [...document.querySelectorAll(".tool-card")];
  if (!cards.length) return;
  const search = document.querySelector("#tool-search");
  const category = document.querySelector("#category-filter");
  const sort = document.querySelector("#sort-tools");
  const empty = document.querySelector("#empty-tools");

  cards.forEach((card) => {
    // Vorschaubilder werden ausschließlich innerhalb von Werkzeugkarten gesetzt.
    // Header/Branding bleiben bewusst außerhalb dieser Zuordnungslogik.
    if (card.closest(".site-header, .brand")) return;
    const preview = card.dataset.previewSrc;
    const image = card.querySelector(".tool-card-media img");
    if (!image) return;
    if (preview) {
      image.src = preview;
      image.alt = card.dataset.previewAlt || image.alt;
    }
  });
  if (!list) return;

  function render() {
    const query = (search.value || "").trim().toLowerCase();
    const selectedCategory = category.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || card.dataset.title.includes(query);
      const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
      const visible = matchesQuery && matchesCategory;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    const sorted = [...cards].sort((a, b) => {
      if (sort.value === "price") return Number(a.dataset.price) - Number(b.dataset.price);
      if (sort.value === "category") return a.dataset.category.localeCompare(b.dataset.category, "de");
      return Number(b.dataset.popularity) - Number(a.dataset.popularity);
    });
    sorted.forEach((card) => list.append(card));
    empty.hidden = visibleCount > 0;
  }

  [search, category, sort].forEach((input) => input.addEventListener("input", render));
  render();
}

function initContactForms() {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const toolInput = form.elements.tool;
    const startInput = form.elements["start-date"];
    const endInput = form.elements["end-date"];
    const rentalOptionInput = form.elements["rental-option"];
    const deliveryInput = form.elements.delivery;
    const messageInput = form.elements.message;
    const formError = form.querySelector("[data-form-error]");
    const rollOptionField = form.querySelector("[data-roll-option-field]");
    const ruettelOptionField = form.querySelector("[data-ruettel-option-field]");
    const contactMode = form.dataset.contactMode || "";
    const isRollContact = contactMode === "rollgeruest";
    const isRuettelContact = contactMode === "ruettelplatte";
    const isAbbruchContact = contactMode === "abbruchhammer" || toolInput?.dataset.defaultTool === "Abbruchhammer 10,1 kg" || toolInput?.dataset.defaultTool === "Treppengerüst";
    const isTreppenleiterContact = contactMode === "treppenleiter" || toolInput?.dataset.defaultTool === "Treppenleiter";
    const isHochentasterContact = contactMode === "hochentaster" || toolInput?.dataset.defaultTool === "Hochentaster";
    const isHeckenschereContact = contactMode === "heckenschere" || toolInput?.dataset.defaultTool === "Heckenschere";
    const isSpuelContact = contactMode === "spuelstation" || toolInput?.dataset.defaultTool === "Spülstation für Solarthermie";
    const isStromzangeContact = contactMode === "stromzange";
    const isAnwaermbrennerContact = contactMode === "anwaermbrenner";
    const isHandstampferContact = contactMode === "handstampfer";
    const isSchlagschrauberContact = contactMode === "schlagschrauber";
    const isZimmergeruestContact = contactMode === "zimmergeruest";
    const isSimpleContact = contactMode === "simple";

    const selectedToolBeforeSort = toolInput.value;
    const toolOptions = [...toolInput.options];
    const promptOption = toolOptions.find((option) => !option.value);
    toolOptions.forEach((option) => {
      if (option.value === "Abbruchhammer Bosch GSH 11E") {
        option.value = "Abbruchhammer 10,1 kg";
        option.textContent = "Abbruchhammer 10,1 kg";
      }
    });
    const rankedTools = toolOptions
      .filter((option) => option.value)
      .sort((first, second) => Number(second.dataset.popularity) - Number(first.dataset.popularity));
    toolInput.replaceChildren(promptOption, ...rankedTools);

    const defaultTool = toolInput.dataset.defaultTool;
    const preferredTool = defaultTool && [...toolInput.options].some((option) => option.value === defaultTool)
      ? defaultTool
      : selectedToolBeforeSort;
    if (preferredTool && [...toolInput.options].some((option) => option.value === preferredTool)) {
      toolInput.value = preferredTool;
    }

    function syncRollContactOption() {
      if (isRollContact) {
        const isRollHeight = toolInput.value.startsWith("Rollgerüst ");
        rollOptionField.hidden = !isRollHeight;
        rentalOptionInput.disabled = !isRollHeight;
        if (!isRollHeight) rentalOptionInput.value = "none";
      }
      if (isRuettelContact) {
        const isRuettel = toolInput.value === "Rüttelplatte 77 kg";
        ruettelOptionField.hidden = !isRuettel;
        rentalOptionInput.disabled = !isRuettel;
        if (!isRuettel) rentalOptionInput.value = "none";
      }
      if (isTreppenleiterContact) {
        const isTreppenleiter = toolInput.value === "Treppenleiter";
        const optionField = form.querySelector("[data-treppenleiter-option-field]");
        if (optionField) optionField.hidden = !isTreppenleiter;
        if (rentalOptionInput) {
          rentalOptionInput.disabled = !isTreppenleiter;
          if (!isTreppenleiter) rentalOptionInput.value = "standard";
        }
      }
      if (isHochentasterContact || isHeckenschereContact) {
        const gardenTool = isHochentasterContact ? "Hochentaster" : "Heckenschere";
        const isGardenTool = toolInput.value === gardenTool;
        const optionField = form.querySelector("[data-hochentaster-option-field]");
        if (optionField) optionField.hidden = !isGardenTool;
        if (rentalOptionInput) {
          rentalOptionInput.disabled = !isGardenTool;
          if (!isGardenTool) rentalOptionInput.value = "none";
        }
      }
      if (isSchlagschrauberContact) {
        const isTool = toolInput.value === "Akku-Schlagschrauber";
        const optionField = form.querySelector("[data-schlagschrauber-option-field]");
        if (optionField) optionField.hidden = !isTool;
        if (rentalOptionInput) {
          rentalOptionInput.disabled = !isTool;
          if (!isTool) rentalOptionInput.value = "set";
        }
      }
    }

    function toIsoDate(date) {
      const pad = (value) => String(value).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function formatDate(value) {
      if (!value) return "";
      const [year, month, day] = value.split("-");
      return `${day}.${month}.${year.slice(-2)}`;
    }

    function addDays(value, amount) {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      date.setDate(date.getDate() + amount);
      return toIsoDate(date);
    }

    if (!startInput.value) startInput.value = toIsoDate(new Date());

    function syncEndDate() {
      const minimumEnd = isRollContact && startInput.value ? addDays(startInput.value, 1) : startInput.value;
      endInput.min = minimumEnd;
      if (endInput.value && endInput.value < minimumEnd) endInput.value = "";
    }

    function createDraft() {
      if (isStromzangeContact || isAnwaermbrennerContact || isHandstampferContact || isZimmergeruestContact) {
        const hasDateRange = Boolean(startInput.value && endInput.value);
        const start = hasDateRange ? formatDate(startInput.value) : "[TT.MM.JJ]";
        const end = hasDateRange ? formatDate(endInput.value) : "[TT.MM.JJ]";
        const dayCount = hasDateRange
          ? Math.round((new Date(`${endInput.value}T00:00:00`) - new Date(`${startInput.value}T00:00:00`)) / 86400000) + 1
          : null;
        const parts = [
          "Hallo MV-Vermietung,",
          `ich interessiere mich für die Miete von ${toolInput.value || toolInput.dataset.defaultTool || "Werkzeug"}.`
        ];
        if (deliveryInput?.value === "delivery") {
          parts.push("Wenn du HIER deine Adresse einträgst, erhältst du direkt ein konkretes Angebot inkl. Lieferung.");
        }
        parts.push(`Mein gewünschter Mietzeitraum wäre vom ${start} bis zum ${end} (${hasDateRange ? dayCount : "[Anzahl Tage]"} Tage).`);
        parts.push("Über eine kurze Rückmeldung würde ich mich freuen.");
        return parts.join("\n\n");
      }
      if (!toolInput.value || !startInput.value || !endInput.value) return "";
      const ropeSuffix = isRollContact && rentalOptionInput.value === "rope" ? " + Seilzug" : "";
      const ruettelOption = isRuettelContact && rentalOptionInput.value
        ? ` (${rentalOptionInput.selectedOptions[0]?.textContent || "Zusatzoption"})`
        : "";
      const requestedTool = isTreppenleiterContact && rentalOptionInput.value
        ? rentalOptionInput.selectedOptions[0]?.textContent || toolInput.value
        : `${toolInput.value}${ropeSuffix}${ruettelOption}`;
      const poweredGardenTool = (isHochentasterContact || isHeckenschereContact) && rentalOptionInput.value && ((isHochentasterContact && toolInput.value === "Hochentaster") || (isHeckenschereContact && toolInput.value === "Heckenschere"))
        ? `${toolInput.value} ${rentalOptionInput.selectedOptions[0]?.textContent || "Ohne Schaftverlängerung"}`
        : requestedTool;
      const selectedToolWithAddon = isSchlagschrauberContact && toolInput.value === "Akku-Schlagschrauber" && rentalOptionInput.value
        ? `${toolInput.value} (${rentalOptionInput.selectedOptions[0]?.textContent || "Schlagnuss-Set"})`
        : poweredGardenTool;
      const start = new Date(`${startInput.value}T00:00:00`);
      const end = new Date(`${endInput.value}T00:00:00`);
      const dayCount = Math.round((end - start) / 86400000) + 1;
      const parts = [
        "Hallo MV-Vermietung,",
        `ich interessiere mich für die Miete von ${selectedToolWithAddon}.`
      ];
    if ((isRollContact || isRuettelContact || isAbbruchContact || isTreppenleiterContact || isHochentasterContact || isHeckenschereContact || isSpuelContact || isSchlagschrauberContact || isSimpleContact || isHandstampferContact || isZimmergeruestContact) && deliveryInput?.value === "delivery") {
        parts.push("Wenn du HIER deine Adresse einträgst, erhältst du direkt ein konkretes Angebot inkl. Lieferung.");
      }
      parts.push(`Mein gewünschter Mietzeitraum wäre vom ${formatDate(startInput.value)} bis zum ${formatDate(endInput.value)} (${dayCount} Tage).`);
      parts.push("Über eine kurze Rückmeldung würde ich mich freuen.");
      return parts.join("\n\n");
    }

    function updateDraft() {
      if (messageInput.dataset.userEdited === "true") return;
      messageInput.value = createDraft();
    }

    function showError(message) {
      formError.textContent = message;
      formError.hidden = !message;
    }

    messageInput.addEventListener("input", () => {
      messageInput.dataset.userEdited = "true";
    });
    toolInput.addEventListener("change", () => {
      syncRollContactOption();
      showError("");
      updateDraft();
    });
    rentalOptionInput?.addEventListener("change", () => {
      showError("");
      updateDraft();
    });
    deliveryInput?.addEventListener("change", () => {
      showError("");
      updateDraft();
    });
    startInput.addEventListener("change", () => {
      syncEndDate();
      showError("");
      updateDraft();
    });
    endInput.addEventListener("change", () => {
      showError("");
      updateDraft();
    });
    syncRollContactOption();
    syncEndDate();
    updateDraft();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitter = event.submitter;
      const data = new FormData(form);
      const tool = data.get("tool") || "Werkzeug";
      const startDate = data.get("start-date");
      const endDate = data.get("end-date");
      if (!toolInput.value || !startDate || !endDate) {
        showError("Bitte wähle ein Werkzeug sowie Start- und Enddatum für den Mietzeitraum aus.");
        return;
      }
      if (endDate < startDate) {
        showError("Das Enddatum darf nicht vor dem Startdatum liegen.");
        return;
      }
      if (isRollContact && endDate < addDays(startDate, 1)) {
        showError("Für das Rollgerüst beträgt die Mindestmietdauer 2 Tage. Bitte wähle einen längeren Zeitraum.");
        return;
      }
      const message = data.get("message") || createDraft();
      const body = message.trim();
      if (submitter?.dataset.channel === "mailto") {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Anfrage ${tool}`)}&body=${encodeURIComponent(body)}`;
      } else {
        window.location.href = encodeMessage(body);
      }
    });
  });
}

makeFilePreviewLinksPortable();
initKnowledgeNavigation();
initGalleries();
initCalculators();
initCatalog();
initContactForms();
