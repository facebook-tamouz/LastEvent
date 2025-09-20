// Simple JavaScript for Photo Gallery Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Remove preload class to trigger animations
    setTimeout(() => {
        document.body.classList.remove('is-preload');
    }, 100);

    // Initialize photo gallery functionality
    initPhotoGallery();
    
    // Add smooth scrolling
    initSmoothScrolling();
    
    // Add keyboard navigation
    initKeyboardNavigation();
    
    // Add lazy loading for images
    initLazyLoading();
});

// Photo Gallery with Lightbox
function initPhotoGallery() {
    const galleryItems = document.querySelectorAll('.item.thumb a.image');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(this.href, index, galleryItems);
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc, currentIndex, allItems) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-next">&#8249;</button>
            <button class="lightbox-prev">&#8250;</button>
            <img src="${imageSrc}" alt="Gallery Image" class="lightbox-image">
            <div class="lightbox-counter">${currentIndex + 1} / ${allItems.length}</div>
        </div>
    `;
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-overlay.show {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px 15px;
            border-radius: 50%;
            transition: all 0.3s ease;
            z-index: 10001;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close:hover {
            background: rgba(0, 0, 0, 0.7);
        }
        
        .lightbox-next,
        .lightbox-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.7);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 15px 20px;
            border-radius: 50%;
            transition: all 0.3s ease;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        }
        
        .lightbox-next {
            right: 20px;
        }
        
        .lightbox-prev {
            left: 20px;
        }
        
        .lightbox-next:hover,
        .lightbox-prev:hover {
            background: rgba(0, 0, 0, 0.7);
        }
        
        .lightbox-counter {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 16px;
            background: rgba(0, 0, 0, 0.7);
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: 500;
            backdrop-filter: blur(10px);
        }
        
        @media (max-width: 768px) {
            .lightbox-next,
            .lightbox-prev {
                width: 50px;
                height: 50px;
                font-size: 20px;
                padding: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-close {
                top: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
            
            .lightbox-counter {
                bottom: 10px;
                font-size: 14px;
                padding: 6px 15px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Show lightbox
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
    
    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-next');
    const nextBtn = lightbox.querySelector('.lightbox-prev');
    
    closeBtn.addEventListener('click', () => closeLightbox(lightbox));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox(lightbox);
    });
    
    // Navigation functionality
    prevBtn.addEventListener('click', () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
        closeLightbox(lightbox);
        setTimeout(() => {
            openLightbox(allItems[prevIndex].href, prevIndex, allItems);
        }, 300);
    });
    
    nextBtn.addEventListener('click', () => {
        const nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
        closeLightbox(lightbox);
        setTimeout(() => {
            openLightbox(allItems[nextIndex].href, nextIndex, allItems);
        }, 300);
    });
    
    // Keyboard navigation
    const handleKeydown = (e) => {
        switch(e.key) {
            case 'Escape':
                closeLightbox(lightbox);
                break;
            case 'ArrowLeft':
                nextBtn.click();
                break;
            case 'ArrowRight':
                prevBtn.click();
                break;
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Clean up event listener when lightbox closes
    lightbox.addEventListener('close', () => {
        document.removeEventListener('keydown', handleKeydown);
    });
}

function closeLightbox(lightbox) {
    lightbox.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(lightbox);
        // Remove the style element
        const style = document.querySelector('style');
        if (style && style.textContent.includes('lightbox-overlay')) {
            document.head.removeChild(style);
        }
    }, 300);
}

// Smooth scrolling for the page
function initSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle scroll zones for horizontal scrolling on desktop
    if (window.innerWidth > 768) {
        createScrollZones();
    }
}

function createScrollZones() {
    const leftZone = document.createElement('div');
    const rightZone = document.createElement('div');
    
    leftZone.className = 'scroll-zone left';
    rightZone.className = 'scroll-zone right';
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-zone {
            position: fixed;
            top: 0;
            width: 50px;
            height: 100vh;
            z-index: 1000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .scroll-zone.left {
            left: 0;
        }
        
        .scroll-zone.right {
            right: 0;
        }
        
        .scroll-zone:hover {
            opacity: 0.1;
            background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
        }
        
        @media (max-width: 768px) {
            .scroll-zone {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(leftZone);
    document.body.appendChild(rightZone);
    
    // Scroll functionality
    let scrollInterval;
    
    leftZone.addEventListener('mouseenter', () => {
        scrollInterval = setInterval(() => {
            window.scrollBy(20, 0);
        }, 16);
    });
    
    rightZone.addEventListener('mouseenter', () => {
        scrollInterval = setInterval(() => {
            window.scrollBy(-20, 0);
        }, 16);
    });
    
    leftZone.addEventListener('mouseleave', () => clearInterval(scrollInterval));
    rightZone.addEventListener('mouseleave', () => clearInterval(scrollInterval));
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Only handle if no lightbox is open
        if (document.querySelector('.lightbox-overlay')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                window.scrollBy(100, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                window.scrollBy(-100, 0);
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo(0, 0);
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo(document.body.scrollWidth, 0);
                break;
        }
    });
}

// Lazy loading for images with better performance
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        const images = document.querySelectorAll('.item.thumb img');
        images.forEach(img => {
            img.style.opacity = '1';
        });
        return;
    }
    
    const images = document.querySelectorAll('.item.thumb img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading placeholder with better performance
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // Preload image for better performance
                const preloadImg = new Image();
                preloadImg.onload = () => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };
                preloadImg.onerror = () => {
                    img.style.opacity = '1';
                    img.alt = 'خطأ في تحميل الصورة';
                };
                preloadImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Interactive effects removed - hover effects disabled

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recreate scroll zones if needed
    const existingZones = document.querySelectorAll('.scroll-zone');
    existingZones.forEach(zone => zone.remove());
    
    if (window.innerWidth > 768) {
        createScrollZones();
    }
}, 250));
