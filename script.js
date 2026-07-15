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

        const target = parseInt(counter.dataset.target);

        const hasCurrency = counter.textContent.includes("₹");
        const hasCr = counter.textContent.includes("Cr");
        const hasPlus = counter.textContent.includes("+");

        const duration = 1800; // 1.8 seconds
        const startTime = performance.now();

        function animate(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Ease-out animation
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const value = Math.floor(easeOut * target);

            let display = value;

            if (hasCurrency) display = "₹" + display;
            if (hasCr) display += "Cr";
            if (hasPlus) display += "+";

            counter.textContent = display;

            if (progress < 1) {

                requestAnimationFrame(animate);

            } else {

                let finalValue = target;

                if (hasCurrency) finalValue = "₹" + finalValue;
                if (hasCr) finalValue += "Cr";
                if (hasPlus) finalValue += "+";

                counter.textContent = finalValue;

            }

        }

        requestAnimationFrame(animate);

        observer.unobserve(counter);

    });

}, {

    threshold: 0.4

});

counters.forEach(counter => observer.observe(counter));
