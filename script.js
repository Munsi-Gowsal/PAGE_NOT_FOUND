document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  const header = document.querySelector(".main-header");

  if (hamburger && nav) {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
    });

    nav.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
    highlightCurrent();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + id);
      }
    });
  });

  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]'),
  );

  function highlightCurrent() {
    if (!sections.length || !navLinks.length) return;
    let found = null;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight * 0.35 &&
        rect.bottom >= window.innerHeight * 0.2
      ) {
        found = sec.id;
        break;
      }
    }
    navLinks.forEach((l) => l.classList.remove("active"));
    if (found) {
      const link = navLinks.find((l) => l.getAttribute("href") === "#" + found);
      if (link) link.classList.add("active");
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const popup = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("fullName").value;
      const venueSelect = document.getElementById("restaurant");
      const venueName = venueSelect.options[venueSelect.selectedIndex].text;

      document.getElementById("displayUserName").innerText = name;

      const venueDisplay = document.getElementById("displayVenueName");
      if (venueDisplay) venueDisplay.innerText = `at ${venueName}`;

      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Checking Availability...";
      submitBtn.disabled = true;

      setTimeout(() => {
        popup.style.display = "flex";

        form.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});