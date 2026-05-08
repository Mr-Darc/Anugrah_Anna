/* ===============================
   THEME TOGGLE
================================ */
(() => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const STORAGE_KEY = "theme";

  if (!toggle) return;

  const setTheme = (isDark) => {
    body.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  };

  // Init theme
  const savedTheme = localStorage.getItem(STORAGE_KEY) === "dark";
  toggle.checked = savedTheme;
  setTheme(savedTheme);

  toggle.addEventListener("change", () => {
    setTheme(toggle.checked);
  });
})();

/* ===============================
   SCROLL REVEAL (INTERSECTION OBSERVER)
================================ */
(() => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add("active");
          obs.unobserve(target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
})();

/* ===============================
   TYPEWRITER EFFECT
================================ */
(() => {
  const roleEl = document.getElementById("animated-role");
  if (!roleEl) return;

  const roles = [
    "Data Engineer | Robotics & Automation Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 50;
  const HOLD_TIME = 140000;

  function typeEffect() {
    const text = roles[roleIndex];

    charIndex += deleting ? -1 : 1;
    roleEl.textContent = text.slice(0, charIndex);

    if (!deleting && charIndex === text.length) {
      return setTimeout(() => (deleting = true), HOLD_TIME);
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, TYPE_SPEED);
  }

  typeEffect();
})();

/* ===============================
   PARALLAX (THROTTLED WITH RAF)
================================ */
(() => {
  const elements = document.querySelectorAll(".parallax");
  if (!elements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    elements.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0;
      el.style.transform = `translateY(${-scrollY * speed}px)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
})();
