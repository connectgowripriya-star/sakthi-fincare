console.log("script loaded");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// ================= MOBILE MENU =================

menuToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    navLinks.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";

});

// ================= AUTO CLOSE =================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.textContent = "☰";

    });

});

// ================= CLICK OUTSIDE =================

document.addEventListener("click", (e) => {

    if (
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {

        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.textContent = "☰";

    }

});
