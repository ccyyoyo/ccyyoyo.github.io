/**
 * Tech Particles Background Animation
 * Creates an animated particle system with connections
 */

(function () {
    'use strict';

    /**
     * Tech Particle System Class
     */
    class TechParticles {
        constructor() {
            this.canvas = document.getElementById('techCanvas');
            if (!this.canvas) {
                console.warn('Tech canvas element not found');
                return;
            }

            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.connections = [];
            this.mouse = { x: 0, y: 0 };

            this.init();
            this.animate();
            this.addEventListeners();
        }

        init() {
            this.resize();
            this.createParticles();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
            this.particles = [];

            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            this.drawParticles();
            requestAnimationFrame(() => this.animate());
        }

        updateParticles() {
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            });
        }

        drawParticles() {
            const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
            const color = isDark ? '0, 255, 255' : '0, 212, 255';

            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
                this.ctx.fill();

                // Add glow effect
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = `rgba(${color}, 0.5)`;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            });
        }

        drawConnections() {
            const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
            const color = isDark ? '0, 255, 255' : '0, 212, 255';

            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = (100 - distance) / 100 * 0.2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }

        addEventListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
        }
    }

    // Initialize particles when DOM is ready
    function initParticles() {
        new TechParticles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
