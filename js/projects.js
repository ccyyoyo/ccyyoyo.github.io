/**
 * Project Modal and Animation Module
 * Handles project card interactions, modal display, and scroll animations
 */

(function () {
    'use strict';

    // Project data configuration
    const projectData = {
        'shooting-game': {
            title: '2D Shooting Game',
            description: 'An interactive 2D shooting game built with HTML5 Canvas and JavaScript. Features dynamic enemy generation, collision detection, scoring system, and multiple difficulty levels.',
            technologies: ['HTML5', 'Canvas', 'JavaScript', 'Bootstrap', 'jQuery', 'GSAP'],
            features: [
                'Dynamic enemy generation with random properties',
                'Real-time collision detection system',
                'Multiple difficulty levels (Easy, Normal, Hard, Insane)',
                'Score tracking and timer functionality',
                'Responsive controls (WASD + mouse)',
                'Particle effects and animations',
                'Local storage for high scores'
            ],
            controls: 'WASD keys for movement, mouse click to shoot',
            objective: 'Reach 10,000 points as quickly as possible',
            playLink: './final/',
            codeLink: 'https://github.com/ccyyoyo/ccyyoyo.github.io/tree/master/final'
        },
        'autonomous-car': {
            title: 'Autonomous Wind Powered Car',
            description: 'A capstone project that combines mechanical engineering principles with programming to create a wind-powered vehicle with autonomous navigation capabilities.',
            technologies: ['Arduino', 'AutoCAD', 'Fluid Mechanics', 'Control Systems', 'Kinematics'],
            features: [
                'Wind-powered propulsion system',
                'Autonomous road tracking using sensors',
                'Obstacle detection and avoidance',
                'Overtaking maneuver capability',
                'Real-time control system implementation',
                'Mechanical design optimization',
                'Integration of multiple engineering disciplines'
            ],
            applications: 'Sustainable transportation, autonomous vehicles, renewable energy',
            achievements: 'Successfully demonstrated autonomous navigation and overtaking',
            reportLink: '期末報告.pdf'
        }
    };

    /**
     * Initialize project features
     */
    function initProjects() {
        initProjectModal();
        initScrollAnimations();
    }

    /**
     * Initialize project modal functionality
     */
    function initProjectModal() {
        const projectCards = document.querySelectorAll('.project-card');
        const projectModalElement = document.getElementById('projectModal');

        if (!projectModalElement) {
            console.warn('Project modal element not found');
            return;
        }

        const projectModal = new bootstrap.Modal(projectModalElement);
        const projectModalLabel = document.getElementById('projectModalLabel');
        const projectModalBody = document.getElementById('projectModalBody');

        projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');

            if (!overlay) return;

            // Add click handler for shooting game
            if (card.querySelector('[data-project="shooting-game"]')) {
                overlay.addEventListener('click', function (e) {
                    e.preventDefault();
                    showProjectModal('shooting-game');
                });
                overlay.style.cursor = 'pointer';
            }

            // Add click handler for autonomous car
            if (card.querySelector('[data-project="autonomous-car"]')) {
                overlay.addEventListener('click', function (e) {
                    e.preventDefault();
                    showProjectModal('autonomous-car');
                });
                overlay.style.cursor = 'pointer';
            }
        });

        /**
         * Show project modal with data
         * @param {string} projectKey - Key to identify project in projectData
         */
        function showProjectModal(projectKey) {
            const project = projectData[projectKey];
            if (!project) return;

            projectModalLabel.textContent = project.title;

            let modalContent = `
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="fw-bold mb-3">Description</h6>
                        <p>${project.description}</p>
                        
                        <h6 class="fw-bold mb-3">Technologies Used</h6>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${project.technologies.map(tech => `<span class="badge bg-primary">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6 class="fw-bold mb-3">Key Features</h6>
                        <ul class="list-unstyled">
                            ${project.features.map(feature => `<li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

            if (project.controls) {
                modalContent += `
                    <div class="row mt-3">
                        <div class="col-12">
                            <h6 class="fw-bold mb-2">Controls</h6>
                            <p class="text-muted">${project.controls}</p>
                            <h6 class="fw-bold mb-2">Objective</h6>
                            <p class="text-muted">${project.objective}</p>
                        </div>
                    </div>
                `;
            }

            if (project.applications) {
                modalContent += `
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h6 class="fw-bold mb-2">Applications</h6>
                            <p class="text-muted">${project.applications}</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold mb-2">Achievements</h6>
                            <p class="text-muted">${project.achievements}</p>
                        </div>
                    </div>
                `;
            }

            modalContent += `
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            `;

            if (project.playLink) {
                modalContent += `
                    <a href="${project.playLink}" class="btn btn-success" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-play-fill me-2"></i>Play Game
                    </a>
                `;
            }

            if (project.codeLink) {
                modalContent += `
                    <a href="${project.codeLink}" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-code-slash me-2"></i>View Code
                    </a>
                `;
            }

            if (project.reportLink) {
                modalContent += `
                    <a href="${project.reportLink}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-file-earmark-pdf me-2"></i>View Report
                    </a>
                `;
            }

            modalContent += `
                        </div>
                    </div>
                </div>
            `;

            projectModalBody.innerHTML = modalContent;
            projectModal.show();
        }
    }

    /**
     * Initialize scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all project cards and feature items
        document.querySelectorAll('.project-card, .feature-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjects);
    } else {
        initProjects();
    }
})();
