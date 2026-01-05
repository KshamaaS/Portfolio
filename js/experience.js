/*
=====================================================
EXPERIENCE.JS - Loads and displays your work experience
=====================================================

HOW THIS WORKS:
1. When the page loads, this script reads data/experience.json
2. It creates HTML entries for each experience
3. It adds them to the experience page in timeline format

To add/remove/edit experiences, edit data/experience.json

=====================================================
*/

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Only run this code on the experience page
    const experienceContainer = document.getElementById('experience-container');
    
    if (experienceContainer) {
        // Load and display the experiences
        loadExperiences();
    }
});


/*
---------------------------------------------------
LOAD EXPERIENCES
---------------------------------------------------
This function reads the experience.json file and creates
HTML entries for each experience.
*/
function loadExperiences() {
    
    const container = document.getElementById('experience-container');
    
    // Fetch (read) the experience.json file
    fetch('data/experience.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Clear the loading message
            container.innerHTML = '';
            
            // Get the experiences array
            const experiences = data.experiences;
            
            // Loop through each experience and create an entry
            experiences.forEach(function(experience) {
                const entryHTML = createExperienceEntry(experience);
                container.innerHTML += entryHTML;
            });
        })
        .catch(function(error) {
            console.error('Error loading experiences:', error);
            container.innerHTML = '<p class="loading-message">Error loading experiences. Please check that data/experience.json exists and is valid JSON.</p>';
        });
}


/*
---------------------------------------------------
CREATE EXPERIENCE ENTRY
---------------------------------------------------
This function takes an experience object and returns
the HTML for an experience entry.
*/
function createExperienceEntry(experience) {
    
    let html = '';
    
    // Opening tag for the experience entry
    html += '<div class="experience-entry">';
    
    // Timeline marker
    html += '<div class="experience-marker"></div>';
    
    // Experience content
    html += '<div class="experience-content">';
    
    // Header with dates
    html += '<div class="experience-header">';
    
    // Left side: Logo (if available) and Title/Company
    html += '<div class="experience-title-section">';
    
    // Company logo (if available)
    if (experience.logo) {
        html += '<img src="' + experience.logo + '" alt="' + experience.company + ' logo" class="experience-logo">';
    }
    
    html += '<div class="experience-title-info">';
    html += '<h3 class="experience-title">' + experience.title + '</h3>';
    
    if (experience.companyUrl) {
        html += '<p class="experience-company"><a href="' + experience.companyUrl + '" target="_blank">' + experience.company + '</a></p>';
    } else {
        html += '<p class="experience-company">' + experience.company + '</p>';
    }
    
    // Location
    html += '<p class="experience-location">' + experience.location + '</p>';
    
    // GPA on separate line (if available)
    if (experience.gpa) {
        html += '<p class="experience-gpa">GPA: ' + experience.gpa + '</p>';
    }
    
    html += '</div>'; // Close experience-title-info
    html += '</div>'; // Close experience-title-section
    
    // Right side: Duration
    html += '<div class="experience-duration">';
    html += '<span class="experience-dates">' + experience.startDate + ' - ' + experience.endDate + '</span>';
    html += '</div>';
    
    html += '</div>'; // Close experience-header
    
    // Description (key highlights)
    if (experience.description && experience.description.length > 0) {
        html += '<ul class="experience-highlights">';
        experience.description.forEach(function(highlight) {
            html += '<li>' + highlight + '</li>';
        });
        html += '</ul>';
    }
    
    html += '</div>'; // Close experience-content
    html += '</div>'; // Close experience-entry
    
    return html;
}
