/*
=====================================================
PROJECTS.JS - Loads and displays your projects
=====================================================

HOW THIS WORKS:
1. When the page loads, this script reads data/projects.json
2. It creates HTML cards for each project
3. It adds them to the projects page
4. It handles the filter buttons (All/Personal/Work)

To add/remove/edit projects, edit data/projects.json

=====================================================
*/

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Only run this code on the projects page
    // (We check if the projects container exists)
    const projectsContainer = document.getElementById('projects-container');
    
    if (projectsContainer) {
        // Load and display the projects
        loadProjects();
        
        // Set up the filter buttons
        setupFilters();
    }
});


/*
This function reads the projects.json file and creates
HTML cards for each project.
*/
function loadProjects() {
    
    // Get the container where we'll put the project cards
    const container = document.getElementById('projects-container');
    
    // Fetch (read) the projects.json file
    fetch('data/projects.json')
        .then(function(response) {
            // Convert the response to JSON format
            return response.json();
        })
        .then(function(data) {
            // Clear the "Loading..." message
            container.innerHTML = '';
            
            // Get the projects array from the data
            const projects = data.projects;
            
            // Loop through each project and create a card for it
            projects.forEach(function(project) {
                // Create the HTML for this project card
                const cardHTML = createProjectCard(project);
                
                // Add the card to the container
                container.innerHTML += cardHTML;
            });
        })
        .catch(function(error) {
            // If there's an error, show a message
            console.error('Error loading projects:', error);
            container.innerHTML = '<p class="loading-message">Error loading projects. Please check that data/projects.json exists and is valid JSON.</p>';
        });
}


/*
---------------------------------------------------
CREATE PROJECT CARD
---------------------------------------------------
This function takes a project object and returns
the HTML for a project card.
*/
function createProjectCard(project) {
    
    // Start building the HTML string
    let html = '';
    
    // Opening tag for the card
    // data-type stores whether it's "Personal" or "Work" for filtering
    html += '<div class="project-card" data-type="' + project.type + '">';
    
    // Project image (if available)
    if (project.image) {
        html += '<img src="' + project.image + '" alt="' + project.title + '" class="project-image">';
    }
    
    // Project content section
    html += '<div class="project-content">';
    
    // Project type badge (Personal or Work)
    html += '<span class="project-type">' + project.type + '</span>';
    
    // Project title
    html += '<h3>' + project.title + '</h3>';
    
    // Project description - UPDATED TO HANDLE ARRAYS
    if (Array.isArray(project.description)) {
        // It's an array - show as bullet points
        html += '<ul class="project-description">';
        project.description.forEach(function(point) {
            html += '<li>' + point + '</li>';
        });
        html += '</ul>';
    } else {
        // It's a string - show as paragraph
        html += '<p>' + project.description + '</p>';
    }
    
    // Technologies used
    if (project.technologies && project.technologies.length > 0) {
        html += '<div class="project-tech">';
        project.technologies.forEach(function(tech) {
            html += '<span>' + tech + '</span>';
        });
        html += '</div>';
    }
    
    // Project links (GitHub and/or Live URL)
    html += '<div class="project-links">';
    
    if (project.github) {
        html += '<a href="' + project.github + '" target="_blank" class="project-link">View on GitHub →</a>';
    }
    
    if (project.liveUrl) {
        html += '<a href="' + project.liveUrl + '" target="_blank" class="project-link">Live Demo →</a>';
    }
    
    html += '</div>'; // Close project-links
    html += '</div>'; // Close project-content
    html += '</div>'; // Close project-card
    
    return html;
}


/*
---------------------------------------------------
SETUP FILTERS
---------------------------------------------------
This function sets up the filter buttons so users can
view All projects, only Personal, or only Work.
*/
function setupFilters() {
    
    // Get all filter buttons (specifically from project-filters container)
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    
    // Add click handler to each button
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            
            // Get the filter value from the button's data-filter attribute
            const filterValue = this.getAttribute('data-filter');
            
            // Remove 'active' class from all buttons
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add 'active' class to clicked button
            this.classList.add('active');
            
            // Filter the projects
            filterProjects(filterValue);
        });
    });
}


/*
---------------------------------------------------
FILTER PROJECTS
---------------------------------------------------
This function shows/hides project cards based on
the selected filter.
*/
function filterProjects(filterValue) {
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Loop through each card
    projectCards.forEach(function(card) {
        
        // Get the project type from the card's data-type attribute
        const projectType = card.getAttribute('data-type');
        
        // Show or hide based on filter
        if (filterValue === 'all') {
            // Show all projects
            card.classList.remove('hidden');
        } else if (projectType === filterValue) {
            // Show projects that match the filter
            card.classList.remove('hidden');
        } else {
            // Hide projects that don't match
            card.classList.add('hidden');
        }
    });
}
