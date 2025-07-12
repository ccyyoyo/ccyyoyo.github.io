/**
 * Portfolio Website - Main JavaScript Module
 * Modern interactive features for enhanced user experience
 * 
 * Features:
 * - Theme Toggle with localStorage persistence
 * - Smooth Scrolling Navigation with active link highlighting
 * - Scroll-triggered animations using Intersection Observer
 * - Animated skill progress bars
 * - Interactive particle background system
 * - Loading animations and transitions
 * - Enhanced UX with tooltips and responsive navigation
 * 
 * @author Cherng Yow
 * @version 1.0.0
 */

class PortfolioInteractive {
    constructor() {
        this.isLoaded = false;
        this.particles = [];
        this.animationFrame = null;
        this.skillsAnimated = false;
        
        // Configuration
        this.config = {
            particles: {
                count: 50,
                speed: 0.5,
                size: { min: 1, max: 3 },
                opacity: { min: 0.1, max: 0.6 },
                colors: ['#0d6efd', '#6c757d', '#198754', '#0dcaf0']
            },
            animations: {
                duration: 800,
                delay: 100,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            },
            skills: {
                mechanical: {
                    'AutoCAD': 90,
                    'MATLAB': 85,
                    'AutoDesk Inventor': 80,
                    'Abaqus': 75,
                    'Arduino': 88
                },
                programming: {
                    'GitHub': 95,
                    'VS Code': 90,
                    'HTML & CSS': 85,
                    'JavaScript': 80,
                    'Python': 85
                }
            }
        };

        this.init();
    }

    /**
     * Initialize all interactive features
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    /**
     * Execute when DOM is ready
     */
    onDOMReady() {
        try {
            this.showLoadingAnimation();
            this.initThemeToggle();
            this.initSmoothScrolling();
            this.initScrollAnimations();
            this.initSkillProgressBars();
            this.initParticleBackground();
            this.initTooltips();
            this.initMobileNavigation();
            this.initPageTransitions();
            this.hideLoadingAnimation();
            this.isLoaded = true;
            console.log('Portfolio Interactive features initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio features:', error);
        }
    }

    /**
     * Show loading animation
     */
    showLoadingAnimation() {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="loading-text">Loading...</div>
            </div>
        `;
        
        // Add loading styles
        const loadingStyles = `
            <style id="loadingStyles">
                #loadingOverlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--bs-body-bg, #ffffff);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    transition: opacity 0.5s ease-out;
                }
                
                .loading-spinner {
                    text-align: center;
                }
                
                .spinner-ring {
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(13, 110, 253, 0.1);
                    border-top: 4px solid #0d6efd;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                .loading-text {
                    color: var(--bs-body-color, #212529);
                    font-family: var(--font-body, 'Source Sans Pro', sans-serif);
                    font-weight: 500;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', loadingStyles);
        document.body.appendChild(loadingOverlay);
    }

    /**
     * Hide loading animation
     */
    hideLoadingAnimation() {
        setTimeout(() => {
            const overlay = document.getElementById('loadingOverlay');
            const styles = document.getElementById('loadingStyles');
            
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    styles?.remove();
                }, 500);
            }
        }, 1000); // Show for at least 1 second
    }

    /**
     * Initialize theme toggle functionality with enhanced animations
     */
    initThemeToggle() {
        // Skip if theme toggle is already initialized (to avoid conflicts)
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle || themeToggle.dataset.initialized) {
            console.log('Theme toggle already initialized or not found, skipping...');
            return;
        }
        
        console.log('Initializing enhanced theme toggle from main.js...');
        
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;
        
        if (!themeIcon) return;
        
        // Mark as initialized to prevent double initialization
        themeToggle.dataset.initialized = 'true';
        
        // Get saved theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-bs-theme', savedTheme);
        this.updateThemeIcon(savedTheme, themeIcon, themeToggle);
        
        // Enhanced theme toggle with animation
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add rotation animation to button
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
            
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Smooth theme transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme, themeIcon, themeToggle);
            
            // Update particle colors for new theme
            this.updateParticleColors(newTheme);
            
            // Remove transition after animation
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
        
        // Add CSS transition for theme toggle button
        themeToggle.style.transition = 'transform 0.3s ease';
    }

    /**
     * Update theme icon and tooltip
     */
    updateThemeIcon(theme, themeIcon, themeToggle) {
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-moon-stars';
            themeToggle.setAttribute('title', 'Switch to light mode');
        } else {
            themeIcon.className = 'bi bi-sun';
            themeToggle.setAttribute('title', 'Switch to dark mode');
        }
    }

    /**
     * Initialize smooth scrolling navigation with enhanced features
     */
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        // Enhanced smooth scrolling
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    // Smooth scroll with easing
                    this.smoothScrollTo(targetPosition, 800);
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse?.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
                    }
                }
            });
        });
        
        // Active navigation link highlighting
        this.initActiveNavigation(sections, navLinks);
    }

    /**
     * Custom smooth scroll implementation with easing
     */
    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const scrollAnimation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(scrollAnimation);
            }
        };
        
        requestAnimationFrame(scrollAnimation);
    }

    /**
     * Initialize active navigation highlighting
     */
    initActiveNavigation(sections, navLinks) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    /**
     * Initialize scroll-triggered animations using Intersection Observer
     */
    initScrollAnimations() {
        // Add CSS for animations
        this.addAnimationStyles();
        
        const animatedElements = document.querySelectorAll('[data-section], [data-skill-category], [data-project]');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }

    /**
     * Add CSS animation styles
     */
    addAnimationStyles() {
        const animationStyles = `
            <style id="animationStyles">
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-on-scroll.animated {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .skill-progress {
                    width: 100%;
                    height: 8px;
                    background-color: rgba(13, 110, 253, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }
                
                .skill-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #0d6efd, #0dcaf0);
                    border-radius: 4px;
                    width: 0;
                    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .skill-progress-bar::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 2s infinite;
                }
                
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .particle-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    opacity: 0.6;
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-on-scroll,
                    .skill-progress-bar {
                        transition: none;
                    }
                    
                    .skill-progress-bar::after {
                        animation: none;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }

    /**
     * Animate element when it comes into view
     */
    animateElement(element) {
        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
        
        setTimeout(() => {
            element.classList.add('animated');
        }, delay);
    }

    /**
     * Initialize animated skill progress bars
     */
    initSkillProgressBars() {
        const skillCategories = document.querySelectorAll('[data-skill-category]');
        
        skillCategories.forEach(category => {
            const categoryType = category.getAttribute('data-skill-category');
            const skillItems = category.querySelectorAll('.list-group-item');
            
            // Add progress bars to skill items
            skillItems.forEach((item, index) => {
                const skillName = item.textContent.trim();
                const skillLevel = this.config.skills[categoryType]?.[skillName] || 70;
                
                const progressContainer = document.createElement('div');
                progressContainer.className = 'skill-progress mt-2';
                
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress-bar';
                progressBar.setAttribute('data-skill-level', skillLevel);
                
                const skillLabel = document.createElement('div');
                skillLabel.className = 'd-flex justify-content-between align-items-center';
                skillLabel.innerHTML = `
                    <span>${skillName}</span>
                    <span class="text-muted small">${skillLevel}%</span>
                `;
                
                // Restructure the item
                item.innerHTML = '';
                item.appendChild(skillLabel);
                progressContainer.appendChild(progressBar);
                item.appendChild(progressContainer);
                item.className = 'list-group-item border-0 px-0 py-3';
            });
        });
        
        // Animate progress bars when skills section comes into view
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.skillsAnimated) {
                        this.animateSkillBars();
                        this.skillsAnimated = true;
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(skillsSection);
        }
    }

    /**
     * Animate skill progress bars
     */
    animateSkillBars() {
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const skillLevel = bar.getAttribute('data-skill-level');
                bar.style.width = `${skillLevel}%`;
            }, index * 150);
        });
    }

    /**
     * Initialize interactive particle background system
     */
    initParticleBackground() {
        // Create canvas for particles
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize particles
        this.initParticles(canvas);
        
        // Start animation
        this.animateParticles(ctx, canvas);
        
        // Handle reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
        }
    }

    /**
     * Initialize particle system
     */
    initParticles(canvas) {
        const { count, speed, size, opacity, colors } = this.config.particles;
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: Math.random() * (size.max - size.min) + size.min,
                opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    /**
     * Animate particles
     */
    animateParticles(ctx, canvas) {
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
            });
            
            // Draw connections between nearby particles
            this.drawConnections(ctx);
            
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * Draw connections between nearby particles
     */
    drawConnections(ctx) {
        const maxDistance = 120;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    ctx.strokeStyle = `rgba(13, 110, 253, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = opacity;
                    ctx.stroke();
                }
            }
        }
    }

    /**
     * Update particle colors based on theme
     */
    updateParticleColors(theme) {
        const lightColors = ['#0d6efd', '#6c757d', '#198754', '#0dcaf0'];
        const darkColors = ['#4dabf7', '#adb5bd', '#51cf66', '#22d3ee'];
        
        const colors = theme === 'dark' ? darkColors : lightColors;
        
        this.particles.forEach(particle => {
            particle.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }

    /**
     * Initialize enhanced tooltips
     */
    initTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                delay: { show: 500, hide: 100 }
            });
        });
        
        // Add custom tooltips for skill items
        const skillItems = document.querySelectorAll('.list-group-item');
        skillItems.forEach(item => {
            const skillName = item.querySelector('span')?.textContent;
            if (skillName) {
                item.setAttribute('data-bs-toggle', 'tooltip');
                item.setAttribute('title', `Click to learn more about ${skillName}`);
                new bootstrap.Tooltip(item, {
                    delay: { show: 700, hide: 100 }
                });
            }
        });
    }

    /**
     * Initialize mobile navigation enhancements
     */
    initMobileNavigation() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Add hamburger animation
            navbarToggler.addEventListener('click', () => {
                navbarToggler.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
                        navbarToggler.classList.remove('active');
                    }
                }
            });
            
            // Close menu when pressing Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
                    navbarToggler.classList.remove('active');
                }
            });
        }
    }

    /**
     * Initialize page transitions and loading states
     */
    initPageTransitions() {
        // Add entrance animations to main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Add loading states for images
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
            });
        });
        
        // Add hover effects to interactive elements
        this.initHoverEffects();
    }

    /**
     * Initialize hover effects for interactive elements
     */
    initHoverEffects() {
        // Enhanced card hover effects
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.transition = 'all 0.3s ease';
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Cleanup function for removing event listeners and animations
     */
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Remove particle canvas
        const canvas = document.querySelector('.particle-canvas');
        if (canvas) {
            canvas.remove();
        }
        
        // Clean up styles
        const styles = document.querySelectorAll('#animationStyles, #loadingStyles');
        styles.forEach(style => style.remove());
        
        console.log('Portfolio Interactive features cleaned up');
    }
}

// Initialize the interactive features
let portfolioApp;

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden && portfolioApp?.animationFrame) {
        cancelAnimationFrame(portfolioApp.animationFrame);
    } else if (!document.hidden && portfolioApp) {
        portfolioApp.animateParticles(
            document.querySelector('.particle-canvas')?.getContext('2d'),
            document.querySelector('.particle-canvas')
        );
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        portfolioApp = new PortfolioInteractive();
    });
} else {
    portfolioApp = new PortfolioInteractive();
}

// Handle page unload cleanup
window.addEventListener('beforeunload', () => {
    if (portfolioApp) {
        portfolioApp.destroy();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioInteractive;
}