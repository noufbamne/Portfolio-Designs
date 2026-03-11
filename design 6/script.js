// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting based on scroll position
        highlightNavOnScroll();
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Highlight active navigation link based on scroll position
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
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

    // Run initial highlight check
    highlightNavOnScroll();

    // Skills tabs functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skills-tab-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Remove active class from all tabs and contents
            skillTabs.forEach(tab => tab.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Project filtering functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.dataset.filter;
            
            // Remove active class from all filters
            projectFilters.forEach(filter => filter.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial slider functionality
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.control-prev');
    const nextBtn = document.querySelector('.control-next');
    let currentTestimonial = 0;

    // Function to show current testimonial
    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Event listeners for controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            if (document.hasFocus()) {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }
        }, 5000);
    }

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                showFormError(name, 'Please enter your name');
                return;
            }
            
            if (email.value.trim() === '') {
                showFormError(email, 'Please enter your email');
                return;
            }
            
            if (!isValidEmail(email.value)) {
                showFormError(email, 'Please enter a valid email');
                return;
            }
            
            if (subject.value.trim() === '') {
                showFormError(subject, 'Please enter a subject');
                return;
            }
            
            if (message.value.trim() === '') {
                showFormError(message, 'Please enter your message');
                return;
            }
            
            // Form is valid - would normally submit to server
            alert('Message sent successfully! (This is a demo)');
            contactForm.reset();
        });
    }

    // Helper function to show form validation errors
    function showFormError(input, message) {
        const formGroup = input.parentElement;
        
        // Remove any existing error messages
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class and message
        formGroup.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        formGroup.appendChild(errorMessage);
        
        // Focus the input
        input.focus();
        
        // Remove error when input changes
        input.addEventListener('input', function() {
            formGroup.classList.remove('error');
            const error = formGroup.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animate timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineAnimation() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check and event listener
    checkTimelineAnimation();
    window.addEventListener('scroll', checkTimelineAnimation);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.innerText;
        heroSubtitle.innerText = '';
        
        let i = 0;
        const typeEffect = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.innerText += text.charAt(i);
                i++;
            } else {
                clearInterval(typeEffect);
            }
        }, 100);
    }

    // Project hover effect enhancements
    // const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const thumbnail = card.querySelector('.project-thumbnail');
            const links = card.querySelector('.project-links');
            
            if (thumbnail && links) {
                thumbnail.style.transform = 'scale(1.05)';
                links.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const thumbnail = card.querySelector('.project-thumbnail');
            const links = card.querySelector('.project-links');
            
            if (thumbnail && links) {
                thumbnail.style.transform = 'scale(1)';
                links.style.opacity = '0';
            }
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });
    }
});