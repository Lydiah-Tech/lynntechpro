// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const projectForm = document.querySelector('#projectForm');
if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Get selected budget
        const selectedBudget = document.querySelector('input[name="budget"]:checked');
        const budget = selectedBudget ? selectedBudget.value : 'Not specified';
        
        // Show success message
        const projectType = this.querySelector('input[placeholder="Project Type"]').value;
        const message = `Thank you for your ${projectType} project request! I'll review your details and get back to you within 24 hours with a customized quote.`;
        
        // Create custom alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-check-circle"></i>
                <h3>Project Request Sent!</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        // Add styles for custom alert
        const style = document.createElement('style');
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            .alert-content {
                background: white;
                padding: 40px;
                border-radius: 10px;
                text-align: center;
                max-width: 500px;
                animation: slideIn 0.3s ease;
            }
            .alert-content i {
                font-size: 4rem;
                color: #10b981;
                margin-bottom: 20px;
            }
            .alert-content h3 {
                margin-bottom: 15px;
                color: #1e293b;
            }
            .alert-content p {
                margin-bottom: 20px;
                color: #64748b;
            }
            .alert-content button {
                background: #2563eb;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(alertDiv);
        
        // Reset form
        this.reset();
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNavLink() {
    let current = '';
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Add active class to nav links on click
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// AI Chat Demo
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatDemo = document.querySelector('.chat-demo');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message';
    userMessage.textContent = `You: ${message}`;
    userMessage.style.background = '#f1f5f9';
    userMessage.style.marginBottom = '10px';
    
    chatDemo.insertBefore(userMessage, document.querySelector('.chat-input'));
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponses = [
            "I can help you integrate AI into your website! What specific functionality are you looking for?",
            "I specialize in creating AI chatbots for customer support. Would you like to know more about this?",
            "For e-commerce sites, I recommend AI-powered recommendation engines to boost sales.",
            "I can build custom machine learning models tailored to your business needs.",
            "Let me know what type of project you have in mind, and I'll suggest the best AI solutions."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message ai-message';
        aiMessage.textContent = `AI: ${randomResponse}`;
        
        chatDemo.insertBefore(aiMessage, document.querySelector('.chat-input'));
        
        // Scroll to bottom
        aiMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1000);
    
    // Clear input
    input.value = '';
    
    // Add enter key support
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Portfolio card animations
const portfolioCards = document.querySelectorAll('.portfolio-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

portfolioCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    portfolioObserver.observe(card);
});

// Add to cart functionality
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement.querySelector('h4').textContent;
        const price = this.parentElement.querySelector('.price').textContent;
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span>${product} added to cart! ${price}</span>
        `;
        
        // Add styles for notification
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .cart-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #10b981;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                    z-index: 1000;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 3000);
    });
});

// Current year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('footer .footer-bottom p');
if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project type tags click effect
document.querySelectorAll('.type-tags span').forEach(tag => {
    tag.addEventListener('click', function() {
        const projectTypeInput = document.querySelector('input[placeholder="Project Type"]');
        if (projectTypeInput) {
            projectTypeInput.value = this.textContent;
            projectTypeInput.focus();
        }
    });
});