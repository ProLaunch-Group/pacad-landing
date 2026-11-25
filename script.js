/* =========================
   ANNOUNCEMENT BANNER
   ========================= */

const announcementBanner = document.getElementById("announcement-banner");
const closeBannerBtn = document.getElementById("close-banner");

if (closeBannerBtn && announcementBanner) {
    // Check if banner was previously dismissed
    if (localStorage.getItem("pacad_banner_dismissed") === "true") {
        announcementBanner.style.display = "none";
    }

    closeBannerBtn.addEventListener("click", () => {
        announcementBanner.style.display = "none";
        localStorage.setItem("pacad_banner_dismissed", "true");
    });
}


/* =========================
   LUCIDE ICONS
   ========================= */

lucide.createIcons();


/* =========================
   MOBILE MENU
   ========================= */

// Select the menu button
const menuBtn = document.querySelector(".menu-btn");

// Select the navigation links
const navLinks = document.querySelector(".nav-links");


// Open and close the menu
if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {

        // Open/close the navigation
        navLinks.classList.toggle("active");


        const menuIsOpen = navLinks.classList.contains("active");


    
        menuBtn.innerHTML = menuIsOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';


    
        menuBtn.setAttribute("aria-expanded", menuIsOpen);


    
        lucide.createIcons();

    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}


/* =========================
   FAQ ACCORDION, TABS & SEARCH
   ========================= */

const faqItems = document.querySelectorAll(".faq-item");
const faqTabs = document.querySelectorAll(".faq-tab");
const faqGroups = document.querySelectorAll(".faq-group");
const faqSearchInput = document.getElementById("faq-search");
const faqEmptyState = document.getElementById("faq-empty-state");

if (faqItems.length > 0) {
    // Accordion toggle
    faqItems.forEach(item => {
        const btn = item.querySelector(".faq-question");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const isOpen = item.classList.toggle("open");
            btn.setAttribute("aria-expanded", String(isOpen));
        });
    });

    let activeCategory = "all";

    const filterFaqs = () => {
        const query = faqSearchInput ? faqSearchInput.value.trim().toLowerCase() : "";
        let totalVisible = 0;

        faqGroups.forEach(group => {
            const groupCategory = group.getAttribute("data-group");
            const itemsInGroup = group.querySelectorAll(".faq-item");
            let visibleInGroup = 0;

            itemsInGroup.forEach(item => {
                const matchesCategory = activeCategory === "all" || groupCategory === activeCategory;
                const text = item.textContent.toLowerCase();
                const matchesSearch = !query || text.includes(query);

                if (matchesCategory && matchesSearch) {
                    item.style.display = "";
                    visibleInGroup++;
                    totalVisible++;
                } else {
                    item.style.display = "none";
                }
            });

            group.style.display = visibleInGroup > 0 ? "" : "none";
        });

        if (faqEmptyState) {
            faqEmptyState.hidden = totalVisible > 0;
        }
    };

    // Category tabs
    faqTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            faqTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            activeCategory = tab.getAttribute("data-category") || "all";
            filterFaqs();
        });
    });

    // Live search
    if (faqSearchInput) {
        faqSearchInput.addEventListener("input", filterFaqs);
    }
}


/* =========================
   CLEAN PATH SECTION ROUTING
   (/home, /programs, /scholarship)
   ========================= */

const sectionRoutes = {
    "/home": "home",
    "/programs": "programmes",
    "/scholarship": "scholarship"
};

const scrollToRouteSection = (pathname, smooth = true) => {
    const cleanPath = pathname.replace(/\/+$/, "") || "/";
    const targetId = sectionRoutes[cleanPath];
    if (!targetId) return false;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return false;

    targetEl.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    return true;
};

// Scroll automatically when landing directly on /home, /programs, or /scholarship
window.addEventListener("DOMContentLoaded", () => {
    const cleanPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (sectionRoutes[cleanPath]) {
        // Small delay so fonts/layout settle before scrolling
        setTimeout(() => scrollToRouteSection(cleanPath, true), 80);
    }
});

// Intercept in-page clicks to /home, /programs, /scholarship when already on index.html
document.querySelectorAll('a[href="/home"], a[href="/programs"], a[href="/scholarship"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (scrollToRouteSection(href, true)) {
            e.preventDefault();
            if (window.location.pathname !== href) {
                window.history.pushState(null, "", href);
            }
        }
    });
});

// Support browser Back/Forward buttons for clean section routes
window.addEventListener("popstate", () => {
    scrollToRouteSection(window.location.pathname, true);
});