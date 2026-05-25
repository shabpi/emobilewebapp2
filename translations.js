/* EMobility Egypt — Bilingual EN/AR Translation System
 * - Selector-based for nav/footer (consistent across all pages)
 * - data-i18n attribute for page-specific text
 * - localStorage persists user choice
 * - Toggles html[dir] and html[lang] for RTL
 */

(function() {

  // ===== TRANSLATIONS =====
  // Selector-based — applied to all pages automatically
  const selectorTranslations = {
    // Logo subtitle is the same; logo letter "E" prefix stays
    // Nav links
    '.nav-links li:nth-child(1) a[data-page="index"]': { en: 'HOME', ar: 'الرئيسية' },
    '.nav-links li:nth-child(2) a[data-page="about"]': { en: 'ABOUT US', ar: 'من نحن' },
    '.nav-links li:nth-child(3) a[data-page="solutions"]': { en: 'SOLUTIONS', ar: 'الحلول' },
    '.nav-links li:nth-child(4) a[data-page="industries"]': { en: 'INDUSTRIES', ar: 'القطاعات' },
    '.nav-links li:nth-child(5) a[data-page="projects"]': { en: 'PROJECTS', ar: 'المشاريع' },
    '.nav-links li:nth-child(6) a[data-page="partners"]': { en: 'PARTNERS', ar: 'الشركاء' },
    '.nav-links li:nth-child(7) a[data-page="news"]': { en: 'NEWS &amp; INSIGHTS', ar: 'الأخبار والرؤى' },
    '.nav-links li:nth-child(8) a[data-page="careers"]': { en: 'CAREERS', ar: 'الوظائف' },
    '.nav-links li:nth-child(9) a[data-page="contact"]': { en: 'CONTACT US', ar: 'تواصل معنا' },

    // Footer
    '.footer-brand p': {
      en: 'We provide integrated engineering solutions spanning Consulting, Engineering, Design, Supply, Testing, Commissioning, aftersales operation and services, energy management system, and backend SW & MobileApp.',
      ar: 'نقدّم حلولاً هندسية متكاملة تشمل الاستشارات، الهندسة، التصميم، التوريد، الاختبار، التشغيل، خدمات ما بعد البيع، نظام إدارة الطاقة، والبرمجيات وتطبيقات الهاتف.'
    },
    '.footer-grid > .footer-col:nth-child(2) h4': { en: 'Links', ar: 'روابط' },
    '.footer-grid > .footer-col:nth-child(2) ul li:nth-child(1) a': { en: 'About', ar: 'من نحن' },
    '.footer-grid > .footer-col:nth-child(2) ul li:nth-child(2) a': { en: 'Solutions', ar: 'الحلول' },
    '.footer-grid > .footer-col:nth-child(2) ul li:nth-child(3) a': { en: 'Projects', ar: 'المشاريع' },
    '.footer-grid > .footer-col:nth-child(2) ul li:nth-child(4) a': { en: 'News & Insights', ar: 'الأخبار والرؤى' },
    '.footer-grid > .footer-col:nth-child(2) ul li:nth-child(5) a': { en: 'Careers', ar: 'الوظائف' },
    '.footer-grid > .footer-col:nth-child(3) h4': { en: 'Contact us', ar: 'تواصل معنا' },
    '.footer-grid > .footer-col:nth-child(4) h4': { en: 'Location', ar: 'الموقع' },
    '.email-text': { en: 'Email', ar: 'البريد الإلكتروني' },
    '.footer-bottom': {
      en: 'All Rights Reserved 2026 · EMobility Egypt for Technology',
      ar: 'جميع الحقوق محفوظة 2026 · إي موبيليتي مصر للتكنولوجيا'
    }
  };

  // Key-based — use data-i18n="key" on HTML elements
  const keyTranslations = {
    // === Hero — Homepage ===
    'home.eyebrow': {
      en: 'POWERING SMART INFRASTRUCTURE &amp; SUSTAINABLE MOBILITY',
      ar: 'نُشغّل البنية التحتية الذكية والتنقل المستدام'
    },
    'home.title': {
      en: 'We Are<br/>EMobility Egypt',
      ar: ' نحن<br/>موبيليتي مصر'
    },
    'home.subtitle': {
      en: 'EV Charging · Industrial Automation · Smart Power Systems',
      ar: 'شحن السيارات الكهربائية · الأتمتة الصناعية · أنظمة الطاقة الذكية'
    },
    'cta.exploreSolutions': { en: 'Explore Solutions', ar: 'استكشف الحلول' },
    'cta.contactUs': { en: 'Contact Us', ar: 'تواصل معنا' },
    'cta.contactUs.lower': { en: 'Contact us', ar: 'تواصل معنا' },
    'cta.readMore': { en: 'Read more', ar: 'اقرأ المزيد' },
    'cta.readMoreCap': { en: 'Read More', ar: 'اقرأ المزيد' },
    'cta.details': { en: 'Details', ar: 'التفاصيل' },
    'cta.discoverMore': { en: 'Discover more', ar: 'اكتشف المزيد' },
    'cta.requestDeck': { en: 'Request capabilities deck', ar: 'اطلب عرض القدرات' },
    'cta.requestProposal': { en: 'Request a proposal', ar: 'اطلب عرض سعر' },
    'cta.requestCaseStudies': { en: 'Request case studies', ar: 'اطلب دراسات الحالة' },
    'cta.subscribe': { en: 'Subscribe', ar: 'اشترك' },
    'cta.startConversation': { en: 'Start a conversation', ar: 'ابدأ محادثة' },
    'cta.getInTouch': { en: 'Get in touch', ar: 'تواصل معنا' },
    'cta.joinUsToday': { en: 'Join us today', ar: 'انضم إلينا اليوم' },
    'cta.seePositions': { en: 'See open positions', ar: 'الوظائف المتاحة' },
    'cta.submitCV': { en: 'Submit CV', ar: 'أرسل سيرتك الذاتية' },
    'cta.apply': { en: 'Apply', ar: 'قدّم الآن' },
    'cta.readArticle': { en: 'Read article', ar: 'اقرأ المقال' },
    'cta.backToNews': { en: '← Back to News &amp; Insights', ar: '→ العودة إلى الأخبار والرؤى' },

    // Section eyebrows
    'eyebrow.whoWeAre': { en: 'WHO WE ARE', ar: 'من نحن' },
    'eyebrow.ourPortfolio': { en: 'OUR PORTFOLIO', ar: 'أعمالنا' },
    'eyebrow.ourProjects': { en: 'OUR PROJECTS', ar: 'مشاريعنا' },
    'eyebrow.ourPartners': { en: 'OUR PARTNERS', ar: 'شركاؤنا' },
    'eyebrow.ourSolutions': { en: 'OUR SOLUTIONS', ar: 'حلولنا' },
    'eyebrow.industries': { en: 'INDUSTRIES SERVED', ar: 'القطاعات التي نخدمها' },
    'eyebrow.partners': { en: 'TECHNOLOGY PARTNERS', ar: 'الشركاء التقنيون' },
    'eyebrow.backend': { en: 'BACKEND SOFTWARE', ar: 'البرمجيات الخلفية' },
    'eyebrow.about': { en: 'ABOUT US', ar: 'من نحن' },
    'eyebrow.visionMission': { en: 'VISION &amp; MISSION', ar: 'الرؤية والرسالة' },
    'eyebrow.lifecycle': { en: 'PROJECT LIFECYCLE', ar: 'دورة حياة المشروع' },
    'eyebrow.whyEmobility': { en: 'WHY EMOBILITY', ar: 'لماذا إي موبيليتي' },
    'eyebrow.openPositions': { en: 'OPEN POSITIONS', ar: 'الوظائف المتاحة' },
    'eyebrow.contact': { en: 'CONTACT', ar: 'تواصل' },
    'eyebrow.news': { en: 'NEWS &amp; INSIGHTS', ar: 'الأخبار والرؤى' },
    'eyebrow.featured': { en: 'FEATURED', ar: 'مميز' },
    'eyebrow.partnership': { en: 'PARTNERSHIP MODEL', ar: 'نموذج الشراكة' },
    'eyebrow.coreTech': { en: 'CORE TECHNOLOGY PARTNERS', ar: 'الشركاء التقنيون الأساسيون' },
    'eyebrow.careers': { en: 'CAREERS', ar: 'الوظائف' },

    // Homepage stats card 1 (green)
    'home.stats.greenText': {
      en: 'Since 2014, our fulfilling journey has been defined by dedicated engineering, leading to the successful completion of',
      ar: 'منذ عام 2014، تميّزت رحلتنا بهندسة متفانية أدّت إلى إنجاز ناجح لـ'
    },
    'home.stats.greenLabel': { en: 'Projects across MENA', ar: 'مشروع عبر منطقة الشرق الأوسط وشمال إفريقيا' },
    'home.stats.q1': {
      en: '"At EMobility Egypt, we engineer the smart infrastructure that drives the region\'s energy transition — from EV charging to SCADA, from power to mobility."',
      ar: '"في إي موبيليتي مصر، نهندس البنية التحتية الذكية التي تقود تحوّل الطاقة في المنطقة — من شحن السيارات الكهربائية إلى أنظمة SCADA، ومن الطاقة إلى التنقل."'
    },
    'home.stats.q2': {
      en: 'Whether you\'re scaling EV charging infrastructure or modernizing a SCADA platform, our engineering teams deliver end-to-end.',
      ar: 'سواء كنت توسّع البنية التحتية لشحن السيارات الكهربائية أو تحدّث منصة SCADA، تقدّم فرقنا الهندسية حلولاً شاملة من البداية إلى النهاية.'
    },
    'home.stats.q3': {
      en: 'From the Suez Canal to the Red Sea, from Cairo to the GCC — we engineer where the region needs it most.',
      ar: 'من قناة السويس إلى البحر الأحمر، ومن القاهرة إلى دول الخليج — نهندس حيث تحتاج المنطقة إلينا أكثر.'
    },

    // Homepage about block
    'home.about.title': { en: 'We Are EMobility Egypt', ar: 'نحن إي موبيليتي مصر' },
    'home.about.p1': {
      en: 'Welcome to EMobility Egypt for Technology — your trusted partner for integrated engineering solutions across electric mobility, industrial automation, and smart infrastructure. We\'re passionate about driving the region\'s transition to sustainable, digitally-enabled industry.',
      ar: 'مرحبًا بكم في إي موبيليتي مصر للتكنولوجيا — شريككم الموثوق للحلول الهندسية المتكاملة في مجالات التنقل الكهربائي والأتمتة الصناعية والبنية التحتية الذكية. نحن شغوفون بقيادة تحوّل المنطقة نحو صناعة مستدامة ومُمكّنة رقميًا.'
    },
    'home.about.p2': {
      en: 'Whether you\'re rolling out an EV charging network, modernizing a SCADA platform, or planning a critical-power upgrade, we provide full turnkey engineering — spanning consulting, design, supply, testing, commissioning, aftersales operation and services, energy management, and backend software platforms.',
      ar: 'سواء كنتم تطلقون شبكة لشحن السيارات الكهربائية، أو تحدّثون منصة SCADA، أو تخطّطون لترقية الطاقة الحرجة، فإننا نقدّم هندسة متكاملة شاملة — من الاستشارات والتصميم والتوريد والاختبار والتشغيل، إلى خدمات ما بعد البيع، وإدارة الطاقة، ومنصات البرمجيات الخلفية.'
    },

    // Homepage portfolio
    'home.portfolio.title': {
      en: 'End-to-end portfolio for smart energy &amp; mobility infrastructure',
      ar: 'محفظة متكاملة للبنية التحتية الذكية للطاقة والتنقل'
    },
    'home.portfolio.subtitle': {
      en: 'Design, Engineering, Supply, Installation, Testing, Commissioning, Training, Aftersales Services, Energy Management, Backend Software. You name it, we engineer it.',
      ar: 'التصميم، الهندسة، التوريد، التركيب، الاختبار، التشغيل، التدريب، خدمات ما بعد البيع، إدارة الطاقة، البرمجيات الخلفية. اذكره ونحن نهندسه.'
    },
    'home.portfolio.ev.title': { en: 'EV Charging Infrastructure', ar: 'البنية التحتية لشحن السيارات الكهربائية' },
    'home.portfolio.ev.desc': {
      en: 'AC, DC fast and ultra-fast charging systems for fleets, public networks, and commercial sites — with full OCPP, load management, and energy monitoring integration.',
      ar: 'أنظمة الشحن المتردد والمستمر السريع والفائق السرعة للأساطيل والشبكات العامة والمواقع التجارية — مع تكامل كامل مع OCPP وإدارة الأحمال ومراقبة الطاقة.'
    },
    'home.portfolio.scada.title': { en: 'Industrial Automation &amp; SCADA', ar: 'الأتمتة الصناعية و SCADA' },
    'home.portfolio.scada.desc': {
      en: 'End-to-end PLC, HMI, SCADA, and RTU systems with Industrial IoT integration — for utilities, manufacturing, and water/wastewater operations.',
      ar: 'أنظمة PLC و HMI و SCADA و RTU شاملة مع تكامل إنترنت الأشياء الصناعي — للمرافق والتصنيع وعمليات المياه والصرف الصحي.'
    },
    'home.portfolio.power.title': { en: 'Smart Power &amp; Critical Systems', ar: 'الطاقة الذكية والأنظمة الحرجة' },
    'home.portfolio.power.desc': {
      en: 'MV/LV switchgear, smart RMU, UPS, energy storage, and redundant backup architectures for utilities, data centers, and critical facilities.',
      ar: 'مفاتيح الجهد المتوسط والمنخفض، RMU الذكية، UPS، تخزين الطاقة، وهياكل النسخ الاحتياطي المتكررة للمرافق ومراكز البيانات والمنشآت الحرجة.'
    },

    // Homepage stats circles
    'home.stats.engineering': { en: 'Engineering at scale across the region', ar: 'هندسة على نطاق واسع عبر المنطقة' },
    'stats.projectsDesc': { en: 'Projects executed across MENA', ar: 'مشروع تم تنفيذه عبر منطقة الشرق الأوسط وشمال إفريقيا' },
    'stats.turnkeyDesc': { en: 'Turnkey projects (supply, installation, test, commissioning)', ar: 'مشاريع متكاملة (توريد، تركيب، اختبار، تشغيل)' },
    'stats.uptimeDesc': { en: 'Platform uptime guarantee', ar: 'ضمان وقت تشغيل المنصة' },
    'stats.slaDesc': { en: 'Service requests fulfilled within 24 hours per SLA', ar: 'طلبات الخدمة المنجزة خلال 24 ساعة وفقًا لاتفاقية مستوى الخدمة' },
    'stats.slaShort': { en: 'Service requests within 24h SLA', ar: 'طلبات الخدمة خلال 24 ساعة' },

    'home.projects.title': { en: 'Projects Profile', ar: 'ملف المشاريع' },

    // Discover banner
    'home.discover.title': {
      en: 'Discover more than 240 referenced engineering projects',
      ar: 'اكتشف أكثر من 240 مشروعًا هندسيًا مرجعيًا'
    },

    // Backend software
    'home.backend.title': { en: 'Our Management Software', ar: 'برنامج الإدارة لدينا' },
    'home.backend.desc': {
      en: 'We provide Charging Point Management Software for real-time performance monitoring, monetization, and payments. Plus a Mobile App for clients to locate and book charging points — and SCADA dashboards for industrial assets, all built on the same engineering stack.',
      ar: 'نوفّر برنامج إدارة نقاط الشحن لمراقبة الأداء في الوقت الفعلي والتحقيق المالي والمدفوعات. بالإضافة إلى تطبيق جوّال للعملاء لتحديد ومواعدة نقاط الشحن — ولوحات معلومات SCADA للأصول الصناعية، كلّها مبنية على نفس البنية الهندسية.'
    },

    // Industries section
    'home.industries.title': { en: 'Trusted across the sectors that keep the region running', ar: 'موثوق به عبر القطاعات التي تُحرّك المنطقة' },
    'industry.utilities': { en: 'Utilities &amp; Electrical', ar: 'المرافق والكهرباء' },
    'industry.smartCities': { en: 'Smart Cities', ar: 'المدن الذكية' },
    'industry.transport': { en: 'Transportation', ar: 'النقل' },
    'industry.water': { en: 'Water &amp; Wastewater', ar: 'المياه والصرف الصحي' },
    'industry.oil': { en: 'Oil &amp; Gas', ar: 'النفط والغاز' },
    'industry.manufacturing': { en: 'Manufacturing', ar: 'التصنيع' },
    'industry.healthcare': { en: 'Healthcare', ar: 'الرعاية الصحية' },
    'industry.dataCenters': { en: 'Data Centers', ar: 'مراكز البيانات' },
    'industry.renewable': { en: 'Renewable Energy', ar: 'الطاقة المتجددة' },

    // Partners section
    'home.partners.title': { en: 'Engineered with industry-leading partners', ar: 'مهندس مع شركاء رائدين في الصناعة' },

    // CTA banner
    'home.cta.title': {
      en: 'We\'ve started our journey to make the region\'s infrastructure smarter, safer, and more sustainable',
      ar: 'بدأنا رحلتنا لجعل البنية التحتية في المنطقة أكثر ذكاءً وأمانًا واستدامة'
    },

    // Contact section
    'home.contactPrompt.title': {
      en: 'Should you need any assistance, Our team is here for you',
      ar: 'إذا احتجت إلى أي مساعدة، فإن فريقنا في خدمتك'
    },
    'form.title': { en: "Let's discuss your requirements", ar: 'دعنا نناقش متطلباتك' },
    'form.name': { en: 'Name', ar: 'الاسم' },
    'form.company': { en: 'Company', ar: 'الشركة' },
    'form.phone': { en: 'Phone', ar: 'الهاتف' },
    'form.email': { en: 'Email', ar: 'البريد الإلكتروني' },
    'form.message': { en: 'Message', ar: 'الرسالة' },
    'form.solutionArea': { en: 'Solution area', ar: 'مجال الحل' },
    'form.send': { en: 'Send', ar: 'إرسال' },

    // === ABOUT PAGE ===
    'about.hero.title': {
      en: 'Specialized engineering for the region\'s most critical infrastructure',
      ar: 'هندسة متخصصة لأهم البنى التحتية الحرجة في المنطقة'
    },
    'about.hero.subtitle': {
      en: 'EMobility Egypt for Technology combines deep engineering expertise with advanced digital platforms — across EV mobility, industrial automation, smart power, and critical infrastructure.',
      ar: 'تجمع إي موبيليتي مصر للتكنولوجيا بين الخبرة الهندسية العميقة والمنصات الرقمية المتقدمة — في مجالات التنقل الكهربائي والأتمتة الصناعية والطاقة الذكية والبنية التحتية الحرجة.'
    },
    'about.title': { en: 'An engineering company. Not a reseller.', ar: 'شركة هندسية. لسنا مجرّد موزّعين.' },
    'about.lifecycle.title': { en: 'From engineering to long-term operation — end-to-end', ar: 'من الهندسة إلى التشغيل طويل الأمد — حلول متكاملة' },
    'about.cta.title': { en: 'Engineering is the difference. Talk to our team.', ar: 'الهندسة هي الفرق. تحدّث مع فريقنا.' },

    // === SOLUTIONS PAGE ===
    'solutions.hero.title': {
      en: 'Integrated solutions across power, automation, and mobility',
      ar: 'حلول متكاملة في الطاقة والأتمتة والتنقل'
    },
    'solutions.hero.subtitle': {
      en: 'Six core areas — engineered, integrated, commissioned, and supported in-house, end-to-end.',
      ar: 'ستة مجالات أساسية — مُهندسة ومتكاملة ومُشغّلة ومدعومة داخليًا، من البداية إلى النهاية.'
    },
    'solutions.cta.title': { en: 'Have a specific solution in mind? Let\'s scope it together.', ar: 'لديك حل محدّد في ذهنك؟ دعنا نحدّد نطاقه معًا.' },

    // === INDUSTRIES PAGE ===
    'industries.hero.title': {
      en: 'Mission-critical engineering for the sectors that matter',
      ar: 'هندسة حرجة للقطاعات التي تهمّ'
    },
    'industries.hero.subtitle': {
      en: 'From utilities to oil &amp; gas, smart cities to healthcare — we deliver where reliability, safety, and uptime are non-negotiable.',
      ar: 'من المرافق إلى النفط والغاز، ومن المدن الذكية إلى الرعاية الصحية — نقدّم حيث الموثوقية والأمان ووقت التشغيل غير قابلة للتفاوض.'
    },
    'industries.cta.title': { en: 'Don\'t see your sector? We\'ve probably engineered something similar.', ar: 'لا ترى قطاعك؟ على الأرجح أننا هندسنا شيئًا مشابهًا.' },

    // === PROJECTS PAGE ===
    'projects.hero.title': {
      en: 'Engineering delivered — across MENA\'s most demanding sectors',
      ar: 'هندسة منفّذة — عبر أكثر قطاعات منطقة الشرق الأوسط وشمال إفريقيا تطلّبًا'
    },
    'projects.hero.subtitle': {
      en: 'A selection of recent deployments across EV mobility, automation, electrical distribution, and critical power.',
      ar: 'مجموعة مختارة من التطبيقات الحديثة في مجالات التنقل الكهربائي والأتمتة والتوزيع الكهربائي والطاقة الحرجة.'
    },
    'projects.cta.title': { en: 'Want references from a specific sector?', ar: 'هل تريد مراجع من قطاع محدّد؟' },

    // === PARTNERS PAGE ===
    'partners.hero.title': {
      en: 'Engineered with the world\'s leading industrial platforms',
      ar: 'مهندس مع منصات الصناعة الرائدة عالميًا'
    },
    'partners.hero.subtitle': {
      en: 'Certified integrators of the world\'s most trusted automation, power, and digital infrastructure technologies.',
      ar: 'مكاملون معتمدون لأكثر تقنيات الأتمتة والطاقة والبنية التحتية الرقمية موثوقية في العالم.'
    },
    'partners.title': { en: 'Multi-vendor engineering, one delivery team', ar: 'هندسة متعدّدة الموردين، فريق توصيل واحد' },
    'partners.cta.title': { en: 'Looking to partner with us? We\'re always open to new technology relationships.', ar: 'تبحث عن شراكة معنا؟ نحن منفتحون دائمًا لعلاقات تقنية جديدة.' },

    // === NEWS PAGE ===
    'news.hero.title': { en: 'Engineering perspectives &amp; company updates', ar: 'وجهات نظر هندسية وتحديثات الشركة' },
    'news.hero.subtitle': {
      en: 'Technical insights, industry analysis, and project announcements from the EMobility engineering team.',
      ar: 'رؤى تقنية، تحليلات صناعية، وإعلانات مشاريع من فريق هندسة إي موبيليتي.'
    },
    'news.featured.title': { en: 'Latest from the engineering team', ar: 'أحدث من فريق الهندسة' },
    'news.cta.title': { en: 'Want updates from our engineering team?', ar: 'تريد تحديثات من فريقنا الهندسي؟' },

    // === CAREERS PAGE ===
    'careers.hero.title': { en: 'Build the systems the region runs on', ar: 'ابنِ الأنظمة التي تُشغّل المنطقة' },
    'careers.hero.subtitle': {
      en: 'Engineering careers at EMobility Egypt — for engineers who\'d rather commission a substation than write a deck about one.',
      ar: 'وظائف هندسية في إي موبيليتي مصر — للمهندسين الذين يفضّلون تشغيل محطة فرعية على كتابة عرض تقديمي عنها.'
    },
    'careers.title': { en: 'Real engineering. Real projects.', ar: 'هندسة حقيقية. مشاريع حقيقية.' },
    'careers.openTitle': { en: 'We\'re hiring across engineering disciplines', ar: 'نوظّف عبر التخصصات الهندسية' },
    'careers.cta.title': { en: 'Don\'t see the right role? Send us your CV anyway.', ar: 'لا ترى الدور المناسب؟ أرسل سيرتك الذاتية على أي حال.' },

    // === CONTACT PAGE ===
    'contact.hero.title': { en: 'Talk to an engineer', ar: 'تحدّث مع مهندس' },
    'contact.hero.subtitle': {
      en: 'Every inquiry is reviewed by one of our chartered engineers within 24 hours.',
      ar: 'يتم مراجعة كل استفسار من قِبل أحد مهندسينا المعتمدين خلال 24 ساعة.'
    },
    'contact.headOffice': { en: 'HEAD OFFICE', ar: 'المكتب الرئيسي' },
    'contact.address': { en: 'New Cairo Business District<br/>Cairo, Egypt', ar: 'حي الأعمال في القاهرة الجديدة<br/>القاهرة، مصر' },
    'contact.emailLabel': { en: 'EMAIL', ar: 'البريد الإلكتروني' },
    'contact.phoneLabel': { en: 'PHONE', ar: 'الهاتف' },
    'contact.certsLabel': { en: 'CERTIFICATIONS', ar: 'الشهادات' },

    // Article common UI
    'article.share': { en: 'Share', ar: 'شارك' },
    'article.author': { en: 'Author', ar: 'الكاتب' },
    'article.related': { en: 'Related insights', ar: 'رؤى ذات صلة' },
    'article.cta.title': { en: 'Want engineering insights in your inbox?', ar: 'تريد رؤى هندسية في صندوق بريدك؟' },

    // Lifecycle stages
    'lifecycle.s1': { en: 'Engineering &amp; Design', ar: 'الهندسة والتصميم' },
    'lifecycle.s2': { en: 'System Integration', ar: 'تكامل الأنظمة' },
    'lifecycle.s3': { en: 'Supply &amp; Manufacturing', ar: 'التوريد والتصنيع' },
    'lifecycle.s4': { en: 'Installation', ar: 'التركيب' },
    'lifecycle.s5': { en: 'Testing &amp; FAT/SAT', ar: 'الاختبار والـ FAT/SAT' },
    'lifecycle.s6': { en: 'Technical Support', ar: 'الدعم التقني' },
    'lifecycle.s7': { en: 'Operation &amp; Maintenance', ar: 'التشغيل والصيانة' },
    'lifecycle.s8': { en: 'Training', ar: 'التدريب' }
  };

  // ===== APPLY LANGUAGE =====
  function applyLanguage(lang) {
    const dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);

    // Selector-based replacements
    for (const sel in selectorTranslations) {
      const value = selectorTranslations[sel][lang];
      if (value === undefined) continue;
      document.querySelectorAll(sel).forEach(el => {
        el.innerHTML = value;
      });
    }

    // Key-based via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (keyTranslations[key] && keyTranslations[key][lang] !== undefined) {
        el.innerHTML = keyTranslations[key][lang];
      }
    });

    // Placeholders via data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (keyTranslations[key] && keyTranslations[key][lang] !== undefined) {
        el.setAttribute('placeholder', keyTranslations[key][lang]);
      }
    });

    // Update lang toggle active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Save preference
    try { localStorage.setItem('emobility-lang', lang); } catch(e) {}
  }

  // ===== INIT =====
  // Get saved language or default to 'en'
  let lang = 'en';
  try {
    const saved = localStorage.getItem('emobility-lang');
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch(e) {}

  // Apply on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLanguage(lang));
  } else {
    applyLanguage(lang);
  }

  // Wire up language toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      e.preventDefault();
      applyLanguage(btn.dataset.lang);
    }
  });

  // Expose globally for debugging
  window.emobilityLang = { apply: applyLanguage };

})();
