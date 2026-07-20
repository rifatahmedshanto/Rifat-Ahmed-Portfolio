/* ================================================================
   RIFAT AHMED — PORTFOLIO SCRIPT
   Vanilla JavaScript, organized by feature.
   ================================================================ */

/* ------------------------------------------------------------
   CONFIG — edit this one line to point at your own CV file.
   e.g. "assets/Rifat-Ahmed-CV.pdf". The Download CV button(s)
   below are wired to this path automatically.
------------------------------------------------------------ */
const CV_FILE_PATH = "assets/Rifat-Ahmed-CV.pdf";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Download CV wiring ---------- */
  document.querySelectorAll(".btn-download-cv").forEach((btn) => {
    btn.setAttribute("href", CV_FILE_PATH);
  });

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("loaded");
      preloader.setAttribute("aria-hidden", "true");
    }, 800);
  });

  /* ---------- Dark / light mode toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const rootEl = document.documentElement;
  const themeIcon = themeToggle.querySelector("i");

  function applyTheme(theme) {
    if (theme === "light") {
      rootEl.setAttribute("data-theme", "light");
      themeIcon.classList.replace("fa-moon", "fa-sun");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      rootEl.removeAttribute("data-theme");
      themeIcon.classList.replace("fa-sun", "fa-moon");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = rootEl.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  /* ---------- Sticky navbar shadow ---------- */
  const navbar = document.getElementById("navbar");
  const handleNavbarShadow = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", handleNavbarShadow, { passive: true });
  handleNavbarShadow();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Active nav link highlight ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((link) => link.classList.toggle("active", link.dataset.section === id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* ---------- Typing animation ---------- */
  const typedTextEl = document.getElementById("typedText");
  const phrases = [
    "responsive websites.",
    "clean, maintainable code.",
    "thoughtful user interfaces.",
    "full-stack web applications."
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      charIndex++;
      typedTextEl.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
      charIndex--;
      typedTextEl.textContent = current.substring(0, charIndex);
      if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    }
    setTimeout(typeLoop, isDeleting ? 45 : 80);
  }
  if (prefersReducedMotion) {
    typedTextEl.textContent = phrases[0];
  } else {
    typeLoop();
  }

  /* ---------- Scroll reveal (with stagger index for grids) ---------- */
  document.querySelectorAll(".skills-grid, .projects-grid, .certs-grid").forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => child.style.setProperty("--i", i));
  });

  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated skill bars ---------- */
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level") || "0";
          const fill = bar.querySelector(".skill-bar-fill");
          setTimeout(() => { fill.style.width = level + "%"; }, 150);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-bar").forEach((bar) => skillObserver.observe(bar));

  /* ---------- Card spotlight hover (skipped for reduced motion) ---------- */
  if (!prefersReducedMotion) {
    let rafId = null;
    document.querySelectorAll(".project-card, .cert-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        rafId = requestAnimationFrame(() => {
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);
        });
      });
    });
  }

  /* ---------- Scroll to top ---------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 480);
  }, { passive: true });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Search modal ---------- */
  const searchToggle = document.getElementById("searchToggle");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const searchResultsEl = document.getElementById("searchResults");

  const searchIndex = [
    { id: "hero", label: "Home", icon: "fa-house", keywords: "home top intro" },
    { id: "about", label: "About", icon: "fa-user", keywords: "about bio background" },
    { id: "skills", label: "Skills", icon: "fa-code", keywords: "skills frontend backend tools" },
    { id: "education", label: "Education", icon: "fa-graduation-cap", keywords: "education university daffodil" },
    { id: "projects", label: "Projects", icon: "fa-diagram-project", keywords: "projects work portfolio" },
    { id: "certificates", label: "Certificates", icon: "fa-award", keywords: "certificates certifications" },
    { id: "contact", label: "Contact", icon: "fa-envelope", keywords: "contact email message form" }
  ];

  let activeResultIndex = -1;
  let lastFocusedEl = null;

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q
      ? searchIndex.filter((item) => (item.label + " " + item.keywords).toLowerCase().includes(q))
      : searchIndex;

    searchResultsEl.innerHTML = "";
    activeResultIndex = matches.length ? 0 : -1;

    if (!matches.length) {
      searchResultsEl.innerHTML = `<li class="search-empty">No matching section found.</li>`;
      return;
    }

    matches.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "search-result" + (i === 0 ? " active" : "");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.dataset.target = item.id;
      li.innerHTML = `<i class="fa-solid ${item.icon}"></i><span>${item.label}</span>`;
      li.addEventListener("click", () => goToSection(item.id));
      searchResultsEl.appendChild(li);
    });
  }

  function goToSection(id) {
    closeSearch();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  function openSearch() {
    lastFocusedEl = document.activeElement;
    searchOverlay.hidden = false;
    requestAnimationFrame(() => searchOverlay.classList.add("open"));
    searchToggle.setAttribute("aria-expanded", "true");
    renderResults("");
    searchInput.value = "";
    searchInput.focus();
  }

  function closeSearch() {
    searchOverlay.classList.remove("open");
    searchToggle.setAttribute("aria-expanded", "false");
    setTimeout(() => { searchOverlay.hidden = true; }, 200);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  searchToggle.addEventListener("click", openSearch);

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  searchInput.addEventListener("input", (e) => renderResults(e.target.value));

  document.addEventListener("keydown", (e) => {
    // Global shortcut: "/" opens search when not typing in a field
    const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
    if (e.key === "/" && !isTyping) {
      e.preventDefault();
      openSearch();
      return;
    }
    if (searchOverlay.hidden) return;

    const results = Array.from(searchResultsEl.querySelectorAll(".search-result"));

    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      activeResultIndex = (activeResultIndex + 1) % results.length;
      results.forEach((r, i) => r.classList.toggle("active", i === activeResultIndex));
      results[activeResultIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      activeResultIndex = (activeResultIndex - 1 + results.length) % results.length;
      results.forEach((r, i) => r.classList.toggle("active", i === activeResultIndex));
      results[activeResultIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && results.length && activeResultIndex >= 0) {
      goToSection(results[activeResultIndex].dataset.target);
    }
  });

  /* ---------- Contact form validation ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  function setFieldError(input, errorEl, message) {
    input.classList.toggle("invalid", Boolean(message));
    errorEl.textContent = message || "";
  }
  function isValidEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    let isValid = true;

    if (nameInput.value.trim().length < 2) { setFieldError(nameInput, nameError, "Please enter your full name."); isValid = false; }
    else setFieldError(nameInput, nameError, "");

    if (!isValidEmail(emailInput.value.trim())) { setFieldError(emailInput, emailError, "Please enter a valid email address."); isValid = false; }
    else setFieldError(emailInput, emailError, "");

    if (messageInput.value.trim().length < 10) { setFieldError(messageInput, messageError, "Message should be at least 10 characters."); isValid = false; }
    else setFieldError(messageInput, messageError, "");

    if (!isValid) {
      formStatus.style.color = "var(--danger)";
      formStatus.textContent = "Please fix the errors above and try again.";
      return;
    }

    // Front-end only — connect to a backend or a form service (e.g. Formspree) to receive messages.
    formStatus.style.color = "var(--success)";
    formStatus.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been noted.`;
    contactForm.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

});
