// script.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      navToggle.classList.toggle('active');
  });
});


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  document.getElementById('contactForm').onsubmit = validateForm;  
  
  const projectImages = [
    // Images for the first project card
    [
      "image/Hero.jpg",
      "image/Hero-1.jpg",
      "image/luxury-3.jpg",
      "image/Hero-4.jpg",
      "image/luxury.jpg"
    ],
    // Images for the second project card
    [
      "image/office-space.jpg",
      "image/office-space-2.jpg",
      "image/office-space-3.jpg",
      "image/office-space-4.jpg",
      "image/office-space.jpg"
    ],
    // Images for the third project card
    [
      "image/friendly-1.jpg",
      "image/friendly-2.jpg",
      "image/friendly-3.jpg",
      "image/friendly-4.jpg",
      "image/friendly.jpg"
    ]
  ];
  
  let currentImageIndexes = [0, 0, 0]; // Track image indexes for each project card
  
  function showNextImage(btn) {
    const projectCard = btn.closest('.project-card');
    const projectCards = document.querySelectorAll('.project-card');
    const index = Array.from(projectCards).indexOf(projectCard);
  
    if (index === -1) {
      console.error("Project card not found.");
      return;
    }
  
    const image = projectCard.querySelector('.project-image');
  
    if (!image) {
      console.error("Image element not found within the project card.");
      return;
    }
  
    currentImageIndexes[index] = (currentImageIndexes[index] + 1) % projectImages[index].length;
    console.log(`Switching to image index ${currentImageIndexes[index]} for project ${index}`);
    image.classList.add('hidden');
  
    setTimeout(() => {
      image.src = projectImages[index][currentImageIndexes[index]];
      console.log(`Current image path: ${image.src}`);
      image.classList.remove('hidden');
    }, 500);
  }
  
  const serviceDescriptions = {
    1: "Our consultation service involves in-depth discussions to understand your needs and preferences.",
    2: "We provide top-notch design services to bring your vision to life.",
    3: "Our team ensures flawless execution of your projects.",
    4: "We offer maintenance services to keep your space looking its best.",
    5: "Our consultation service involves in-depth discussions to understand your needs and preferences.",
    6: "We provide top-notch design services to bring your vision to life."
  };
  
  function toggleServiceDescription(element) {
    const serviceItem = element.closest('.service-item');
    const description = serviceItem.querySelector('.service-description');
    
    if (!description) {
      const newDescription = document.createElement('div');
      newDescription.classList.add('service-description');
      newDescription.innerText = serviceDescriptions[serviceItem.querySelector('.service-number').innerText];
      serviceItem.appendChild(newDescription);
      setTimeout(() => newDescription.classList.add('active'), 0);
    } else {
      description.classList.toggle('active');
    }
  }
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        
        const span = document.getElementsByClassName('close')[0];
        span.onclick = function() {
            modal.style.display = 'none';
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  if (validateForm()) {
      
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';

      event.target.reset();
      
      const span = document.getElementsByClassName('close')[0];
      span.onclick = function() {
          modal.style.display = 'none';
      }

      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = 'none';
          }
      }
  }
});

function validateForm() {
  let isValid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  nameError.style.visibility = 'hidden';
  emailError.style.visibility = 'hidden';
  messageError.style.visibility = 'hidden';

  if (name.value.trim() === '') {
      nameError.textContent = 'Name is required.';
      nameError.style.visibility = 'visible';
      isValid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.style.visibility = 'visible';
      isValid = false;
  }
  
  if (message.value.trim() === '') {
      messageError.textContent = 'Message is required.';
      messageError.style.visibility = 'visible';
      isValid = false;
  }

  return isValid;
}