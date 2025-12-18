"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LanguageCode = "en" | "hi" | "ar" | "ur" | "fr" | "es" | "te";

type HomeCopy = {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    bullets: string[];
  };
  bugCard: {
    label: string;
    title: string;
    description: string;
  };
  snapshotCard: {
    label: string;
    launches: string;
    projectsLabel: string;
    responseLabel: string;
    happyClientsLabel: string;
  };
  layoutCopy: {
    nav: {
      services: string;
      portfolio: string;
      about: string;
      contact: string;
    };
    footerIntro: string;
    footer: {
      servicesTitle: string;
      servicesItems: string[];
      companyTitle: string;
      companyItems: string[];
      contactTitle: string;
      contactItems: string[];
      copyright: string;
      privacy: string;
      terms: string;
    };
  };
  buildSection: {
    tag: string;
    title: string;
    description: string;
    tabs: {
      web: { name: string; title: string; description: string };
      devops: { name: string; title: string; description: string };
      support: { name: string; title: string; description: string };
    };
  };
  readySection: {
    tag: string;
    title: string;
    description: string;
    steps: string[];
    primaryCta: string;
    secondaryCta: string;
  };
};

type ServiceCardCopy = {
  title: string;
  description: string;
};

type ServicesCopy = {
  hero: {
    tag: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    tag: string;
    title: string;
    description: string;
    chip1: string;
    chip2: string;
    previewLabel: string;
    previewBadge: string;
  };
  servicesSection: {
    tag: string;
    title: string;
    description: string;
  };
  cards: ServiceCardCopy[];
  customNote: string;
  customCta: string;
  cardFooterNote: string;
  cardFooterCta: string;
};

type PortfolioTestimonial = {
  quote: string;
  name: string;
  role: string;
};

type PortfolioCopy = {
  hero: {
    tag: string;
    title: string;
    description: string;
  };
  highlight: {
    caption: string;
    badge: string;
    note: string;
  };
  testimonials: {
    tag: string;
    title: string;
    description: string;
    cardLabel: string;
    items: PortfolioTestimonial[];
  };
};

type AboutValueItem = {
  title: string;
  body: string;
};

type AboutMetric = {
  label: string;
  value: string;
};

type AboutCopy = {
  hero: {
    tag: string;
    title: string;
    description: string;
    chip1: string;
    chip2: string;
    videoCaption: string;
    videoBadge: string;
    videoNote: string;
  };
  collaboration: {
    tag: string;
    title: string;
    description: string;
    values: AboutValueItem[];
  };
  results: {
    tag: string;
    title: string;
    description: string;
    metrics: AboutMetric[];
    ctaText: string;
    ctaLabel: string;
  };
};

const SERVICES_COPY: Record<LanguageCode, ServicesCopy> = {
  en: {
    hero: {
      tag: "Services",
      title: "What we build for you",
      description:
        "Clean code, reliable systems, and solutions that scale. From landing pages to complex dashboards and infrastructure, every project gets the attention it deserves.",
      primaryCta: "Start a project",
      secondaryCta: "View portfolio",
    },
    overview: {
      tag: "Overview",
      title: "Code that works, built to last",
      description:
        "Custom web and software projects designed for performance, security, and long-term maintainability. From landing pages to complex systems, each build is tested, documented, and ready to grow with your business.",
      chip1: "Launch-ready deployments",
      chip2: "Performance and SEO included",
      previewLabel: "Service walkthrough preview",
      previewBadge: "Watch demo",
    },
    servicesSection: {
      tag: "Services",
      title: "Clean, scalable, and maintainable solutions",
      description:
        "Every build focuses on performance, reliability, and long-term maintainability—so your business can evolve without hitting technical limits.",
    },
    cards: [
      {
        title: "Website and software development",
        description:
          "Custom websites and apps built from the ground up, designed for performance and tailored to your goals.",
      },
      {
        title: "Server deployment and maintenance",
        description:
          "Secure, monitored, and well-documented deployments on Linux servers and modern cloud platforms.",
      },
      {
        title: "Website maintenance and support",
        description:
          "Regular updates, backups, monitoring, and optimization to keep your site fast, secure, and online.",
      },
    ],
    customNote:
      "Need something more custom? I also handle automation, dashboards, API integrations, and DevOps pipelines.",
    customCta: "Discuss your idea",
    cardFooterNote: "Custom scoped for every project",
    cardFooterCta: "Learn →",
  },
  hi: {
    hero: {
      tag: "सेवाएं",
      title: "आपके लिए मैं क्या बनाता हूँ",
      description:
        "स्वच्छ कोड, भरोसेमंद सिस्टम और ऐसे समाधान जो स्केल कर सकें। लैंडिंग पेज से लेकर जटिल डैशबोर्ड और इन्फ्रास्ट्रक्चर तक, हर प्रोजेक्ट को पूरा ध्यान मिलता है।",
      primaryCta: "प्रोजेक्ट शुरू करें",
      secondaryCta: "पोर्टफोलियो देखें",
    },
    overview: {
      tag: "ओवरव्यू",
      title: "कोड जो काम करे, और लंबे समय तक चले",
      description:
        "परफॉर्मेंस, सुरक्षा और लंबे समय तक मेंटेनेंस को ध्यान में रखकर बनाए गए कस्टम वेब और सॉफ्टवेयर प्रोजेक्ट्स। लैंडिंग पेज से लेकर जटिल सिस्टम तक, हर बिल्ड टेस्टेड, डॉक्यूमेंटेड और आपके बिज़नेस के साथ बढ़ने के लिए तैयार रहता है।",
      chip1: "लॉन्च-रेडी डिप्लॉयमेंट",
      chip2: "परफॉर्मेंस और SEO शामिल",
      previewLabel: "सर्विस वॉकथ्रू प्रीव्यू",
      previewBadge: "डेमो देखें",
    },
    servicesSection: {
      tag: "सेवाएं",
      title: "स्वच्छ, स्केलेबल और मेंटेन करने योग्य समाधान",
      description:
        "हर बिल्ड परफॉर्मेंस, भरोसेमंद व्यवहार और लंबे समय तक मेंटेनबिलिटी पर फोकस करता है ताकि आपका बिज़नेस बिना टेक्निकल लिमिट के बढ़ सके।",
    },
    cards: [
      {
        title: "वेबसाइट और सॉफ्टवेयर डेवलपमेंट",
        description:
          "परफॉर्मेंस के लिए डिज़ाइन किए गए और आपके गोल्स के अनुसार तैयार किए गए कस्टम वेबसाइट और ऐप्स।",
      },
      {
        title: "सर्वर डिप्लॉयमेंट और मेंटेनेंस",
        description:
          "Linux सर्वर और आधुनिक क्लाउड प्लेटफॉर्म पर सुरक्षित, मॉनिटर किए गए और अच्छी तरह डॉक्यूमेंटेड डिप्लॉयमेंट।",
      },
      {
        title: "वेबसाइट मेंटेनेंस और सपोर्ट",
        description:
          "नियमित अपडेट, बैकअप, मॉनिटरिंग और ऑप्टिमाइज़ेशन ताकि आपकी साइट तेज़, सुरक्षित और ऑनलाइन रहे।",
      },
    ],
    customNote:
      "कुछ और कस्टम चाहिए? मैं ऑटोमेशन, डैशबोर्ड, API इंटेग्रेशन और DevOps पाइपलाइन भी संभालता हूँ।",
    customCta: "अपना आइडिया शेयर करें",
    cardFooterNote: "हर प्रोजेक्ट के लिए कस्टम स्कोप",
    cardFooterCta: "और जानें →",
  },
  ar: {
    hero: {
      tag: "الخدمات",
      title: "ما أبنيه من أجلك",
      description:
        "كود نظيف، أنظمة موثوقة، وحلول قابلة للتوسع. من صفحات الهبوط إلى لوحات التحكم والبنية التحتية المعقدة، يحصل كل مشروع على الاهتمام الذي يستحقه.",
      primaryCta: "ابدأ مشروعًا",
      secondaryCta: "عرض الأعمال",
    },
    overview: {
      tag: "نظرة عامة",
      title: "كود يعمل ومصمم ليدوم",
      description:
        "مشاريع ويب وبرامج مخصصة مصممة للأداء والأمان وقابلية الصيانة طويلة الأمد. من صفحات الهبوط إلى الأنظمة المعقدة، يتم اختبار كل بناء وتوثيقه وتجهيزه للنمو مع عملك.",
      chip1: "نشر جاهز للإطلاق",
      chip2: "الأداء وتحسين محركات البحث مشمولان",
      previewLabel: "معاينة جولة الخدمة",
      previewBadge: "مشاهدة العرض",
    },
    servicesSection: {
      tag: "الخدمات",
      title: "حلول نظيفة، قابلة للتوسع وسهلة الصيانة",
      description:
        "يركز كل بناء على الأداء والموثوقية وقابلية الصيانة على المدى الطويل، حتى يتمكن عملك من التطور دون حدود تقنية.",
    },
    cards: [
      {
        title: "تطوير المواقع والبرمجيات",
        description:
          "مواقع وتطبيقات مخصصة تُبنى من الصفر، مصممة للأداء ومتكيفة مع أهدافك.",
      },
      {
        title: "نشر الخوادم والصيانة",
        description:
          "عمليات نشر آمنة، مراقبة وموثقة جيدًا على خوادم Linux ومنصات سحابية حديثة.",
      },
      {
        title: "صيانة المواقع والدعم",
        description:
          "تحديثات منتظمة، ونسخ احتياطية، ومراقبة وتحسينات للحفاظ على سرعة وأمان موقعك وبقائه متصلاً.",
      },
    ],
    customNote:
      "تحتاج إلى شيء أكثر تخصيصًا؟ أتعامل أيضًا مع الأتمتة ولوحات التحكم وتكاملات الـ API وخطوط DevOps.",
    customCta: "ناقش فكرتك",
    cardFooterNote: "نطاق مخصص لكل مشروع",
    cardFooterCta: "اعرف المزيد →",
  },
  ur: {
    hero: {
      tag: "سروسز",
      title: "میں آپ کے لیے کیا بناتا ہوں",
      description:
        "صاف کوڈ، قابلِ اعتماد سسٹمز اور ایسے حل جو اسکیل ہو سکیں۔ لینڈنگ پیجز سے لے کر پیچیدہ ڈیش بورڈز اور انفراسٹرکچر تک، ہر پروجیکٹ کو وہ توجہ ملتی ہے جس کا وہ حق دار ہے۔",
      primaryCta: "پروجیکٹ شروع کریں",
      secondaryCta: "پورٹ فولیو دیکھیں",
    },
    overview: {
      tag: "اوورویو",
      title: "کوڈ جو کام کرے، دیرپا رہنے کے لیے بنایا گیا",
      description:
        "کارکردگی، سیکیورٹی اور طویل مدتی مینٹیننس کے لیے ڈیزائن کیے گئے کسٹم ویب اور سافٹ ویئر پروجیکٹس۔ لینڈنگ پیجز سے پیچیدہ سسٹمز تک، ہر بلڈ ٹیسٹڈ، ڈاکومنٹڈ اور آپ کے بزنس کے ساتھ بڑھنے کے لیے تیار ہوتا ہے۔",
      chip1: "لانچ کے لیے تیار ڈپلائمنٹس",
      chip2: "پرفارمنس اور SEO شامل",
      previewLabel: "سروس واک تھرو پری ویو",
      previewBadge: "ڈیمو دیکھیں",
    },
    servicesSection: {
      tag: "سروسز",
      title: "صاف، اسکیل ایبل اور مینٹین ایبل سلوشنز",
      description:
        "ہر بلڈ کارکردگی، قابلِ اعتماد رویّہ اور طویل مدتی مینٹین ایبلٹی پر فوکس کرتا ہے تاکہ آپ کا بزنس ٹیکنیکل لِمٹس کے بغیر بڑھ سکے۔",
    },
    cards: [
      {
        title: "ویب سائٹ اور سافٹ ویئر ڈیولپمنٹ",
        description:
          "کسٹم ویب سائٹس اور ایپس جو زیرو سے بنائی جاتی ہیں، کارکردگی کے لیے ڈیزائن اور آپ کے اہداف کے مطابق۔",
      },
      {
        title: "سرور ڈپلائمنٹ اور مینٹیننس",
        description:
          "Linux سرورز اور جدید کلاؤڈ پلیٹ فارمز پر محفوظ، مانیٹرڈ اور اچھی طرح ڈاکومنٹڈ ڈپلائمنٹس۔",
      },
      {
        title: "ویب سائٹ مینٹیننس اور سپورٹ",
        description:
          "باقاعدہ اپ ڈیٹس، بیک اپس، مانیٹرنگ اور آپٹیمائزیشن تاکہ آپ کی سائٹ تیز، محفوظ اور آن لائن رہے۔",
      },
    ],
    customNote:
      "کچھ زیادہ کسٹم درکار ہے؟ میں آٹومیشن، ڈیش بورڈز، API انٹیگریشنز اور DevOps پائپ لائنز بھی ہینڈل کرتا ہوں۔",
    customCta: "اپنا آئیڈیا ڈسکس کریں",
    cardFooterNote: "ہر پروجیکٹ کے لیے کسٹم اسکوپ",
    cardFooterCta: "مزید جانیں →",
  },
  fr: {
    hero: {
      tag: "Services",
      title: "Ce que je construis pour vous",
      description:
        "Code propre, systèmes fiables et solutions qui passent à l'échelle. Des landing pages aux tableaux de bord et infrastructures complexes, chaque projet reçoit l'attention qu'il mérite.",
      primaryCta: "Lancer un projet",
      secondaryCta: "Voir le portfolio",
    },
    overview: {
      tag: "Aperçu",
      title: "Un code qui fonctionne, conçu pour durer",
      description:
        "Projets web et logiciels sur mesure pensés pour la performance, la sécurité et la maintenabilité long terme. Des pages d'atterrissage aux systèmes complexes, chaque livrable est testé, documenté et prêt à évoluer avec votre activité.",
      chip1: "Déploiements prêts pour la mise en ligne",
      chip2: "Performance et SEO inclus",
      previewLabel: "Aperçu du parcours de service",
      previewBadge: "Voir la démo",
    },
    servicesSection: {
      tag: "Services",
      title: "Des solutions propres, évolutives et maintenables",
      description:
        "Chaque réalisation met l'accent sur la performance, la fiabilité et la maintenabilité à long terme, pour que votre activité puisse évoluer sans blocage technique.",
    },
    cards: [
      {
        title: "Développement de sites web et logiciels",
        description:
          "Sites et applications sur mesure, conçus de zéro pour la performance et alignés sur vos objectifs.",
      },
      {
        title: "Déploiement de serveurs et maintenance",
        description:
          "Déploiements sécurisés, surveillés et bien documentés sur des serveurs Linux et des plateformes cloud modernes.",
      },
      {
        title: "Maintenance et support de sites web",
        description:
          "Mises à jour régulières, sauvegardes, surveillance et optimisation pour garder votre site rapide, sécurisé et en ligne.",
      },
    ],
    customNote:
      "Un besoin plus spécifique ? Je gère aussi l'automatisation, les tableaux de bord, les intégrations API et les pipelines DevOps.",
    customCta: "Discuter de votre idée",
    cardFooterNote: "Portée adaptée à chaque projet",
    cardFooterCta: "En savoir plus →",
  },
  es: {
    hero: {
      tag: "Servicios",
      title: "Lo que construyo para ti",
      description:
        "Código limpio, sistemas fiables y soluciones que escalan. Desde landing pages hasta paneles e infraestructuras complejas, cada proyecto recibe la atención que merece.",
      primaryCta: "Iniciar un proyecto",
      secondaryCta: "Ver portafolio",
    },
    overview: {
      tag: "Resumen",
      title: "Código que funciona, creado para durar",
      description:
        "Proyectos web y de software a medida diseñados para el rendimiento, la seguridad y el mantenimiento a largo plazo. Desde páginas de destino hasta sistemas complejos, cada entrega se prueba, se documenta y está lista para crecer con tu negocio.",
      chip1: "Despliegues listos para producción",
      chip2: "Rendimiento y SEO incluidos",
      previewLabel: "Vista previa del servicio",
      previewBadge: "Ver demo",
    },
    servicesSection: {
      tag: "Servicios",
      title: "Soluciones limpias, escalables y mantenibles",
      description:
        "Cada desarrollo se centra en el rendimiento, la fiabilidad y el mantenimiento a largo plazo, para que tu negocio pueda evolucionar sin límites técnicos.",
    },
    cards: [
      {
        title: "Desarrollo de sitios web y software",
        description:
          "Sitios web y aplicaciones a medida construidos desde cero, diseñados para el rendimiento y adaptados a tus objetivos.",
      },
      {
        title: "Despliegue y mantenimiento de servidores",
        description:
          "Despliegues seguros, monitorizados y bien documentados en servidores Linux y plataformas cloud modernas.",
      },
      {
        title: "Mantenimiento y soporte de sitios web",
        description:
          "Actualizaciones periódicas, copias de seguridad, monitorización y optimización para mantener tu sitio rápido, seguro y en línea.",
      },
    ],
    customNote:
      "¿Necesitas algo más personalizado? También trabajo con automatización, paneles, integraciones API y pipelines de DevOps.",
    customCta: "Hablar de tu idea",
    cardFooterNote: "Alcance adaptado a cada proyecto",
    cardFooterCta: "Saber más →",
  },
  te: {
    hero: {
      tag: "సర్వీసులు",
      title: "మీ కోసం నేను ఏమి నిర్మిస్తాను",
      description:
        "శుభ్రమైన కోడ్, నమ్మకమైన సిస్టమ్‌లు మరియు స్కేల్ అయ్యే సొల్యూషన్‌లు. ల్యాండింగ్ పేజీల నుండి సంక్లిష్ట డాష్బోర్డ్‌లు మరియు మౌలిక సదుపాయాల వరకు, ప్రతి ప్రాజెక్ట్‌కు కావాల్సిన శ్రద్ధ లభిస్తుంది.",
      primaryCta: "ప్రాజెక్ట్ ప్రారంభించండి",
      secondaryCta: "పోర్ట్ఫోలియో చూడండి",
    },
    overview: {
      tag: "ఓవర్వ్యూ",
      title: "పని చేసే కోడ్, మన్నిక కోసం నిర్మించబడింది",
      description:
        "పనితీరు, భద్రత మరియు దీర్ఘకాలిక నిర్వహణను దృష్టిలో పెట్టుకుని రూపొందించిన కస్టమ్ వెబ్ మరియు సాఫ్ట్‌వేర్ ప్రాజెక్ట్‌లు. ల్యాండింగ్ పేజీల నుండి క్లిష్టమైన సిస్టమ్‌ల వరకు, ప్రతి బిల్డ్ టెస్ట్ చేయబడి, డాక్యుమెంట్ చేయబడి, మీ వ్యాపారంతో కలిసి పెరుగడానికి సిద్ధంగా ఉంటుంది.",
      chip1: "లాంచ్‌కు సిద్ధమైన డిప్లాయ్‌మెంట్‌లు",
      chip2: "పనితీరు మరియు SEO కలుపుకొని",
      previewLabel: "సర్వీస్ వాక్థ్రూ ప్రివ్యూ",
      previewBadge: "డెమో చూడండి",
    },
    servicesSection: {
      tag: "సర్వీసులు",
      title: "శుభ్రమైన, స్కేలబుల్ మరియు నిర్వహించదగిన సొల్యూషన్‌లు",
      description:
        "ప్రతి బిల్డ్ పనితీరు, నమ్మకత్వం మరియు దీర్ఘకాలిక మెయింటెనబిలిటీపై దృష్టి పెడుతుంది, తద్వారా మీ వ్యాపారం టెక్నికల్ పరిమితులు లేకుండా ఎదగగలదు.",
    },
    cards: [
      {
        title: "వెబ్‌సైట్ మరియు సాఫ్ట్‌వేర్ డెవలప్‌మెంట్",
        description:
          "నుండి నిర్మించిన కస్టమ్ వెబ్‌సైట్‌లు మరియు యాప్‌లు, పనితీరు కోసం డిజైన్ చేయబడి, మీ లక్ష్యాలకు అనుగుణంగా రూపొందించబడుతాయి.",
      },
      {
        title: "సర్వర్ డిప్లాయ్‌మెంట్ మరియు మెయింటెనెన్స్",
        description:
          "Linux సర్వర్‌లు మరియు ఆధునిక క్లౌడ్ ప్లాట్‌ఫారమ్‌లపై సురక్షిత, మానిటర్ చేయబడిన మరియు బాగా డాక్యుమెంట్ చేయబడిన డిప్లాయ్‌మెంట్‌లు.",
      },
      {
        title: "వెబ్‌సైట్ మెయింటెనెన్స్ మరియు సపోర్ట్",
        description:
          "నియమిత అప్‌డేట్‌లు, బ్యాకప్‌లు, మానిటరింగ్ మరియు ఆప్టిమైజేషన్, మీ సైట్ వేగంగా, సురక్షితంగా మరియు ఆన్‌లైన్‌లో ఉండేలా చేస్తాయి.",
      },
    ],
    customNote:
      "ఇంకా ప్రత్యేకమైన అవసరం ఉందా? నేను ఆటోమేషన్, డాష్బోర్డ్‌లు, API ఇంటిగ్రేషన్‌లు మరియు DevOps పైప్లైన్‌లను కూడా చూసుకుంటాను.",
    customCta: "మీ ఆలోచనను చర్చించండి",
    cardFooterNote: "ప్రతి ప్రాజెక్ట్‌కు కస్టమ్ స్కోప్",
    cardFooterCta: "మరింత తెలుసుకోండి →",
  },
};

const PORTFOLIO_COPY: Record<LanguageCode, PortfolioCopy> = {
  en: {
    hero: {
      tag: "Work samples",
      title: "Selected projects and live demos",
      description:
        "Interactive dashboards, business websites, automation tools, and more. Each project is built for long-term reliability and performance.",
    },
    highlight: {
      caption: "Highlight reel – dashboards, animations, and live systems",
      badge: "Play showcase",
      note: "Swap this with a video or embedded playlist that shows your favorite projects in action.",
    },
    testimonials: {
      tag: "Client voices",
      title: "What people say after working with me",
      description:
        "Consistent communication, stable releases, and systems that stay online even as your business grows.",
      cardLabel: "Client feedback",
      items: [
        {
          quote:
            "He delivered exactly what we needed, on time and without the usual complications.",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "Our site runs better now. The maintenance work was solid and the communication was clear.",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "Fixed the bug fast and didn't charge us until it actually worked. That's integrity.",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
  hi: {
    hero: {
      tag: "काम के सैंपल",
      title: "चुने हुए प्रोजेक्ट और लाइव डेमो",
      description:
        "इंटरैक्टिव डैशबोर्ड, बिजनेस वेबसाइट, ऑटोमेशन टूल्स और बहुत कुछ। हर प्रोजेक्ट लंबे समय तक भरोसेमंद परफॉर्मेंस के लिए बनाया गया है।",
    },
    highlight: {
      caption: "हाइलाइट रील – डैशबोर्ड, ऐनिमेशन और लाइव सिस्टम",
      badge: "शोकेस चलाएं",
      note: "इसे ऐसे वीडियो या प्लेलिस्ट से बदलें जो आपके पसंदीदा प्रोजेक्ट्स को ऐक्शन में दिखाए।",
    },
    testimonials: {
      tag: "क्लाइंट की आवाज़",
      title: "लोग मेरे साथ काम करने के बाद क्या कहते हैं",
      description:
        "लगातार कम्युनिकेशन, स्थिर रिलीज़ और ऐसे सिस्टम जो आपके बिज़नेस के बढ़ने के बाद भी ऑनलाइन रहते हैं।",
      cardLabel: "क्लाइंट फ़ीडबैक",
      items: [
        {
          quote:
            "उन्होंने बिल्कुल वही डिलिवर किया जिसकी हमें ज़रूरत थी, समय पर और बिना किसी अतिरिक्त झंझट के।",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "हमारी साइट अब बेहतर चल रही है। मेंटेनेंस का काम मजबूत था और कम्युनिकेशन बिलकुल साफ था।",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "बग जल्दी फिक्स हुआ और जब तक सब सही न चला, तब तक चार्ज नहीं किया। यह है असली प्रोफेशनल ईमानदारी।",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
  ar: {
    hero: {
      tag: "عينات من الأعمال",
      title: "مشاريع مختارة وعروض مباشرة",
      description:
        "لوحات معلومات تفاعلية، مواقع تجارية، أدوات أتمتة والمزيد. كل مشروع مبني ليقدم موثوقية وأداء على المدى الطويل.",
    },
    highlight: {
      caption: "لقطات مميزة – لوحات تحكم، حركات، وأنظمة حية",
      badge: "تشغيل العرض",
      note: "استبدل هذا بفيديو أو قائمة تشغيل مدمجة تعرض مشاريعك المفضلة أثناء العمل.",
    },
    testimonials: {
      tag: "آراء العملاء",
      title: "ماذا يقول الناس بعد العمل معي",
      description:
        "تواصل مستمر، إصدارات مستقرة، وأنظمة تبقى تعمل حتى مع نمو عملك.",
      cardLabel: "رأي العميل",
      items: [
        {
          quote:
            "قدّم ما نحتاجه بالضبط، في الوقت المحدد وبدون التعقيدات المعتادة.",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "موقعنا يعمل بشكل أفضل الآن. أعمال الصيانة كانت قوية والتواصل كان واضحًا.",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "أصلح العطل بسرعة ولم يتقاضَ أجرًا حتى عمل كل شيء بشكل صحيح بالفعل. هذه أمانة مهنية.",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
  ur: {
    hero: {
      tag: "کام کی مثالیں",
      title: "منتخب پروجیکٹس اور لائیو ڈیموز",
      description:
        "انٹرایکٹو ڈیش بورڈز، بزنس ویب سائٹس، آٹومیشن ٹولز اور مزید۔ ہر پروجیکٹ طویل مدتی قابلِ اعتماد کارکردگی کے لیے بنایا گیا ہے۔",
    },
    highlight: {
      caption: "ہائلائٹ ریل – ڈیش بورڈز، اینیمیشنز اور لائیو سسٹمز",
      badge: "شوکیس چلائیں",
      note: "اس حصے کو ایسی ویڈیو یا ایمبیڈڈ پلے لسٹ سے تبدیل کیا جا سکتا ہے جو آپ کے پسندیدہ پروجیکٹس کو ایکشن میں دکھائے۔",
    },
    testimonials: {
      tag: "کلائنٹس کی آواز",
      title: "میرے ساتھ کام کرنے کے بعد لوگ کیا کہتے ہیں",
      description:
        "مسلسل رابطہ، مستحکم ریلیزز، اور ایسے سسٹمز جو آپ کے بزنس کے بڑھنے کے باوجود آن لائن رہتے ہیں۔",
      cardLabel: "کلائنٹ فیڈ بیک",
      items: [
        {
          quote:
            "انہوں نے وہی فراہم کیا جس کی ہمیں ضرورت تھی، وقت پر اور بغیر عام پیچیدگیوں کے۔",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "ہماری سائٹ اب بہتر چل رہی ہے۔ مینٹیننس کا کام مضبوط تھا اور رابطہ بالکل واضح رہا۔",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "بگ تیزی سے فکس ہوا اور جب تک سب ٹھیک سے نہ چلنے لگا، تب تک چارج نہیں کیا۔ یہ ہے اصل دیانت داری۔",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
  fr: {
    hero: {
      tag: "Exemples de travail",
      title: "Projets sélectionnés et démos en direct",
      description:
        "Tableaux de bord interactifs, sites vitrine, outils d'automatisation et plus encore. Chaque projet est conçu pour une fiabilité et des performances durables.",
    },
    highlight: {
      caption:
        "Bobine de temps forts – tableaux de bord, animations et systèmes en production",
      badge: "Lancer le showcase",
      note: "Remplacez cette zone par une vidéo ou une playlist intégrée qui montre vos projets favoris en action.",
    },
    testimonials: {
      tag: "Voix des clients",
      title: "Ce que les gens disent après avoir travaillé avec moi",
      description:
        "Communication suivie, mises en production stables et systèmes qui restent en ligne même lorsque votre activité grandit.",
      cardLabel: "Avis client",
      items: [
        {
          quote:
            "Il a livré exactement ce dont nous avions besoin, dans les temps et sans les complications habituelles.",
          name: "Marcus Chen",
          role: "Fondateur, TechStart",
        },
        {
          quote:
            "Notre site fonctionne mieux maintenant. Le travail de maintenance était solide et la communication claire.",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "Bug corrigé rapidement et aucune facturation tant que tout ne fonctionnait pas vraiment. Ça, c'est de l'intégrité.",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
  es: {
    hero: {
      tag: "Muestras de trabajo",
      title: "Proyectos seleccionados y demos en vivo",
      description:
        "Paneles interactivos, sitios web corporativos, herramientas de automatización y más. Cada proyecto está pensado para un rendimiento y una fiabilidad a largo plazo.",
    },
    highlight: {
      caption:
        "Selección destacada – paneles, animaciones y sistemas en producción",
      badge: "Reproducir showcase",
      note: "Sustituye esta sección por un vídeo o una lista de reproducción incrustada que muestre tus proyectos favoritos en acción.",
    },
    testimonials: {
      tag: "Voces de clientes",
      title: "Lo que la gente dice después de trabajar conmigo",
      description:
        "Comunicación constante, lanzamientos estables y sistemas que se mantienen online incluso cuando tu negocio crece.",
      cardLabel: "Opinión del cliente",
      items: [
        {
          quote:
            "Entregó exactamente lo que necesitábamos, a tiempo y sin las complicaciones de siempre.",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "Nuestro sitio funciona mejor ahora. El trabajo de mantenimiento fue sólido y la comunicación muy clara.",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "Arregló el bug rápido y no nos cobró hasta que todo funcionó de verdad. Eso es integridad.",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },

  te: {
    hero: {
      tag: "పని నమూనాలు",
      title: "ఎంపిక చేసిన ప్రాజెక్టులు మరియు లైవ్ డెమోలు",
      description:
        "ఇంటరాక్టివ్ డ్యాష్‌బోర్డులు, వ్యాపార వెబ్‌సైట్‌లు, ఆటోమేషన్ టూల్స్ మరియు మరిన్ని. ప్రతి ప్రాజెక్ట్ దీర్ఘకాలిక విశ్వసనీయత మరియు పనితీరు కోసం నిర్మించబడింది.",
    },
    highlight: {
      caption:
        "హైలైట్ రీల్ – డ్యాష్‌బోర్డులు, యానిమేషన్లు మరియు లైవ్ సిస్టంలు",
      badge: "షోకేస్ ప్లే",
      note:
        "మీ ఇష్టమైన ప్రాజెక్టులను కార్యాచరణలో చూపించే వీడియో లేదా ఎంబెడెడ్ ప్లేలిస్ట్‌తో దీన్ని చేర్చండి.",
    },
    testimonials: {
      tag: "క్లయింట్ వాయిసెస్",
      title: "నా తో పని చేసిన తర్వాత వారు ఏమంటారు",
      description:
        "కొనసాగుతున్న కమ్యూనికేషన్, స్టేబుల్ రిలీజ్‌లు మరియు మీ వ్యాపారం పెరిగిన తర్వాత కూడా ఆన్‌లైన్‌లో ఉండే సిస్టమ్‌లు.",
      cardLabel: "క్లయింట్ ఫీడ్బ్యాక్",
      items: [
        {
          quote:
            "మాకు అవసరమైనదాన్ని ఆయన సమయానికి, సాధారణంగా ఉండే జటిలతలు లేకుండా డెలివర్ చేశారు.",
          name: "Marcus Chen",
          role: "Founder, TechStart",
        },
        {
          quote:
            "ఇప్పుడు మా సైట్ బాగా నడుస్తోంది. మెయింటెనెన్స్ పని బలంగా ఉంది మరియు కమ్యూనికేషన్ చాలా క్లియర్‌గా జరిగింది.",
          name: "Sarah Mikhail",
          role: "CEO, Digital Solutions",
        },
        {
          quote:
            "బగ్‌ను త్వరగా ఫిక్స్ చేసి, నిజంగా అన్ని బాగున్నాకే ఛార్జ్ చేశారు. అదే నిజమైన ఇంటెగ్రిటీ.",
          name: "James Rodriguez",
          role: "Product Manager, StartupCo",
        },
      ],
    },
  },
};

const ABOUT_COPY: Record<LanguageCode, AboutCopy> = {
  en: {
    hero: {
      tag: "Guarantee",
      title: "Pay only when bugs are fixed",
      description:
        "Found a bug in your website or app? I fix it at no cost unless the issue is actually resolved. That means zero payment until the problem is solved and verified.",
      chip1: "100% risk-free engagement",
      chip2: "Transparent communication",
      videoCaption: "Bug guarantee video overview",
      videoBadge: "Watch process",
      videoNote:
        "Replace this preview with a screen recording that walks through how you investigate, fix, and verify critical bugs.",
    },
    collaboration: {
      tag: "1:1 collaboration",
      title: "Direct, transparent, and technology-forward delivery",
      description:
        "You work directly with the developer building your system—no middlemen. Every project is scoped clearly, with updates as work progresses, so there are no surprises.",
      values: [
        {
          title: "Direct communication",
          body: "Skip the layers. You talk straight to the person writing the code and shipping the features.",
        },
        {
          title: "Flexible pricing",
          body: "Pay for what you need, structured for your budget and timeline. Fixed or retainer models available.",
        },
        {
          title: "Modern technology",
          body: "Built with current frameworks and tools so your systems stay fast, secure, and maintainable.",
        },
        {
          title: "Transparent process",
          body: "You know what is happening at every step—roadmaps, updates, and clear release notes.",
        },
      ],
    },
    results: {
      tag: "Results",
      title: "Proven track record of delivery",
      description:
        "Real outcomes from real projects: faster load times, better reliability, and simpler operations for teams.",
      metrics: [
        { label: "Projects completed", value: "150+" },
        { label: "Uptime maintained", value: "99.8%" },
        { label: "Client satisfaction", value: "100%" },
        { label: "Years of experience", value: "8+" },
      ],
      ctaText:
        "Curious about how this would work for your product or infrastructure?",
      ctaLabel: "Book a quick call",
    },
  },
  hi: {
    hero: {
      tag: "गारंटी",
      title: "केवल तब भुगतान जब बग सच में ठीक हो जाएं",
      description:
        "आपकी वेबसाइट या ऐप में बग मिला? जब तक समस्या सच में हल नहीं हो जाती, तब तक कोई शुल्क नहीं। मतलब फाइनल समाधान और वेरिफिकेशन के बाद ही भुगतान।",
      chip1: "100% रिस्क-फ्री एंगेजमेंट",
      chip2: "पारदर्शी कम्युनिकेशन",
      videoCaption: "बग गारंटी वीडियो ओवरव्यू",
      videoBadge: "प्रोसेस देखें",
      videoNote:
        "इस प्रीव्यू को ऐसे स्क्रीन रिकॉर्डिंग से बदलें जो दिखाए कि आप क्रिटिकल बग कैसे ढूंढते, फिक्स करते और वेरिफाई करते हैं।",
    },
    collaboration: {
      tag: "1:1 कोलैबोरेशन",
      title: "डायरेक्ट, पारदर्शी और टेक-फ़र्स्ट डिलीवरी",
      description:
        "आप सीधे उसी डेवलपर के साथ काम करते हैं जो आपका सिस्टम बना रहा है—बीच में कोई लेयर नहीं। हर प्रोजेक्ट साफ़ तरीके से स्कोप होता है और प्रगति के साथ अपडेट मिलते हैं, ताकि कोई सरप्राइज़ न रहे।",
      values: [
        {
          title: "डायरेक्ट कम्युनिकेशन",
          body: "बीच की सारी लेयर हट जाती हैं। आप सीधे उस इंसान से बात करते हैं जो कोड लिख रहा है और फीचर शिप कर रहा है।",
        },
        {
          title: "लचीली प्राइसिंग",
          body: "आपको जितनी ज़रूरत है उतना ही भुगतान—आपके बजट और टाइमलाइन के अनुसार। फिक्स्ड और रिटेनर दोनों मॉडल उपलब्ध हैं।",
        },
        {
          title: "मॉडर्न टेक्नोलॉजी",
          body: "ताज़ा फ्रेमवर्क और टूल्स के साथ बनाया गया, ताकि आपके सिस्टम तेज़, सुरक्षित और लंबे समय तक मेंटेन करने योग्य रहें।",
        },
        {
          title: "पारदर्शी प्रोसेस",
          body: "हर स्टेप पर आपको क्लैरिटी मिलती है—रोडमैप, अपडेट और स्पष्ट रिलीज़ नोट्स के साथ।",
        },
      ],
    },
    results: {
      tag: "रिज़ल्ट्स",
      title: "डिलीवरी का साबित ट्रैक रिकॉर्ड",
      description:
        "रियल प्रोजेक्ट्स से रियल रिज़ल्ट—फास्ट लोड टाइम, बेहतर रिलायबिलिटी और टीमों के लिए आसान ऑपरेशंस।",
      metrics: [
        { label: "कम्प्लीटेड प्रोजेक्ट्स", value: "150+" },
        { label: "मेनटेंड अपटाइम", value: "99.8%" },
        { label: "क्लाइंट संतुष्टि", value: "100%" },
        { label: "अनुभव के साल", value: "8+" },
      ],
      ctaText:
        "जानना चाहते हैं कि यह आपके प्रोडक्ट या इंफ्रास्ट्रक्चर के लिए कैसे काम करेगा?",
      ctaLabel: "क्विक कॉल बुक करें",
    },
  },
  ar: {
    hero: {
      tag: "الضمان",
      title: "لا تدفع إلا عند إصلاح الأعطال",
      description:
        "اكتشفت عطلًا في موقعك أو تطبيقك؟ أقوم بإصلاحه دون أي تكلفة ما لم يتم حل المشكلة فعليًا. هذا يعني عدم دفع أي رسوم حتى يتم حل المشكلة والتحقق منها.",
      chip1: "تعاون بدون مخاطر بنسبة 100%",
      chip2: "تواصل شفاف",
      videoCaption: "نظرة عامة على فيديو ضمان إصلاح الأعطال",
      videoBadge: "مشاهدة العملية",
      videoNote:
        "استبدل هذه المعاينة بتسجيل شاشة يوضح كيف تقوم بالتحقيق في الأعطال، إصلاحها، والتحقق منها.",
    },
    collaboration: {
      tag: "تعاون فردي 1:1",
      title: "تسليم مباشر وشفاف يعتمد على أحدث التقنيات",
      description:
        "تعمل مباشرة مع المطوّر الذي يبني نظامك – لا وسطاء. يتم تحديد نطاق كل مشروع بوضوح مع تحديثات متواصلة أثناء التنفيذ، حتى لا تكون هناك مفاجآت.",
      values: [
        {
          title: "تواصل مباشر",
          body: "لا طبقات وسيطة. تتحدث مباشرة مع الشخص الذي يكتب الكود ويُطلق الميزات.",
        },
        {
          title: "تسعير مرن",
          body: "تدفع مقابل ما تحتاجه فقط، بما يتناسب مع ميزانيتك وجدولك الزمني. خطط ثابتة أو على شكل اشتراك متاحة.",
        },
        {
          title: "تقنيات حديثة",
          body: "يتم البناء باستخدام أُطر عمل وأدوات حديثة، ليبقى نظامك سريعًا وآمنًا وسهل الصيانة.",
        },
        {
          title: "عملية واضحة",
          body: "تعرف ما الذي يحدث في كل مرحلة—خطط طريق، تحديثات، وملاحظات إصدار واضحة.",
        },
      ],
    },
    results: {
      tag: "النتائج",
      title: "سِجل مثبت في التسليم",
      description:
        "نتائج حقيقية من مشاريع حقيقية: أزمنة تحميل أسرع، موثوقية أعلى وعمليات أبسط للفرق.",
      metrics: [
        { label: "المشاريع المكتملة", value: "150+" },
        { label: "توفر الخدمة", value: "99.8%" },
        { label: "رضا العملاء", value: "100%" },
        { label: "سنوات الخبرة", value: "8+" },
      ],
      ctaText:
        "هل ترغب في معرفة كيف يمكن أن يعمل هذا مع منتجك أو بُنيتك التحتية؟",
      ctaLabel: "احجز مكالمة سريعة",
    },
  },
  ur: {
    hero: {
      tag: "گارنٹی",
      title: "ادائیگی صرف تب جب بگ واقعی فکس ہوں",
      description:
        "آپ کی ویب سائٹ یا ایپ میں بگ ہے؟ جب تک مسئلہ حقیقت میں حل نہ ہو جائے، کوئی فیس نہیں۔ یعنی مسئلہ حل اور ویریفائی ہونے کے بعد ہی ادائیگی۔",
      chip1: "100% رِسک فری اینگیجمنٹ",
      chip2: "شفاف کمیونیکیشن",
      videoCaption: "بگ گارنٹی ویڈیو اوورویو",
      videoBadge: "پروسس دیکھیں",
      videoNote:
        "اس پری ویو کو اسکرین ریکارڈنگ سے بدلیں جو دکھائے کہ آپ کرٹیکل بگز کو کیسے تلاش، فکس اور ویریفائی کرتے ہیں۔",
    },
    collaboration: {
      tag: "1:1 کولیبرشن",
      title: "براہِ راست، شفاف اور جدید ٹیکنالوجی پر مبنی ڈیلیوری",
      description:
        "آپ براہِ راست اسی ڈویلپر کے ساتھ کام کرتے ہیں جو آپ کا سسٹم بنا رہا ہے—درمیان میں کوئی لیئر نہیں۔ ہر پروجیکٹ صاف اسکوپ کے ساتھ ہوتا ہے اور کام کے دوران باقاعدہ اپ ڈیٹس ملتی ہیں تاکہ کوئی سرپرائز نہ ہو۔",
      values: [
        {
          title: "براہِ راست رابطہ",
          body: "درمیانی لیئرز ختم۔ آپ سیدھا اسی شخص سے بات کرتے ہیں جو کوڈ لکھتا اور فیچر شپ کرتا ہے۔",
        },
        {
          title: "لچکدار قیمتیں",
          body: "جتنی ضرورت ہو، اتنا ہی خرچ—آپ کے بجٹ اور ٹائم لائن کے مطابق۔ فکسڈ اور ریٹینر دونوں ماڈل دستیاب ہیں۔",
        },
        {
          title: "جدید ٹیکنالوجی",
          body: "جدید فریم ورک اور ٹولز کے ساتھ بنایا ہوا تاکہ آپ کے سسٹم تیز، محفوظ اور آسانی سے مینٹین ایبل رہیں۔",
        },
        {
          title: "شفاف پروسس",
          body: "ہر مرحلے پر آپ کو معلوم ہوتا ہے کیا ہو رہا ہے—روڈ میپس، اپ ڈیٹس اور واضح ریلیز نوٹس کے ساتھ۔",
        },
      ],
    },
    results: {
      tag: "نتائج",
      title: "ڈیلیوری کا ثابت شدہ ریکارڈ",
      description:
        "حقیقی پروجیکٹس سے حاصل شدہ نتائج: تیز تر لوڈ ٹائم، بہتر ریلائی ایبلیٹی، اور ٹیموں کے لیے آسان آپریشنز۔",
      metrics: [
        { label: "مکمل پروجیکٹس", value: "150+" },
        { label: "مینٹینڈ اپ ٹائم", value: "99.8%" },
        { label: "کلائنٹ سیٹِسفیکشن", value: "100%" },
        { label: "تجربے کے سال", value: "8+" },
      ],
      ctaText:
        "جاننا چاہتے ہیں کہ یہ آپ کے پروڈکٹ یا انفراسٹرکچر کے لیے کیسے کام کرے گا؟",
      ctaLabel: "ایک مختصر کال شیڈول کریں",
    },
  },
  fr: {
    hero: {
      tag: "Garantie",
      title: "Vous ne payez que lorsque les bugs sont corrigés",
      description:
        "Un bug sur votre site ou votre application ? Je le corrige sans frais tant que le problème n'est pas réellement résolu. Aucun paiement avant une correction vérifiée.",
      chip1: "Collaboration 100 % sans risque",
      chip2: "Communication transparente",
      videoCaption: "Vue d'ensemble vidéo de la garantie bug",
      videoBadge: "Voir le process",
      videoNote:
        "Remplacez ce préview par une capture d'écran vidéo qui montre comment vous investiguez, corrigez et validez les bugs critiques.",
    },
    collaboration: {
      tag: "Collaboration 1:1",
      title: "Un delivery direct, transparent et orienté technologie",
      description:
        "Vous travaillez directement avec le développeur qui construit votre système – sans intermédiaires. Chaque projet est cadré clairement avec des mises à jour régulières, pour qu'il n'y ait pas de surprises.",
      values: [
        {
          title: "Communication directe",
          body: "Pas de couches inutiles. Vous discutez directement avec la personne qui écrit le code et livre les fonctionnalités.",
        },
        {
          title: "Tarification flexible",
          body: "Vous payez pour ce dont vous avez besoin, adapté à votre budget et à votre calendrier. Forfaits fixes ou récurrents possibles.",
        },
        {
          title: "Technologies modernes",
          body: "Construit avec des frameworks et outils actuels pour garder vos systèmes rapides, sécurisés et maintenables.",
        },
        {
          title: "Processus transparent",
          body: "Vous savez ce qui se passe à chaque étape – roadmaps, mises à jour et notes de version claires.",
        },
      ],
    },
    results: {
      tag: "Résultats",
      title: "Un historique de livraisons éprouvé",
      description:
        "Des résultats concrets issus de projets réels : temps de chargement réduits, meilleure fiabilité et opérations simplifiées pour les équipes.",
      metrics: [
        { label: "Projets livrés", value: "150+" },
        { label: "Disponibilité assurée", value: "99,8%" },
        { label: "Satisfaction client", value: "100%" },
        { label: "Années d'expérience", value: "8+" },
      ],
      ctaText:
        "Vous vous demandez comment cela pourrait s'appliquer à votre produit ou votre infrastructure ?",
      ctaLabel: "Réserver un appel rapide",
    },
  },
  es: {
    hero: {
      tag: "Garantía",
      title: "Pagas solo cuando los bugs están resueltos",
      description:
        "¿Encontraste un bug en tu sitio web o app? Lo corrijo sin coste mientras el problema no esté realmente solucionado. No hay pago hasta que la corrección esté verificada.",
      chip1: "Colaboración 100 % sin riesgo",
      chip2: "Comunicación transparente",
      videoCaption: "Resumen en video de la garantía de bugs",
      videoBadge: "Ver proceso",
      videoNote:
        "Sustituye esta vista previa por una grabación de pantalla que muestre cómo investigas, corriges y verificas bugs críticos.",
    },
    collaboration: {
      tag: "Colaboración 1:1",
      title: "Entrega directa, transparente y con tecnología moderna",
      description:
        "Trabajas directamente con la persona que construye tu sistema, sin intermediarios. Cada proyecto se define con claridad y se actualiza a medida que avanza, sin sorpresas.",
      values: [
        {
          title: "Comunicación directa",
          body: "Sin capas de por medio. Hablas directamente con quien escribe el código y entrega las funcionalidades.",
        },
        {
          title: "Precios flexibles",
          body: "Pagas solo por lo que necesitas, adaptado a tu presupuesto y plazos. Disponibles modelos fijos o por retainer.",
        },
        {
          title: "Tecnología moderna",
          body: "Construido con frameworks y herramientas actuales para que tus sistemas se mantengan rápidos, seguros y fáciles de mantener.",
        },
        {
          title: "Proceso transparente",
          body: "Sabes qué está pasando en cada paso: roadmaps, actualizaciones y notas de versión claras.",
        },
      ],
    },
    results: {
      tag: "Resultados",
      title: "Historial probado de entregas",
      description:
        "Resultados reales de proyectos reales: cargas más rápidas, mayor fiabilidad y operaciones más simples para los equipos.",
      metrics: [
        { label: "Proyectos completados", value: "150+" },
        { label: "Uptime mantenido", value: "99.8%" },
        { label: "Satisfacción de clientes", value: "100%" },
        { label: "Años de experiencia", value: "8+" },
      ],
      ctaText:
        "¿Quieres saber cómo funcionaría esto para tu producto o infraestructura?",
      ctaLabel: "Reserva una llamada rápida",
    },
  },
  te: {
    hero: {
      tag: "గారంటీ",
      title: "బగ్ నిజంగా ఫిక్స్ అయినప్పుడు మాత్రమే చెల్లింపు",
      description:
        "మీ వెబ్‌సైట్ లేదా యాప్‌లో బగ్ ఉందా? సమస్య పూర్తిగా పరిష్కారమయ్యే వరకు ఎలాంటి ఫీజు లేదు. అంటే బగ్ ఫిక్స్ అయ్యి, వెరిఫై అయిన తరువాతే చెల్లించాలి.",
      chip1: "100% రిస్క్-రహిత ఎంగేజ్‌మెంట్",
      chip2: "స్పష్టమైన కమ్యూనికేషన్",
      videoCaption: "బగ్ గారంటీ వీడియో ఓవర్వ్యూ",
      videoBadge: "ప్రాసెస్ చూడండి",
      videoNote:
        "క్రిటికల్ బగ్‌లను మీరు ఎలా పరిశీలించి, ఫిక్స్ చేసి, వెరిఫై చేస్తారో చూపే స్క్రీన్ రికార్డింగ్‌తో ఈ ప్రివ్యూ‌ని మార్చుకోవచ్చు.",
    },
    collaboration: {
      tag: "1:1 కోలాబరేషన్",
      title: "డైరెక్ట్, ట్రాన్స్‌పేరెంట్ మరియు టెక్-ఫస్ట్ డెలివరీ",
      description:
        "మీ సిస్టమ్‌ను నిర్మిస్తున్న డెవలపర్‌తో మీరు నేరుగా పని చేస్తారు—మధ్యలో ఎలాంటి లేయర్‌లు లేవు. ప్రతి ప్రాజెక్ట్ క్లియర్ స్కోప్‌తో ఉండి, ప్రోగ్రెస్‌కు అనుగుణంగా అప్‌డేట్‌లు వస్తాయి, కాబట్టి సర్‌ప్రైజ్‌లు ఉండవు.",
      values: [
        {
          title: "డైరెక్ట్ కమ్యూనికేషన్",
          body: "మధ్యలోని లేయర్‌లను దాటేసి, కోడ్ రాస్తున్న మరియు ఫీచర్ షిప్ చేస్తున్న వ్యక్తితోనే మీరు మాట్లాడుతారు.",
        },
        {
          title: "ఫ్లెక్సిబుల్ ప్రైసింగ్",
          body: "మీకు అవసరమైన దానికే చెల్లింపు—మీ బడ్జెట్ మరియు టైమ్‌లైన్‌కు సరిపోయేలా. ఫిక్స్‌డ్ మరియు రిటైనర్ రెండు మోడల్‌లు అందుబాటులో ఉన్నాయి.",
        },
        {
          title: "ఆధునిక టెక్నాలజీ",
          body: "ప్రస్తుత ఫ్రేమ్‌వర్క్‌లు మరియు టూల్‌లతో నిర్మించబడటంతో, మీ సిస్టమ్‌లు వేగంగా, సెక్యూర్‌గా మరియు మెయింటెన్ చేయడానికి సులభంగా ఉంటాయి.",
        },
        {
          title: "స్పష్టమైన ప్రాసెస్",
          body: "ప్రతి దశలో ఏమి జరుగుతోందో మీకు స్పష్టంగా తెలుస్తుంది—రోడ్‌మ్యాప్‌లు, అప్‌డేట్‌లు మరియు క్లియర్ రిలీస్ నోట్స్‌తో.",
        },
      ],
    },
    results: {
      tag: "ఫలితాలు",
      title: "డెలివరీలో నిరూపిత ట్రాక్ రికార్డ్",
      description:
        "నిజమైన ప్రాజెక్ట్‌ల నుండి వచ్చిన నిజమైన ఫలితాలు: వేగవంతమైన లోడ్ టైమ్‌లు, మెరుగైన నమ్మకత్వం మరియు టీమ్‌లకు సులభమైన ఆపరేషన్స్.",
      metrics: [
        { label: "పూర్తయిన ప్రాజెక్ట్‌లు", value: "150+" },
        { label: "నిలుపుకున్న అప్ట్‌టైమ్", value: "99.8%" },
        { label: "క్లయింట్ సంతృప్తి", value: "100%" },
        { label: "అనుభవం ఉన్న సంవత్సరాలు", value: "8+" },
      ],
      ctaText:
        "ఇది మీ ప్రోడక్ట్ లేదా ఇన్‌ఫ్రాస్ట్రక్చర్ కోసం ఎలా పని చేస్తుందో తెలుసుకోవాలనుకుంటున్నారా?",
      ctaLabel: "ఒక చిన్న కాల్ బుక్ చేయండి",
    },
  },
};

const HOME_COPY: Record<LanguageCode, HomeCopy> = {
  en: {
    hero: {
      tag: "Web, Software & Cloud Solutions — End-to-End",
      title: "Code that works, built to last.",
      subtitle:
        "I design, build, and deploy modern web platforms, automation tools, and secure infrastructure that keep your business online and moving.",
      primaryCta: "Request a quote",
      secondaryCta: "View services",
      bullets: [
        "Full-stack product delivery: frontend, backend, and DevOps",
        "Pay-only-if-fixed production bug support",
        "Fast, SEO-friendly sites with clean UI/UX",
        "Secure server deployments and ongoing maintenance",
      ],
    },
    bugCard: {
      label: "Bug guarantee",
      title: "Pay only when your issue is actually fixed.",
      description:
        "Ideal for urgent production bugs, downtime, and performance issues. Clear diagnostics, no fix—no invoice.",
    },
    snapshotCard: {
      label: "Snapshot",
      launches: "40+ launches",
      projectsLabel: "Projects shipped",
      responseLabel: "Avg. response",
      happyClientsLabel: "Happy clients",
    },
    layoutCopy: {
      nav: {
        services: "Services",
        portfolio: "Portfolio",
        about: "About",
        contact: "Contact",
      },
      footerIntro:
        "Full-stack development, automation, and server operations for teams that care about reliability and long-term maintainability.",
      footer: {
        servicesTitle: "Services",
        servicesItems: [
          "Web & product builds",
          "DevOps & deployment",
          "Maintenance & support",
          "Bug fixing",
        ],
        companyTitle: "Company",
        companyItems: ["About", "Portfolio", "Testimonials"],
        contactTitle: "Contact",
        contactItems: ["Email & WhatsApp", "Request a quote", "Bug fix request"],
        copyright: "Kodidela Webkraft. All rights reserved.",
        privacy: "Privacy",
        terms: "Terms",
      },
    },
    buildSection: {
      tag: "What I build",
      title: "From landing pages to complex dashboards and infrastructure.",
      description:
        "Websites, internal tools, APIs, automation, deployment pipelines, and long-term maintenance. One partner to design, build, and keep everything running.",
      tabs: {
        web: {
          name: "Web & Product",
          title: "Modern websites, dashboards, and admin panels.",
          description:
            "I build marketing sites, SaaS platforms, and internal tools with a focus on clean UI/UX, performance, and long-term maintainability. Every project is responsive, SEO-friendly, and ready to scale.",
        },
        devops: {
          name: "DevOps & Infra",
          title: "Secure, automated, and reliable cloud infrastructure.",
          description:
            "I design and manage CI/CD pipelines, monitoring, and deployments on modern cloud stacks. Your systems stay online, secure, and easy to update, so you can focus on your product.",
        },
        support: {
          name: "Care & Support",
          title: "Ongoing maintenance, bug fixing, and performance tuning.",
          description:
            "I handle backups, security patches, and performance optimizations for existing systems. Get peace of mind knowing your application is monitored and maintained by a dedicated partner.",
        },
      },
    },
    readySection: {
      tag: "Ready when you are",
      title: "Share a link, describe the problem, and I'll take it from there.",
      description:
        "Use the quote or bug-fix forms to send details. You'll get a clear response with scope, pricing, and next steps—no vague promises.",
      steps: ["Send details", "Get a quote", "We ship"],
      primaryCta: "Start with a quote",
      secondaryCta: "Report a bug",
    },
  },
  hi: {
    hero: {
      tag: "वेब, सॉफ्टवेयर और क्लाउड समाधान — एंड-टू-एंड",
      title: "ऐसा कोड जो काम करे, और लंबे समय तक चले।",
      subtitle:
        "मैं आधुनिक वेब प्लेटफॉर्म, ऑटोमेशन टूल और सुरक्षित इंफ्रास्ट्रक्चर डिजाइन, निर्माण और तैनात करता हूं जो आपके व्यवसाय को ऑनलाइन और गतिशील बनाए रखता है।",
      primaryCta: "कोटेशन का अनुरोध करें",
      secondaryCta: "सेवाएं देखें",
      bullets: [
        "फुल-स्टैक उत्पाद डिलीवरी: फ्रंटएंड, बैकएंड, और DevOps",
        "उत्पादन बग समर्थन केवल-भुगतान-करें-यदि-ठीक हो गया हो",
        "स्वच्छ UI/UX के साथ तेज, SEO-अनुकूल साइटें",
        "सुरक्षित सर्वर परिनियोजन और चल रही रखरखाव",
      ],
    },
    layoutCopy: {
      nav: {
        services: "सेवाएं",
        portfolio: "पोर्टफोलियो",
        about: "मेरे बारे में",
        contact: "संपर्क",
      },
      footerIntro:
        "फुल-स्टैक डेवलपमेंट, ऑटोमेशन और सर्वर ऑपरेशंस — उन टीमों के लिए जो भरोसेमंद और लंबे समय तक चलने वाली सिस्टम चाहती हैं।",
      footer: {
        servicesTitle: "सेवाएं",
        servicesItems: [
          "वेब और प्रोडक्ट बिल्ड्स",
          "DevOps और डिप्लॉयमेंट",
          "मेंटेनेंस और सपोर्ट",
          "बग फिक्सिंग",
        ],
        companyTitle: "कंपनी",
        companyItems: ["अबाउट", "पोर्टफोलियो", "टेस्टिमोनियल्स"],
        contactTitle: "संपर्क",
        contactItems: [
          "ईमेल और व्हाट्सएप",
          "कोटेशन रिक्वेस्ट",
          "बग फिक्स रिक्वेस्ट",
        ],
        copyright: "Kodidela Webkraft. सर्वाधिकार सुरक्षित।",
        privacy: "प्राइवेसी",
        terms: "नियम",
      },
    },
    bugCard: {
      label: "बग गारंटी",
      title: "केवल तभी भुगतान करें जब समस्या वास्तव में ठीक हो जाए।",
      description:
        "क्रिटिकल प्रोडक्शन बग, डाउनटाइम और परफ़ॉर्मेंस समस्याओं के लिए आदर्श। स्पष्ट डायग्नोस्टिक्स, फिक्स नहीं तो बिल नहीं।",
    },
    snapshotCard: {
      label: "स्नैपशॉट",
      launches: "40+ लॉन्च",
      projectsLabel: "शिप किए गए प्रोजेक्ट्स",
      responseLabel: "औसत रिस्पॉन्स",
      happyClientsLabel: "संतुष्ट क्लाइंट्स",
    },
    buildSection: {
      tag: "मैं क्या बनाता हूं",
      title: "लैंडिंग पेज से लेकर जटिल डैशबोर्ड और इंफ्रास्ट्रक्चर तक।",
      description:
        "वेबसाइट, आंतरिक उपकरण, एपीआई, स्वचालन, परिनियोजन पाइपलाइन और दीर्घकालिक रखरखाव। सब कुछ डिजाइन, निर्माण और चलाने के लिए एक भागीदार।",
      tabs: {
        web: {
          name: "वेब और उत्पाद",
          title: "आधुनिक वेबसाइट, डैशबोर्ड और एडमिन पैनल।",
          description:
            "मैं स्वच्छ UI/UX, प्रदर्शन और दीर्घकालिक रखरखाव पर ध्यान केंद्रित करते हुए मार्केटिंग साइट्स, सास प्लेटफॉर्म और आंतरिक उपकरण बनाता हूं। हर परियोजना उत्तरदायी, SEO-अनुकूल और स्केल करने के लिए तैयार है।",
        },
        devops: {
          name: "DevOps और इंफ्रा",
          title: "सुरक्षित, स्वचालित और विश्वसनीय क्लाउड इंफ्रास्ट्रक्चर।",
          description:
            "मैं आधुनिक क्लाउड स्टैक पर CI/CD पाइपलाइन, निगरानी और परिनियोजन डिजाइन और प्रबंधित करता हूं। आपके सिस्टम ऑनलाइन, सुरक्षित और अपडेट करने में आसान रहते हैं, ताकि आप अपने उत्पाद पर ध्यान केंद्रित कर सकें।",
        },
        support: {
          name: "देखभाल और समर्थन",
          title: "चल रही रखरखाव, बग फिक्सिंग और प्रदर्शन ट्यूनिंग।",
          description:
            "मैं मौजूदा सिस्टम के लिए बैकअप, सुरक्षा पैच और प्रदर्शन अनुकूलन संभालता हूं। यह जानकर मन की शांति प्राप्त करें कि आपके एप्लिकेशन की निगरानी और रखरखाव एक समर्पित भागीदार द्वारा किया जाता है।",
        },
      },
    },
    readySection: {
      tag: "जब आप तैयार हों",
      title: "एक लिंक साझा करें, समस्या का वर्णन करें, और मैं इसे वहां से ले लूंगा।",
      description:
        "विवरण भेजने के लिए उद्धरण या बग-फिक्स फॉर्म का उपयोग करें। आपको दायरे, मूल्य निर्धारण और अगले चरणों के साथ एक स्पष्ट प्रतिक्रिया मिलेगी - कोई अस्पष्ट वादे नहीं।",
      steps: ["विवरण भेजें", "एक उद्धरण प्राप्त करें", "हम शिप करते हैं"],
      primaryCta: "एक उद्धरण के साथ शुरू करें",
      secondaryCta: "एक बग की रिपोर्ट करें",
    },
  },
  ar: {
    hero: {
      tag: "حلول الويب والبرامج والسحابة — من البداية إلى النهاية",
      title: "كود يعمل، ومصمم ليدوم.",
      subtitle:
        "أقوم بتصميم وبناء ونشر منصات الويب الحديثة وأدوات التشغيل الآلي والبنية التحتية الآمنة التي تحافظ على عملك على الإنترنت ومتحركًا.",
      primaryCta: "اطلب عرض سعر",
      secondaryCta: "عرض الخدمات",
      bullets: [
        "تسليم المنتج الكامل: الواجهة الأمامية والخلفية و DevOps",
        "دعم أخطاء الإنتاج بالدفع فقط في حالة الإصلاح",
        "مواقع سريعة ومتوافقة مع محركات البحث بواجهة مستخدم / تجربة مستخدم نظيفة",
        "عمليات نشر خادم آمنة وصيانة مستمرة",
      ],
    },
    layoutCopy: {
      nav: {
        services: "الخدمات",
        portfolio: "الأعمال",
        about: "نبذة عني",
        contact: "تواصل",
      },
      footerIntro:
        "تطوير متكامل، وأتمتة، وتشغيل خوادم موثوق لفرق تهتم بالاستقرار والصيانة طويلة الأمد.",
      footer: {
        servicesTitle: "الخدمات",
        servicesItems: [
          "تطوير الويب والمنتجات",
          "DevOps والنشر",
          "الصيانة والدعم",
          "إصلاح الأخطاء",
        ],
        companyTitle: "الشركة",
        companyItems: ["من نحن", "الأعمال", "آراء العملاء"],
        contactTitle: "التواصل",
        contactItems: ["البريد والواتساب", "طلب عرض سعر", "طلب إصلاح عطل"],
        copyright: "Kodidela Webkraft. جميع الحقوق محفوظة.",
        privacy: "الخصوصية",
        terms: "الشروط",
      },
    },
    bugCard: {
      label: "ضمان إصلاح الأعطال",
      title: "تدفع فقط عندما يتم حل مشكلتك بالفعل.",
      description:
        "مثالي لأعطال الإنتاج العاجلة، التوقف، ومشكلات الأداء. تشخيص واضح، لا إصلاح — لا فاتورة.",
    },
    snapshotCard: {
      label: "لمحة سريعة",
      launches: "40+ إطلاق",
      projectsLabel: "مشاريع تم تسليمها",
      responseLabel: "متوسط زمن الاستجابة",
      happyClientsLabel: "عملاء راضون",
    },
    buildSection: {
      tag: "ماذا أبني",
      title: "من صفحات الهبوط إلى لوحات المعلومات المعقدة والبنية التحتية.",
      description:
        "مواقع الويب والأدوات الداخلية وواجهات برمجة التطبيقات والأتمتة وخطوط أنابيب النشر والصيانة طويلة الأجل. شريك واحد لتصميم وبناء وتشغيل كل شيء.",
      tabs: {
        web: {
          name: "الويب والمنتج",
          title: "مواقع ويب حديثة ولوحات معلومات ولوحات إدارة.",
          description:
            "أقوم ببناء مواقع تسويقية ومنصات SaaS وأدوات داخلية مع التركيز على واجهة المستخدم / تجربة المستخدم النظيفة والأداء والصيانة طويلة الأجل. كل مشروع متجاوب ومتوافق مع محركات البحث وجاهز للتوسع.",
        },
        devops: {
          name: "DevOps والبنية التحتية",
          title: "بنية تحتية سحابية آمنة ومؤتمتة وموثوقة.",
          description:
            "أقوم بتصميم وإدارة خطوط أنابيب CI / CD والمراقبة والنشر على مجموعات سحابية حديثة. تظل أنظمتك متصلة بالإنترنت وآمنة وسهلة التحديث ، حتى تتمكن من التركيز على منتجك.",
        },
        support: {
          name: "الرعاية والدعم",
          title: "صيانة مستمرة وإصلاح الأخطاء وضبط الأداء.",
          description:
            "أقوم بالنسخ الاحتياطي وتصحيحات الأمان وتحسينات الأداء للأنظمة الحالية. احصل على راحة البال مع العلم أن تطبيقك تتم مراقبته وصيانته بواسطة شريك متخصص.",
        },
      },
    },
    readySection: {
      tag: "جاهز عندما تكون",
      title: "شارك رابطًا ، صف المشكلة ، وسأتولى الأمر من هناك.",
      description:
        "استخدم نماذج عرض الأسعار أو إصلاح الأخطاء لإرسال التفاصيل. ستحصل على رد واضح مع النطاق والأسعار والخطوات التالية - لا وعود غامضة.",
      steps: ["إرسال التفاصيل", "الحصول على عرض أسعار", "نحن نشحن"],
      primaryCta: "ابدأ بعرض أسعار",
      secondaryCta: "الإبلاغ عن خطأ",
    },
  },
  ur: {
    hero: {
      tag: "ویب، سافٹ ویئر اور کلاؤڈ سلوشنز — اینڈ ٹو اینڈ",
      title: "کوڈ جو کام کرتا ہے، دیرپا رہنے کے لیے بنایا گیا ہے۔",
      subtitle:
        "میں جدید ویب پلیٹ فارمز، آٹومیشن ٹولز، اور محفوظ انفراسٹرکچر ڈیزائن، تعمیر اور تعینات کرتا ہوں جو آپ کے کاروبار کو آن لائن اور متحرک رکھتا ہے۔",
      primaryCta: "ایک اقتباس کی درخواست کریں",
      secondaryCta: "خدمات دیکھیں",
      bullets: [
        "مکمل اسٹیک پروڈکٹ کی ترسیل: فرنٹ اینڈ، بیک اینڈ، اور DevOps",
        "پروڈکشن بگ سپورٹ صرف اس صورت میں ادائیگی کریں اگر ٹھیک ہو گیا ہو۔",
        "صاف UI/UX کے ساتھ تیز، SEO دوستانہ سائٹس",
        "محفوظ سرور کی تعیناتی اور جاری دیکھ بھال",
      ],
    },
    layoutCopy: {
      nav: {
        services: "سروسز",
        portfolio: "پورٹ فولیو",
        about: "میرے بارے میں",
        contact: "رابطہ",
      },
      footerIntro:
        "فل اسٹیک ڈیولپمنٹ، آٹومیشن اور سرور آپریشنز ان ٹیموں کے لیے جو قابلِ اعتماد اور طویل مدتی سسٹمز چاہتی ہیں۔",
      footer: {
        servicesTitle: "سروسز",
        servicesItems: [
          "ویب اور پروڈکٹ بلڈز",
          "DevOps اور ڈپلائمنٹ",
          "مینٹیننس اور سپورٹ",
          "بگ فکسنگ",
        ],
        companyTitle: "کمپنی",
        companyItems: ["اباؤٹ", "پورٹ فولیو", "ٹیسٹی مونیلز"],
        contactTitle: "رابطہ",
        contactItems: [
          "ای میل اور واٹس ایپ",
          "کوٹ کی درخواست",
          "بگ فکس ریکویسٹ",
        ],
        copyright: "Kodidela Webkraft. جملہ حقوق محفوظ ہیں۔",
        privacy: "پرائیویسی",
        terms: "شرائط",
      },
    },
    bugCard: {
      label: "بگ گارنٹی",
      title: "ادائیگی صرف اسی وقت جب مسئلہ واقعی حل ہو جائے۔",
      description:
        "ہنگامی پروڈکشن بگز، ڈاؤن ٹائم اور کارکردگی کے مسائل کے لیے موزوں۔ واضح ڈائگنوسٹکس، فکس نہیں تو بل نہیں۔",
    },
    snapshotCard: {
      label: "اسنیپ شاٹ",
      launches: "40+ لانچز",
      projectsLabel: "مکمل پروجیکٹس",
      responseLabel: "اوسط رسپانس",
      happyClientsLabel: "خوش گاہک",
    },
    buildSection: {
      tag: "میں کیا بناتا ہوں",
      title: "لینڈنگ پیجز سے لے کر پیچیدہ ڈیش بورڈز اور انفراسٹرکچر تک۔",
      description:
        "ویب سائٹس، اندرونی ٹولز، APIs، آٹومیشن، تعیناتی پائپ لائنز، اور طویل مدتی دیکھ بھال۔ ہر چیز کو ڈیزائن، تعمیر اور چلانے کے لیے ایک پارٹنر۔",
      tabs: {
        web: {
          name: "ویب اور پروڈکٹ",
          title: "جدید ویب سائٹس، ڈیش بورڈز، اور ایڈمن پینلز۔",
          description:
            "میں صاف UI/UX، کارکردگی، اور طویل مدتی دیکھ بھال پر توجہ کے ساتھ مارکیٹنگ سائٹس، SaaS پلیٹ فارمز، اور اندرونی ٹولز بناتا ہوں۔ ہر پروجیکٹ ذمہ دار، SEO دوستانہ، اور اسکیل کرنے کے لیے تیار ہے۔",
        },
        devops: {
          name: "DevOps اور انفرا",
          title: "محفوظ، خودکار، اور قابل اعتماد کلاؤڈ انفراسٹرکچر۔",
          description:
            "میں جدید کلاؤڈ اسٹیک پر CI/CD پائپ لائنز، مانیٹرنگ، اور تعیناتیوں کو ڈیزائن اور منظم کرتا ہوں۔ آپ کے سسٹم آن لائن، محفوظ، اور اپ ڈیٹ کرنے میں آسان رہتے ہیں، تاکہ آپ اپنی پروڈکٹ پر توجہ مرکوز کرسکیں۔",
        },
        support: {
          name: "دیکھ بھال اور مدد",
          title: "جاری دیکھ بھال، بگ فکسنگ، اور کارکردگی کی ٹیوننگ۔",
          description:
            "میں موجودہ سسٹم کے لیے بیک اپ، سیکیورٹی پیچ، اور کارکردگی کی اصلاح کو سنبھالتا ہوں۔ یہ جان کر ذہنی سکون حاصل کریں کہ آپ کی درخواست کی نگرانی اور دیکھ بھال ایک وقف پارٹنر کے ذریعے کی جاتی ہے۔",
        },
      },
    },
    readySection: {
      tag: "جب آپ تیار ہوں",
      title: "ایک لنک شیئر کریں، مسئلہ بیان کریں، اور میں اسے وہاں سے لے لوں گا۔",
      description:
        "تفصیلات بھیجنے کے لیے اقتباس یا بگ فکس فارم استعمال کریں۔ آپ کو دائرہ کار، قیمتوں اور اگلے مراحل کے ساتھ واضح جواب ملے گا - کوئی مبہم وعدے نہیں۔",
      steps: ["تفصیلات بھیجیں", "ایک اقتباس حاصل کریں", "ہم جہاز بھیجتے ہیں"],
      primaryCta: "ایک اقتباس کے ساتھ شروع کریں",
      secondaryCta: "ایک بگ کی اطلاع دیں",
    },
  },
  fr: {
    hero: {
      tag: "Solutions Web, logicielles et cloud — de bout en bout",
      title: "Un code qui fonctionne, conçu pour durer.",
      subtitle:
        "Je conçois, construis et déploie des plateformes Web modernes, des outils d'automatisation et une infrastructure sécurisée qui maintiennent votre entreprise en ligne et en mouvement.",
      primaryCta: "Demander un devis",
      secondaryCta: "Voir les services",
      bullets: [
        "Livraison de produits full-stack : frontend, backend et DevOps",
        "Support des bogues de production avec paiement uniquement si corrigé",
        "Sites rapides et optimisés pour le référencement avec une interface utilisateur/expérience utilisateur propre",
        "Déploiements de serveurs sécurisés et maintenance continue",
      ],
    },
    layoutCopy: {
      nav: {
        services: "Services",
        portfolio: "Portfolio",
        about: "À propos",
        contact: "Contact",
      },
      footerIntro:
        "Développement full‑stack, automatisation et exploitation de serveurs pour des équipes qui misent sur la fiabilité et la maintenabilité long terme.",
      footer: {
        servicesTitle: "Services",
        servicesItems: [
          "Création web et produit",
          "DevOps et déploiement",
          "Maintenance et support",
          "Correction de bugs",
        ],
        companyTitle: "Entreprise",
        companyItems: ["À propos", "Portfolio", "Témoignages"],
        contactTitle: "Contact",
        contactItems: [
          "Email & WhatsApp",
          "Demander un devis",
          "Demande de correction de bug",
        ],
        copyright: "Kodidela Webkraft. Tous droits réservés.",
        privacy: "Confidentialité",
        terms: "Conditions",
      },
    },
    bugCard: {
      label: "Garantie bugs",
      title: "Payez uniquement lorsque votre problème est réellement résolu.",
      description:
        "Idéal pour les bugs de production urgents, les interruptions et les problèmes de performance. Diagnostic clair, pas de correction — pas de facture.",
    },
    snapshotCard: {
      label: "Instantané",
      launches: "40+ lancements",
      projectsLabel: "Projets livrés",
      responseLabel: "Temps de réponse moyen",
      happyClientsLabel: "Clients satisfaits",
    },
    buildSection: {
      tag: "Ce que je construis",
      title: "Des pages de destination aux tableaux de bord et infrastructures complexes.",
      description:
        "Sites Web, outils internes, API, automatisation, pipelines de déploiement et maintenance à long terme. Un partenaire unique pour concevoir, construire et faire fonctionner le tout.",
      tabs: {
        web: {
          name: "Web et produit",
          title: "Sites Web, tableaux de bord et panneaux d'administration modernes.",
          description:
            "Je crée des sites marketing, des plateformes SaaS et des outils internes en mettant l'accent sur une interface utilisateur/expérience utilisateur propre, les performances et la maintenabilité à long terme. Chaque projet est réactif, optimisé pour le référencement et prêt à évoluer.",
        },
        devops: {
          name: "DevOps et infra",
          title: "Infrastructure cloud sécurisée, automatisée et fiable.",
          description:
            "Je conçois et gère des pipelines CI/CD, la surveillance et les déploiements sur des piles cloud modernes. Vos systèmes restent en ligne, sécurisés et faciles à mettre à jour, afin que vous puissiez vous concentrer sur votre produit.",
        },
        support: {
          name: "Soins et assistance",
          title: "Maintenance continue, correction de bogues et optimisation des performances.",
          description:
            "Je gère les sauvegardes, les correctifs de sécurité et les optimisations de performances pour les systèmes existants. Ayez l'esprit tranquille en sachant que votre application est surveillée et maintenue par un partenaire dédié.",
        },
      },
    },
    readySection: {
      tag: "Prêt quand vous l'êtes",
      title: "Partagez un lien, décrivez le problème, et je m'en occupe à partir de là.",
      description:
        "Utilisez les formulaires de devis ou de correction de bogues pour envoyer des détails. Vous obtiendrez une réponse claire avec la portée, les prix et les prochaines étapes - pas de promesses vagues.",
      steps: ["Envoyer les détails", "Obtenir un devis", "Nous expédions"],
      primaryCta: "Commencer avec un devis",
      secondaryCta: "Signaler un bogue",
    },
  },
  es: {
    hero: {
      tag: "Soluciones web, de software y en la nube — de extremo a extremo",
      title: "Código que funciona, creado para durar.",
      subtitle:
        "Diseño, construyo e implemento plataformas web modernas, herramientas de automatización e infraestructura segura que mantienen su negocio en línea y en movimiento.",
      primaryCta: "Solicitar un presupuesto",
      secondaryCta: "Ver servicios",
      bullets: [
        "Entrega de productos full-stack: frontend, backend y DevOps",
        "Soporte de errores de producción de pago solo si se solucionan",
        "Sitios rápidos y compatibles con SEO con una interfaz de usuario/experiencia de usuario limpia",
        "Implementaciones seguras de servidores y mantenimiento continuo",
      ],
    },
    layoutCopy: {
      nav: {
        services: "Servicios",
        portfolio: "Portafolio",
        about: "Sobre mí",
        contact: "Contacto",
      },
      footerIntro:
        "Desarrollo full‑stack, automatización y operación de servidores para equipos que valoran la fiabilidad y el mantenimiento a largo plazo.",
      footer: {
        servicesTitle: "Servicios",
        servicesItems: [
          "Desarrollo web y de productos",
          "DevOps y despliegue",
          "Mantenimiento y soporte",
          "Corrección de errores",
        ],
        companyTitle: "Compañía",
        companyItems: ["Acerca de", "Portafolio", "Testimonios"],
        contactTitle: "Contacto",
        contactItems: [
          "Email y WhatsApp",
          "Solicitar un presupuesto",
          "Solicitud de corrección de errores",
        ],
        copyright: "Kodidela Webkraft. Todos los derechos reservados.",
        privacy: "Privacidad",
        terms: "Términos",
      },
    },
    bugCard: {
      label: "Garantía de bugs",
      title: "Paga solo cuando tu problema esté realmente resuelto.",
      description:
        "Ideal para errores críticos en producción, caídas y problemas de rendimiento. Diagnóstico claro, sin solución — sin factura.",
    },
    snapshotCard: {
      label: "Resumen",
      launches: "40+ lanzamientos",
      projectsLabel: "Proyectos entregados",
      responseLabel: "Tiempo de respuesta medio",
      happyClientsLabel: "Clientes satisfechos",
    },
    buildSection: {
      tag: "Lo que construyo",
      title: "Desde páginas de destino hasta paneles de control e infraestructuras complejas.",
      description:
        "Sitios web, herramientas internas, API, automatización, canalizaciones de implementación y mantenimiento a largo plazo. Un socio para diseñar, construir y mantener todo en funcionamiento.",
      tabs: {
        web: {
          name: "Web y producto",
          title: "Sitios web, paneles de control y paneles de administración modernos.",
          description:
            "Creo sitios de marketing, plataformas SaaS y herramientas internas con un enfoque en una interfaz de usuario/experiencia de usuario limpia, rendimiento y mantenibilidad a largo plazo. Cada proyecto es receptivo, compatible con SEO y está listo para escalar.",
        },
        devops: {
          name: "DevOps e infraestructura",
          title: "Infraestructura en la nube segura, automatizada y confiable.",
          description:
            "Diseño y administro canalizaciones de CI/CD, monitoreo e implementaciones en pilas de nube modernas. Sus sistemas permanecen en línea, seguros y fáciles de actualizar, para que pueda concentrarse en su producto.",
        },
        support: {
          name: "Atención y soporte",
          title: "Mantenimiento continuo, corrección de errores y ajuste del rendimiento.",
          description:
            "Me encargo de las copias de seguridad, los parches de seguridad y las optimizaciones de rendimiento de los sistemas existentes. Tenga la tranquilidad de saber que su aplicación es monitoreada y mantenida por un socio dedicado.",
        },
      },
    },
    readySection: {
      tag: "Listo cuando usted lo esté",
      title: "Comparta un enlace, describa el problema y yo me encargaré a partir de ahí.",
      description:
        "Utilice los formularios de cotización o de corrección de errores para enviar los detalles. Obtendrá una respuesta clara con el alcance, los precios y los próximos pasos, sin promesas vagas.",
      steps: ["Enviar detalles", "Obtener un presupuesto", "Enviamos"],
      primaryCta: "Comenzar con un presupuesto",
      secondaryCta: "Informar de un error",
    },
  },
  te: {
    hero: {
      tag: "వెబ్, సాఫ్ట్‌వేర్ & క్లౌడ్ సొల్యూషన్స్ — ఎండ్-టు-ఎండ్",
      title: "పని చేసే కోడ్, మన్నిక కోసం నిర్మించబడింది.",
      subtitle:
        "నేను మీ వ్యాపారాన్ని ఆన్‌లైన్‌లో మరియు కదలికలో ఉంచే ఆధునిక వెబ్ ప్లాట్‌ఫారమ్‌లు, ఆటోమేషన్ సాధనాలు మరియు సురక్షితమైన మౌలిక సదుపాయాలను డిజైన్ చేస్తాను, నిర్మిస్తాను మరియు అమలు చేస్తాను.",
      primaryCta: "ఒక కోట్‌ను అభ్యర్థించండి",
      secondaryCta: "సేవలను వీక్షించండి",
      bullets: [
        "పూర్తి-స్టాక్ ఉత్పత్తి డెలివరీ: ఫ్రంటెండ్, బ్యాకెండ్ మరియు DevOps",
        "స్థిరపడితేనే చెల్లించే ఉత్పత్తి బగ్ మద్దతు",
        "శుభ్రమైన UI/UXతో వేగవంతమైన, SEO-స్నేహపూర్వక సైట్‌లు",
        "సురక్షిత సర్వర్ విస్తరణలు మరియు కొనసాగుతున్న నిర్వహణ",
      ],
    },
    layoutCopy: {
      nav: {
        services: "సర్వీసులు",
        portfolio: "పోర్ట్ఫోలియో",
        about: "గురించి",
        contact: "సంప్రదించండి",
      },
      footerIntro:
        "ఫుల్-స్టాక్ డెవలప్‌మెంట్, ఆటోమేషన్ మరియు సర్వర్ ఆపరేషన్స్ — నమ్మకమైన మరియు దీర్ఘకాలిక సిస్టమ్‌లను కోరుకునే బృందాల కోసం.",
      footer: {
        servicesTitle: "సర్వీసులు",
        servicesItems: [
          "వెబ్ & ప్రొడక్ట్ బిల్డ్స్",
          "DevOps & డిప్లాయ్‌మెంట్",
          "మెయింటెనెన్స్ & సపోర్ట్",
          "బగ్ ఫిక్సింగ్",
        ],
        companyTitle: "కంపెనీ",
        companyItems: ["అబౌట్", "పోర్ట్ఫోలియో", "టెస్టిమోనియల్స్"],
        contactTitle: "సంప్రదించండి",
        contactItems: [
          "ఈమెయిల్ & వాట్సాప్",
          "కోటు అభ్యర్థన",
          "బగ్ ఫిక్స్ రిక్వెస్ట్",
        ],
        copyright: "Kodidela Webkraft. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
        privacy: "ప్రైవసీ",
        terms: "నిబంధనలు",
      },
    },
    bugCard: {
      label: "బగ్ హామీ",
      title: "మీ సమస్య నిజంగా ఫిక్స్ అయినప్పుడు మాత్రమే చెల్లించండి.",
      description:
        "తక్షణ ప్రొడక్షన్ బగ్‌లు, డౌన్‌టైమ్ మరియు పనితీరు సమస్యల కోసం అనుకూలం. స్పష్టమైన డయాగ్నస్టిక్స్, ఫిక్స్ లేకపోతే బిల్లు లేదు.",
    },
    snapshotCard: {
      label: "స్నాప్‌షాట్",
      launches: "40+ లాంచ్‌లు",
      projectsLabel: "షిప్ చేసిన ప్రాజెక్టులు",
      responseLabel: "సగటు ప్రతిస్పందన",
      happyClientsLabel: "సంతృప్తి చెందిన క్లయింట్లు",
    },
    buildSection: {
      tag: "నేను ఏమి నిర్మిస్తాను",
      title: "ల్యాండింగ్ పేజీల నుండి సంక్లిష్ట డాష్‌బోర్డ్‌లు మరియు మౌలిక సదుపాయాల వరకు.",
      description:
        "వెబ్‌సైట్‌లు, అంతర్గత సాధనాలు, APIలు, ఆటోమేషన్, విస్తరణ పైప్‌లైన్‌లు మరియు దీర్ఘకాలిక నిర్వహణ. ప్రతిదీ రూపకల్పన, నిర్మించడం మరియు అమలులో ఉంచడానికి ఒక భాగస్వామి.",
      tabs: {
        web: {
          name: "వెబ్ & ఉత్పత్తి",
          title: "ఆధునిక వెబ్‌సైట్‌లు, డాష్‌బోర్డ్‌లు మరియు నిర్వాహక ప్యానెల్‌లు.",
          description:
            "నేను శుభ్రమైన UI/UX, పనితీరు మరియు దీర్ఘకాలిక నిర్వహణపై దృష్టి సారించి మార్కెటింగ్ సైట్‌లు, SaaS ప్లాట్‌ఫారమ్‌లు మరియు అంతర్గత సాధనాలను నిర్మిస్తాను. ప్రతి ప్రాజెక్ట్ ప్రతిస్పందించే, SEO-స్నేహపూర్వక మరియు స్కేల్ చేయడానికి సిద్ధంగా ఉంది.",
        },
        devops: {
          name: "DevOps & ఇన్‌ఫ్రా",
          title: "సురక్షితమైన, ఆటోమేటెడ్ మరియు నమ్మదగిన క్లౌడ్ మౌలిక సదుపాయాలు.",
          description:
            "నేను ఆధునిక క్లౌడ్ స్టాక్‌లపై CI/CD పైప్‌లైన్‌లు, పర్యవేక్షణ మరియు విస్తరణలను డిజైన్ చేస్తాను మరియు నిర్వహిస్తాను. మీ సిస్టమ్‌లు ఆన్‌లైన్‌లో, సురక్షితంగా మరియు నవీకరించడానికి సులభంగా ఉంటాయి, కాబట్టి మీరు మీ ఉత్పత్తిపై దృష్టి పెట్టవచ్చు.",
        },
        support: {
          name: "సంరక్షణ & మద్దతు",
          title: "కొనసాగుతున్న నిర్వహణ, బగ్ ఫిక్సింగ్ మరియు పనితీరు ట్యూనింగ్.",
          description:
            "నేను ఇప్పటికే ఉన్న సిస్టమ్‌ల కోసం బ్యాకప్‌లు, భద్రతా ప్యాచ్‌లు మరియు పనితీరు ఆప్టిమైజేషన్‌లను నిర్వహిస్తాను. మీ అప్లికేషన్ ఒక అంకితమైన భాగస్వామిచే పర్యవేక్షించబడుతుందని మరియు నిర్వహించబడుతుందని తెలుసుకోవడం ద్వారా మనశ్శాంతిని పొందండి.",
        },
      },
    },
    readySection: {
      tag: "మీరు సిద్ధంగా ఉన్నప్పుడు",
      title: "ఒక లింక్‌ను భాగస్వామ్యం చేయండి, సమస్యను వివరించండి మరియు నేను దానిని అక్కడ నుండి తీసుకుంటాను.",
      description:
        "వివరాలను పంపడానికి కోట్ లేదా బగ్-ఫిక్స్ ఫారమ్‌లను ఉపయోగించండి. మీరు పరిధి, ధర మరియు తదుపరి దశలతో స్పష్టమైన ప్రతిస్పందనను పొందుతారు-అస్పష్టమైన వాగ్దానాలు లేవు.",
      steps: ["వివరాలను పంపండి", "ఒక కోట్ పొందండి", "మేము రవాణా చేస్తాము"],
      primaryCta: "ఒక కోట్‌తో ప్రారంభించండి",
      secondaryCta: "ఒక బగ్‌ను నివేదించండి",
    },
  },
};

type ReferCopy = {
  hero: {
    title: string;
    description: string;
  };
  success: {
    title: string;
    subtitle: string;
    codeLabel: string;
    linkLabel: string;
    copyButton: string;
    copiedMessage: string;
  };
  howItWorks: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  form: {
    getStarted: string;
    joinTitle: string;
    joinDescription: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    payoutMethodLabel: string;
    upi: string;
    bank: string;
    paypal: string;
    submitButton: string;
    submittingButton: string;
    termsNote: string;
  };
  sidebar: {
    heading: string;
    title: string;
    steps: string[];
    proTip: string;
    proTipDescription: string;
  };
  benefits: {
    shareTitle: string;
    shareDesc: string;
    projectTitle: string;
    projectDesc: string;
    earnTitle: string;
    earnDesc: string;
  };
};

const REFER_COPY: Record<LanguageCode, ReferCopy> = {
  en: {
    hero: {
      title: "Refer & Earn 💸",
      description:
        "Share Kodidela WebKraft with your network and earn commission for every successful referral",
    },
    success: {
      title: "You're All Set! 🎉",
      subtitle:
        "Your referral link has been sent to your email. Share it to start earning!",
      codeLabel: "Your Referral Code",
      linkLabel: "Your Referral Link",
      copyButton: "Copy",
      copiedMessage: "Copied to clipboard!",
    },
    howItWorks: {
      step1Title: "Share Your Link",
      step1Desc:
        "Share your referral link with friends, colleagues, or on social media",
      step2Title: "They Get a Project",
      step2Desc:
        "When someone uses your link to request a quote, they get great service",
      step3Title: "You Earn Commission",
      step3Desc: "Get 10% commission when they become a paying client",
    },
    form: {
      getStarted: "Get Started",
      joinTitle: "Join Our Referral Program",
      joinDescription:
        "Register below to get your unique referral link. Share it with anyone who needs web development services, and earn 10% commission on every project they complete with us.",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone (Optional)",
      payoutMethodLabel: "Preferred Payout Method",
      upi: "UPI",
      bank: "Bank Transfer",
      paypal: "PayPal",
      submitButton: "Get My Referral Link",
      submittingButton: "Registering...",
      termsNote:
        "By registering, you agree to our referral program terms. You'll receive a unique referral link via email.",
    },
    sidebar: {
      heading: "How it Works",
      title: "Earn Commission Easily",
      steps: [
        "1. Get Your Link: Register and receive a unique referral code and link instantly",
        "2. Share It: Share your link with anyone looking for web development services",
        "3. They Request a Quote: When someone uses your link to submit a project request, it's tracked automatically",
        "4. Earn Commission: Get 10% commission when they become a paying client",
      ],
      proTip: "💡 Pro Tip",
      proTipDescription:
        "Share your link on LinkedIn, Twitter, or in relevant communities where people discuss web development needs!",
    },
    benefits: {
      shareTitle: "Share Your Link",
      shareDesc:
        "Share your referral link with friends, colleagues, or on social media",
      projectTitle: "They Get a Project",
      projectDesc:
        "When someone uses your link to request a quote, they get great service",
      earnTitle: "You Earn Commission",
      earnDesc: "Get 10% commission when they become a paying client",
    },
  },
  hi: {
    hero: {
      title: "रेफर करें और कमाएं 💸",
      description:
        "अपने नेटवर्क के साथ Kodidela WebKraft शेयर करें और हर सफल रेफरल पर कमीशन कमाएं",
    },
    success: {
      title: "आप तैयार हैं! 🎉",
      subtitle:
        "आपका रेफरल लिंक आपके ईमेल पर भेजा गया है। कमाई शुरू करने के लिए इसे शेयर करें!",
      codeLabel: "आपका रेफरल कोड",
      linkLabel: "आपका रेफरल लिंक",
      copyButton: "कॉपी करें",
      copiedMessage: "क्लिपबोर्ड पर कॉपी हो गया!",
    },
    howItWorks: {
      step1Title: "अपना लिंक शेयर करें",
      step1Desc:
        "अपना रेफरल लिंक दोस्तों, सहकर्मियों या सोशल मीडिया पर शेयर करें",
      step2Title: "उन्हें प्रोजेक्ट मिलता है",
      step2Desc:
        "जब कोई आपके लिंक से कोट रिक्वेस्ट करता है, उन्हें बेहतरीन सेवा मिलती है",
      step3Title: "आप कमीशन कमाएं",
      step3Desc: "जब वे भुगतान करने वाले क्लाइंट बनें तो 10% कमीशन पाएं",
    },
    form: {
      getStarted: "शुरू करें",
      joinTitle: "हमारे रेफरल प्रोग्राम से जुड़ें",
      joinDescription:
        "अपना यूनिक रेफरल लिंक पाने के लिए नीचे रजिस्टर करें। इसे किसी भी ऐसे व्यक्ति के साथ शेयर करें जिसे वेब डेवलपमेंट सेवाओं की जरूरत है, और हमारे साथ पूरे होने वाले हर प्रोजेक्ट पर 10% कमीशन कमाएं।",
      nameLabel: "नाम",
      emailLabel: "ईमेल",
      phoneLabel: "फोन (वैकल्पिक)",
      payoutMethodLabel: "पसंदीदा पेआउट विधि",
      upi: "UPI",
      bank: "बैंक ट्रांसफर",
      paypal: "PayPal",
      submitButton: "मेरा रेफरल लिंक पाएं",
      submittingButton: "रजिस्टर हो रहा है...",
      termsNote:
        "रजिस्टर करके, आप हमारे रेफरल प्रोग्राम की शर्तों से सहमत होते हैं। आपको ईमेल के जरिए एक यूनिक रेफरल लिंक मिलेगा।",
    },
    sidebar: {
      heading: "यह कैसे काम करता है",
      title: "आसानी से कमीशन कमाएं",
      steps: [
        "1. अपना लिंक पाएं: रजिस्टर करें और तुरंत एक यूनिक रेफरल कोड और लिंक प्राप्त करें",
        "2. इसे शेयर करें: अपना लिंक किसी भी ऐसे व्यक्ति के साथ शेयर करें जो वेब डेवलपमेंट सेवाएं ढूंढ रहा है",
        "3. वे कोट रिक्वेस्ट करें: जब कोई आपके लिंक से प्रोजेक्ट रिक्वेस्ट सबमिट करता है, तो यह ऑटोमेटिक ट्रैक होता है",
        "4. कमीशन कमाएं: जब वे भुगतान करने वाले क्लाइंट बनें तो 10% कमीशन पाएं",
      ],
      proTip: "💡 प्रो टिप",
      proTipDescription:
        "अपना लिंक LinkedIn, Twitter पर या उन समुदायों में शेयर करें where people discuss web development needs!",
    },
    benefits: {
      shareTitle: "अपना लिंक शेयर करें",
      shareDesc:
        "अपना रेफरल लिंक दोस्तों, सहकर्मियों या सोशल मीडिया पर शेयर करें",
      projectTitle: "उन्हें प्रोजेक्ट मिलता है",
      projectDesc:
        "जब कोई आपके लिंक से कोट रिक्वेस्ट करता है, उन्हें बेहतरीन सेवा मिलती है",
      earnTitle: "आप कमीशन कमाएं",
      earnDesc: "जब वे भुगतान करने वाले क्लाइंट बनें तो 10% कमीशन पाएं",
    },
  },
  ar: {
    hero: {
      title: "أحِل وأكسِب 💸",
      description:
        "شارك Kodidela WebKraft مع شبكتك واكسب عمولة عن كل إحالة ناجحة",
    },
    success: {
      title: "أنت جاهز! 🎉",
      subtitle:
        "تم إرسال رابط الإحالة إلى بريدك الإلكتروني. شاركه لبدء الكسب!",
      codeLabel: "كود الإحالة الخاص بك",
      linkLabel: "رابط الإحالة الخاص بك",
      copyButton: "نسخ",
      copiedMessage: "تم النسخ!",
    },
    howItWorks: {
      step1Title: "شارك رابطك",
      step1Desc:
        "شارك رابط الإحالة مع الأصدقاء والزملاء أو على وسائل التواصل",
      step2Title: "يحصلون على مشروع",
      step2Desc:
        "عندما يستخدم شخص ما رابطك لطلب عرض سعر، يحصل على خدمة رائعة",
      step3Title: "تكسب عمولة",
      step3Desc: "احصل على 10% عمولة عندما يصبحون عملاء دافعين",
    },
    form: {
      getStarted: "ابدأ",
      joinTitle: "انضم إلى برنامج الإحالة",
      joinDescription:
        "سجّل أدناه للحصول على رابط الإحالة الفريد. شاركه مع أي شخص يحتاج لخدمات تطوير الويب، واكسب 10% عمولة على كل مشروع يكملونه معنا.",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف (اختياري)",
      payoutMethodLabel: "طريقة الدفع المفضلة",
      upi: "UPI",
      bank: "تحويل بنكي",
      paypal: "PayPal",
      submitButton: "احصل على رابط الإحالة",
      submittingButton: "جارٍ التسجيل...",
      termsNote:
        "بالتسجيل، أنت توافق على شروط برنامج الإحالة. ستتلقى رابط إحالة فريد عبر البريد الإلكتروني.",
    },
    sidebar: {
      heading: "كيف يعمل",
      title: "اكسب عمولة بسهولة",
      steps: [
        "1. احصل على رابطك: سجّل واحصل على كود ورابط إحالة فريد فورًا",
        "2. شاركه: شارك رابطك مع أي شخص يبحث عن خدمات تطوير الويب",
        "3. يطلبون عرض سعر: عندما يستخدم شخص ما رابطك لتقديم طلب مشروع، يتم تتبعه تلقائيًا",
        "4. اكسب عمولة: احصل على 10% عمولة عندما يصبحون عملاء دافعين",
      ],
      proTip: "💡 نصيحة احترافية",
      proTipDescription:
        "شارك رابطك على LinkedIn أو Twitter أو في المجتمعات ذات الصلة حيث يناقش الناس احتياجات تطوير الويب!",
    },
    benefits: {
      shareTitle: "شارك رابطك",
      shareDesc:
        "شارك رابط الإحالة مع الأصدقاء والزملاء أو على وسائل التواصل",
      projectTitle: "يحصلون على مشروع",
      projectDesc:
        "عندما يستخدم شخص ما رابطك لطلب عرض سعر، يحصل على خدمة رائعة",
      earnTitle: "تكسب عمولة",
      earnDesc: "احصل على 10% عمولة عندما يصبحون عملاء دافعين",
    },
  },
  ur: {
    hero: {
      title: "ریفر کریں اور کمائیں 💸",
      description:
        "اپنے نیٹ ورک کے ساتھ Kodidela WebKraft شیئر کریں اور ہر کامیاب ریفرل پر کمیشن کمائیں",
    },
    success: {
      title: "آپ تیار ہیں! 🎉",
      subtitle:
        "آپ کا ریفرل لنک آپ کی ای میل پر بھیج دیا گیا ہے۔ کمائی شروع کرنے کے لیے اسے شیئر کریں!",
      codeLabel: "آپ کا ریفرل کوڈ",
      linkLabel: "آپ کا ریفرل لنک",
      copyButton: "کاپی کریں",
      copiedMessage: "کلپ بورڈ پر کاپی ہو گیا!",
    },
    howItWorks: {
      step1Title: "اپنا لنک شیئر کریں",
      step1Desc:
        "اپنا ریفرل لنک دوستوں، ساتھیوں یا سوشل میڈیا پر شیئر کریں",
      step2Title: "انہیں پروجیکٹ ملتا ہے",
      step2Desc:
        "جب کوئی آپ کے لنک سے کوٹ ریکویسٹ کرتا ہے، انہیں بہترین سروس ملتی ہے",
      step3Title: "آپ کمیشن کمائیں",
      step3Desc: "جب وہ ادائیگی کرنے والے کلائنٹ بنیں تو 10% کمیشن پائیں",
    },
    form: {
      getStarted: "شروع کریں",
      joinTitle: "ہمارے ریفرل پروگرام میں شامل ہوں",
      joinDescription:
        "اپنا یونیک ریفرل لنک پانے کے لیے نیچے رجسٹر کریں۔ اسے کسی بھی ایسے شخص کے ساتھ شیئر کریں جسے ویب ڈیولپمنٹ سروسز کی ضرورت ہے، اور ہمارے ساتھ مکمل ہونے والے ہر پروجیکٹ پر 10% کمیشن کمائیں۔",
      nameLabel: "نام",
      emailLabel: "ای میل",
      phoneLabel: "فون (اختیاری)",
      payoutMethodLabel: "پسندیدہ پےآؤٹ طریقہ",
      upi: "UPI",
      bank: "بینک ٹرانسفر",
      paypal: "PayPal",
      submitButton: "میرا ریفرل لنک پائیں",
      submittingButton: "رجسٹر ہو رہا ہے...",
      termsNote:
        "رجسٹر کرکے، آپ ہمارے ریفرل پروگرام کی شرائط سے متفق ہوتے ہیں۔ آپ کو ای میل کے ذریعے ایک یونیک ریفرل لنک ملے گا۔",
    },
    sidebar: {
      heading: "یہ کیسے کام کرتا ہے",
      title: "آسانی سے کمیشن کمائیں",
      steps: [
        "1. اپنا لنک پائیں: رجسٹر کریں اور فوری طور پر ایک یونیک ریفرل کوڈ اور لنک حاصل کریں",
        "2. اسے شیئر کریں: اپنا لنک کسی بھی ایسے شخص کے ساتھ شیئر کریں جو ویب ڈیولپمنٹ سروسز تلاش کر رہا ہے",
        "3. وہ کوٹ ریکویسٹ کریں: جب کوئی آپ کے لنک سے پروجیکٹ ریکویسٹ سبمٹ کرتا ہے، تو یہ خودکار ٹریک ہوتا ہے",
        "4. کمیشن کمائیں: جب وہ ادائیگی کرنے والے کلائنٹ بنیں تو 10% کمیشن پائیں",
      ],
      proTip: "💡 پرو ٹپ",
      proTipDescription:
        "اپنا لنک LinkedIn، Twitter پر یا متعلقہ کمیونٹیز میں شیئر کریں جہاں لوگ ویب ڈیولپمنٹ کی ضروریات پر بات کرتے ہیں!",
    },
    benefits: {
      shareTitle: "اپنا لنک شیئر کریں",
      shareDesc:
        "اپنا ریفرل لنک دوستوں، ساتھیوں یا سوشل میڈیا پر شیئر کریں",
      projectTitle: "انہیں پروجیکٹ ملتا ہے",
      projectDesc:
        "جب کوئی آپ کے لنک سے کوٹ ریکویسٹ کرتا ہے، انہیں بہترین سروس ملتی ہے",
      earnTitle: "آپ کمیشن کمائیں",
      earnDesc: "جب وہ ادائیگی کرنے والے کلائنٹ بنیں تو 10% کمیشن پائیں",
    },
  },
  fr: {
    hero: {
      title: "Parrainer & Gagner 💸",
      description:
        "Partagez Kodidela WebKraft avec votre réseau et gagnez une commission pour chaque parrainage réussi",
    },
    success: {
      title: "Vous êtes prêt ! 🎉",
      subtitle:
        "Votre lien de parrainage a été envoyé à votre email. Partagez-le pour commencer à gagner !",
      codeLabel: "Votre code de parrainage",
      linkLabel: "Votre lien de parrainage",
      copyButton: "Copier",
      copiedMessage: "Copié !",
    },
    howItWorks: {
      step1Title: "Partagez votre lien",
      step1Desc:
        "Partagez votre lien de parrainage avec des amis, collègues ou sur les réseaux sociaux",
      step2Title: "Ils obtiennent un projet",
      step2Desc:
        "Quand quelqu'un utilise votre lien pour demander un devis, il reçoit un excellent service",
      step3Title: "Vous gagnez une commission",
      step3Desc: "Recevez 10% de commission quand ils deviennent clients payants",
    },
    form: {
      getStarted: "Commencer",
      joinTitle: "Rejoignez notre programme de parrainage",
      joinDescription:
        "Inscrivez-vous ci-dessous pour obtenir votre lien de parrainage unique. Partagez-le avec toute personne ayant besoin de services de développement web, et gagnez 10% de commission sur chaque projet qu'elle réalise avec nous.",
      nameLabel: "Nom",
      emailLabel: "Email",
      phoneLabel: "Téléphone (Optionnel)",
      payoutMethodLabel: "Méthode de paiement préférée",
      upi: "UPI",
      bank: "Virement bancaire",
      paypal: "PayPal",
      submitButton: "Obtenir mon lien de parrainage",
      submittingButton: "Inscription...",
      termsNote:
        "En vous inscrivant, vous acceptez les conditions du programme de parrainage. Vous recevrez un lien de parrainage unique par email.",
    },
    sidebar: {
      heading: "Comment ça marche",
      title: "Gagnez facilement une commission",
      steps: [
        "1. Obtenez votre lien : Inscrivez-vous et recevez instantanément un code et un lien de parrainage uniques",
        "2. Partagez-le : Partagez votre lien avec toute personne cherchant des services de développement web",
        "3. Ils demandent un devis : Quand quelqu'un utilise votre lien pour soumettre une demande de projet, elle est automatiquement suivie",
        "4. Gagnez une commission : Recevez 10% de commission quand ils deviennent clients payants",
      ],
      proTip: "💡 Astuce",
      proTipDescription:
        "Partagez votre lien sur LinkedIn, Twitter ou dans les communautés pertinentes où les gens discutent de leurs besoins en développement web !",
    },
    benefits: {
      shareTitle: "Partagez votre lien",
      shareDesc:
        "Partagez votre lien de parrainage avec des amis, collègues ou sur les réseaux sociaux",
      projectTitle: "Ils obtiennent un projet",
      projectDesc:
        "Quand quelqu'un utilise votre lien pour demander un devis, il reçoit un excellent service",
      earnTitle: "Vous gagnez une commission",
      earnDesc: "Recevez 10% de commission quand ils deviennent clients payants",
    },
  },
  es: {
    hero: {
      title: "Refiere y Gana 💸",
      description:
        "Comparte Kodidela WebKraft con tu red y gana comisión por cada referido exitoso",
    },
    success: {
      title: "¡Todo listo! 🎉",
      subtitle:
        "Tu enlace de referido ha sido enviado a tu email. ¡Compártelo para empezar a ganar!",
      codeLabel: "Tu código de referido",
      linkLabel: "Tu enlace de referido",
      copyButton: "Copiar",
      copiedMessage: "¡Copiado!",
    },
    howItWorks: {
      step1Title: "Comparte tu enlace",
      step1Desc:
        "Comparte tu enlace de referido con amigos, colegas o en redes sociales",
      step2Title: "Obtienen un proyecto",
      step2Desc:
        "Cuando alguien usa tu enlace para solicitar un presupuesto, recibe un excelente servicio",
      step3Title: "Ganas comisión",
      step3Desc: "Obtén 10% de comisión cuando se conviertan en clientes de pago",
    },
    form: {
      getStarted: "Comenzar",
      joinTitle: "Únete a nuestro programa de referidos",
      joinDescription:
        "Regístrate abajo para obtener tu enlace de referido único. Compártelo con cualquiera que necesite servicios de desarrollo web, y gana 10% de comisión en cada proyecto que completen con nosotros.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      phoneLabel: "Teléfono (Opcional)",
      payoutMethodLabel: "Método de pago preferido",
      upi: "UPI",
      bank: "Transferencia bancaria",
      paypal: "PayPal",
      submitButton: "Obtener mi enlace de referido",
      submittingButton: "Registrando...",
      termsNote:
        "Al registrarte, aceptas los términos del programa de referidos. Recibirás un enlace de referido único por email.",
    },
    sidebar: {
      heading: "Cómo funciona",
      title: "Gana comisión fácilmente",
      steps: [
        "1. Obtén tu enlace: Regístrate y recibe un código y enlace de referido únicos al instante",
        "2. Compártelo: Comparte tu enlace con cualquiera que busque servicios de desarrollo web",
        "3. Solicitan un presupuesto: Cuando alguien usa tu enlace para enviar una solicitud de proyecto, se rastrea automáticamente",
        "4. Gana comisión: Obtén 10% de comisión cuando se conviertan en clientes de pago",
      ],
      proTip: "💡 Consejo",
      proTipDescription:
        "¡Comparte tu enlace en LinkedIn, Twitter o en comunidades relevantes donde la gente discute necesidades de desarrollo web!",
    },
    benefits: {
      shareTitle: "Comparte tu enlace",
      shareDesc:
        "Comparte tu enlace de referido con amigos, colegas o en redes sociales",
      projectTitle: "Obtienen un proyecto",
      projectDesc:
        "Cuando alguien usa tu enlace para solicitar un presupuesto, recibe un excelente servicio",
      earnTitle: "Ganas comisión",
      earnDesc: "Obtén 10% de comisión cuando se conviertan en clientes de pago",
    },
  },
  te: {
    hero: {
      title: "రిఫర్ చేసి సంపాదించండి 💸",
      description:
        "మీ నెట్‌వర్క్‌తో Kodidela WebKraft షేర్ చేసి ప్రతి విజయవంతమైన రిఫెరల్‌కు కమిషన్ సంపాదించండి",
    },
    success: {
      title: "మీరు సిద్ధంగా ఉన్నారు! 🎉",
      subtitle:
        "మీ రిఫరల్ లింక్ మీ ఈమెయిల్‌కు పంపబడింది। సంపాదన ప్రారంభించడానికి దాన్ని షేర్ చేయండి!",
      codeLabel: "మీ రిఫరల్ కోడ్",
      linkLabel: "మీ రిఫరల్ లింక్",
      copyButton: "కాపీ చేయండి",
      copiedMessage: "క్లిప్‌బోర్డ్‌కు కాపీ అయింది!",
    },
    howItWorks: {
      step1Title: "మీ లింక్ షేర్ చేయండి",
      step1Desc:
        "మీ రిఫరల్ లింక్‌ను స్నేహితులు, సహోద్యోగులతో లేదా సోషల్ మీడియాలో షేర్ చేయండి",
      step2Title: "వారికి ప్రాజె క్ట్ లభిస్తుంది",
      step2Desc:
        "ఎవరైనా మీ లింక్ ఉపయోగించి కోట్ అభ్యర్థిస్తే, వారికి గొప్ప సేవ లభిస్తుంది",
      step3Title: "మీరు కమిషన్ సంపాదించండి",
      step3Desc:
        "వారు చెల్లించే క్లయింట్‌గా మారినప్పుడు 10% కమిషన్ పొందండి",
    },
    form: {
      getStarted: "ప్రారంభించండి",
      joinTitle: "మా రిఫరల్ ప్రోగ్రామ్‌లో చేరండి",
      joinDescription:
        "మీ ప్రత్యేక రిఫరల్ లింక్ పొందడానికి క్రింద రిజిస్టర్ చేయండి। వెబ్ డెవలప్‌మెంట్ సేవలు అవసరమైన ఎవరితోనైనా దాన్ని షేర్ చేసి, మాతో వారు పూర్తి చేసే ప్రతి ప్రాజెక్ట్‌పై 10% కమిషన్ సంపాదించండి।",
      nameLabel: "పేరు",
      emailLabel: "ఈమెయిల్",
      phoneLabel: "ఫోన్ (ఐచ్ఛికం)",
      payoutMethodLabel: "ప్రాధాన్య పేఅవుట్ పద్ధతి",
      upi: "UPI",
      bank: "బ్యాంక్ బదిలీ",
      paypal: "PayPal",
      submitButton: "నా రిఫరల్ లింక్ పొందండి",
      submittingButton: "రిజిస్టర్ అవుతోంది...",
      termsNote:
        "రిజిస్టర్ చేయడం ద్వారా, మీరు మా రిఫరల్ ప్రోగ్రామ్ నిబంధనలకు అంగీకరిస్తారు। మీరు ఈమెయిల్ ద్వారా ఒక ప్రత్యేక రిఫరల్ లింక్ అందుకుంటారు।",
    },
    sidebar: {
      heading: "ఇది ఎలా పనిచేస్తుంది",
      title: "సులభంగా కమిషన్ సంపాదించండి",
      steps: [
        "1. మీ లింక్ పొందండి: రిజిస్టర్ చేసి వెంటనే ప్రత్యేక రిఫరల్ కోడ్ మరియు లింక్ పొందండి",
        "2. దాన్ని షేర్ చేయండి: వెబ్ డెవలప్‌మెంట్ సేవలు కోసం వెతుకుతున్న ఎవరితోనైనా మీ లింక్ షేర్ చేయండి",
        "3. వారు కోట్ అభ్యర్థిస్తారు: ఎవరైనా మీ లింక్ ఉపయోగించి ప్రాజెక్ట్ అభ్యర్థన సమర్పించినప్పుడు, అది స్వయంచాలకంగా ట్రాక్ చేయబడుతుంది",
        "4. కమిషన్ సంపాదించండి: వారు చెల్లించే క్లయింట్‌గా మారినప్పుడు 10% కమిషన్ పొందండి",
      ],
      proTip: "💡 ప్రో చిట్కా",
      proTipDescription:
        "మీ లింక్‌ను LinkedIn, Twitter లేదా వెబ్ డెవలప్‌మెంట్ అవసరాల గురించి ప్రజలు చర్చించే సంబంధిత కమ్యూనిటీలలో షేర్ చేయండి!",
    },
    benefits: {
      shareTitle: "మీ లింక్ షేర్ చేయండి",
      shareDesc:
        "మీ రిఫరల్ లింక్‌ను స్నేహితులు, సహోద్యోగులతో లేదా సోషల్ మీడియాలో షేర్ చేయండి",
      projectTitle: "వారికి ప్రాజెక్ట్ లభిస్తుంది",
      projectDesc:
        "ఎవరైనా మీ లింక్ ఉపయోగించి కోట్ అభ్యర్థిస్తే, వారికి గొప్ప సేవ లభిస్తుంది",
      earnTitle: "మీరు కమిషన్ సంపాదించండి",
      earnDesc:
        "వారు చెల్లించే క్లయింట్‌గా మారినప్పుడు 10% కమిషన్ పొందండి",
    },
  },
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  homeCopy: HomeCopy;
  servicesCopy: ServicesCopy;
  portfolioCopy: PortfolioCopy;
  aboutCopy: AboutCopy;
  referCopy: ReferCopy;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const RTL_LANGS: LanguageCode[] = ["ar", "ur"];

function isRtl(code: LanguageCode) {
  return RTL_LANGS.includes(code);
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem("lang") as LanguageCode | null;
  if (stored && stored in HOME_COPY) {
    return stored;
  }

  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("hi")) return "hi";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("ur")) return "ur";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("te")) return "te";

  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language once on mount without a follow-up setState inside an effect
  const [language, setLanguageState] = useState<LanguageCode>(() =>
    typeof window === "undefined" ? "en" : getInitialLanguage(),
  );


  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.lang = language;
    root.dir = isRtl(language) ? "rtl" : "ltr";
    window.localStorage.setItem("lang", language);
  }, [language]);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
  };

  const value: LanguageContextValue = useMemo(
    () => ({
      language,
      setLanguage,
      homeCopy: HOME_COPY[language] ?? HOME_COPY.en,
      servicesCopy: SERVICES_COPY[language] ?? SERVICES_COPY.en,
      portfolioCopy: PORTFOLIO_COPY[language] ?? PORTFOLIO_COPY.en,
      aboutCopy: ABOUT_COPY[language] ?? ABOUT_COPY.en,
      referCopy: REFER_COPY[language] ?? REFER_COPY.en,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export const supportedLanguages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "ar", label: "AR" },
  { code: "ur", label: "UR" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "te", label: "TE" },
];
