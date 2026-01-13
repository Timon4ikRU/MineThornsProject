document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
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
    
    // Copy IP button functionality
    const copyIPButton = document.getElementById('copyIP');
    const copyMessage = document.getElementById('copy-message');
    const serverIP = '1488-E0eC.aternos.me';
    
    copyIPButton.addEventListener('click', function() {
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = serverIP;
        document.body.appendChild(tempInput);
        
        // Select and copy the text
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            // Use modern clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(serverIP).then(function() {
                    showCopySuccess();
                });
            } else {
                // Fallback for older browsers
                document.execCommand('copy');
                showCopySuccess();
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            showCopyError();
        }
        
        // Remove the temporary input
        document.body.removeChild(tempInput);
        
        function showCopySuccess() {
            // Change button text and style
            copyIPButton.innerHTML = '<i class="fas fa-check"></i> IP скопирован!';
            copyIPButton.style.background = '#2E7D32';
            
            // Show message
            copyMessage.textContent = 'IP адрес скопирован в буфер обмена!';
            copyMessage.style.color = '#4CAF50';
            
            // Reset button after 2 seconds
            setTimeout(function() {
                copyIPButton.innerHTML = '<i class="fas fa-copy"></i> Скопировать IP сервера';
                copyIPButton.style.background = '#4CAF50';
                copyMessage.textContent = '';
            }, 2000);
        }
        
        function showCopyError() {
            copyMessage.textContent = 'Не удалось скопировать. Скопируйте вручную: ' + serverIP;
            copyMessage.style.color = '#FF9800';
            
            setTimeout(function() {
                copyMessage.textContent = '';
            }, 3000);
        }
    });
    
    // Simulate online players count
    function updateOnlineCount() {
        const onlineElement = document.getElementById('online-count');
        let currentCount = parseInt(onlineElement.textContent);
        let newCount = currentCount;
        
        // Random small change in player count
        const change = Math.random() > 0.5 ? 1 : -1;
        newCount = Math.max(10, Math.min(50, currentCount + change));
        
        if (newCount !== currentCount) {
            // Animate the change
            onlineElement.style.transform = 'scale(1.2)';
            onlineElement.style.color = '#FF9800';
            
            setTimeout(() => {
                onlineElement.textContent = newCount;
                onlineElement.style.transform = 'scale(1)';
                onlineElement.style.color = 'inherit';
            }, 300);
        }
        
        // Update again in 10-30 seconds
        setTimeout(updateOnlineCount, Math.random() * 20000 + 10000);
    }
    
    // Start the online count simulation
    updateOnlineCount();
    
    // Add some interactive effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add animation to rules on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    // Observe rules for animation
    document.querySelectorAll('.rule').forEach((rule, index) => {
        rule.style.opacity = '0';
        rule.style.transform = 'translateX(-20px)';
        rule.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        rule.style.transitionDelay = (index * 0.1) + 's';
        
        observer.observe(rule);
    });
});
