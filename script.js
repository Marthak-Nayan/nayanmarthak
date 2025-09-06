// Mobile menu toggle
        function toggleMenu() {
            const nav = document.getElementById('nav');
            const mobileMenu = document.querySelector('.mobile-menu');
            nav.classList.toggle('active');
            
            // Animate hamburger menu
            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.getElementById('nav');
                const mobileMenu = document.querySelector('.mobile-menu');
                const icon = mobileMenu.querySelector('i');
                nav.classList.remove('active');
                icon.classList.replace('fa-times', 'fa-bars');
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/hide scroll to top button with enhanced animation
        window.addEventListener('scroll', function() {
            const scrollTop = document.getElementById('scrollTop');
            const header = document.querySelector('header');
            
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
            
            // Header background opacity on scroll
            const opacity = Math.min(window.pageYOffset / 100, 0.95);
            header.style.background = `rgba(255, 255, 255, ${opacity})`;
        });

        // Enhanced fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger animation
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });

        // Update active navigation link on scroll
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const nav = document.getElementById('nav');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
                nav.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Enhanced hover effects with throttling
        let throttleTimer = false;
        
        function throttle(callback, time) {
            if (throttleTimer) return;
            throttleTimer = true;
            setTimeout(() => {
                callback();
                throttleTimer = false;
            }, time);
        }

        // Add parallax effect to floating elements
        window.addEventListener('scroll', function() {
            throttle(() => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelectorAll('.floating-element');
                const speed = 0.5;
                
                parallax.forEach((element, index) => {
                    const yPos = -(scrolled * speed * (index + 1) * 0.1);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }, 10);
        });

        // Initialize animations when page loads
        window.addEventListener('load', function() {
            // Add entrance animations to hero elements
            const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero p');
            heroElements.forEach((element, index) => {
                element.style.animationDelay = `${0.3 + (index * 0.3)}s`;
            });
            
            // Initialize scroll position for nav
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            if (sections.length > 0) {
                navLinks[0].classList.add('active');
            }
        });

        // Add typing effect to hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1500); // Start after hero title animation
        }

        // Initialize typing effect
        document.addEventListener('DOMContentLoaded', function() {
            const subtitle = document.querySelector('.hero-subtitle');
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 80);
        });

        // Add smooth reveal animation for cards
        const cards = document.querySelectorAll('.card, .project-card, .skill-item, .contact-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Performance optimization: Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.body.classList.add('reduce-motion');
        }

    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 2000);