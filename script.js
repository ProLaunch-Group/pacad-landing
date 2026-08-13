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