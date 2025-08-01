document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Dropdown functionality (optional, CSS handles most of it)
    const dropdownBtn = document.querySelector('.dropbtn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) { // Only toggle on smaller screens if CSS hover isn't enough
                const dropdownContent = dropdownBtn.nextElementSibling;
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                event.preventDefault(); // Prevent default link behavior
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Statistic Counter Animation
    const statsSection = document.getElementById('statistik');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false; // Flag to ensure animation runs only once

    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let current = 0;
            const increment = target / 200; // Adjust speed

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            updateCounter();
        });
    };

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateNumbers();
                animated = true; // Set flag to true after animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    if (statsSection) {
        observer.observe(statsSection);
    }
});
