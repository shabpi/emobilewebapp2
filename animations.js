/* EMobility Egypt — site interactions
   - Active nav highlighting
   - Scroll-reveal animations
   - Stat counter animations (circle rings + big numbers)
   - Subtle parallax on dark image sections
*/

(function() {

  // ===== 1. ACTIVE NAV STATE =====
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  // ===== 2. AUTO-TAG ELEMENTS FOR SCROLL REVEAL =====
  // Skip elements already in viewport so they don't flash hidden-then-visible
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
  }

  function tag(selector, cls) {
    document.querySelectorAll(selector).forEach(el => {
      if (!isInViewport(el)) el.classList.add(cls);
    });
  }

  // Standard fade-up reveals
  [
    '.stat-card-green',
    '.stat-card-white',
    '.portfolio-header',
    '.portfolio-card',
    '.stats-circles-inner .eyebrow',
    '.stats-circles-inner .section-h',
    '.stat-circle',
    '.projects-header',
    '.industry-card',
    '.partner-tile',
    '.lifecycle-card',
    '.job-card',
    '.backend-section .eyebrow',
    '.backend-section h2',
    '.backend-inner > p',
    '.discover-banner-inner',
    '.industries-section > .container .eyebrow',
    '.industries-section > .container .section-h',
    '.partners-section > .container .eyebrow',
    '.partners-section > .container .section-h',
    '.about-text .eyebrow',
    '.about-text h2',
    '.about-text p',
    '.about-text .btn'
  ].forEach(sel => tag(sel, 'reveal'));

  // Slide from left/right
  tag('.about-block .about-text', 'reveal-left');
  tag('.about-block .about-video', 'reveal-right');
  tag('.contact-side', 'reveal-left');
  tag('.contact-form-card', 'reveal-right');

  // Solution detail rows — alternate left/right
  document.querySelectorAll('.sol-detail').forEach((row, i) => {
    const [first, second] = row.children;
    if (!first || !second) return;
    if (!isInViewport(first)) first.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    if (!isInViewport(second)) second.classList.add(i % 2 === 0 ? 'reveal-right' : 'reveal-left');
  });

  // Scale-in
  tag('.project-card', 'reveal-scale');
  tag('.backend-visual', 'reveal-scale');
  tag('.cta-banner-inner', 'reveal-scale');

  // ===== 3. STAGGER CHILDREN IN GRIDS =====
  const staggerGrids = [
    '.stats-cards-grid',
    '.portfolio-grid',
    '.stats-circles-grid',
    '.projects-grid',
    '.industries-grid',
    '.partners-row',
    '.lifecycle-grid'
  ];
  staggerGrids.forEach(sel => {
    document.querySelectorAll(sel).forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.setProperty('--reveal-delay', (i * 0.08) + 's');
      });
    });
  });

  // ===== 4. INTERSECTION OBSERVER — REVEAL + COUNTERS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      // --- Animate circular progress ring ---
      const ring = entry.target.querySelector('.fg-ring');
      if (ring && !ring.dataset.animated) {
        const finalOffset = ring.getAttribute('stroke-dashoffset');
        ring.setAttribute('stroke-dashoffset', '364');
        // force reflow then animate
        ring.getBoundingClientRect();
        requestAnimationFrame(() => {
          ring.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
          ring.setAttribute('stroke-dashoffset', finalOffset);
        });
        ring.dataset.animated = '1';
      }

      // --- Animate stat circle numbers ---
      const numEl = entry.target.querySelector('.num');
      if (numEl && !numEl.dataset.animated) {
        animateNumber(numEl, 1500);
        numEl.dataset.animated = '1';
      }

      // --- Animate big stat card numbers ---
      const bigEl = entry.target.querySelector('.big');
      if (bigEl && !bigEl.dataset.animated) {
        animateNumber(bigEl, 1800);
        bigEl.dataset.animated = '1';
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px'
  });

  // Observe all tagged reveal elements + any element with a number to animate
  const watched = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stat-circle, .stat-card-green'
  );
  watched.forEach(el => observer.observe(el));

  // ===== 5. NUMBER ANIMATION HELPER =====
  function animateNumber(el, duration) {
    const originalText = el.textContent.trim();
    // Parse out leading number (supports "240+", "99.98%", "70%", "12Y")
    const match = originalText.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes('.');
    const start = performance.now();

    function tick(t) {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      const display = isFloat ? value.toFixed(2) : Math.floor(value);
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = originalText; // ensure exact final value
    }
    requestAnimationFrame(tick);
  }

  // ===== 6. SUBTLE PARALLAX ON DARK IMAGE SECTIONS =====
  // The portfolio-section + discover-banner use a fixed background image.
  // Add a small Y offset based on scroll position for depth.
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.portfolio-section, .discover-banner').forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
          const offset = (rect.top - window.innerHeight) * 0.08;
          sec.style.setProperty('background-position', `center ${-offset}px`);
        }
      });
      ticking = false;
    });
  }
  // Only enable parallax on devices that can handle it well
  if (window.matchMedia('(min-width: 900px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ===== 7. PROJECT DETAIL MODAL =====
  const projectData = {
    'nac-substation': {
      title: 'NAC 66kV Substation Automation',
      category: 'Electrical & Power',
      location: 'New Administrative Capital, Egypt',
      year: '2025',
      duration: '14 months',
      sector: 'Utilities',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
        'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=600&q=80'
      ],
      description: '<p>Full substation automation deployment for one of the largest greenfield power facilities in the New Administrative Capital. EMobility delivered end-to-end engineering, supply, installation, and commissioning of a 12-bay 66/22kV substation, fully integrated with the national dispatch SCADA via IEC 60870-5-104.</p><p>The project covered protection relay configuration, IEC 61850-based station bus engineering, HMI development, and FAT/SAT validation across all 12 protection IEDs.</p>',
      specs: [
        { label: 'Voltage Level', value: '66kV / 22kV' },
        { label: 'Substation Bays', value: '12' },
        { label: 'Protection IEDs', value: '36' },
        { label: 'SCADA Platform', value: 'AVEVA System Platform' },
        { label: 'Station Bus', value: 'IEC 61850 GOOSE / MMS' },
        { label: 'Dispatch Protocol', value: 'IEC 60870-5-104' }
      ],
      tech: ['Siemens 7SJ85 IEDs', 'IEC 61850', 'AVEVA SCADA', 'Siemens SIPROTEC', 'Modbus TCP', 'IEC 60870-5-104'],
      outcomes: [
        '99.99% protection system availability since commissioning',
        '40% reduction in fault response time vs. previous control architecture',
        'Full real-time integration with the national grid dispatch centre',
        'Zero protection misoperations during the first 12 months of service'
      ]
    },

    'cairo-alex-ev': {
      title: 'Cairo–Alexandria EV Corridor',
      category: 'EV Mobility',
      location: 'Cairo → Alexandria Highway, Egypt',
      year: '2025',
      duration: '8 months',
      sector: 'Transportation',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
        'https://images.unsplash.com/photo-1606473054413-1e80ad9a0d54?w=600&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'
      ],
      description: '<p>Egypt\'s first nationally-coordinated EV fast-charging corridor — 18 ultra-fast charging stations spanning the Cairo–Alexandria highway, designed to enable end-to-end EV travel between the two cities with maximum 90km between stations.</p><p>EMobility led the full deployment: utility coordination, civil works, charger supply, OCPP backend integration, payment system rollout, and ongoing O&M under a 7-year service agreement.</p>',
      specs: [
        { label: 'Charging Stations', value: '18' },
        { label: 'Chargers per Station', value: '4 × 180kW DC' },
        { label: 'Total Installed Power', value: '12.96 MW' },
        { label: 'Backend Platform', value: 'OCPP 2.0.1' },
        { label: 'Payment Integration', value: 'Visa, Mada, Fawry' },
        { label: 'O&M Term', value: '7 years' }
      ],
      tech: ['ABB Terra 184', 'OCPP 2.0.1', 'CCS Combo 2', 'Charging Management Software', '4G/5G Backhaul'],
      outcomes: [
        '4,200+ active session-users in first 6 months of operation',
        'Average 99.5% station availability across all 18 sites',
        'Reduced average highway charging stop from 45min to 18min',
        'Foundation for 60+ planned extensions across Egypt by 2027'
      ]
    },

    'smart-village': {
      title: 'Smart Village Tier III Data Center',
      category: 'Critical Power',
      location: 'Smart Village, Cairo',
      year: '2024',
      duration: '11 months',
      sector: 'Data Centers',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80'
      ],
      description: '<p>End-to-end critical power architecture for a 2.4 MW Tier III certified data center serving regional financial and telecom operators. N+1 UPS configuration with 15-minute battery autonomy, dual-feed MV switchgear, and full DCIM monitoring integration.</p><p>Project scope included MV/LV switchgear design, UPS engineering, battery sizing, automatic transfer schemes, and integration with the customer\'s BMS and DCIM platforms.</p>',
      specs: [
        { label: 'Tier Rating', value: 'Tier III (Uptime Institute)' },
        { label: 'IT Load', value: '2.4 MW' },
        { label: 'UPS Configuration', value: 'N+1 (4 × 800kVA)' },
        { label: 'Battery Autonomy', value: '15 minutes @ full load' },
        { label: 'PUE Target', value: '1.45' },
        { label: 'DCIM Platform', value: 'Schneider EcoStruxure IT' }
      ],
      tech: ['Schneider Galaxy VX UPS', 'EcoStruxure IT', 'ATS Schemes', 'Lithium-Ion Batteries', 'Modbus TCP', 'BACnet/IP'],
      outcomes: [
        '100% uptime maintained over 18 months of operation',
        'Achieved 1.42 PUE, beating the 1.45 design target',
        'Sub-4ms automatic transfer to backup feed verified in SAT',
        '24/7 remote monitoring with 4-hour on-site response SLA'
      ]
    },

    'cairo-water': {
      title: 'Greater Cairo Water Authority SCADA',
      category: 'SCADA & Automation',
      location: 'Greater Cairo, Egypt',
      year: '2024',
      duration: '18 months',
      sector: 'Water & Wastewater',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80',
        'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=600&q=80'
      ],
      description: '<p>Comprehensive SCADA modernization across 42 water pumping stations and 6 treatment plants serving 11 million residents in Greater Cairo. Replaced legacy proprietary systems with an open-architecture AVEVA System Platform integrating via OPC UA and IEC 60870-5-104.</p><p>The deployment unified previously-siloed pumping, treatment, and distribution operations into a single central control room with real-time visibility across all 48 sites.</p>',
      specs: [
        { label: 'Pumping Stations', value: '42' },
        { label: 'Treatment Plants', value: '6' },
        { label: 'Total I/O Points', value: '14,200' },
        { label: 'Master SCADA', value: 'AVEVA System Platform' },
        { label: 'Field PLCs', value: 'Siemens S7-1500 (192 units)' },
        { label: 'Communication', value: 'OPC UA + IEC 60870-5-104' }
      ],
      tech: ['AVEVA System Platform', 'Siemens S7-1500', 'OPC UA', 'IEC 60870-5-104', 'Wonderware Historian', 'Cellular MPLS Backhaul'],
      outcomes: [
        '23% reduction in pumping energy costs through optimized scheduling',
        'Mean time to detect pipe-burst events reduced from 4 hours to 12 minutes',
        '11M residents served with improved supply continuity',
        'Foundation platform for future smart-water IoT rollout'
      ]
    },

    'new-cairo-bms': {
      title: 'New Cairo Mixed-Use BMS',
      category: 'Smart Buildings',
      location: 'New Cairo, Egypt',
      year: '2025',
      duration: '10 months',
      sector: 'Commercial Buildings',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80'
      ],
      description: '<p>Full Building Management System for a 42-floor mixed-use tower (commercial + residential + retail), covering HVAC automation, lighting control, smart metering, and energy optimization across 180,000 sqm of conditioned space.</p><p>The BMS integrates HVAC chillers, AHUs, FCUs, KNX-based lighting, sub-metering for 240 tenant accounts, and EV charging stations in the basement parking — all on a single Schneider EcoStruxure platform.</p>',
      specs: [
        { label: 'Total Floors', value: '42' },
        { label: 'Conditioned Area', value: '180,000 sqm' },
        { label: 'BMS Platform', value: 'Schneider EcoStruxure Building' },
        { label: 'Sub-Metered Tenants', value: '240' },
        { label: 'EV Charging Bays', value: '36 × 22kW AC' },
        { label: 'Protocols', value: 'BACnet/IP, KNX, Modbus' }
      ],
      tech: ['EcoStruxure Building', 'BACnet/IP', 'KNX Lighting', 'DALI Drivers', 'Smart Meters', 'OCPP Chargers'],
      outcomes: [
        '28% reduction in HVAC energy consumption vs. baseline design',
        'Tenant billing reconciliation accuracy improved to 99.7%',
        'Automated lighting reduced common-area energy by 41%',
        'Single-pane-of-glass operations for facility management team'
      ]
    },

    'benban-solar': {
      title: 'Benban Solar Plant Grid-Tie',
      category: 'Electrical & Power',
      location: 'Benban, Aswan, Egypt',
      year: '2024',
      duration: '13 months',
      sector: 'Renewable Energy',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80'
      ],
      description: '<p>45 MWp grid-connected solar plant at the Benban Solar Park — one of Africa\'s largest solar facilities. EMobility delivered the full medium-voltage collection network, plant SCADA, grid-tie substation, and integration with the Egyptian Electricity Transmission Company (EETC) dispatch.</p><p>The project also included energy storage interfacing (2 MWh BESS) for grid-services participation and frequency regulation.</p>',
      specs: [
        { label: 'Plant Capacity', value: '45 MWp DC / 38 MW AC' },
        { label: 'BESS Capacity', value: '2 MWh / 1 MW' },
        { label: 'Inverters', value: 'SMA Sunny Central 2500' },
        { label: 'MV Collection', value: '22kV ring topology' },
        { label: 'Grid Connection', value: '220kV via Benban switchyard' },
        { label: 'Plant SCADA', value: 'AVEVA OASyS' }
      ],
      tech: ['SMA Sunny Central', 'AVEVA OASyS', 'IEC 61850', 'Modbus RTU', 'BESS Integration', 'IEC 60870-5-104'],
      outcomes: [
        '38 MW AC commissioned on schedule and on budget',
        '15% above PVsyst yield estimate in first operating year',
        'Successful frequency-regulation services to EETC via BESS',
        'CO₂ offset of approximately 56,000 tonnes per year'
      ]
    }
  };

  const modalEl = document.getElementById('projectModal');
  if (modalEl) {
    const bodyEl = modalEl.querySelector('.project-modal-body');
    const closeEl = modalEl.querySelector('.project-modal-close');
    const backdropEl = modalEl.querySelector('.project-modal-backdrop');

    function openModal(slug) {
      const p = projectData[slug];
      if (!p) return;
      bodyEl.innerHTML = `
        <div class="modal-hero">
          <img src="${p.image}" alt="${p.title}"/>
          <div class="modal-hero-overlay">
            <div class="modal-cat">${p.category}</div>
            <h2>${p.title}</h2>
            <div class="modal-meta">
              <span>📍 ${p.location}</span>
              <span>📅 ${p.year}</span>
              <span>⏱ ${p.duration}</span>
              <span>🏭 ${p.sector}</span>
            </div>
          </div>
        </div>
        <div class="modal-body-content">
          <div class="modal-desc">${p.description}</div>

          <div class="modal-cols">
            <div>
              <h4>Scope & Specifications</h4>
              <ul class="modal-specs">
                ${p.specs.map(s => `<li><span class="label">${s.label}</span><span class="value">${s.value}</span></li>`).join('')}
              </ul>
            </div>
            <div>
              <h4>Technologies Used</h4>
              <div class="modal-tech">
                ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
              </div>
              <h4 style="margin-top: 32px;">Project Outcomes</h4>
              <ul class="modal-outcomes">
                ${p.outcomes.map(o => `<li>${o}</li>`).join('')}
              </ul>
            </div>
          </div>

          <h4 style="font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: var(--green); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px;">Project Gallery</h4>
          <div class="modal-gallery">
            ${p.gallery.map(g => `<div class="modal-gallery-img"><img src="${g}" alt=""/></div>`).join('')}
          </div>

          <div class="modal-cta-row">
            <a class="btn btn-primary" href="contact.html">Discuss a similar project</a>
            <a class="btn btn-outline-dark" href="projects.html">Back to all projects</a>
          </div>
        </div>
      `;
      modalEl.classList.add('open');
      document.body.classList.add('modal-open');
      modalEl.scrollTop = 0;
    }

    function closeModal() {
      modalEl.classList.remove('open');
      document.body.classList.remove('modal-open');
    }

    closeEl.addEventListener('click', closeModal);
    backdropEl.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
    });

    // Wire up project cards
    document.querySelectorAll('[data-project]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(card.dataset.project);
      });
      card.style.cursor = 'pointer';
    });

    // Allow URL hash to open a project on load (e.g. /projects.html#nac-substation)
    if (window.location.hash) {
      const slug = window.location.hash.slice(1);
      if (projectData[slug]) {
        setTimeout(() => openModal(slug), 300);
      }
    }
  }

})();
