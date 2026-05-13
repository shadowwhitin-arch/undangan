const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");

const navLinks = document.querySelectorAll(".nav-link");

const homeBlocks = document.querySelectorAll(".home-block");
const contentSections = document.querySelectorAll(".content-section");

menuOpen.addEventListener("click", () => {
  drawer.classList.add("active");
  overlay.classList.add("active");
});

menuClose.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

function closeMenu() {
  drawer.classList.remove("active");
  overlay.classList.remove("active");
}

function showHome() {
  homeBlocks.forEach(block => {
    block.style.display = "block";
  });

  contentSections.forEach(section => {
    section.classList.remove("active");
  });
}

function showSection(id) {
  homeBlocks.forEach(block => {
    block.style.display = "none";
  });

  contentSections.forEach(section => {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(id);

  if (activeSection) {
    activeSection.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

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
      const sectionId = link.dataset.section;

      showSection(sectionId);
    }

    closeMenu();
  });
});

showHome();
