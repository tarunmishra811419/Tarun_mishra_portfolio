document.addEventListener("DOMContentLoaded", function () {
  // Animated typing effect for the name/title section
  const spanElement = document.querySelector('.trial span');
  const words = ['web developer', 'programmer', 'Tarun Mishra'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      spanElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      spanElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    // Change color based on word
    if (currentWord === 'web developer') {
      spanElement.style.color = '#00ff7f';
    } else if (currentWord === 'programmer') {
      spanElement.style.color = 'chartreuse';
    } else {
      spanElement.style.color = 'khaki';
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeWriter, isDeleting ? 100 : 150);
  }
  typeWriter();

  // Contact form functionality
  const form = document.querySelector('#message form');
  const emailInput = form.querySelector('input[placeholder*="mail"]');
  const subjectInput = form.querySelector('input[placeholder*="topic"]');
  const messageInput = document.getElementById('big');
  const sendButton = form.querySelector('button');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!email || !subject || !message) {
      showNotification('Please fill all fields!', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address!', 'error');
      return;
    }

    const mailtoLink = `mailto:tarunmishra811419@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    form.reset();
    showNotification('Opening your email client...', 'success');
    
    window.location.href = mailtoLink;
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add click animations to project cards
  document.querySelectorAll('#b1, #b2, #b3').forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Input focus effects
  document.querySelectorAll('#message input').forEach(input => {
    input.addEventListener('focus', function() {
      this.style.backgroundColor = '#e3f2fd';
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.backgroundColor = 'lightblue';
      this.style.transform = '';
    });
  });

  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Scroll animations
  function handleScrollAnimations() {
    const elements = document.querySelectorAll('#projects > div, #skill > div, #edu, #data');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', handleScrollAnimations);
  handleScrollAnimations(); // Initial call
});


// Add entrance animation to elements on page load
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(30px)';
  document.body.style.transition = 'all 0.8s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 200);
});