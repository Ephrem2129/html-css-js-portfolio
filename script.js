document.addEventListener("DOMContentLoaded", function () {
    // Set current year
    document.getElementById("current-year").textContent =
      new Date().getFullYear();
  
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle.querySelector("i");
  
    // Check for saved preference or use system preference
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
  
    // Apply saved theme
    if (savedTheme === "light") {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      icon.classList.replace("fa-moon", "fa-sun");
    }
  
    // Toggle theme with photo transition handling
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      const photos = document.querySelectorAll(".designer-photo img");
  
      photos.forEach((photo) => {
        photo.style.transition = "opacity 0.5s ease";
      });
  
      if (isDark) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });
  
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
  
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = this.classList.contains("active")
        ? "hidden"
        : "";
    });
  
    // Close mobile menu when clicking links
    document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
  
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
  
        // Update active nav link
        document.querySelectorAll(".nav-link, .mobile-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  
    // Section observer for animations
    const sections = document.querySelectorAll(".section");
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Portfolio items
    const portfolioItems = [
      {
        title: "Brand Campaign",
        category: "video",
        image: "assets/images/portfolio1.png",
      },
      {
        title: "Product Launch",
        category: "video",
        image: "assets/images/portfolio2.png",
      },
      {
        title: "Corporate Identity",
        category: "design",
        image: "assets/images/portfolio3.png",
      },
      {
        title: "Social Media Pack",
        category: "design",
        image: "assets/images/portfolio4.png",
      },
      {
        title: "Music Video",
        category: "video",
        image: "assets/images/portfolio5.png",
      },
      {
        title: "Packaging Design",
        category: "design",
        image: "assets/images/portfolio6.png",
      },
    ];
  
    const portfolioGrid = document.querySelector(".portfolio-grid");
    portfolioItems.forEach((item) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.className = `portfolio-item ${item.category}`;
      portfolioItem.innerHTML = `
              <img src="${item.image}" alt="${item.title}" loading="lazy">
              <div class="item-overlay">
                  <h3>${item.title}</h3>
                  <button class="play-button">
                      <i class="fas fa-${
                        item.category === "video" ? "play" : "expand"
                      }"></i>
                  </button>
              </div>
          `;
      portfolioGrid.appendChild(portfolioItem);
    });
  
    // Timeline items
    const timelineItems = [
      {
        year: "2020 - Present",
        title: "Freelance Creative Director",
        description:
          "Working with global clients to create compelling visual stories.",
      },
      {
        year: "2018 - 2020",
        title: "Senior Designer at Studio X",
        description: "Led design team for major brand campaigns.",
      },
      {
        year: "2016 - 2018",
        title: "Junior Designer",
        description: "Started my professional journey in creative agencies.",
      },
      {
        year: "2012 - 2016",
        title: "BFA in Digital Media",
        description: "Graduated with honors from State University.",
      },
    ];
  
    const timeline = document.querySelector(".timeline");
    timelineItems.forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";
      timelineItem.innerHTML = `
              <div class="timeline-content">
                  <h3>${item.year}</h3>
                  <p><strong>${item.title}</strong></p>
                  <p>${item.description}</p>
              </div>
          `;
      timeline.appendChild(timelineItem);
    });
  
    // Services
    const services = [
      {
        title: "Video Production",
        description: "End-to-end video creation from concept to final edit.",
      },
      {
        title: "Motion Graphics",
        description: "Dynamic animations that bring your brand to life.",
      },
      {
        title: "Brand Identity",
        description: "Comprehensive visual identity systems.",
      },
      {
        title: "Social Media Content",
        description: "Engaging content tailored for digital platforms.",
      },
    ];
  
    const servicesGrid = document.querySelector(".services-grid");
    services.forEach((service) => {
      const serviceCard = document.createElement("div");
      serviceCard.className = "service-card";
      serviceCard.innerHTML = `
              <h3>${service.title}</h3>
              <p>${service.description}</p>
          `;
      servicesGrid.appendChild(serviceCard);
    });
  
    // Preload critical resources
    function preloadResources() {
      const images = [
        "assets/images/portfolio1.png",
        "assets/images/portfolio2.png",
        "assets/images/portfolio3.png",
        "assets/images/portfolio4.png",
        "assets/images/portfolio5.png",
        "assets/images/portfolio6.png",
      ];
  
      images.forEach((img) => {
        const image = new Image();
        image.src = img;
      });
    }
  
    // Start preloading after initial render
    setTimeout(preloadResources, 1000);
  });
  