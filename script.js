// Get elements for the hamburger and navigation links
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');  // Toggle 'active' class on hamburger icon
    navLinks.classList.toggle('active');   // Toggle 'active' class on the navigation menu
    document.body.classList.toggle('no-scroll');  // Prevent scrolling when the menu is open
});

// Close menu when clicking outside the hamburger or nav links
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');  // Remove 'active' class from hamburger
        navLinks.classList.remove('active');   // Remove 'active' class from the navigation menu
        document.body.classList.remove('no-scroll');  // Allow scrolling again
    }
});

// Smooth scroll behavior with menu close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent default anchor behavior
        const targetId = link.getAttribute('href');  // Get the target section id from the link
        const targetSection = document.querySelector(targetId);  // Find the target section

        // Close the mobile menu after clicking a link
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');

        // Smoothly scroll to the target section after a slight delay (300ms for menu animation)
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth',  // Smooth scroll behavior
                block: 'start'  // Align the target section to the top of the viewport
            });
        }, 300);
    });
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');  // Get all sections
    const navLinks = document.querySelectorAll('.nav-links a');  // Get all navigation links
    const scrollPosition = window.scrollY + 80;  // Get the current scroll position

    // Iterate through each section to check if it is in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;  // Get the top position of the section
        const sectionHeight = section.clientHeight;  // Get the height of the section

        // Check if the section is in view
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');  // Get the section id
            navLinks.forEach(link => {
                link.classList.remove('active');  // Remove 'active' class from all links
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active');  // Add 'active' class to the link corresponding to the section
                }
            });
        }
    });
});
