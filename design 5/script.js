// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
      const preloader = document.querySelector('.preloader');
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      
      // Start animation for elements
      animateOnScroll();
      initTypewriter();
      initSkillBars();
    });
  
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.remove('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      // Save theme preference
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Mobile Menu
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', function() {
      document.body.classList.toggle('menu-active');
      mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        document.body.classList.remove('menu-active');
        mobileMenu.classList.remove('active');
      });
    });
  
    // Active navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Typewriter effect
    function initTypewriter() {
      const textArray = ["Software Engineer", "Frontend Developer", "UI/UX Designer", "Freelancer"];
      const typingDelay = 100;
      const erasingDelay = 50;
      const newTextDelay = 2000;
      let textArrayIndex = 0;
      let charIndex = 0;
      
      const typewriterElement = document.querySelector('.typewriter .sec-text');
      
      function type() {
        if (charIndex < textArray[textArrayIndex].length) {
          typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex + 1);
          charIndex++;
          setTimeout(type, typingDelay);
        } else {
          setTimeout(erase, newTextDelay);
        }
      }
      
      function erase() {
        if (charIndex > 0) {
          typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
        } else {
          textArrayIndex = (textArrayIndex + 1) % textArray.length;
          setTimeout(type, typingDelay);
        }
      }
      
      setTimeout(type, newTextDelay);
    }
  
    // Skill bars animation
    function initSkillBars() {
      const skillItems = document.querySelectorAll('.skill-item');
      
      skillItems.forEach(item => {
        const value = item.getAttribute('data-value');
        const progress = item.querySelector('.progress');
        
        progress.style.width = `${value}%`;
      });
    }
  
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        element.classList.add('show');
      });
    }
  
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');
        
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(`${target}-tab`).classList.add('active');
      });
    });
  
    // Service Carousel
    const serviceTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const serviceCards = document.querySelectorAll('.service-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 0;
    let totalSlides = 0;
    
    // Create carousel dots
    function createDots() {
      dotsContainer.innerHTML = '';
      
      for (let i = 0; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        
        if (i === 0) {
          dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
      }
    }
    
    // Initialize carousel dimensions
    function initCarousel() {
      const containerWidth = serviceTrack.parentElement.clientWidth;
      cardWidth = serviceCards[0].offsetWidth + parseInt(window.getComputedStyle(serviceCards[0]).marginRight);
      
      // Calculate cards per view based on container width
      if (window.innerWidth >= 1200) {
        cardsPerView = 3;
      } else if (window.innerWidth >= 768) {
        cardsPerView = 2;
      } else {
        cardsPerView = 1;
      }
      
      totalSlides = serviceCards.length - cardsPerView;
      createDots();
    }
    
    // Go to specific slide
    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index > totalSlides) index = totalSlides;
      
      currentIndex = index;
      serviceTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      // Update active dot
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Initialize carousel on load and resize
    initCarousel();
    window.addEventListener('resize', initCarousel);
    
    // Carousel navigation
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  
    // Testimonial Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-arrow.prev');
    const testimonialNext = document.querySelector('.testimonial-arrow.next');
    const testimonialDots = document.querySelector('.testimonial-dots');
    
    let currentTestimonial = 0;
    
    // Create testimonial dots
    function createTestimonialDots() {
      testimonialDots.innerHTML = '';
      
      testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        
        if (i === 0) {
          dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
          goToTestimonial(i);
        });
        
        testimonialDots.appendChild(dot);
      });
    }
    
    // Go to specific testimonial
    function goToTestimonial(index) {
      if (index < 0) index = 0;
      if (index >= testimonials.length) index = testimonials.length - 1;
      
      currentTestimonial = index;
      testimonialWrapper.style.transform = `translateX(-${currentTestimonial * 100}%)`;
      
      // Update active dot
      const dots = document.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
      });
    }
    
    // Initialize testimonial slider
    createTestimonialDots();
    
    // Testimonial navigation
    testimonialPrev.addEventListener('click', () => {
      goToTestimonial(currentTestimonial - 1);
    });
    
    testimonialNext.addEventListener('click', () => {
      goToTestimonial(currentTestimonial + 1);
    });
  
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && subject && message) {
          // Here you would typically send the form data to a server
          // For this demo, we'll just show a success message
          alert('Message sent successfully!');
          contactForm.reset();
        } else {
          alert('Please fill all fields');
        }
      });
    }
  
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        
        if (email) {
          alert('Subscribed successfully!');
          newsletterForm.reset();
        } else {
          alert('Please enter your email');
        }
      });
    }
  
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Projects page functionality
    if (document.querySelector('.projects-page')) {
      // Filter functionality
      const filterBtns = document.querySelectorAll('.filter-btn');
      const projectItems = document.querySelectorAll('.project-item');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          projectItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
      
      // Project modal
      const projectLinks = document.querySelectorAll('.project-item-overlay a');
      const modalOverlay = document.querySelector('.modal-overlay');
      const modalClose = document.querySelector('.modal-close');
      
      if (projectLinks.length && modalOverlay && modalClose) {
        projectLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.classList.add('active');
          });
        });
        
        modalClose.addEventListener('click', function() {
          modalOverlay.classList.remove('active');
        });
        
        modalOverlay.addEventListener('click', function(e) {
          if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
          }
        });
      }
    }
  });