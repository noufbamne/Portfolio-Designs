/**
 * Innovative Portfolio - Main JavaScript
 * ======================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // ===== UTILITY FUNCTIONS =====
    
    // Select elements with error handling
    const select = (selector) => {
      const element = document.querySelector(selector);
      if (!element) console.warn(`Cannot find element: ${selector}`);
      return element;
    };
    
    // Select all elements with error handling
    const selectAll = (selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) console.warn(`No elements found: ${selector}`);
      return elements;
    };
    
    // Linear interpolation
    const lerp = (start, end, t) => start * (1 - t) + end * t;
    
    // Map range
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
      return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
    
    // ===== INITIALIZATION =====
    
    // DOM Elements
    const body = document.body;
    const loadingScreen = select('.loading-screen');
    const loadingProgress = select('.loading-progress');
    const loadingLetters = selectAll('.loading-letter');
    const cursor = select('.cursor');
    const cursorDot = select('.cursor-dot');
    const cursorOutline = select('.cursor-outline');
    const cursorTrails = selectAll('.trail');
    const audioToggle = select('#audioToggle');
    const audioIcon = select('#audioIcon');
    const audioWaves = select('.audio-waves');
    const liquidNav = select('.liquid-nav');
    const liquidToggle = select('.liquid-toggle');
    const menuLinks = selectAll('.menu-link');
    const sections = selectAll('.section');
    const glitchText = select('.glitch-text');
    const meshCanvas = select('#meshCanvas');
    const dimensionNodes = selectAll('.dimension-node');
    const dimensionPanels = selectAll('.dimension-panel');
    const prismControls = selectAll('.prism-controls button');
    const prismFaces = selectAll('.prism-face');
    const formInputs = selectAll('.morphing-input');
    const formSubmit = select('.form-submit');
    
    // Global state
    let isAudioPlaying = false;
    let isNavOpen = false;
    let currentPrismIndex = 0;
    let cursorPos = { x: 0, y: 0 };
    let trailIndex = 0;
    let isLoaded = false;
    let scrollY = window.scrollY;
    let hoverElements = [];
    
    // Audio element
    const ambientAudio = new Audio();
    ambientAudio.src = 'https://assets.codepen.io/1462889/ambient-electronic.mp3'; // Replace with actual audio
    ambientAudio.loop = true;
    ambientAudio.volume = 0.5;
    
    // ===== LOADING ANIMATION =====
    
    const simulateLoading = () => {
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress >= 100) {
          progress = 100;
          clearInterval(loadingInterval);
          
          // Complete loading
          setTimeout(() => {
            loadingScreen.classList.add('hidden');
            body.classList.remove('loading');
            isLoaded = true;
            
            // Trigger intro animations
            initIntroAnimations();
            
            // Start observing sections
            initSectionObserver();
          }, 500);
        }
        loadingProgress.textContent = `${progress}%`;
      }, 120);
    };
    
    // Animate loading letters
    loadingLetters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===== CUSTOM CURSOR =====
    
    const initCursor = () => {
      // Initial cursor position
      cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      
      // Update cursor position on mouse move
      document.addEventListener('mousemove', (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;
      });
      
      // Hide cursor when mouse leaves window
      document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) {
          cursor.classList.add('hidden');
        }
      });
      
      // Show cursor when mouse enters window
      document.addEventListener('mouseover', () => {
        cursor.classList.remove('hidden');
      });
      
      // Add hover class to cursor when over interactive elements
      hoverElements = document.querySelectorAll('a, button, .project-card, .dimension-node, .experiment-cell, input, textarea');
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
      
      // Animate cursor
      const animateCursor = () => {
        // Smooth cursor movement
        const dotX = lerp(parseFloat(cursorDot.style.left) || cursorPos.x, cursorPos.x, 0.2);
        const dotY = lerp(parseFloat(cursorDot.style.top) || cursorPos.y, cursorPos.y, 0.2);
        
        const outlineX = lerp(parseFloat(cursorOutline.style.left) || cursorPos.x, cursorPos.x, 0.1);
        const outlineY = lerp(parseFloat(cursorOutline.style.top) || cursorPos.y, cursorPos.y, 0.1);
        
        // Apply transforms
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        // Cursor trails
        if (isLoaded && trailIndex % 3 === 0) { // Add trails less frequently
          const trail = document.createElement('div');
          trail.className = 'trail';
          trail.style.left = `${dotX}px`;
          trail.style.top = `${dotY}px`;
          cursor.appendChild(trail);
          
          // Animate trail
          setTimeout(() => {
            trail.style.opacity = '0.5';
            trail.style.transform = 'scale(1.5)';
            
            setTimeout(() => {
              trail.remove();
            }, 500);
          }, 10);
        }
        
        trailIndex = (trailIndex + 1) % 100;
        
        requestAnimationFrame(animateCursor);
      };
      
      animateCursor();
    };
    
    // ===== AUDIO TOGGLE =====
    
    const initAudioToggle = () => {
      audioToggle.addEventListener('click', () => {
        isAudioPlaying = !isAudioPlaying;
        
        if (isAudioPlaying) {
          audioIcon.className = 'fas fa-volume-up';
          audioWaves.classList.add('active');
          ambientAudio.play();
        } else {
          audioIcon.className = 'fas fa-volume-mute';
          audioWaves.classList.remove('active');
          ambientAudio.pause();
        }
      });
    };
    
    // ===== LIQUID NAVIGATION =====
    
    const initLiquidNav = () => {
      liquidToggle.addEventListener('click', () => {
        isNavOpen = !isNavOpen;
        
        if (isNavOpen) {
          liquidNav.classList.add('open');
          body.classList.add('no-scroll');
        } else {
          liquidNav.classList.remove('open');
          body.classList.remove('no-scroll');
        }
      });
      
      // Close nav when clicking a link
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          liquidNav.classList.remove('open');
          body.classList.remove('no-scroll');
          isNavOpen = false;
        });
      });
    };
    
    // ===== INTRO ANIMATIONS =====
    
    const initIntroAnimations = () => {
      const introSection = select('#intro');
      introSection.classList.add('in-view');
      
      // Glitch text animation
      if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
      }
      
      // Reveal text animation
      const revealText = select('.reveal-text');
      if (revealText) {
        setTimeout(() => {
          revealText.style.opacity = '1';
          revealText.style.transform = 'translateY(0)';
        }, 500);
      }
    };
    
    // ===== SECTION SCROLL OBSERVER =====
    
    const initSectionObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
      };
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Activate skill bars in lab section
            if (entry.target.classList.contains('lab-section')) {
              const skillBars = entry.target.querySelectorAll('.level-fill');
              skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.setProperty('--width', width);
              });
            }
          }
        });
      }, observerOptions);
      
      sections.forEach(section => sectionObserver.observe(section));
    };
    
    // ===== PRISM CAROUSEL =====
    
    const initPrismCarousel = () => {
      if (prismControls.length === 0 || prismFaces.length === 0) return;
      
      const prevButton = prismControls[0];
      const nextButton = prismControls[1];
      const totalProjects = prismFaces.length;
      
      const updatePrism = () => {
        prismFaces.forEach((face, index) => {
          face.classList.remove('active', 'prev', 'next');
          
          if (index === currentPrismIndex) {
            face.classList.add('active');
          } else if (index === (currentPrismIndex - 1 + totalProjects) % totalProjects) {
            face.classList.add('prev');
          } else if (index === (currentPrismIndex + 1) % totalProjects) {
            face.classList.add('next');
          }
        });
      };
      
      prevButton.addEventListener('click', () => {
        currentPrismIndex = (currentPrismIndex - 1 + totalProjects) % totalProjects;
        updatePrism();
      });
      
      nextButton.addEventListener('click', () => {
        currentPrismIndex = (currentPrismIndex + 1) % totalProjects;
        updatePrism();
      });
      
      // Initialize first active face
      updatePrism();
    };
    
    // ===== DIMENSIONS TABS =====
    
    const initDimensionsTabs = () => {
      dimensionNodes.forEach(node => {
        node.addEventListener('click', () => {
          const dimension = node.getAttribute('data-dimension');
          
          // Update active node
          dimensionNodes.forEach(n => n.classList.remove('active'));
          node.classList.add('active');
          
          // Update active panel
          dimensionPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === dimension) {
              panel.classList.add('active');
            }
          });
        });
      });
    };
    
    // ===== FORM INTERACTION =====
    
    const initForm = () => {
      formInputs.forEach(input => {
        // Handle input focus
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          input.parentElement.classList.remove('focused');
        });
      });
      
      // Form submission animation
      if (formSubmit) {
        formSubmit.addEventListener('click', (e) => {
          // Validation would go here in a real application
          e.preventDefault();
          
          // Create particle effect
          for (let i = 0; i < 5; i++) {
            createSubmitParticle();
          }
          
          // Show success message (simplified)
          setTimeout(() => {
            alert('Message sent successfully! (This is a demo)');
            document.querySelector('.contact-form').reset();
          }, 800);
        });
      }
    };
    
    // Create submit button particles
    const createSubmitParticle = () => {
      const particles = select('.submit-particles');
      if (!particles) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position within the button
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      particles.appendChild(particle);
      
      // Animate and remove particle
      setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`;
        particle.style.opacity = '0';
        
        setTimeout(() => {
          particle.remove();
        }, 500);
      }, 10);
    };
    
    // ===== MESH BACKGROUND =====
    
    const initMeshBackground = () => {
      if (!meshCanvas) return;
      
      // Three.js scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas: meshCanvas,
        alpha: true,
        antialias: true
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create mesh geometry
      const geometry = new THREE.PlaneGeometry(20, 20, 20, 20);
      const material = new THREE.MeshBasicMaterial({
        color: 0x19ff8c,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
      
      // Set camera position
      camera.position.z = 5;
      camera.position.y = 2;
      camera.lookAt(0, 0, 0);
      
      // Animation loop
      const clock = new THREE.Clock();
      
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Update vertices
        const positions = geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          
          // Create wave effect
          positions[i + 1] = Math.sin(elapsedTime + x + z) * 0.3;
        }
        
        geometry.attributes.position.needsUpdate = true;
        
        // Rotate mesh slowly
        mesh.rotation.z = elapsedTime * 0.1;
        
        // Render scene
        renderer.render(scene, camera);
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Resize handler
      window.addEventListener('resize', () => {
        // Update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    };
    
    // ===== SMOOTH SCROLLING =====
    
    const initSmoothScroll = () => {
      const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function
          const ease = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          };
          
          window.scrollTo(0, startPosition + distance * ease(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };
        
        requestAnimationFrame(animation);
      };
      
      // Apply smooth scrolling to all internal links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const target = this.getAttribute('href');
          if (target === '#') return;
          
          smoothScroll(target, 1000);
        });
      });
    };
    
    // ===== PARALLAX EFFECT =====
    
    const initParallax = () => {
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        
        // Parallax for augmented elements
        const augmentedElements = document.querySelectorAll('.augmented-element');
        augmentedElements.forEach(element => {
          const speed = element.getAttribute('data-speed') || 0.1;
          element.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        // Update navbar on scroll
        const navbar = select('.liquid-nav');
        if (scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    };
    
    // ===== INITIALIZE ALL =====
    
    const init = () => {
      // Start loading animation
      simulateLoading();
      
      // Initialize components
      initCursor();
      initAudioToggle();
      initLiquidNav();
      initPrismCarousel();
      initDimensionsTabs();
      initForm();
      initSmoothScroll();
      initParallax();
      
      // Initialize Three.js mesh background when Three.js is loaded
      if (typeof THREE !== 'undefined') {
        initMeshBackground();
      } else {
        console.warn('THREE.js is not loaded. Mesh background will not be initialized.');
      }
    };
    
    // Start initialization
    init();
  });