/*
=====================================================
GALLERY JAVASCRIPT
=====================================================
Handles lightbox functionality for the photo gallery
*/

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const totalImages = galleryImages.length;
    
    // Store all image sources and captions
    const images = Array.from(galleryImages).map(img => ({
        src: img.src,
        alt: img.alt
    }));
    
    // Open lightbox when clicking on a gallery image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPreviousImage();
    });
    
    // Next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        const currentImage = images[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        lightboxCaption.textContent = currentImage.alt;
        
        // Optional: Add image counter
        // lightboxCaption.textContent = `${currentImage.alt} (${currentImageIndex + 1}/${totalImages})`;
    }
    
    // Preload adjacent images for smooth navigation
    function preloadAdjacentImages() {
        const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        const nextIndex = (currentImageIndex + 1) % totalImages;
        
        const prevImg = new Image();
        const nextImg = new Image();
        prevImg.src = images[prevIndex].src;
        nextImg.src = images[nextIndex].src;
    }
    
    // Call preload when opening lightbox or navigating
    lightbox.addEventListener('transitionend', preloadAdjacentImages);
    
});
