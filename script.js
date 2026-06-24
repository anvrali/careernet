
// Wait for the entire page HTML to load before running any code
document.addEventListener('DOMContentLoaded', function () {

  // Get the hamburger button element from HTML
  const navToggle = document.querySelector('.nav-toggle');
  // Get the navigation links container
  const navLinks  = document.querySelector('.nav-links');

  // Only run if both elements exist on the page
  if (navToggle && navLinks) {
    // When hamburger icon is clicked...
    navToggle.addEventListener('click', function () {
      // Toggle the 'open' class — adding it shows the menu, removing hides it
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu when any nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      // Remove the 'open' class to close the menu
      if (navLinks) navLinks.classList.remove('open');
    });
  });



  // Get the header element
  const header = document.querySelector('.header');

  // Run this function every time the user scrolls
  window.addEventListener('scroll', function () {
    if (!header) return; // Safety check: stop if header doesn't exist

    // If user has scrolled more than 20 pixels from the top...
    if (window.scrollY > 20) {
      header.classList.add('scrolled');    // Add 'scrolled' class → adds CSS shadow
    } else {
      header.classList.remove('scrolled'); // Remove shadow when back at top
    }
  });



  // Select all elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // Create an observer that watches for elements entering the viewport
  const observer = new IntersectionObserver(
    function (entries) {
      // 'entries' is the list of elements being watched
      entries.forEach(function (entry) {
        // If this element is now visible on screen...
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add 'visible' → triggers CSS animation
          observer.unobserve(entry.target);      // Stop watching once it's animated
        }
      });
    },
    {
      threshold: 0.12, // Trigger when 12% of the element is visible
      rootMargin: '0px 0px -40px 0px' // Start animation slightly before fully in view
    }
  );

  // Start observing each animated element
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });



  // Get the current page's filename (e.g. "service.html")
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Loop through all nav links
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    // Get this link's filename from its href attribute
    const linkPage = link.getAttribute('href').split('/').pop();

    // If this link matches the current page, highlight it
    if (linkPage === currentPage) {
      link.classList.add('active'); // Add 'active' class → turns link blue
    }
  });



  // Find all forms on the page
  document.querySelectorAll('form').forEach(function (form) {
form.addEventListener('submit', async function (e) {
e.preventDefault();

const btn = form.querySelector('button[type="submit"]');
if (!btn) return;

const originalText = btn.textContent;

btn.textContent = 'Sending...';
btn.disabled = true;

try {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: new FormData(form)
  });

  const result = await response.json();

  if (result.success) {
    btn.textContent = '✓ Sent Successfully!';
    btn.style.background = '#22c55e';

    form.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  } else {
    throw new Error(result.message || 'Submission failed');
  }

} catch (error) {
  console.error(error);

  btn.textContent = '✗ Failed to Send';
  btn.style.background = '#ef4444';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.background = '';
  }, 3000);
}

});
});





  // Get all stat number elements
  const statNumbers = document.querySelectorAll('.stat-number');

  // Watch when the stats section comes into view
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Animate each number
          statNumbers.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10); // Get the target number from HTML
            if (!target) return;

            let current  = 0;                      // Start counting from 0
            const step   = Math.ceil(target / 60); // How much to add each frame
            const timer  = setInterval(function () {
              current += step;                      // Increase current number
              if (current >= target) {
                current = target;                   // Don't overshoot the target
                clearInterval(timer);               // Stop the counter
              }
              el.textContent = current + (el.getAttribute('data-suffix') || ''); // Update display
            }, 20);                                 // Run every 20ms (~50fps)
          });

          statsObserver.unobserve(entry.target);  // Only animate once
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of stats bar is visible
  );

  // Start watching the stats section if it exists
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

}); // End of DOMContentLoaded


// Disable right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable common DevTools shortcuts
document.addEventListener("keydown", function (e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return false;
    }
});

// Basic DevTools detection
setInterval(function () {
    if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
    ) {
        document.body.innerHTML = `
            <h1>Developer Tools Detected</h1>
            <p>Please close Developer Tools to continue.</p>
        `;
    }
}, 1000);