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

        const duration = 2500; // 2.5 seconds
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

// ================= BACK TO TOP =================

const backToTop = document.querySelector(".back-to-top");

const backToTop = document.querySelector(".back-to-top");

if (!backToTop) {

    console.error("Back To Top button not found.");

} else {

    console.log("Back To Top Found");

}

if (backToTop) {
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
}
// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" && window.scrollY < 150) {

            link.classList.add("active");

        }

        else if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});

// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

},{

    threshold:0.15

});

reveals.forEach(section => {

    revealObserver.observe(section);

});
