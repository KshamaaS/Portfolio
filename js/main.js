/*
MAIN.JS - Navigation functionality

This file handles the mobile menu toggle.
*/

// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the mobile menu button and the navigation links
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // When the mobile menu button is clicked...
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle the 'active' class on the nav links
            // This shows/hides the menu on mobile
            navLinks.classList.toggle('active');
            
            // Toggle the 'active' class on the button
            // This animates the hamburger icon
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
});
