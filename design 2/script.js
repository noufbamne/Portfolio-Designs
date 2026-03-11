// DOM Elements
const body = document.body;
const themeButton = document.getElementById('theme-button');
const menuItems = document.querySelectorAll('.menu li a');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const backToTopButton = document.querySelector('.back-to-top');
const skillLevels = document.querySelectorAll('.level-fill');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu li a');
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const menuContainer = document.querySelector('.menu-container');
const menuOverlay = document.querySelector('.menu-overlay');

// Theme Toggle
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
}

// Navigation active state
function setActiveLink() {
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.parentElement.classList.add('active');
        }
      });
    }
  });
}

// Tabs functionality
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Show corresponding panel
    const tabId = button.getAttribute('data-tab');
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// Projects filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Back to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
  
  // Update active nav link
  setActiveLink();
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Typing animation for hero section
const typedTextElement = document.querySelector('.typed-text');
const cursorElement = document.querySelector('.cursor');
const textArray = ["Front-End Developer", "UI/UX Enthusiast", "Creative Coder", "Problem Solver"];
let textArrayIndex = 0;
let charIndex = 0;
let typingDelay = 100; // Delay between each character
let erasingDelay = 50; // Delay for erasing
let newTextDelay = 2000; // Delay before typing new text

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorElement.classList.contains('typing')) {
      cursorElement.classList.add('typing');
    }
    typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorElement.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorElement.classList.contains('typing')) {
      cursorElement.classList.add('typing');
    }
    typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorElement.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, typingDelay + 1100);
  }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state of skill level bars for animation
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.style.setProperty('--width', width);
    level.style.width = '0';
  });
  
  // Start typing effect
  if (textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }
  
  // Initialize animations
  initAnimations();
});

// Animate elements when they come into view
function initAnimations() {
  const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-entry, .floating-badge');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If skill bar, animate the filling
        if (entry.target.classList.contains('skill-card')) {
          const levelFill = entry.target.querySelector('.level-fill');
          if (levelFill) {
            levelFill.style.width = levelFill.style.getPropertyValue('--width');
          }
        }
        
        // Add animation class
        entry.target.classList.add('animate', 'fade-in-up');
        
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// Handle form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real scenario, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message (in a real app)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Parallax effect for hero image
const heroImage = document.querySelector('.image-container');
if (heroImage) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    heroImage.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
  });
}

// Create particle background
function createParticles() {
  const particles = document.querySelector('.particles');
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 10 + 5;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation delay
    const delay = Math.random() * 10;
    
    // Apply styles
    particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
      border-radius: 50%;
      opacity: ${opacity};
      filter: blur(${size / 3}px);
      animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: -${delay}s;
    `;
    
    particles.appendChild(particle);
  }
}

// Add floating particle animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(50px, 50px);
    }
    50% {
      transform: translate(0, 100px);
    }
    75% {
      transform: translate(-50px, 50px);
    }
  }
`, styleSheet.cssRules.length);

// Mobile menu functionality
if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    menuContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// Close mobile menu when clicking a link or outside
if (menuOverlay) {
  menuOverlay.addEventListener('click', () => {
    mobileMenuButton.classList.remove('active');
    menuContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
}

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenuButton.classList.remove('active');
    menuContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// Fix hero height on mobile browsers
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    hero.style.minHeight = `calc(100vh - 80px)`;
  }
}

window.addEventListener('resize', setHeroHeight);
setHeroHeight();

// Load more projects functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    // Sample projects data - in a real implementation, this would come from an AJAX request
    const newProjects = [
      {
        category: "web",
        image: "https://via.placeholder.com/600x400",
        title: "Minimalist Blog Platform",
        description: "A clean, content-focused blog with dark mode and reading time estimation.",
        tags: ["Next.js", "Tailwind CSS", "Sanity CMS"]
      },
      {
        category: "app",
        image: "https://via.placeholder.com/600x400",
        title: "Weather Forecast App",
        description: "A responsive weather application with 7-day forecasts and animated visualizations.",
        tags: ["React", "Weather API", "CSS3"]
      },
      {
        category: "web",
        image: "https://via.placeholder.com/600x400",
        title: "SaaS Landing Page",
        description: "A high-converting landing page for a SaaS product with interactive features.",
        tags: ["HTML5", "SCSS", "JavaScript"]
      }
    ];
    
    const projectsGrid = document.querySelector('.projects-grid');
    const currentFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');
    
    // Create and append new project cards
    newProjects.forEach(project => {
      if (currentFilter === 'all' || project.category === currentFilter) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(20px)';
        
        projectCard.innerHTML = `
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
              <div class="project-category">${project.category === 'web' ? 'Web Design' : project.category === 'app' ? 'Application' : 'Other'}</div>
              <div class="project-actions">
                <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                <a href="#" class="project-github"><i class="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
              ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
          </div>
        `;
        
        projectsGrid.appendChild(projectCard);
        
        // Animate the new card
        setTimeout(() => {
          projectCard.style.opacity = '1';
          projectCard.style.transform = 'translateY(0)';
          projectCard.style.transition = 'all 0.5s ease-out';
        }, 100);
      }
    });
    
    // Hide the load more button after loading additional projects
    loadMoreBtn.style.display = 'none';
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// New standalone carousel script
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const carousel = document.querySelector('.services-carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    // Get all cards and calculate card width
    const cards = carousel.querySelectorAll('.service-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
    let autoScrollTimer = null;
    let currentIndex = 0;
    
    // Function to scroll to a specific card
    function scrollToCard(index) {
      if (index >= cards.length) {
        index = 0;
      } else if (index < 0) {
        index = cards.length - 1;
      }
      
      currentIndex = index;
      const scrollPosition = index * cardWidth;
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
    
    // Function to scroll to the next card
    function scrollToNextCard() {
      scrollToCard(currentIndex + 1);
    }
    
    // Function to scroll to the previous card
    function scrollToPreviousCard() {
      scrollToCard(currentIndex - 1);
    }
    
    // Start auto scrolling
    function startAutoScroll() {
      if (autoScrollTimer) clearInterval(autoScrollTimer);
      autoScrollTimer = setInterval(scrollToNextCard, 3000);
    }
    
    // Stop auto scrolling
    function stopAutoScroll() {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }
    
    // Event listeners for buttons
    nextButton.addEventListener('click', function() {
      scrollToNextCard();
      stopAutoScroll();
      setTimeout(startAutoScroll, 5000);
    });
    
    prevButton.addEventListener('click', function() {
      scrollToPreviousCard();
      stopAutoScroll();
      setTimeout(startAutoScroll, 5000);
    });
    
    // Event listeners for carousel
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('touchstart', stopAutoScroll, { passive: true });
    
    carousel.addEventListener('mouseleave', startAutoScroll);
    carousel.addEventListener('touchend', function() {
      setTimeout(startAutoScroll, 3000);
    });
    
    // Start auto scrolling initially
    startAutoScroll();
    
    // Reset current index when user manually scrolls
    carousel.addEventListener('scroll', function() {
      const scrollPosition = carousel.scrollLeft;
      currentIndex = Math.round(scrollPosition / cardWidth);
    });
  });