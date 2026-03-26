/*
=====================================================
PROJECTS.JS - Loads and displays your projects
=====================================================

HOW THIS WORKS:
1. When the page loads, this script reads data/projects.json
2. It creates HTML cards for each project
3. Each card shows the title, type, and technologies
4. Clicking a card expands a dropdown with description + links
5. It handles the filter buttons (All/Personal/Work)

To add/remove/edit projects, edit data/projects.json

=====================================================
*/

document.addEventListener('DOMContentLoaded', function() {

    const projectsContainer = document.getElementById('projects-container');

    if (projectsContainer) {
        loadProjects();
        setupFilters();
    }
});


function loadProjects() {

    const container = document.getElementById('projects-container');

    fetch('data/projects.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            container.innerHTML = '';

            const projects = data.projects;

            projects.forEach(function(project) {
                const cardHTML = createProjectCard(project);
                container.innerHTML += cardHTML;
            });

            // Attach toggle listeners after cards are in the DOM
            attachToggleListeners();
        })
        .catch(function(error) {
            console.error('Error loading projects:', error);
            container.innerHTML = '<p class="loading-message">Error loading projects. Please check that data/projects.json exists and is valid JSON.</p>';
        });
}


/*
---------------------------------------------------
CREATE PROJECT CARD
---------------------------------------------------
Each card has two parts:
  1. .project-summary  — always visible (title, type badge, tech tags, chevron)
  2. .project-details  — hidden by default, revealed on click (description + links)
*/
function createProjectCard(project) {

    let html = '';

    html += '<div class="project-card" data-type="' + project.type + '">';

    // ── Always-visible summary row ──────────────────────────────────────────
    html += '<div class="project-summary">';

    html += '<div class="project-summary-left">';
    html += '<span class="project-type">' + project.type + '</span>';
    html += '<h3 class="project-title">' + project.title + '</h3>';

    // Tech tags shown in the summary
    if (project.technologies && project.technologies.length > 0) {
        html += '<div class="project-tech">';
        project.technologies.forEach(function(tech) {
            html += '<span>' + tech + '</span>';
        });
        html += '</div>';
    }

    html += '</div>'; // close project-summary-left

    // Chevron arrow — rotates when open
    html += '<span class="project-chevron">&#8964;</span>';

    html += '</div>'; // close project-summary

    // ── Expandable details ──────────────────────────────────────────────────
    html += '<div class="project-details">';

    // Description — handles both array (bullet points) and plain string
    if (Array.isArray(project.description)) {
        html += '<ul class="project-description">';
        project.description.forEach(function(point) {
            html += '<li>' + point + '</li>';
        });
        html += '</ul>';
    } else if (project.description) {
        html += '<p class="project-description">' + project.description + '</p>';
    }

    // Links
    if (project.github || project.liveUrl) {
        html += '<div class="project-links">';
        if (project.github) {
            html += '<a href="' + project.github + '" target="_blank" class="project-link">View on GitHub →</a>';
        }
        if (project.liveUrl) {
            html += '<a href="' + project.liveUrl + '" target="_blank" class="project-link">Live Demo →</a>';
        }
        html += '</div>';
    }

    html += '</div>'; // close project-details
    html += '</div>'; // close project-card

    return html;
}


/*
---------------------------------------------------
ATTACH TOGGLE LISTENERS
---------------------------------------------------
Called after cards are injected into the DOM.
Clicking the summary row opens/closes the details.
*/
function attachToggleListeners() {

    const summaries = document.querySelectorAll('.project-summary');

    summaries.forEach(function(summary) {
        summary.addEventListener('click', function() {

            const card = this.closest('.project-card');
            const details = card.querySelector('.project-details');
            const chevron = card.querySelector('.project-chevron');

            const isOpen = card.classList.contains('open');

            if (isOpen) {
                // Closing: pin to current height first, then animate to 0
                details.style.maxHeight = details.scrollHeight + 'px';
                requestAnimationFrame(function() {
                    details.style.maxHeight = '0';
                });
                card.classList.remove('open');
                chevron.style.transform = 'rotate(0deg)';
            } else {
                // Opening: animate to scrollHeight, then remove cap so
                // content of any length is never clipped
                card.classList.add('open');
                details.style.maxHeight = details.scrollHeight + 'px';
                chevron.style.transform = 'rotate(180deg)';

                details.addEventListener('transitionend', function handler() {
                    if (card.classList.contains('open')) {
                        details.style.maxHeight = 'none';
                    }
                    details.removeEventListener('transitionend', handler);
                });
            }
        });
    });
}


/*
---------------------------------------------------
SETUP FILTERS
---------------------------------------------------
*/
function setupFilters() {

    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {

            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            this.classList.add('active');
            filterProjects(filterValue);
        });
    });
}


/*
---------------------------------------------------
FILTER PROJECTS
---------------------------------------------------
*/
function filterProjects(filterValue) {

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(function(card) {

        const projectType = card.getAttribute('data-type');

        if (filterValue === 'all') {
            card.classList.remove('hidden');
        } else if (projectType === filterValue) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}