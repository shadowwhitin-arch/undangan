const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");

const navLinks = document.querySelectorAll(".nav-link");
const homeBlocks = document.querySelectorAll(".home-block");
const contentSections = document.querySelectorAll(".content-section");

// buka menu
menuOpen.addEventListener("click", () => {
  drawer.classList.add("active");
  overlay.classList.add("active");
});

// tutup menu
function closeMenu() {
  drawer.classList.remove("active");
  overlay.classList.remove("active");
}

menuClose.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// HOME
function showHome() {
  homeBlocks.forEach(b => b.style.display = "block");
  contentSections.forEach(s => s.classList.remove("active"));
}

// SECTION
function showSection(id) {
  homeBlocks.forEach(b => b.style.display = "none");
  contentSections.forEach(s => s.classList.remove("active"));

  const target = document.getElementById(id);

  if (!target) {
    console.warn("Section tidak ditemukan:", id);
    return;
  }

  target.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// klik menu
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const view = link.dataset.view;

    if (view === "home") {
      showHome();

      const target = link.dataset.scroll;

      if (target) {
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({
            behavior: "smooth"
          });
        }, 200);
      }
    }

    if (view === "section") {
      showSection(link.dataset.section);
    }

    closeMenu();
  });
});

// default
showHome();
