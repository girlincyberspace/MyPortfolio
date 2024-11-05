document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    function getCurrentSection() {
        // Special handling for when we're at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
            return sections[sections.length - 1]; // Return last section
        }

        let maxVisibleSection = null;
        let maxVisibleAmount = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisibleAmount) {
                maxVisibleAmount = visibleHeight;
                maxVisibleSection = section;
            }
        });

        return maxVisibleSection;
    }

    function updateActiveLink() {
        const currentSection = getCurrentSection();
        
        if (currentSection) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('text-black');
            });
            
            // Add active class to current section's link
            const activeLink = document.querySelector(`nav a[href="#${currentSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('text-black');
            }
        }
    }

    // Add scroll event listener with debounce for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveLink();
        });
    });
    
    // Initial check
    updateActiveLink();

    // Update on window resize
    window.addEventListener('resize', updateActiveLink);
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('translate-x-0');
    mobileMenu.classList.toggle('translate-x-full');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerButton = document.querySelector('button');
    
    if (!mobileMenu.contains(e.target) && !hamburgerButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when clicking a link (smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});