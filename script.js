document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    // Get your public key from https://dashboard.emailjs.com/admin/account
    emailjs.init("public_key_from_emailjs_dashboard");
    
    // Initialize ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });
    
    // Apply animations to sections
    sr.reveal('.hero-content', { origin: 'left' });
    sr.reveal('.hero-image', { origin: 'right', delay: 400 });
    sr.reveal('.section-header', { distance: '40px' });
    sr.reveal('.about-image', { origin: 'left' });
    sr.reveal('.about-text', { origin: 'right', delay: 300 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.certificate-card', { interval: 200 });
    sr.reveal('.contact-info', { origin: 'left' });
    sr.reveal('.contact-form', { origin: 'right', delay: 300 });
    sr.reveal('.footer-content', { distance: '20px', delay: 100 });
    
    // Animate skill progress bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
    
    // Trigger skill bar animation when about section is in view
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        sr.reveal('.skill-bars', { 
            beforeReveal: () => {
                setTimeout(animateSkillBars, 300);
            }
        });
    }
    
    // Theme Toggle Functionality
    const body = document.body;
    const themeSwitch = document.querySelector('#theme-switch');
    
    // Initialize theme based on localStorage or system preference
    function initializeTheme() {
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark-mode') {
            body.classList.add('dark-mode');
            if (themeSwitch) themeSwitch.checked = true;
        } else if (currentTheme === 'light-mode') {
            body.classList.add('light-mode');
            if (themeSwitch) themeSwitch.checked = false;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            if (themeSwitch) themeSwitch.checked = true;
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    }
    
    // Initialize theme
    initializeTheme();
    
    // Add event listener for theme toggle if it exists
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
    
    // Contact Form with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending status
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status sending';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_id_from_emailjs', 'template_id_from_emailjs', formData)
                .then(function(response) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                })
                .catch(function(error) {
                    formStatus.textContent = 'Failed to send message. Please try again or email directly.';
                    formStatus.className = 'form-status error';
                    console.error('EmailJS error:', error);
                });
        });
    }
    

    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !mobileMenuBtn.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Navigation active state based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Project Modal Functionality
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Project data
    const projectData = [
        {
            id: 'project1',
            title: 'Microservices Platform',
            description: 'A scalable microservices architecture with Kubernetes orchestration and CI/CD pipeline integration. This platform enables rapid deployment and scaling of containerized applications with automated testing and deployment workflows.',
            image: 'project1.svg',
            tags: ['Kubernetes', 'Docker', 'Go', 'Jenkins'],
            features: [
                'Containerized microservices architecture',
                'Automated CI/CD pipeline',
                'Kubernetes orchestration',
                'Service mesh for inter-service communication',
                'Centralized logging and monitoring'
            ],
            github: 'https://github.com/Adityachouhan03/microservices-platform',
            demo: 'https://microservices-demo.example.com'
        },
        {
            id: 'project2',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. This platform provides a complete shopping experience with product management, cart functionality, and secure checkout.',
            image: 'project2.svg',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            features: [
                'User authentication and profiles',
                'Product catalog with search and filtering',
                'Shopping cart and wishlist functionality',
                'Secure payment processing with Stripe',
                'Admin dashboard for inventory management'
            ],
            github: 'https://github.com/Adityachouhan03/ecommerce-platform',
            demo: 'https://ecommerce-demo.example.com'
        },
        {
            id: 'project3',
            title: 'Infrastructure as Code',
            description: 'Automated cloud infrastructure provisioning with Terraform and configuration management with Ansible. This solution enables consistent, version-controlled infrastructure deployment across multiple cloud providers.',
            image: 'project3.svg',
            tags: ['Terraform', 'AWS', 'Ansible', 'Python'],
            features: [
                'Multi-cloud infrastructure provisioning',
                'Configuration management automation',
                'Infrastructure monitoring and alerting',
                'Disaster recovery automation',
                'Security compliance scanning'
            ],
            github: 'https://github.com/Adityachouhan03/infrastructure-as-code',
            demo: 'https://iac-demo.example.com'
        },
        {
            id: 'project4',
            title: 'Fitness Tracking App',
            description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics with cloud synchronization. This app helps users monitor their fitness progress and maintain healthy habits.',
            image: 'project4.svg',
            tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
            features: [
                'Workout planning and tracking',
                'Nutrition logging and analysis',
                'Health metrics visualization',
                'Goal setting and progress tracking',
                'Social sharing and community features'
            ],
            github: 'https://github.com/Adityachouhan03/fitness-tracker',
            demo: 'https://fitness-app-demo.example.com'
        }
    ];
    
    // Open modal when clicking on project cards
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on project links
            if (e.target.closest('.project-links')) return;
            
            const projectId = this.querySelector('.project-info h3').textContent;
            const project = projectData.find(p => p.title === projectId);
            
            if (project) {
                // Populate modal with project data
                document.getElementById('modal-project-image').src = project.image;
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-description').textContent = project.description;
                
                // Add project tags
                const tagsContainer = document.getElementById('modal-project-tags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });
                
                // Add project features
                const featuresList = document.getElementById('modal-project-features');
                featuresList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Set links
                document.getElementById('modal-github-link').href = project.github;
                document.getElementById('modal-demo-link').href = project.demo;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when clicking on close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    }
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Note: Form submission is already handled in the EmailJS section above
    // No duplicate code needed here
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.project-card, .certificate-card, .about-image, .about-text');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});