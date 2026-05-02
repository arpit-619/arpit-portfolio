import './style.css'

document.addEventListener("DOMContentLoaded", () => {
    // 1. Reveal Animations on Scroll
    const reveals = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // 2. Navigation Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    const navOptions = {
        threshold: 0,
        rootMargin: "-40% 0px -59% 0px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    // Reset all links
                    link.classList.remove("nav-link-active");
                    link.classList.add("nav-link-inactive");
                    
                    const underline = link.querySelector('.nav-underline');
                    if(underline) {
                        underline.classList.remove("nav-underline-active");
                        underline.classList.add("nav-underline-inactive");
                    }
                    
                    if (link.getAttribute("href") === `#${currentId}`) {
                        // Set active link
                        link.classList.add("nav-link-active");
                        link.classList.remove("nav-link-inactive");
                        
                        if(underline) {
                            underline.classList.add("nav-underline-active");
                            underline.classList.remove("nav-underline-inactive");
                        }
                    }
                });

                mobileNavLinks.forEach(link => {
                    link.classList.remove("text-primary");
                    link.classList.add("text-text-slate");
                    if(link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("text-primary");
                        link.classList.remove("text-text-slate");
                    }
                });
            }
        });
    }, navOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // 3. Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                const mobileMenu = document.getElementById('mobile-menu');
                const navOverlay = document.getElementById('nav-overlay');
                if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    if(navOverlay) navOverlay.classList.remove('active');
                }
            }
        });
    });

    // Handle explicit scroll-to-contact buttons
    document.querySelectorAll('.scroll-to-contact').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const mobileMenu = document.getElementById('mobile-menu');
                const navOverlay = document.getElementById('nav-overlay');
                if(mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    if(navOverlay) navOverlay.classList.remove('active');
                }
            }
        });
    });

    // 4. Handle Home Branding Click
    const brandHome = document.querySelector('.brand-home');
    if (brandHome) {
        brandHome.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Handle Contact Form Submission via Web3Forms
    const contactForm = document.querySelector('#contact-form');
    const submitBtn = document.querySelector('#submit-btn');
    const formResult = document.querySelector('#form-result');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
            formResult.classList.add('hidden');

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formResult.innerText = "Message sent successfully! I will get back to you soon.";
                    formResult.classList.remove('hidden', 'text-red-500');
                    formResult.classList.add('text-green-500');
                    contactForm.reset();
                } else {
                    console.error("Error", data);
                    formResult.innerText = data.message || "Something went wrong. Please try again later.";
                    formResult.classList.remove('hidden', 'text-green-500');
                    formResult.classList.add('text-red-500');
                }
            } catch (error) {
                console.error("Error", error);
                formResult.innerText = "Something went wrong. Please check your connection and try again.";
                formResult.classList.remove('hidden', 'text-green-500');
                formResult.classList.add('text-red-500');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navOverlay = document.getElementById('nav-overlay');

    function toggleMenu() {
        if (!mobileMenu) return;
        const isOpen = mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    }

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if(navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // 5. Terminal Typing Effect
    const terminalContent = document.getElementById('terminal-content');
    const terminalLines = [
        "> Initializing Automation Sequence...",
        "> Loading Blue Prism Processes...",
        "> Connecting to Control Room... [OK]",
        "> Queue Status: ACTIVE | Items: 420",
        "> Bots Running Successfully",
        "> System Health: OPTIMAL",
        "> Ready to orchestrate digital futures."
    ];
    
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < terminalLines.length) {
            const line = document.createElement('div');
            line.className = "opacity-0 translate-y-2 transition-all duration-500 ease-out";
            
            // Highlight specific keywords for realism
            let text = terminalLines[lineIndex];
            if(text.includes('[OK]')) text = text.replace('[OK]', '<span class="text-green-600 dark:text-green-400 font-bold">[OK]</span>');
            if(text.includes('Successfully')) text = text.replace('Successfully', '<span class="text-green-600 dark:text-green-400">Successfully</span>');
            if(text.includes('OPTIMAL')) text = text.replace('OPTIMAL', '<span class="text-green-600 dark:text-green-400 font-bold">OPTIMAL</span>');
            if(text.includes('ACTIVE')) text = text.replace('ACTIVE', '<span class="text-primary font-bold">ACTIVE</span>');
            
            line.innerHTML = text;
            terminalContent.appendChild(line);
            
            // Fade in effect
            setTimeout(() => {
                line.classList.remove('opacity-0', 'translate-y-2');
            }, 50);

            lineIndex++;
            setTimeout(typeLine, Math.random() * 600 + 300); // Random delay between lines
        }
    }
    
    // Start terminal typing after a short delay
    if(terminalContent) {
        setTimeout(typeLine, 1000);
    }

    // 6. Hero Typing Effect
    const heroTypingText = document.getElementById("hero-typing-text");
    if(heroTypingText) {
        const roles = [
            "Senior RPA Developer",
            "Intelligent Automation Engineer",
            "Blue Prism Specialist",
            "AI Workflow Automation Engineer",
            "Enterprise Automation Developer"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeHeroRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                heroTypingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTypingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Randomize typing speed for realism
            let typingSpeed = isDeleting ? 30 : Math.random() * 50 + 50;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(typeHeroRole, typingSpeed);
        }
        
        setTimeout(typeHeroRole, 1500);
    }

    // 5. THEME TOGGLE LOGIC
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Optional: Add a subtle rotation or scale effect to the toggle button
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 100);
        });
    }
    // 6. Bot Progress Scroll Bar
    const progressBar = document.getElementById("scroll-progress-bar");
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
    // 7. Custom Bot Cursor Logic
    const cursor = document.getElementById("custom-cursor");
    const cursorOutline = document.getElementById("custom-cursor-outline");

    if (cursor && cursorOutline) {
        document.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
            
            // Smoother trailing effect for the outline
            cursorOutline.animate({
                left: `${x}px`,
                top: `${y}px`
            }, { duration: 400, fill: "forwards" });
        });

        const targets = document.querySelectorAll("a, button, .project-card, .metric-card, .skill-card, .card-base, #theme-toggle, .scroll-to-contact");
        targets.forEach(target => {
            target.addEventListener("mouseenter", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursor.style.backgroundColor = "var(--secondary)";
                cursorOutline.style.borderColor = "var(--secondary)";
                cursorOutline.style.width = "48px";
                cursorOutline.style.height = "48px";
            });
            target.addEventListener("mouseleave", () => {
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
                cursor.style.backgroundColor = "var(--primary)";
                cursorOutline.style.borderColor = "var(--primary)"; 
                cursorOutline.style.width = "32px";
                cursorOutline.style.height = "32px";
            });
        });
    }
});
