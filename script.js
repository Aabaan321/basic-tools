document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Settings Panel Controls
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');

    if (settingsToggle && settingsPanel && closeSettings) {
        // Open settings panel
        settingsToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsPanel.style.right = '0px';
            settingsToggle.style.opacity = '0';
        });

        // Close settings panel
        closeSettings.addEventListener('click', function() {
            settingsPanel.style.right = '-300px';
            settingsToggle.style.opacity = '1';
        });

        // Close panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsPanel.contains(e.target) && 
                !settingsToggle.contains(e.target)) {
                settingsPanel.style.right = '-300px';
                settingsToggle.style.opacity = '1';
            }
        });
    }

    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('span');
            if (theme === 'dark') {
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark Mode';
            } else {
                icon.className = 'fas fa-sun';
                text.textContent = 'Light Mode';
            }
        }
    }

    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Text Size Controls
    const textSizeControls = {
        current: parseInt(localStorage.getItem('textSize')) || 16,
        min: 12,
        max: 24,
        step: 2
    };

    function updateTextSize(size) {
        document.documentElement.style.setProperty('--font-size-base', `${size}px`);
        localStorage.setItem('textSize', size);
        const textSizeElement = document.getElementById('textSize');
        if (textSizeElement) {
            textSizeElement.textContent = size;
        }
    }

    const increaseText = document.getElementById('increaseText');
    const decreaseText = document.getElementById('decreaseText');

    if (increaseText) {
        increaseText.addEventListener('click', () => {
            if (textSizeControls.current < textSizeControls.max) {
                textSizeControls.current += textSizeControls.step;
                updateTextSize(textSizeControls.current);
            }
        });
    }

    if (decreaseText) {
        decreaseText.addEventListener('click', () => {
            if (textSizeControls.current > textSizeControls.min) {
                textSizeControls.current -= textSizeControls.step;
                updateTextSize(textSizeControls.current);
            }
        });
    }

    // Initialize text size from localStorage
    updateTextSize(textSizeControls.current);

    // Accent Color Control
    const colorPicker = document.getElementById('accentColor');
    const savedColor = localStorage.getItem('accentColor') || '#ff3e3e';

    function updateAccentColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        localStorage.setItem('accentColor', color);
        const hoverColor = adjustColorBrightness(color, 20);
        document.documentElement.style.setProperty('--accent-hover', hoverColor);
    }

    function adjustColorBrightness(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    if (colorPicker) {
        colorPicker.value = savedColor;
        updateAccentColor(savedColor);
        colorPicker.addEventListener('input', (e) => {
            updateAccentColor(e.target.value);
        });
    }

    // Navigation Menu Animation
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (nav) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image Lazy Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Animated Counter
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Initialize counters when they come into view
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // Page Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});
// Chatbot Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced AI responses
    const responses = {
        // Culinary Passion
        "culinary": "I'm deeply passionate about culinary arts! My goal is to master various global cuisines, starting with French cuisine in France. Want to hear more?",
        "cooking": "Cooking is my greatest passion! I love experimenting with flavors, techniques, and global cuisines. However, I don't share my recipes. Would you like to hear about my culinary journey?",
        "chef": "I aspire to be a world-class chef, mastering cuisines from around the world. I'm planning to study in France first. Want to know more?",
        "recipes": "I don’t share my recipes, but I’d love to discuss cooking techniques and different cuisines!",
        "french cuisine": "French cuisine is the foundation of fine dining! I plan to study in France to learn from the best chefs in the world.",
        "global cuisine": "I aim to master every cuisine, from Italian to Japanese, Thai, Indian, and beyond! What's your favorite cuisine?",
        
        // Sports
        "sports": "I'm highly active and enjoy boxing and swimming. These keep me disciplined and fit. Want to know about my training?",
        "boxing": "Boxing is not just a sport but a lifestyle for me. It keeps me strong, focused, and disciplined.",
        "swimming": "Swimming is my way of relaxing while staying fit. I love challenging myself with different strokes and endurance training.",

        // Gaming
        "gaming": "Gaming is another passion of mine! I love competing online and exploring different game genres. Want to know my favorites?",
        "favorite game": "I play a variety of games. Some of my favorites include open-world RPGs, racing games, and strategy-based titles.",

        // Cars & Bikes
        "cars": "I’m a huge supercar enthusiast! I admire brands like Ferrari, Lamborghini, and Porsche. What's your dream car?",
        "bikes": "Motorcycles fascinate me, especially high-performance models like the Ninja H2R and Ducati Panigale.",

        // Travel
        "travel": "I love exploring new destinations! From Paris to Dubai, every trip inspires my cooking. Where do you like to travel?",
        
        // General Questions
        "hello": "Hi! I'm Aabaan’s chatbot. How can I assist you today?",
        "who are you": "I'm an AI assistant that knows everything about Aabaan—his passions, interests, and goals!",
        "what do you do": "I share information about Aabaan's journey, whether it's culinary arts, sports, gaming, or travel.",

        // Default Response
        "default": "I'm not sure about that, but I can tell you about my interests! Want to chat about food, travel, or sports?"
    };

    // Chatbot Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle && chatWindow && closeChatBtn && chatInput && sendMessage && chatMessages) {
        // Toggle chat
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.add('active');
            chatToggle.style.display = 'none';
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            chatToggle.style.display = 'block';
        });

        // Show Typing Indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
            typingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return typingDiv;
        }

        // Add message to chat
        function addMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Get bot response
        function getBotResponse(message) {
            message = message.toLowerCase();

            if (responses[message]) {
                return responses[message];
            }

            for (let key of Object.keys(responses)) {
                if (message.includes(key)) {
                    return responses[key];
                }
            }

            if (message.includes('?')) {
                if (message.includes('what') || message.includes('tell me about')) {
                    return "I can tell you about Aabaan’s journey in culinary arts, sports, gaming, and travel. What interests you?";
                }
                if (message.includes('where')) {
                    return "Are you asking about Aabaan’s future plans to study in France, or another topic?";
                }
                if (message.includes('why')) {
                    return "Aabaan's passion for culinary arts and adventure drives everything he does! Want details?";
                }
                if (message.includes('how')) {
                    return "Dedication, hard work, and passion are key. Would you like to know about Aabaan’s journey?";
                }
            }
            return responses.default;
        }

        // Send message function
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message === '') return;

            addMessage(message, 'user');
            chatInput.value = '';

            const typingIndicator = showTypingIndicator();

            setTimeout(() => {
                typingIndicator.remove();
                const response = getBotResponse(message.toLowerCase());
                addMessage(response, 'bot');
            }, 1000);
        }

        // Event Listeners
        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });

        // Initial bot message
        setTimeout(() => {
            addMessage("Hello! How can I help you today?", 'bot');
        }, 1000);
    }
});


// Jotform Chatbot
// Add this in your script.js file
<script src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"></script>
<script>
  window.addEventListener("DOMContentLoaded", function() {
    window.AgentInitializer.init({
      rootId: "JotformAgent-019519dae51f7cbc91730f87a7da03a82d3e",
      formID: "019519dae51f7cbc91730f87a7da03a82d3e",
      queryParams: ["skipWelcome=1", "maximizable=1"],
      domain: "https://www.jotform.com",
      isInitialOpen: false,
      isDraggable: false,
      background: "linear-gradient(180deg, #C8CEED 0%, #C8CEED 100%)",
      buttonBackgroundColor: "#0a1551",
      buttonIconColor: "#fff",
      variant: false,
      customizations: {
        greeting: "Yes",
        greetingMessage: "Hi! My Name is Aabaan How can I assist you?",
        pulse: "Yes",
        position: "right"
      }
    });
  });
</script>



</script>

