// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // === Theme Switcher ===
    const themeToggle = document.querySelector('.theme-switch-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        body.classList.add('dark-theme');
    }

    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Save theme preference
        localStorage.setItem('darkTheme', body.classList.contains('dark-theme'));
    });

    // === Mobile Navigation ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate menu bars to form X
        const bars = document.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset menu icon
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // === Sticky Navigation ===
    const navbar = document.querySelector('.nav-container');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // === Typed Text Animation ===
    const typedElement = document.getElementById('typed-text');
    
    if (typedElement) {
        const phrases = [
            "Software Engineer",
            "Frontend Developer",
            "Backend Developer",
            "UI/UX Enthusiast"
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeAnimation() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Delete character
                typedElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Delete faster than typing
            } else {
                // Type character
                typedElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            // Handle transition between deleting and typing
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Finished typing current phrase
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end of phrase
            } else if (isDeleting && currentCharIndex === 0) {
                // Finished deleting phrase
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeAnimation, typingSpeed);
        }
        
        // Start typing animation after a short delay
        setTimeout(typeAnimation, 1000);
    }

    // === About Tabs ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // === Skills Category Filter ===
    const skillsCategoryBtns = document.querySelectorAll('.category-btn');
    const skillsGrids = document.querySelectorAll('.skills-grid');

    skillsCategoryBtns.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active category button
            skillsCategoryBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Show selected skills category
            skillsGrids.forEach(grid => {
                grid.classList.remove('active');
            });
            document.getElementById(`${category}-skills`).classList.add('active');
        });
    });

    // === Animate Skill Progress Bars ===
    const skillCards = document.querySelectorAll('.skill-card');
    
    function animateSkillBars() {
        skillCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                const progressBar = card.querySelector('.skill-progress');
                const percentage = card.getAttribute('data-percentage');
                progressBar.style.width = `${percentage}%`;
            }
        });
    }
    
    // Check for visible skill cards on scroll and on page load
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // === Services Carousel ===
    const carousel = document.querySelector('.services-carousel');
    if (carousel) {
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const dotsContainer = document.querySelector('.carousel-dots');
        const cards = document.querySelectorAll('.service-card');
        
        // Determine how many cards to show based on screen width
        const getCardsPerView = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };
        
        let cardsPerView = getCardsPerView();
        let currentIndex = 0;
        
        // Create dots for pagination
        const totalPages = Math.ceil(cards.length / cardsPerView);
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Update active dot
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Scroll carousel to specified index
        function scrollToIndex(index) {
            const scrollAmount = index * (carousel.offsetWidth);
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }
        
        // Handle navigation buttons
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            } else {
                // Loop to end
                scrollToIndex(dots.length - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < dots.length - 1) {
                scrollToIndex(currentIndex + 1);
            } else {
                // Loop to beginning
                scrollToIndex(0);
            }
        });
        
        // Handle dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToIndex(index);
            });
        });
        
        // Auto-advance carousel
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (currentIndex < dots.length - 1) {
                    scrollToIndex(currentIndex + 1);
                } else {
                    scrollToIndex(0);
                }
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto-scroll and pause on hover
        startAutoScroll();
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                // Recalculate carousel on significant width change
                cardsPerView = newCardsPerView;
                
                // Clear existing dots
                while (dotsContainer.firstChild) {
                    dotsContainer.removeChild(dotsContainer.firstChild);
                }
                
                // Create new dots based on new cardsPerView
                const newTotalPages = Math.ceil(cards.length / cardsPerView);
                for (let i = 0; i < newTotalPages; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('carousel-dot');
                    if (i === 0) dot.classList.add('active');
                    dotsContainer.appendChild(dot);
                }
                
                // Reset carousel position
                currentIndex = 0;
                carousel.scrollTo({ left: 0 });
                
                // Reattach event listeners to dots
                document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        scrollToIndex(index);
                    });
                });
            }
        });
    }

    // === Projects Filter ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        // Show card with animation
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // Hide card with animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // === Language Progress Circles ===
    const languageCircles = document.querySelectorAll('.language-progress');
    
    function animateLanguageCircles() {
        languageCircles.forEach(circle => {
            const circleTop = circle.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (circleTop < windowHeight * 0.8) {
                const progress = circle.getAttribute('data-progress');
                const progressCircle = circle.querySelector('circle:nth-child(2)');
                
                // Calculate circle circumference and stroke-dashoffset
                const radius = 54;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (progress / 100) * circumference;
                
                progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
                progressCircle.style.strokeDashoffset = offset;
            }
        });
    }
    
    window.addEventListener('scroll', animateLanguageCircles);
    setTimeout(animateLanguageCircles, 500); // Initial animation with slight delay

    // === Floating Cards Parallax Effect ===
    const floatingCards = document.querySelectorAll('.floating-cards .card');
    
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingCards.forEach(card => {
            const speed = card.getAttribute('data-speed') || 1;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            card.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });

    // === Scroll Animations ===
    const fadeElements = document.querySelectorAll('.section-header, .about-container, .skills-container, .services-carousel-container, .certifications-container, .languages-container, .contact-container');
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            element.classList.add('fade-element');
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }

    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Active Navigation Link Highlighting ===
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Initial check

    // === Contact Form Validation & Submission ===
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Change button to loading state
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Change button to success state
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.classList.add('success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 2000);
        });
    }

    // === Adding CSS class for initial animations ===
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});