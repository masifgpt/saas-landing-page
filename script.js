document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY NAVBAR & ACTIVE LINK ACCENTUATION
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        // Sticky transition triggers
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Detect current visible screen viewport coordinate section mapping
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    /* ==========================================================================
       2. RESPONSIVE MOBILITY HAMBURGER DRAWER ACTION
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile side menu overlay if any interior contextual link gets executed
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    /* ==========================================================================
       3. DARK / LIGHT THEME PREFERENCE ENGINE
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check localStorage cache to evaluate user's historic preference configuration
    const cachedTheme = localStorage.getItem('theme') || 'dark-mode';
    bodyElement.className = cachedTheme;

    themeToggle.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-mode')) {
            bodyElement.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
        } else {
            bodyElement.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    /* ==========================================================================
       4. INTERACTIVE ACCORDION ENGINE FOR FAQS
       ========================================================================== */
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const contentBlock = this.nextElementSibling;

            // Close all sibling nodes except current node choice
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-content').style.maxHeight = null;
                }
            });

            // Toggle selected element target height metrics
            currentItem.classList.toggle('active');
            if (currentItem.classList.contains('active')) {
                contentBlock.style.maxHeight = contentBlock.scrollHeight + "px";
            } else {
                contentBlock.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       5. CLIENT-SIDE INPUT COMPREHENSIVE REGEX FORM VALIDATION
       ========================================================================== */
    const form = document.getElementById('contact-form');
    const statusOutput = document.getElementById('form-status');

    const validateFormGroup = (groupElement, conditionRule) => {
        if (conditionRule) {
            groupElement.classList.remove('invalid');
            return true;
        } else {
            groupElement.classList.add('invalid');
            return false;
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const isNameValid = validateFormGroup(nameInput.parentElement, nameInput.value.trim().length > 0);
        
        // Comprehensive structural alphanumeric email match pattern validation strings
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = validateFormGroup(emailInput.parentElement, emailRegex.test(emailInput.value.trim()));
        
        const isMessageValid = validateFormGroup(messageInput.parentElement, messageInput.value.trim().length > 4);

        if (isNameValid && isEmailValid && isMessageValid) {
            // Emulate secure network API post submit transaction lifecycle actions
            statusOutput.style.color = 'var(--success)';
            statusOutput.textContent = "Parameters transmitted successfully to pipeline infrastructure.";
            form.reset();
            // Reset lingering manual metrics validation classes
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('invalid'));
        } else {
            statusOutput.style.color = 'var(--error)';
            statusOutput.textContent = "Form validation failed. Rectify red criteria indicators.";
        }
    });

    /* ==========================================================================
       6. INTERSECTION OBSERVER ANIMATION & COUNTER ENGINE
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Stats counter incremental loader execution function block
    const runStatsCounter = (entryTarget) => {
        const targetValue = parseInt(entryTarget.getAttribute('data-target'), 10);
        let currentCount = 0;
        const incrementSteps = targetValue / 40; // Split length velocity calculation

        const updateCounterValue = () => {
            currentCount += incrementSteps;
            if (currentCount < targetValue) {
                entryTarget.textContent = Math.ceil(currentCount) + (targetValue === 99 ? "%" : "+");
                setTimeout(updateCounterValue, 25);
            } else {
                entryTarget.textContent = targetValue + (targetValue === 99 ? "%" : "+");
            }
        };
        updateCounterValue();
    };

    const generalObserverOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: "0px"
    };

    const viewportObserverSystem = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if target matches layout wrapper animation triggers
                if (entry.target.classList.contains('scroll-animate')) {
                    entry.target.classList.add('animated-in');
                    observer.unobserve(entry.target);
                }
                // Check if target matches statistics numbers count parameters trigger
                if (entry.target.classList.contains('stat-number')) {
                    runStatsCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, generalObserverOptions);

    // Register active observation loop instances
    animatedElements.forEach(element => viewportObserverSystem.observe(element));
    statNumbers.forEach(stat => viewportObserverSystem.observe(stat));
});