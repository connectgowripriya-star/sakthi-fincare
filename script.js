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
// ================= STATS COUNTER =================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        const hasCurrency = counter.textContent.includes("₹");
        const hasCr = counter.textContent.includes("Cr");
        const hasPlus = counter.textContent.includes("+");

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 60));

        const update = () => {

            current += increment;

            if (current >= target) {

                current = target;

            }

            let value = current.toString();

            if (hasCurrency) value = "₹" + value;
            if (hasCr) value += "Cr";
            if (hasPlus) value += "+";

            counter.textContent = value;

            if (current < target) {

                requestAnimationFrame(update);

            }

        };

        update();

        observer.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => observer.observe(counter));
