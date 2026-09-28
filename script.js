/**
 * Samuel Greene — Portfolio Scripts
 * Handles instant toggles, clipboard copying, filtering, and modal dialogs.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Email Clipboard Copy
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyBtn && copyBtnText) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email');
      
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtnText.textContent;
        copyBtnText.textContent = 'Copied to clipboard!';
        copyBtn.style.borderColor = '#c48200';

        setTimeout(() => {
          copyBtnText.textContent = originalText;
          copyBtn.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // 2. Category Filter for Projects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const toggleBtn = document.getElementById('projects-toggle-btn');
  const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null;

  let currentFilter = 'all';
  let isExpanded = false;
  const INITIAL_LIMIT = 4;

  function renderProjects() {
    // 1. Get cards matching current tag filter
    const matchingCards = Array.from(projectCards).filter(card => {
      const category = card.getAttribute('data-category');
      return currentFilter === 'all' || category === currentFilter;
    });

    // 2. Hide all cards first
    projectCards.forEach(card => {
      card.style.display = 'none';
    });

    // 3. Render cards matching filter state and limit
    matchingCards.forEach((card, index) => {
      if (isExpanded || index < INITIAL_LIMIT) {
        card.style.display = 'flex'; // Or 'block' depending on grid layout
      }
    });

    // 4. Toggle button visibility based on whether total filtered items > 4
    if (toggleBtn) {
      if (matchingCards.length > INITIAL_LIMIT) {
        toggleBtn.style.display = 'inline-flex';
        
        if (isExpanded) {
          if (toggleText) toggleText.textContent = 'Show Less';
          toggleBtn.classList.add('expanded');
        } else {
          const remaining = matchingCards.length - INITIAL_LIMIT;
          if (toggleText) toggleText.textContent = `Show More (${remaining} more)`;
          toggleBtn.classList.remove('expanded');
        }
      } else {
        toggleBtn.style.display = 'none';
      }
    }
  }

  // Filter button click event
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      // Reset expansion on filter switch
      isExpanded = false;
      renderProjects();
    });
  });

  // Toggle expand/collapse click event
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      renderProjects();
    });
  }

  // Initial render
  renderProjects();
});