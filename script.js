// Loading animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('fade-out');
    }, 1000);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navToggleBtn = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    const nav = document.getElementById('nav-bar');

    // Mobile menu toggle with animation
    navToggleBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggleBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navToggleBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navList.classList.remove('active');
            navToggleBtn.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.motto, .author').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            const rate = scrolled * -0.2;
            heroImg.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add click ripple effect to buttons
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add ripple effect to interactive elements
    document.querySelectorAll('.nav-item a, .nav-toggle-btn').forEach(addRippleEffect);

    // Typing animation for title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        const originalText = text;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    const tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation after page load
    setTimeout(() => {
        const titleElement = document.querySelector('.h1');
        if (titleElement) {
            const originalText = titleElement.innerHTML;
            typeWriter(titleElement, originalText, 80);
        }
    }, 1500);

    // Add scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--text_color), var(--accent));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    createScrollProgress();

    // Enhanced hover effects for containers
    document.querySelectorAll('.motto-container, .author-container').forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        });
    }

    // Add entrance animations for content sections
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.motto-paragraph, .author-paragraph');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize content animations
    elements = document.querySelectorAll('.motto-paragraph, .author-paragraph');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', animateOnScroll);

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navList.classList.remove('active');
            navToggleBtn.classList.remove('active');
        }
    });

    // Add focus visible for accessibility
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        // Your scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    // Replace direct scroll listeners with throttled version where needed
    // window.addEventListener('scroll', requestTick);

    console.log('Quick Glance About Bharat - Website Enhanced Successfully! 🇮🇳');
});