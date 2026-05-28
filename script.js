document.addEventListener("DOMContentLoaded", function() {
    
    // Video Grid Filter Logic
    const tabButtons = document.querySelectorAll(".tab-btn");
    const videoCards = document.querySelectorAll(".video-card");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active status from previous buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Add active status to current clicked button
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            videoCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    // Add entry animation styling smoothly
                    card.style.opacity = "0";
                    setTimeout(() => { card.style.opacity = "1"; }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Mock Interaction for Video Play Overlay
    const playButton = document.querySelector(".play-btn-center");
    if(playButton) {
        playButton.addEventListener("click", function() {
            alert("Video modal overlay interaction placeholder. Connect your Vimeo/YouTube player embed APIs here.");
        });
    }
});



/* ═══════════════════════════════════════════════════════════════
   SELLVRO — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAVBAR — Scroll + Burger + Smooth Link
  ───────────────────────────────────────── */
  const nav        = document.getElementById('svNav');
  const burger     = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Sticky scroll style
  window.addEventListener('scroll', () => {
    nav.classList.toggle('sv-nav--scrolled', window.scrollY > 20);
  }, { passive: true });

  // Burger toggle
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', false);
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     2. KEYBOARD SHORTCUT ⌘K / CTRL+K → Focus Search
  ───────────────────────────────────────── */
  const navSearch = document.getElementById('navSearch');
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      // Open mobile menu if hidden, then focus
      if (window.innerWidth <= 768) {
        mobileMenu.classList.add('is-open');
      }
      navSearch && navSearch.focus();
    }
    if (e.key === 'Escape' && navSearch === document.activeElement) {
      navSearch.blur();
    }
  });

  /* ─────────────────────────────────────────
     3. VIDEO MODAL
  ───────────────────────────────────────── */
  const videoThumb        = document.getElementById('videoThumb');
  const videoPlayBtn      = document.getElementById('videoPlayBtn');
  const videoModal        = document.getElementById('videoModal');
  const videoModalClose   = document.getElementById('videoModalClose');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');

  function openVideoModal() {
    videoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideoModal() {
    videoModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  videoThumb.addEventListener('click', openVideoModal);
  videoPlayBtn.addEventListener('click', e => { e.stopPropagation(); openVideoModal(); });
  videoModalClose.addEventListener('click', closeVideoModal);
  videoModalBackdrop.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

  /* ─────────────────────────────────────────
     4. DEALS COUNTDOWN TIMER
  ───────────────────────────────────────── */
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');

  // Set a target time 8h 34m from page load
  const dealEnd = new Date();
  dealEnd.setHours(dealEnd.getHours() + 8);
  dealEnd.setMinutes(dealEnd.getMinutes() + 34);
  dealEnd.setSeconds(dealEnd.getSeconds() + 12);

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const diff = dealEnd - Date.now();
    if (diff <= 0) {
      cdHours.textContent = '00';
      cdMins.textContent  = '00';
      cdSecs.textContent  = '00';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    cdHours.textContent = pad(h);
    cdMins.textContent  = pad(m);
    cdSecs.textContent  = pad(s);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ─────────────────────────────────────────
     5. PRODUCT FILTER
  ───────────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.sv-filter-btn');
  const productCards = document.querySelectorAll('.sv-product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('sv-filter-btn--active'));
      btn.classList.add('sv-filter-btn--active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (match) {
            card.classList.remove('sv-hidden');
            requestAnimationFrame(() => {
              card.style.opacity   = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.classList.add('sv-hidden');
          }
        }, 150);
      });
    });
  });

  /* ─────────────────────────────────────────
     6. TESTIMONIALS CAROUSEL
  ───────────────────────────────────────── */
  const track     = document.getElementById('testimonialsTrack');
  const dotsWrap  = document.getElementById('carouselDots');
  const prevBtn   = document.getElementById('carouselPrev');
  const nextBtn   = document.getElementById('carouselNext');
  const cards     = track ? track.querySelectorAll('.sv-testimonial-card') : [];
  let   current   = 0;
  let   autoTimer = null;

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'sv-carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    if (!track || cards.length === 0) return;
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(calc(-${current * 100}% - ${current * 16}px))`;
    dotsWrap.querySelectorAll('.sv-carousel-dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (cards.length > 0) {
    buildDots();
    startAuto();
    prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) { goTo(delta > 0 ? current + 1 : current - 1); startAuto(); }
    });
  }

  /* ─────────────────────────────────────────
     7. AUTH — Tab Switching + Form Logic
  ───────────────────────────────────────── */
  const tabSignup   = document.getElementById('tabSignup');
  const tabLogin    = document.getElementById('tabLogin');
  const formSignup  = document.getElementById('formSignup');
  const formLogin   = document.getElementById('formLogin');

  function switchTab(tab) {
    if (tab === 'signup') {
      tabSignup.classList.add('sv-auth-tab--active');
      tabLogin.classList.remove('sv-auth-tab--active');
      formSignup.classList.remove('sv-auth-form--hidden');
      formLogin.classList.add('sv-auth-form--hidden');
    } else {
      tabLogin.classList.add('sv-auth-tab--active');
      tabSignup.classList.remove('sv-auth-tab--active');
      formLogin.classList.remove('sv-auth-form--hidden');
      formSignup.classList.add('sv-auth-form--hidden');
    }
  }

  tabSignup.addEventListener('click', () => switchTab('signup'));
  tabLogin.addEventListener('click',  () => switchTab('login'));

  // All CTA buttons that carry data-auth attribute auto-scroll + switch tab
  document.querySelectorAll('[data-auth]').forEach(btn => {
    btn.addEventListener('click', e => {
      // Only intercept non-anchor clicks or anchors pointing to #auth
      const href = btn.getAttribute('href');
      if (href && href !== '#auth') return;
      e.preventDefault();
      const tab = btn.dataset.auth || 'signup';
      switchTab(tab);
      const authSection = document.getElementById('auth');
      if (authSection) {
        const offset = nav.offsetHeight + 16;
        const top = authSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     8. PASSWORD TOGGLE
  ───────────────────────────────────────── */
  function setupPasswordToggle(btnId, inputId) {
    const btn   = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.textContent = isHidden ? '🙈' : '👁';
    });
  }
  setupPasswordToggle('toggleSignupPass', 'signupPassword');
  setupPasswordToggle('toggleLoginPass',  'loginPassword');

  /* ─────────────────────────────────────────
     9. FORM SUBMISSION — Mock Feedback
  ───────────────────────────────────────── */
  function showToast(msg, duration = 3000) {
    const toast = document.getElementById('svToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), duration);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Signup
  const signupSubmit = document.getElementById('signupSubmit');
  if (signupSubmit) {
    signupSubmit.addEventListener('click', () => {
      const firstName = document.getElementById('signupFirstName').value.trim();
      const email     = document.getElementById('signupEmail').value.trim();
      const company   = document.getElementById('signupCompany').value.trim();
      const role      = document.getElementById('signupRole').value;
      const password  = document.getElementById('signupPassword').value;
      const terms     = document.getElementById('signupTerms').checked;

      if (!firstName)            return showToast('⚠️ Please enter your first name.');
      if (!validateEmail(email)) return showToast('⚠️ Please enter a valid email address.');
      if (!company)              return showToast('⚠️ Please enter your company name.');
      if (!role)                 return showToast('⚠️ Please select your role.');
      if (password.length < 8)   return showToast('⚠️ Password must be at least 8 characters.');
      if (!terms)                return showToast('⚠️ Please accept the Terms of Service.');

      signupSubmit.textContent = 'Creating account…';
      signupSubmit.disabled    = true;
      signupSubmit.style.opacity = '0.7';

      // Simulate API call
      setTimeout(() => {
        signupSubmit.textContent = '✓ Account Created!';
        showToast(`🎉 Welcome to Sellvro, ${firstName}! Check your email to verify your account.`, 5000);
        setTimeout(() => {
          signupSubmit.textContent = 'Create Free Account';
          signupSubmit.disabled    = false;
          signupSubmit.style.opacity = '';
        }, 3000);
      }, 1800);
    });
  }

  // Login
  const loginSubmit = document.getElementById('loginSubmit');
  if (loginSubmit) {
    loginSubmit.addEventListener('click', () => {
      const email    = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!validateEmail(email)) return showToast('⚠️ Please enter a valid email address.');
      if (!password)             return showToast('⚠️ Please enter your password.');

      loginSubmit.textContent  = 'Logging in…';
      loginSubmit.disabled     = true;
      loginSubmit.style.opacity = '0.7';

      setTimeout(() => {
        loginSubmit.textContent  = '✓ Logged In';
        showToast('✅ Welcome back! Redirecting to your dashboard…', 4000);
        setTimeout(() => {
          loginSubmit.textContent  = 'Log In';
          loginSubmit.disabled     = false;
          loginSubmit.style.opacity = '';
        }, 3000);
      }, 1600);
    });
  }

  /* ─────────────────────────────────────────
     10. LOGO TICKER — Clone for infinite loop
  ───────────────────────────────────────── */
  const logoInner = document.getElementById('logoInner');
  if (logoInner) {
    // Duplicate content for seamless loop
    logoInner.innerHTML += logoInner.innerHTML;
  }

  /* ─────────────────────────────────────────
     11. SCROLL REVEAL (IntersectionObserver)
  ───────────────────────────────────────── */
  const revealTargets = [
    '.sv-section__header',
    '.sv-why-card',
    '.sv-process-step',
    '.sv-deal-card',
    '.sv-product-card',
    '.sv-testimonial-card',
    '.sv-collab-card',
    '.sv-cat-card',
    '.sv-hero__stat',
    '.sv-wms-callout',
  ];

  // Add reveal class to all targets
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('sv-reveal');
      // Stagger siblings
      if (i % 4 === 1) el.classList.add('sv-reveal-delay-1');
      if (i % 4 === 2) el.classList.add('sv-reveal-delay-2');
      if (i % 4 === 3) el.classList.add('sv-reveal-delay-3');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.sv-reveal').forEach(el => observer.observe(el));

  /* ─────────────────────────────────────────
     12. HERO DASHBOARD MOCK — Animate bars
  ───────────────────────────────────────── */
  const mockBars = document.querySelectorAll('.sv-mock__bar-chart div');
  function animateMockBars() {
    mockBars.forEach(bar => {
      const h = Math.floor(Math.random() * 70) + 20;
      bar.style.height = h + '%';
    });
  }
  setInterval(animateMockBars, 3000);

  /* ─────────────────────────────────────────
     13. ACTIVE NAV LINK — Highlight on scroll
  ───────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.sv-nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = href === '#' + entry.target.id
            ? 'var(--color-black)'
            : '';
          link.style.fontWeight = href === '#' + entry.target.id
            ? 'var(--fw-semibold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─────────────────────────────────────────
     14. PRODUCT CARDS — Transition styles on init
  ───────────────────────────────────────── */
  productCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.25s ease, border-color 0.25s ease';
    card.style.opacity    = '1';
    card.style.transform  = 'scale(1)';
  });

  /* ─────────────────────────────────────────
     15. WMS BINS — Animated hover glow
  ───────────────────────────────────────── */
  const wmsBins = document.querySelectorAll('.sv-wms-visual__bin');
  wmsBins.forEach((bin, i) => {
    setInterval(() => {
      bin.style.boxShadow = `0 0 ${8 + Math.random() * 8}px rgba(255,87,0,0.3)`;
      setTimeout(() => { bin.style.boxShadow = ''; }, 800);
    }, 2000 + i * 400);
  });

  /* ─────────────────────────────────────────
     16. DEAL PROGRESS BARS — Animate in on scroll
  ───────────────────────────────────────── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.sv-deal-card__progress-fill');
        fills.forEach(fill => {
          const target = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = target; }, 100);
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.sv-deal-card').forEach(card => {
    progressObserver.observe(card);
  });

  /* ─────────────────────────────────────────
     17. HERO BADGE — Typing effect on tagline
  ───────────────────────────────────────── */
  const heroSub = document.querySelector('.sv-hero__sub');
  if (heroSub) {
    const text    = heroSub.textContent;
    heroSub.textContent = '';
    heroSub.style.opacity = '1';
    let i = 0;
    const typeInterval = setInterval(() => {
      heroSub.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typeInterval);
    }, 18);
  }

  /* ─────────────────────────────────────────
     18. STATS COUNTER — Animate numbers on scroll
  ───────────────────────────────────────── */
  const statNums = document.querySelectorAll('.sv-hero__stat-num');
  const statData = [
    { end: 12000, suffix: 'K+',   prefix: '',  display: '12K+' },
    { end: 480,   suffix: 'M+',   prefix: '$', display: '$480M+' },
    { end: 99.4,  suffix: '%',    prefix: '',  display: '99.4%' },
    { end: 60,    suffix: '+',    prefix: '',  display: '60+' },
  ];

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      statNums.forEach((el, i) => {
        const d        = statData[i];
        const duration = 1800;
        const start    = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const val      = d.end * easeOut(progress);
          const display  = d.end < 100
            ? (d.prefix + val.toFixed(1) + d.suffix)
            : (d.prefix + Math.floor(val).toLocaleString() + d.suffix);
          el.textContent = display;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = d.display;
        }
        requestAnimationFrame(tick);
      });
      statObserver.disconnect();
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.sv-hero__stats');
  if (statsEl) statObserver.observe(statsEl);

  /* ─────────────────────────────────────────
     19. GLOBAL CLICK — Close mobile menu on outside click
  ───────────────────────────────────────── */
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  /* ─────────────────────────────────────────
     20. INIT — Confirm ready
  ───────────────────────────────────────── */
  console.log('%cSellvro 🚀 Ready', 'color:#FF5700;font-weight:900;font-size:16px;');

});


