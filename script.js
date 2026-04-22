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
      setTimeout(()