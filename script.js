document.addEventListener('DOMContentLoaded', () => {
    

  // Declaring index variables for each slider
  let currentIndexWebsites = 0;
  let currentIndexGames = 0;
  let currentIndexSoftware = 0;
  let currentSectionIndex = 0;
  let currentRotationIndex = 0;

  const sections = document.querySelectorAll('.section');
  const navbarLinks = document.querySelectorAll('.nav-item.nav-link');
  const container = document.querySelector('.full-width-container');
  const rotatingTextElements = document.querySelectorAll('#rotating-text span');

  // Object mapping section IDs to display names
  const sectionNames = {
  'home': 'Home',
  'websites': 'Websites',
  'games': 'Games',
  'software': 'Software',
  };

  // Initialize sliders for horizontal sections
  initializeSections('websites');
  initializeSections('games');
  initializeSections('software');

  // Event listeners for arrow clicks in each section
  document.getElementById('websitesLeftArrow').addEventListener('click', () => scrollLeft('websites'));
  document.getElementById('websitesRightArrow').addEventListener('click', () => scrollRight('websites'));
  document.getElementById('gamesLeftArrow').addEventListener('click', () => scrollLeft('games'));
  document.getElementById('gamesRightArrow').addEventListener('click', () => scrollRight('games'));
  document.getElementById('softwareLeftArrow').addEventListener('click', () => scrollLeft('software'));
  document.getElementById('softwareRightArrow').addEventListener('click', () => scrollRight('software'));

  // Calculate navbar's height
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
  // Adjust the top position of the side buttons based on the navbar's height
  const sideButtons = document.querySelectorAll('.scroll-arrow');
  sideButtons.forEach(button => {
      button.style.top = `calc(50% + ${navbarHeight}px / 2)`;
  });

  //Text cycling.
  function rotateText() {
    rotatingTextElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-60px)'; // Move left
    });

    rotatingTextElements[currentRotationIndex].style.opacity = '1';
    rotatingTextElements[currentRotationIndex].style.transform = 'translateX(0px)';

    currentRotationIndex = (currentRotationIndex + 1) % rotatingTextElements.length;
  }

  rotateText(); // Initial call to show the first text
  setInterval(rotateText, 2000); // Rotate text every 2 seconds
  
  function updateNavbarTitle(newName) {
    const navTitle = document.getElementById('nav-title-title');
    
    // Fade out the title
    navTitle.style.opacity = '0';
  
    // After the fade out, change the text and fade it back in
    setTimeout(() => {
      navTitle.textContent = newName;
      navTitle.style.opacity = '1';
    }, 167);  // This timeout should match the new, faster duration of the CSS opacity transition
  }
  

    // Call this function without fading effect on initial load
  function setInitialNavbarTitle(newName) {
    const navTitle = document.getElementById('nav-title-title');
    navTitle.textContent = newName;
    navTitle.classList.remove('invisible');
  }

  function updateNavbarColor() {
      const sectionColors = {
          'home': '#1F2833',
          'websites': '#0B0C10',
          'games': '#1F2833',
          'software': '#0B0C10',
          'contact' : '#1F2833'
      };
      const currentSectionId = sections[currentSectionIndex].id;
      const currentColor = sectionColors[currentSectionId];
      navbarLinks.forEach(link => {
          link.style.color = currentColor;
      });
      document.getElementById('nav-title-title').style.color = currentColor;
  }

  // Use this function on initial page load
  setInitialNavbarTitle('Home');

  function scrollToSection(index) {
    currentSectionIndex = index;
    var tempTitle = "";
    switch (index) {
        case 0:
            tempTitle = 'Home';
            break;
        case 1:
            tempTitle = 'Websites';
            break;
        case 2:
            tempTitle = 'Games';
            break;
        case 3:
            tempTitle = 'Software';
            break;
        case 4:
            tempTitle = 'Contact';
            break;
        // If there's a default name or action you'd like to specify, add a default case
        default:
            tempTitle = 'Joe\'s Portfolio';
    }
    container.style.transform = `translateY(-${index * 100}vh)`;
    container.style.transition = 'transform 0.2s ease';
    updateNavbarColor();
    updateNavbarTitle(tempTitle); // Update the navbar title to reflect the new section
}


  // Get the contact button element
  var contactBtn = document.querySelector('.contact-btn');
    
  contactBtn.addEventListener('click', function(event) {
      event.preventDefault();
      // Get the position of the contact section relative to the viewport
      var contactSection = 4;
      // Call the custom scroll-to function with the position of the contact section
      scrollToSection(contactSection);
  });

 // Horizontal scrolling functions
 let currentIndex = 0; // Assuming the first section is visible initially

 // Initialize slider sections
 function initializeSections(sectionId) {
  const sections = document.querySelectorAll(`#${sectionId} .scroll-section`);
  sections.forEach((section, index) => {
      section.style.transform = `translateX(${index * 100}%)`;
  });
  }
  
  // Scroll left function, accepts sectionId to handle different sliders
  function scrollLeft(sectionId) {
    let currentIndex = getCurrentIndex(sectionId);
    const sections = document.querySelectorAll(`#${sectionId} .scroll-section`);
    
    if (currentIndex === 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    
    updateSectionTransforms(sections, currentIndex);
    setCurrentIndex(sectionId, currentIndex);
  }
    
    // Scroll right function, accepts sectionId to handle different sliders
    function scrollRight(sectionId) {
      let currentIndex = getCurrentIndex(sectionId);
      const sections = document.querySelectorAll(`#${sectionId} .scroll-section`);
      
      if (currentIndex === sections.length - 1) {
          currentIndex = 0;
      } else {
          currentIndex++;
      }
      
      updateSectionTransforms(sections, currentIndex);
      setCurrentIndex(sectionId, currentIndex);
  }
    
    // Update the transform property for a section
    function updateSectionTransforms(sections, currentIndex) {
      const offset = -100 * currentIndex;
      sections.forEach((section) => {
          section.style.transition = 'transform 0.5s ease-out';
          section.style.transform = `translateX(${offset}%)`;
      });
  }

  function getCurrentIndex(sectionId) {
    switch (sectionId) {
        case 'websites': return currentIndexWebsites;
        case 'games': return currentIndexGames;
        case 'software': return currentIndexSoftware;
        default: return 0; // Default case if sectionId does not match
    }
  }

  function setCurrentIndex(sectionId, index) {
    switch (sectionId) {
        case 'websites': currentIndexWebsites = index; break;
        case 'games': currentIndexGames = index; break;
        case 'software': currentIndexSoftware = index; break;
        // No default case needed for setting as it's action-based
    }
  }

  window.addEventListener('wheel', e => {
      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
          scrollToSection(currentSectionIndex + 1);
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
      }
  });

  navbarLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          scrollToSection(index);
      });
  });

  // Cursor blur effect
  const cursorBlur = document.getElementById('cursor-blur');
  document.addEventListener('mousemove', e => {
      cursorBlur.style.display = 'block';
      cursorBlur.style.left = `${e.pageX}px`;
      cursorBlur.style.top = `${e.pageY}px`;
  });

  // Initialize with the first section's navbar color
  updateNavbarColor();
});
