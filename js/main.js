(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const check = document.querySelector("#nav-check");
  const toggle = document.querySelector(".nav-toggle");

  function syncNav() {
    if (!check) return;
    const open = check.checked;
    document.body.classList.toggle("nav-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
  }

  check?.addEventListener("change", syncNav);
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!check) return;
      check.checked = false;
      syncNav();
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && check?.checked) {
      check.checked = false;
      syncNav();
      toggle?.focus();
    }
  });
  syncNav();

  const header = document.querySelector(".site-header");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  if (!reduce) {
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          seen.unobserve(entry.target);
        });
      },
      { threshold: 0.16 },
    );
    document.querySelectorAll(".reveal").forEach((node, index) => {
      node.style.transitionDelay = `${(index % 3) * 80}ms`;
      seen.observe(node);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
  }

  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;
    if (reduce) {
      node.textContent = String(target);
      return;
    }
    const counter = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        counter.disconnect();
        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / 900);
          const eased = 1 - (1 - progress) ** 3;
          node.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    counter.observe(node);
  });

  const billButtons = document.querySelectorAll("[data-bill]");
  billButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.bill;
      billButtons.forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", String(on));
      });
      document.querySelectorAll("[data-monthly]").forEach((node) => {
        const value = node.dataset[mode];
        if (value == null) return;
        const amount = node.querySelector(".price-value");
        if (amount) amount.textContent = value;
        else node.textContent = value;
      });
    });
  });

  document.querySelectorAll(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      if (panel) panel.hidden = open;
    });
  });

  const dayButtons = [...document.querySelectorAll("[data-day]")];
  const panels = document.querySelectorAll("[data-day-panel]");
  const typeButtons = document.querySelectorAll("[data-type-filter]");
  let activeType = "all";

  function applyTypeFilter() {
    const panel = document.querySelector("[data-day-panel]:not([hidden])");
    if (!panel) return;
    let visible = 0;
    panel.querySelectorAll(".session").forEach((session) => {
      const show = activeType === "all" || session.dataset.type === activeType;
      session.hidden = !show;
      if (show) visible += 1;
    });
    const empty = panel.querySelector(".empty-day");
    if (empty) empty.hidden = visible !== 0;
  }

  function showDay(day) {
    dayButtons.forEach((button) => {
      const on = button.dataset.day === day;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-selected", String(on));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.dayPanel !== day;
    });
    applyTypeFilter();
  }

  dayButtons.forEach((button, index) => {
    button.addEventListener("click", () => showDay(button.dataset.day));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? (index + 1) % dayButtons.length
          : (index - 1 + dayButtons.length) % dayButtons.length;
      dayButtons[next].focus();
      showDay(dayButtons[next].dataset.day);
    });
  });

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeType = button.dataset.typeFilter;
      typeButtons.forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", String(on));
      });
      applyTypeFilter();
    });
  });

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.querySelectorAll(".tilt").forEach((card) => {
    if (reduce || !finePointer) return;
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const fan = document.querySelector(".fan");
  if (fan && !reduce) {
    fan.addEventListener("pointermove", (event) => {
      const rect = fan.getBoundingClientRect();
      fan.style.setProperty("--fan", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    });
    fan.addEventListener("pointerleave", () => fan.style.removeProperty("--fan"));
  }
  document.querySelector("[data-fan-toggle]")?.addEventListener("click", (event) => {
    if (!fan) return;
    const on = fan.classList.toggle("is-spread");
    event.currentTarget.setAttribute("aria-pressed", String(on));
    event.currentTarget.textContent = on ? "Stack the floor" : "Spread the floor";
  });

  const params = new URLSearchParams(location.search);
  const coach = params.get("coach");
  const coachSelect = document.querySelector("#coach");
  if (coach && coachSelect && [...coachSelect.options].some((option) => option.value === coach)) {
    coachSelect.value = coach;
  }
  const coachHeading = document.querySelector("[data-coach-heading]");
  if (coach && coachHeading) coachHeading.textContent = `Training with ${coach}`;

  const form = document.querySelector("#visit-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, select, textarea");
      const error = field.querySelector(".field-error");
      if (!input || !error) return;
      const missing = input.hasAttribute("required") && !String(input.value).trim();
      const badEmail = input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      const message = missing ? "This field is required." : badEmail ? "Enter a valid email." : "";
      error.textContent = message;
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (message) valid = false;
    });
    const success = document.querySelector("#form-success");
    if (!valid) {
      if (success) success.hidden = true;
      form.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    const name = String(new FormData(form).get("name") || "").trim();
    if (success) {
      success.hidden = false;
      success.textContent = `Thanks, ${name}. This preview keeps your note in the browser only — connect the form before launch and the desk will write back.`;
    }
    form.reset();
    if (coach && coachSelect && [...coachSelect.options].some((option) => option.value === coach)) {
      coachSelect.value = coach;
    }
  });
})();
