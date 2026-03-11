// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const preloader = document.querySelector('.preloader');
    const themeToggle = document.getElementById('themeToggle');
    const navbar = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOverlay = document.querySelector('.nav-overlay');
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const splitText = document.querySelector('.split-text');
    const heroIntro = document.querySelector('.hero-intro');
    const heroImage = document.querySelector('.hero-image');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const skillBars = document.querySelectorAll('.skill-progress');
    const serviceCards = document.querySelectorAll('.service-card');
    const stackItems = document.querySelectorAll('.stack-item');
    const testimonialControls = document.querySelector('.testimonial-controls');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    // Preloader
    window.addEventListener('load', function() {
      setTimeout(() => {
        preloader.classList.add('loaded');
        body.classList.add('cursor-visible');
        
        // Animate hero elements after preloader is gone
        setTimeout(() => {
          splitText.classList.add('animate');
          heroIntro.classList.add('animated');
          heroImage.classList.add('animated');
        }, 500);
      }, 1000);
    });
    
    // Theme Switcher
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.checked = true;
    }
    
    // Custom Cursor
    document.addEventListener('mousemove', function(e) {
      cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Cursor hover effect for clickable elements
    const cursorHoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .tab-btn');
    cursorHoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorOuter.classList.add('cursor-hover');
        cursorInner.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorOuter.classList.remove('cursor-hover');
        cursorInner.classList.remove('cursor-hover');
      });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseout', function(e) {
      if (e.relatedTarget === null) {
        body.classList.remove('cursor-visible');
      }
    });
    
    document.addEventListener('mouseover', function() {
      body.classList.add('cursor-visible');
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Activate nav links based on scroll position
      highlightNavOnScroll();
      
      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        scrollToTop.style.opacity = '1';
        scrollToTop.style.visibility = 'visible';
      } else {
        scrollToTop.style.opacity = '0';
        scrollToTop.style.visibility = 'hidden';
      }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      document.querySelector('.nav-links').classList.toggle('open');
      navOverlay.classList.toggle('open');
      body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking overlay
    navOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      document.querySelector('.nav-links').classList.remove('open');
      navOverlay.classList.remove('open');
      body.classList.remove('no-scroll');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        document.querySelector('.nav-links').classList.remove('open');
        navOverlay.classList.remove('open');
        body.classList.remove('no-scroll');
      });
    });
    
    // Highlight nav links based on scroll position
    function highlightNavOnScroll() {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(2rem)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Tab functionality
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        const targetId = this.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
      });
    });
    
    // Testimonial slider
    let currentSlide = 0;
    const maxSlides = testimonialSlides.length;
    
    function showSlide(index) {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonialSlides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }
    
    if (testimonialControls) {
      // Next button
      testimonialControls.querySelector('.control-next').addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % maxSlides;
        showSlide(currentSlide);
      });
      
      // Previous button
      testimonialControls.querySelector('.control-prev').addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        showSlide(currentSlide);
      });
      
      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          showSlide(index);
        });
      });
      
      // Auto slide every 5 seconds
      setInterval(() => {
        if (document.hasFocus()) {
          currentSlide = (currentSlide + 1) % maxSlides;
          showSlide(currentSlide);
        }
      }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    // Observer for project cards
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          projectObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    projectCards.forEach(card => {
      card.classList.add('animate-in');
      projectObserver.observe(card);
    });
    
    // Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.parentElement.getAttribute('style');
          entry.target.style.width = width;
          skillObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    skillBars.forEach(bar => {
      const percent = bar.style.width;
      bar.style.width = '0';
      bar.style.setProperty('--width', percent);
      skillObserver.observe(bar);
    });
    
    // Observer for service cards
    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          serviceObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    serviceCards.forEach(card => {
      serviceObserver.observe(card);
    });
    
    // Observer for stack items
    const stackObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered delay for each item
          const delay = 0.1 * Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${delay}s`;
          entry.target.classList.add('animated');
          stackObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    stackItems.forEach(item => {
      stackObserver.observe(item);
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate form
        let isValid = true;
        
        if (name.value.trim() === '') {
          showError(name, 'Name is required');
          isValid = false;
        } else {
          clearError(name);
        }
        
        if (email.value.trim() === '') {
          showError(email, 'Email is required');
          isValid = false;
        } else if (!isValidEmail(email.value)) {
          showError(email, 'Please enter a valid email');
          isValid = false;
        } else {
          clearError(email);
        }
        
        if (subject.value.trim() === '') {
          showError(subject, 'Subject is required');
          isValid = false;
        } else {
          clearError(subject);
        }
        
        if (message.value.trim() === '') {
          showError(message, 'Message is required');
          isValid = false;
        } else {
          clearError(message);
        }
        
        // Submit form if valid
        if (isValid) {
          // In a real application, you would submit the form to your server here
          alert('Form submitted successfully! (This is a demo)');
          contactForm.reset();
        }
      });
      
      // Function to show error messages
      function showError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        
        if (!formControl.querySelector('.error-message')) {
          formControl.appendChild(errorMessage);
        }
        
        formControl.classList.add('error');
        input.focus();
      }
      
      // Function to clear error messages
      function clearError(input) {
        const formControl = input.parentElement;
        if (formControl.querySelector('.error-message')) {
          formControl.removeChild(formControl.querySelector('.error-message'));
        }
        formControl.classList.remove('error');
      }
      
      // Function to validate email format
      function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]');
        
        if (email.value.trim() === '') {
          alert('Please enter your email address');
          return;
        }
        
        if (!isValidEmail(email.value)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // In a real application, you would submit the form to your server here
        alert('Subscribed successfully! (This is a demo)');
        newsletterForm.reset();
      });
      
      function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
  });

  // Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Wait for everything to load
    window.addEventListener('load', function() {
      // Remove preloader
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.classList.add('loaded');
          
          // Start hero animations
          setTimeout(() => {
            animateHero();
          }, 500);
        }, 1000);
      } else {
        // If preloader doesn't exist, start animations immediately
        animateHero();
      }
    });
    
    function animateHero() {
      // Split text animation
      const splitText = document.querySelector('.split-text');
      if (splitText) {
        splitText.classList.add('animate');
      }
      
      // Animate other hero elements
      const heroElements = [
        document.querySelector('.hero-intro'),
        document.querySelector('.hero-image')
      ];
      
      heroElements.forEach(element => {
        if (element) {
          element.classList.add('animated');
        }
      });
      
      // Trigger image reveal animation
      const imageReveal = document.querySelector('.image-reveal');
      if (imageReveal) {
        imageReveal.style.animation = 'reveal-background 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards';
        imageReveal.style.animationDelay = '0.8s';
      }
    }
  
    // Fix for split-text reveal
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach((text, index) => {
      // Apply proper animation
      text.style.opacity = '0';
      text.style.transform = 'translateY(100%)';
      
      // Add transition
      text.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      
      // Add delay based on index
      text.style.transitionDelay = `${0.2 + index * 0.2}s`;
    });
    
    // When animation starts
    document.querySelector('.split-text')?.addEventListener('animationstart', () => {
      revealTexts.forEach(text => {
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      });
    });
  });


  // Fix for project cards and services loading
document.addEventListener('DOMContentLoaded', function() {
    // Fix for project cards initially hidden
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Make all projects visible by default
    projectCards.forEach(card => {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(2rem)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Fix for services not loading - make them visible by default
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    
    // Fix animation classes
    function addVisibleClass() {
      // For project cards
      projectCards.forEach(card => {
        card.classList.add('animated');
      });
      
      // For service cards
      serviceCards.forEach(card => {
        card.classList.add('animated');
      });
    }
    
    // Call immediately to ensure elements are visible without scrolling
    addVisibleClass();
    
    // Intersection Observer for when elements come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe project cards and service cards
    projectCards.forEach(card => observer.observe(card));
    serviceCards.forEach(card => observer.observe(card));
  });

  // Services Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const serviceCards = document.querySelectorAll('.service-card');
    
    let currentIndex = 0;
    let cardWidth;
    let visibleCards = 1;
    let totalSlides = serviceCards.length;
    
    // Calculate how many cards to show based on screen width
    function calculateCardWidth() {
      if (window.innerWidth >= 1400) {
        visibleCards = 4;
      } else if (window.innerWidth >= 1200) {
        visibleCards = 3;
      } else if (window.innerWidth >= 768) {
        visibleCards = 2;
      } else {
        visibleCards = 1;
      }
      
      // Add margin to calculation
      const cardMargin = 40; // 2rem (20px) on each side
      const containerWidth = carouselTrack.parentElement.offsetWidth;
      cardWidth = (containerWidth - (cardMargin * visibleCards)) / visibleCards;
      
      // Set card widths
      serviceCards.forEach(card => {
        card.style.flexBasis = `calc(${100 / visibleCards}% - ${cardMargin}px)`;
      });
      
      // Move to current slide without animation
      moveToSlide(currentIndex, false);
    }
    
    // Function to move carousel to specific slide
    function moveToSlide(index, animate = true) {
      // Ensure index is valid
      if (index < 0) {
        index = 0;
      } else if (index > totalSlides - visibleCards) {
        index = totalSlides - visibleCards;
      }
      
      currentIndex = index;
      
      // Calculate translation distance
      const translateX = -currentIndex * (cardWidth + 40); // Card width + margins
      
      // Apply transition
      if (!animate) {
        carouselTrack.style.transition = 'none';
      } else {
        carouselTrack.style.transition = 'transform 0.5s ease';
      }
      
      carouselTrack.style.transform = `translateX(${translateX}px)`;
      
      // Reset transition after transform is applied if animation is disabled
      if (!animate) {
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 0.5s ease';
        }, 10);
      }
      
      // Update active dot
      carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      // Enable/disable navigation buttons
      if (prevButton && nextButton) {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalSlides - visibleCards;
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === totalSlides - visibleCards ? '0.5' : '1';
      }
    }
    
    // Initialize carousel
    function initCarousel() {
      calculateCardWidth();
      
      // Add dots dynamically if needed
      const dotsContainer = document.querySelector('.carousel-dots');
      if (dotsContainer) {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create correct number of dots
        for (let i = 0; i <= totalSlides - visibleCards; i++) {
          const dot = document.createElement('span');
          dot.className = 'carousel-dot';
          if (i === 0) dot.classList.add('active');
          dot.setAttribute('data-index', i);
          dot.addEventListener('click', () => moveToSlide(i));
          dotsContainer.appendChild(dot);
        }
      }
      
      // Previous button click
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          moveToSlide(currentIndex - 1);
        });
      }
      
      // Next button click
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          moveToSlide(currentIndex + 1);
        });
      }
      
      // Set initial button states
      if (prevButton) prevButton.disabled = true;
      if (prevButton) prevButton.style.opacity = '0.5';
    }
    
    // Initialize carousel
    if (carouselTrack && serviceCards.length > 0) {
      initCarousel();
      
      // Recalculate on window resize
      window.addEventListener('resize', calculateCardWidth);
      
      // Touch events for swipe functionality on mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to register as swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
          // Swipe left, go to next slide
          moveToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
          // Swipe right, go to previous slide
          moveToSlide(currentIndex - 1);
        }
      }
      
      // Auto-advance carousel every 5 seconds
      let autoPlayInterval = setInterval(() => {
        if (document.hasFocus()) {
          if (currentIndex < totalSlides - visibleCards) {
            moveToSlide(currentIndex + 1);
          } else {
            moveToSlide(0);
          }
        }
      }, 5000);
      
      // Pause auto-play on hover
      carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });
      
      carouselTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
          if (document.hasFocus()) {
            if (currentIndex < totalSlides - visibleCards) {
              moveToSlide(currentIndex + 1);
            } else {
              moveToSlide(0);
            }
          }
        }, 5000);
      });
    }
  });