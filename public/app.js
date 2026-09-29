const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const phone = "491633623280";

function encodeMessage(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function initGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const sources = [...gallery.querySelectorAll("[data-gallery-item]")].map((image) => ({
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt") || "Werkzeug"
    }));
    if (!sources.length) return;
    const image = gallery.querySelector("[data-gallery-image]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    const lightbox = gallery.querySelector("[data-gallery-lightbox]");
    const lightboxImage = gallery.querySelector("[data-gallery-lightbox-image]");
    const lightboxCounter = gallery.querySelector("[data-gallery-lightbox-counter]");
    const openButton = gallery.querySelector("[data-gallery-open]");
    const closeButton = gallery.querySelector("[data-gallery-close]");
    const previous = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    const lightboxPrevious = gallery.querySelector("[data-gallery-lightbox-prev]");
    const lightboxNext = gallery.querySelector("[data-gallery-lightbox-next]");
    if (!image || !counter || !lightbox || !lightboxImage || !lightboxCounter || !openButton || !closeButton || !previous || !next || !lightboxPrevious || !lightboxNext) return;
    let currentIndex = 0;
    let touchStartX = null;
    let lastFocusedElement = null;
    const render = () => {
      const current = sources[currentIndex];
      image.src = current.src;
      image.alt = current.alt;
      counter.textContent = `${currentIndex + 1} / ${sources.length}`;
      lightboxImage.src = current.src;
      lightboxImage.alt = current.alt;
      lightboxCounter.textContent = `${currentIndex + 1} / ${sources.length}`;
    };
    const showImage = (index) => {
      currentIndex = (index + sources.length) % sources.length;
      render();
    };
    const close = () => {
      lightbox.hidden = true;
      document.body.classList.remove("gallery-open");
      lastFocusedElement?.focus();
    };
    previous.addEventListener("click", () => showImage(currentIndex - 1));
    next.addEventListener("click", () => showImage(currentIndex + 1));
    lightboxPrevious.addEventListener("click", () => showImage(currentIndex - 1));
    lightboxNext.addEventListener("click", () => showImage(currentIndex + 1));
    openButton.addEventListener("click", () => {
      lastFocusedElement = document.activeElement;
      lightbox.hidden = false;
      document.body.classList.add("gallery-open");
      render();
      closeButton.focus();
    });
    closeButton.addEventListener("click", close);
    gallery.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    gallery.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 50) showImage(currentIndex + (distance < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
    render();
  });
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

function calculateStagedOption(option, days) {
  const billableDays = Math.max(days, option.minimumDays || 1);
  let effectiveDayPrice = option.dayPrice;
  let label = "Tagespreis";
  if (billableDays >= 3) { effectiveDayPrice *= 0.9; label = "3-Tagespreis"; }
  if (billableDays >= 5) { effectiveDayPrice *= 0.9; label = "5-Tagespreis"; }
  if (billableDays >= 7) { effectiveDayPrice *= 0.96; label = "Wochenpreis"; }
  if (billableDays >= 14) { effectiveDayPrice *= 0.96; label = "2-Wochenpreis"; }
  return {
    days: billableDays,
    rent: Math.round((effectiveDayPrice * billableDays) / 5) * 5,
    effectiveDayPrice,
    label
  };
}

function calculateSchlagschrauberOption(option, days, addon) {
  const billableDays = Math.max(days, 1);
  const surcharge = Number(addon?.surcharge) || 0;
  if (billableDays === 2) return { days: 2, rent: 25, effectiveDayPrice: 12.5, stage: "2-Tagespreis", surcharge, addonLabel: addon?.label };
  const staged = calculateStagedOption(option, billableDays);
  return { ...staged, stage: staged.label, surcharge, addonLabel: addon?.label };
}

function initCalculators() {
  document.querySelectorAll("[data-calculator]").forEach((calculator) => {
    const tool = JSON.parse(calculator.dataset.tool || "{}");
    const optionInput = calculator.querySelector("[data-option]");
    const daysInput = calculator.querySelector("[data-days]");
    const addonInput = calculator.querySelector("[data-treppenleiter-additional]");
    const result = calculator.querySelector("[data-result]");
    const whatsApp = calculator.querySelector("[data-price-whatsapp]");
    const updateWhatsApp = (message) => {
      if (whatsApp) whatsApp.href = encodeMessage(message);
    };

    function render() {
      const option = tool.options.find((candidate) => candidate.id === optionInput.value) || tool.options[0];
      const days = Math.max(1, Number.parseInt(daysInput.value, 10) || 1);
      if (tool.pricingMode === "schlagschrauber") {
        const addon = tool.addons.find((candidate) => candidate.id === addonInput.value) || tool.addons[0];
        const calculation = calculateSchlagschrauberOption(option, days, addon);
        const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
        const total = calculation.rent + calculation.surcharge + deposit;
        result.innerHTML = `<div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div><div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(calculation.effectiveDayPrice)}</strong></div><div><span>Kaution</span><strong>${euro.format(deposit)}</strong></div><div class="subtle-line"><span>Mietstufe</span><strong>${calculation.stage}</strong></div><div><span>Schlagnüsse</span><strong>${calculation.addonLabel}</strong></div>${calculation.surcharge ? `<div><span>Pauschale</span><strong>${euro.format(calculation.surcharge)}</strong></div>` : ""}<div class="total"><span>Bei Abholung fällig</span><strong>${euro.format(total)}</strong></div>`;
        updateWhatsApp(`Hallo MV-Vermietung, ich interessiere mich für die Miete von ${tool.title}. ${calculation.addonLabel}${calculation.surcharge ? " (5,00 € Pauschale)" : ""} für ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent + calculation.surcharge)}.`);
        return;
      }
      const calculation = tool.pricingMode === "staged"
        ? calculateStagedOption(option, days)
        : calculateOption(option, days);
      if (!calculation) {
        result.innerHTML = "<strong>Preis bitte anfragen</strong><span>Für diese Option wird ein individuelles Angebot erstellt.</span>";
        updateWhatsApp(`Hallo, ich interessiere mich für ${tool.title}, Option: ${option.label}.`);
        return;
      }

      const deposit = Number.isFinite(tool.deposit) ? tool.deposit : 0;
      const total = calculation.rent + deposit;
      const effectiveDayPrice = calculation.effectiveDayPrice ?? calculation.rent / calculation.days;
      const minimumNote = calculation.days > days ? `<span>Mindestmietdauer: ${calculation.days} Tage</span>` : "";
      const depositText = Number.isFinite(tool.deposit) ? euro.format(deposit) : "auf Anfrage";
      result.innerHTML = `
        <div><span>Mietpreis</span><strong>${euro.format(calculation.rent)}</strong></div>
        <div class="subtle-line"><span>Effektiv pro Tag</span><strong>${euro.format(effectiveDayPrice)}</strong></div>
        <div><span>Kaution</span><strong>${depositText}</strong></div>
        <div class="total"><span>Bei Abholung fallig</span><strong>${Number.isFinite(tool.deposit) ? euro.format(total) : euro.format(calculation.rent)}</strong></div>
        <p>${calculation.label}${minimumNote}</p>
      `;
      updateWhatsApp(
        `Hallo, ich interessiere mich für ${tool.title}. Option: ${option.label}. Mietdauer: ${calculation.days} Tage. Angezeigter Mietpreis: ${euro.format(calculation.rent)}.`
      );
    }

    optionInput.addEventListener("change", render);
    daysInput.addEventListener("input", render);
    addonInput?.addEventListener("change", render);
    render();
  });
}

function initCatalog() {
  const list = document.querySelector("#tool-list");
  if (!list) return;
  const cards = [...list.querySelectorAll(".tool-card")];
  const search = document.querySelector("#tool-search");
  const category = document.querySelector("#category-filter");
  const sort = document.querySelector("#sort-tools");
  const empty = document.querySelector("#empty-tools");

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

function initAutoMessageContactForm(form) {
  const toolInput = form.elements.tool;
  const deliveryInput = form.elements.delivery;
  const startInput = form.elements["start-date"];
  const endInput = form.elements["end-date"];
  const messageInput = form.elements.message;
  const rentalOptionInput = form.elements["rental-option"];
  const formError = form.querySelector("[data-form-error]");
  if (!toolInput || !deliveryInput || !startInput || !endInput || !messageInput || !formError) return;

  const promptOption = [...toolInput.options].find((option) => !option.value);
  const toolOptions = [...toolInput.options]
    .filter((option) => option.value)
    .sort((a, b) => Number(b.dataset.popularity || 0) - Number(a.dataset.popularity || 0));
  toolInput.replaceChildren(...(promptOption ? [promptOption] : []), ...toolOptions);
  const defaultTool = toolInput.dataset.defaultTool;
  toolInput.value = toolOptions.some((option) => option.value === defaultTool) ? defaultTool : "";
  toolOptions.forEach((option) => { option.selected = option.value === toolInput.value; });

  const formatDate = (value) => {
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year.slice(-2)}`;
  };
  const updateDraft = () => {
    if (messageInput.dataset.userEdited === "true") return;
    const hasDateRange = Boolean(startInput.value && endInput.value);
    const dates = hasDateRange
      ? `vom ${formatDate(startInput.value)} bis zum ${formatDate(endInput.value)} (${Math.round((new Date(`${endInput.value}T00:00:00`) - new Date(`${startInput.value}T00:00:00`)) / 86400000) + 1} Tage)`
      : "vom [TT.MM.JJ] bis zum [TT.MM.JJ] ([Anzahl Tage] Tage)";
    const parts = [
      "Hallo MV-Vermietung,",
      `ich interessiere mich für die Miete von ${toolInput.value || toolInput.dataset.defaultTool || "Werkzeug"}${form.dataset.contactMode === "akku-schlagschrauber" && rentalOptionInput ? ` (${rentalOptionInput.selectedOptions[0]?.textContent || "Ein Schlagnuss-Set nach Wahl inklusive"})` : ""}.`
    ];
    if (deliveryInput.value === "delivery") {
      parts.push("Wenn du HIER deine Adresse einträgst, erhältst du direkt ein konkretes Angebot inkl. Lieferung.");
    }
    parts.push(`Mein gewünschter Mietzeitraum wäre ${dates}.`);
    parts.push("Über eine kurze Rückmeldung würde ich mich freuen.");
    messageInput.value = parts.join("\n\n");
  };
  const updateDateConstraints = () => {
    endInput.min = startInput.value || "";
    if (startInput.value && endInput.value && endInput.value < startInput.value) endInput.value = "";
  };

  messageInput.addEventListener("input", () => { messageInput.dataset.userEdited = "true"; });
  toolInput.addEventListener("change", updateDraft);
  rentalOptionInput?.addEventListener("change", updateDraft);
  deliveryInput.addEventListener("change", updateDraft);
  startInput.addEventListener("change", () => { updateDateConstraints(); updateDraft(); });
  endInput.addEventListener("change", updateDraft);
  updateDateConstraints();
  updateDraft();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!toolInput.value || !startInput.value || !endInput.value) {
      formError.textContent = "Bitte wähle ein Werkzeug sowie Start- und Enddatum für den Mietzeitraum aus.";
      formError.hidden = false;
      return;
    }
    if (endInput.value < startInput.value) {
      formError.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
      formError.hidden = false;
      return;
    }
    formError.hidden = true;
    const body = messageInput.value.trim();
    if (event.submitter?.dataset.channel === "mailto") {
      window.location.href = `mailto:?subject=${encodeURIComponent(`Anfrage ${toolInput.value}`)}&body=${encodeURIComponent(body)}`;
    } else {
      window.location.href = encodeMessage(body);
    }
  });
}

function initContactForms() {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    if (["stromzange", "anwaermbrenner", "handstampfer", "akku-schlagschrauber"].includes(form.dataset.contactMode)) {
      initAutoMessageContactForm(form);
      return;
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitter = event.submitter;
      const data = new FormData(form);
      const tool = data.get("tool") || "Werkzeug";
      const days = data.get("days") || "noch offen";
      const message = data.get("message") || "";
      const body = `Hallo, ich interessiere mich für ${tool}. Mietdauer: ${days}. ${message}`.trim();
      if (submitter?.dataset.channel === "mailto") {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Anfrage ${tool}`)}&body=${encodeURIComponent(body)}`;
      } else {
        window.location.href = encodeMessage(body);
      }
    });
  });
}

initGalleries();
initCalculators();
initCatalog();
initContactForms();
