// ================================
// Portfolio Website - Main JavaScript
// ================================

'use strict';

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ================================
// Custom Cursor
// ================================
const initCursor = () => {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const cursor = $('.cursor');
    const follower = $('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    const animateCursor = () => {
        // Cursor position
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Follower position (slower)
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = $$('a, button, .project-card, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            follower.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
        });
    });
};

// ================================
// Navbar Scroll Effect
// ================================
const initNavbar = () => {
    const navbar = $('#navbar');
    const navLinks = $$('.nav-link');
    const sections = $$('section[id]');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = $(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if ($('.nav-menu').classList.contains('active')) {
                    $('.nav-menu').classList.remove('active');
                    $('#hamburger').classList.remove('active');
                }
            }
        });
    });
};

// ================================
// Mobile Menu Toggle
// ================================
const initMobileMenu = () => {
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
};

// ================================
// Typing Animation
// ================================
const initTypingAnimation = () => {
    const typingText = $('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Hariprasad Penta',
        'Senior Mobile Engineer',
        'Android Specialist',
        'Flutter Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typingSpeed);
    };
    
    type();
};

// ================================
// Counter Animation
// ================================
const initCounterAnimation = () => {
    const counters = $$('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
};

// ================================
// Scroll Animations
// ================================
const initScrollAnimations = () => {
    const animatedElements = $$('[data-scroll-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
};

// ================================
// Skill Progress Bars Animation
// ================================
const initSkillBars = () => {
    const skillBars = $$('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
};

// ================================
// Project Filtering
// ================================
const initProjectFilter = () => {
    const filterBtns = $$('.filter-btn');
    const projectCards = $$('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};

// ================================
// Contact Form Handling
// ================================
const initContactForm = () => {
    const form = $('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Success feedback
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
            console.log('Form submitted:', data);
        }, 2000);
    });
    
    // Form validation with visual feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
    });
};

// ================================
// Back to Top Button
// ================================
const initBackToTop = () => {
    const backToTopBtn = $('#backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ================================
// Parallax Effect
// ================================
const initParallax = () => {
    const parallaxElements = $$('.gradient-orb, .phone-mockup, .floating-icons');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
};

// ================================
// Lazy Loading Images
// ================================
const initLazyLoading = () => {
    const images = $$('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ================================
// Theme Toggle (Optional)
// ================================
const initThemeToggle = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // You can add a theme toggle button in the navbar
    // const themeToggle = $('#theme-toggle');
    // themeToggle.addEventListener('click', () => {
    //     const currentTheme = document.documentElement.getAttribute('data-theme');
    //     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    //     document.documentElement.setAttribute('data-theme', newTheme);
    //     localStorage.setItem('theme', newTheme);
    // });
};

// ================================
// Particle Background Effect (Advanced)
// ================================
const initParticles = () => {
    // Optional: Add particle.js or custom particle effect
    // This is a placeholder for advanced particle animations
    // You can integrate libraries like particles.js for enhanced effects
};

// ================================
// Performance Monitoring
// ================================
const initPerformanceMonitoring = () => {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry);
                    }
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // PerformanceObserver not fully supported
        }
    }
};

// ================================
// Easter Eggs & Fun Interactions
// ================================
const initEasterEggs = () => {
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    const activateEasterEgg = () => {
        // Add fun animation or effect
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    };
};

// ================================
// Accessibility Enhancements
// ================================
const initAccessibility = () => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for project cards
    const projectCards = $$('.project-card');
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
    
    // ARIA labels for interactive elements
    const socialLinks = $$('.social-link');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const platform = icon.classList[1].split('-')[1]; // Extract platform name
            link.setAttribute('aria-label', `Visit ${platform} profile`);
        }
    });
};

// ================================
// Copy Email on Click
// ================================
const initCopyEmail = () => {
    const emailLinks = $$('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--accent-color);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    margin-top: -40px;
                    animation: fadeInUp 0.3s ease;
                `;
                link.parentElement.style.position = 'relative';
                link.parentElement.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
                // Fallback: open mail client
                window.location.href = link.href;
            });
        });
    });
};

// ================================
// Smooth Reveal on Scroll
// ================================
const initSmoothReveal = () => {
    // Add stagger animation to grid items
    const grids = [
        { selector: '.skills-grid .skill-category', delay: 100 },
        { selector: '.projects-grid .project-card', delay: 100 },
        { selector: '.testimonials-slider .testimonial-card', delay: 150 }
    ];
    
    grids.forEach(({ selector, delay }) => {
        const items = $$(selector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * delay}ms`;
        });
    });
};

// ================================
// Initialize All Features
// ================================
const init = () => {
    console.log('%c🚀 Portfolio Website Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using vanilla JavaScript', 'color: #f5576c; font-size: 14px;');
    
    // Core features
    initCursor();
    initNavbar();
    initMobileMenu();
    initTypingAnimation();
    initCounterAnimation();
    initScrollAnimations();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initParallax();
    initLazyLoading();
    
    // Enhanced features
    initAccessibility();
    initCopyEmail();
    initSmoothReveal();
    initThemeToggle();
    initEasterEggs();
    
    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }
};

// ================================
// Load Event
// ================================
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================================
// Window Load Event
// ================================
window.addEventListener('load', () => {
    // Hide loading spinner if you have one
    const loader = $('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ================================
// Service Worker Registration (PWA)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered:', reg))
        //     .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// ================================
// Export for module usage (optional)
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initCursor,
        initNavbar,
        initTypingAnimation,
        initProjectFilter
    };
}
