/**
 * Samuel Greene — Personal Project Portfolio Scripts
 * Instant toggles, flat interactions, zero animation delay.
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
        copyBtn.style.borderColor = '#f6d887';

        setTimeout(() => {
          copyBtnText.textContent = originalText;
          copyBtn.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // 2. Architecture Spec Drawer Toggles
  const toggleBtns = document.querySelectorAll('.toggle-architecture-btn');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      const textSpan = btn.querySelector('.toggle-text');

      if (drawer) {
        drawer.classList.toggle('open');
        const isOpen = drawer.classList.contains('open');
        
        if (textSpan) {
          textSpan.textContent = isOpen ? 'Hide Architecture Spec' : 'View Architecture Spec';
        }
      }
    });
  });

  // 3. Category Filter for Projects
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

  // 4. Resume Modal Logic
  const openResumeBtn = document.getElementById('open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const modal = document.getElementById('resume-modal');

  const openModal = () => modal && modal.classList.add('active');
  const closeModal = () => modal && modal.classList.remove('active');

  if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);

  // Close modal when clicking dark backdrop or pressing Escape
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

});