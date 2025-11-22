/*
=====================================================
PUBLICATIONS.JS - Loads and displays your publications
=====================================================

HOW THIS WORKS:
1. When the page loads, this script reads data/publications.json
2. It creates HTML entries for each publication
3. It adds them to the publications page
4. It handles the filter buttons (All/Books/Research)

To add/remove/edit publications, just edit data/publications.json

PUBLICATION TYPES:
- "Book" : Books you've authored
- "Research" : Research papers (journal articles, conference papers, etc.)

=====================================================
*/

// Store your name globally (loaded from JSON)
let authorName = '';

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Only run this code on the publications page
    const publicationsContainer = document.getElementById('publications-container');
    
    if (publicationsContainer) {
        // Load and display the publications
        loadPublications();
        
        // Set up the filter buttons
        setupFilters();
    }
});


/*
---------------------------------------------------
LOAD PUBLICATIONS
---------------------------------------------------
*/
function loadPublications() {
    
    const container = document.getElementById('publications-container');
    
    fetch('data/publications.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Store author name for highlighting
            authorName = data.yourName || '';
            
            // Clear the loading message
            container.innerHTML = '';
            
            // Get the publications array
            const publications = data.publications;
            
            // Sort by year (newest first)
            publications.sort(function(a, b) {
                return parseInt(b.year) - parseInt(a.year);
            });
            
            // Loop through each publication and create an entry
            publications.forEach(function(pub) {
                const entryHTML = createPublicationEntry(pub);
                container.innerHTML += entryHTML;
            });
        })
        .catch(function(error) {
            console.error('Error loading publications:', error);
            container.innerHTML = '<p class="loading-message">Error loading publications. Please check that data/publications.json exists and is valid JSON.</p>';
        });
}


/*
---------------------------------------------------
CREATE PUBLICATION ENTRY
---------------------------------------------------
*/
function createPublicationEntry(pub) {
    
    let html = '';
    
    // Opening tag with data-type for filtering
    html += '<div class="publication-entry" data-type="' + pub.type + '">';
    
    // Publication details (no images)
    html += '<div class="publication-details">';
    
    // Publication type badge (Book or Research)
    html += '<span class="publication-type publication-type-' + pub.type.toLowerCase() + '">' + pub.type + '</span>';
    
    // Title (linked if URL or DOI exists)
    if (pub.url || pub.doi) {
        const link = pub.url || pub.doi;
        html += '<h3 class="publication-title"><a href="' + link + '" target="_blank">' + pub.title + '</a></h3>';
    } else {
        html += '<h3 class="publication-title">' + pub.title + '</h3>';
    }
    
    // Authors (highlight the user's name)
    html += '<p class="publication-authors">';
    const authorsList = pub.authors.map(function(author) {
        if (author === authorName) {
            return '<strong>' + author + '</strong>';
        }
        return author;
    });
    html += authorsList.join(', ');
    html += '</p>';
    
    // Publication venue (journal, conference, or publisher)
    html += '<p class="publication-venue">';
    if (pub.publisher) {
        html += pub.publisher;
        if (pub.isbn) html += ' · ISBN: ' + pub.isbn;
    } else if (pub.journal) {
        html += '<em>' + pub.journal + '</em>';
        if (pub.volume) html += ', Vol. ' + pub.volume;
        if (pub.issue) html += '(' + pub.issue + ')';
        if (pub.pages) html += ', pp. ' + pub.pages;
    } else if (pub.conference) {
        html += '<em>' + pub.conference + '</em>';
        if (pub.pages) html += ', pp. ' + pub.pages;
    }
    html += ' · ' + pub.year;
    html += '</p>';
    
    // Description
    html += '<p class="publication-description">' + pub.description + '</p>';
    
    // Links (PDF, DOI, URL)
    html += '<div class="publication-links">';
    if (pub.pdf) {
        html += '<a href="' + pub.pdf + '" target="_blank" class="publication-link">PDF →</a>';
    }
    if (pub.doi) {
        html += '<a href="' + pub.doi + '" target="_blank" class="publication-link">DOI →</a>';
    }
    if (pub.url && pub.type === 'Book') {
        html += '<a href="' + pub.url + '" target="_blank" class="publication-link">Get the Book →</a>';
    }
    html += '</div>';
    
    // Close publication-details div
    html += '</div>';
    
    // Close publication-entry
    html += '</div>';
    
    return html;
}


/*
---------------------------------------------------
SETUP FILTERS
---------------------------------------------------
*/
function setupFilters() {
    
    const filterButtons = document.querySelectorAll('.publication-filters .filter-btn');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter publications
            filterPublications(filterValue);
        });
    });
}


/*
---------------------------------------------------
FILTER PUBLICATIONS
---------------------------------------------------
*/
function filterPublications(filterValue) {
    
    const entries = document.querySelectorAll('.publication-entry');
    
    entries.forEach(function(entry) {
        const pubType = entry.getAttribute('data-type');
        
        if (filterValue === 'all' || pubType === filterValue) {
            entry.classList.remove('hidden');
        } else {
            entry.classList.add('hidden');
        }
    });
}
