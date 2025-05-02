/**
 * Memorial Site Guide - Main JavaScript
 * Handles animations, navigation, and theme toggling
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  
  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    
    // Toggle theme
    html.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
    
    // Toggle icons
    moonIcon.classList.toggle('d-none');
    sunIcon.classList.toggle('d-none');
    
    // Save preference in localStorage
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    if (savedTheme === 'dark') {
      moonIcon.classList.add('d-none');
      sunIcon.classList.remove('d-none');
    }
  }
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    const isSidebarActive = sidebar.classList.contains('active');
    
    if (!isClickInsideSidebar && !isClickOnMenuToggle && isSidebarActive && window.innerWidth < 992) {
      sidebar.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close sidebar on mobile when link is clicked
      if (window.innerWidth < 992) {
        sidebar.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      
      // Smooth scroll to target
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      
      // Update active state in sidebar
      document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Set active state in sidebar based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.sidebar a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Image gallery functionality with improved interaction
  const images = document.querySelectorAll('.site-img');
  images.forEach(image => {
    // Add cursor style to indicate clickable
    image.style.cursor = 'zoom-in';
    
    // Create animation effect
    image.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
    
    image.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
    
    // Modal display on click
    image.addEventListener('click', function() {
      const imageUrl = this.getAttribute('src');
      const imageCaption = this.nextElementSibling ? 
        this.nextElementSibling.textContent : '';
      
      // Get modal elements
      const modal = new bootstrap.Modal(document.getElementById('imageModal'));
      const modalImage = document.getElementById('modalImage');
      const modalCaption = document.getElementById('modalCaption');
      
      // Add loading indicator
      modalImage.style.opacity = '0';
      modalImage.setAttribute('src', imageUrl);
      
      // Get spinner element
      const spinner = document.querySelector('#imageModal .spinner-border').parentElement;
      
      // Handle image loading
      modalImage.onload = function() {
        // Hide spinner and show image
        spinner.style.display = 'none';
        modalImage.style.opacity = '1';
      };
      
      // Set caption and show modal
      modalCaption.textContent = imageCaption;
      
      // Hide theme toggle button when modal is open
      const themeToggle = document.getElementById('themeToggle');
      themeToggle.style.display = 'none';
      
      // Show theme toggle button when modal is closed
      document.getElementById('imageModal').addEventListener('hidden.bs.modal', function () {
        themeToggle.style.display = 'flex';
      });
      
      modal.show();
    });
  });
});