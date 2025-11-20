/**
 * Theme Toggle Module
 * Handles dark/light theme switching with localStorage persistence
 */

(function () {
    'use strict';

    /**
     * Initialize theme toggle functionality
     */
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        if (!themeToggle || !themeIcon) {
            console.warn('Theme toggle elements not found');
            return;
        }

        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-bs-theme', savedTheme);
        updateIcon(savedTheme);

        // Toggle theme on click
        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-bs-theme');
            const newTheme = current === 'light' ? 'dark' : 'light';

            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });

        /**
         * Update theme icon based on current theme
         * @param {string} theme - Current theme ('light' or 'dark')
         */
        function updateIcon(theme) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-moon-stars';
            } else {
                themeIcon.className = 'bi bi-sun';
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();
