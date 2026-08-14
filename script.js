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