"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { useReferralCode } from "@/components/referral-tracker";
import type { LanguageCode } from "@/components/language-provider";

export default function ContactPage() {
  const { language } = useLanguage();
  const copy = CONTACT_COPY[language] ?? CONTACT_COPY.en;
  const refCode = useReferralCode();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/quote/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          project_type: formData.projectType,
          ref_code: refCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thank you! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          details: "",
        });
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] space-y-16 px-4 py-10 md:px-8 md:py-16">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {copy.hero.title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {copy.hero.description}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-medium">
          <a
            href="#contact-form"
            className="rounded-full bg-blue-500 px-5 py-2 text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400"
          >
            {copy.hero.primaryCta}
          </a>
          <a
            href="#faq"
            className="rounded-full border border-zinc-700 px-5 py-2 text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-900"
          >
            {copy.hero.secondaryCta}
          </a>
          <a
            href="/refer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-5 py-2 text-white shadow-lg shadow-blue-500/40 transition hover:from-blue-400 hover:to-emerald-400"
          >
            <span>💰</span>
            Refer & Earn
          </a>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/70">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.35),_transparent_55%)] opacity-80 blur-3xl" />
          <Image
            src="/window.svg"
            alt={copy.introVideo.alt}
            fill
            className="relative object-contain p-6 animate-float-slow"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] text-zinc-200">
            <span>{copy.introVideo.caption}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {copy.introVideo.badge}
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          {copy.introVideo.note}
        </p>
      </section>

      <section
        id="contact-form"
        className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {copy.form.tag}
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {copy.form.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {copy.form.description}
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm text-zinc-100">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">{copy.form.nameLabel} *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">{copy.form.emailLabel} *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">{copy.form.companyLabel}</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">{copy.form.projectTypeLabel}</label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">{copy.form.budgetLabel}</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                {copy.form.detailsLabel}
              </label>
              <textarea
                name="details"
                rows={4}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
                placeholder={copy.form.detailsPlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : copy.form.submitCta}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-400">{message}</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{message}</p>
            )}

            <p className="text-xs text-zinc-500">
              {refCode ? `✨ Referred by: ${refCode}` : copy.form.note}
            </p>
          </form>
        </div>

        <aside
          id="faq"
          className="space-y-6 rounded-2xl border border-white/10 bg-black/50 p-6 text-sm text-zinc-100 shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {copy.faq.tag}
            </p>
            <h3 className="text-xl font-semibold text-white md:text-2xl">
              {copy.faq.title}
            </h3>
          </div>

          <div className="space-y-4 text-xs text-zinc-300 md:text-[13px]">
            {copy.faq.items.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center shadow-[0_24px_90px_rgba(0,0,0,0.95)]">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {copy.newsletter.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {copy.newsletter.description}
          </p>
        </div>

        <form className="mx-auto flex max-w-md flex-col gap-3 text-sm sm:flex-row">
          <input
            type="email"
            required
            placeholder={copy.newsletter.emailPlaceholder}
            className="flex-1 rounded-full border border-zinc-800 bg-black/40 px-4 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            {copy.newsletter.submitCta}
          </button>
        </form>

        <p className="text-[11px] text-zinc-500">
          {copy.newsletter.note}
        </p>

        <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-xl bg-black/70">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.35),_transparent_55%)] opacity-80 blur-3xl" />
          <Image
            src="/file.svg"
            alt={copy.newsletter.videoAlt}
            fill
            className="relative object-contain p-6 animate-float-slow"
          />
        </div>
      </section>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
}

function FormField({ label, type, name }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-zinc-300">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/40 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2"
      />
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="space-y-1">
      <p className="font-semibold text-zinc-100">{question}</p>
      <p className="text-zinc-400">{answer}</p>
    </div>
  );
}

interface ContactFaqItem {
  question: string;
  answer: string;
}

interface ContactCopy {
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  introVideo: {
    alt: string;
    caption: string;
    badge: string;
    note: string;
  };
  form: {
    tag: string;
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    projectTypeLabel: string;
    budgetLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitCta: string;
    note: string;
  };
  faq: {
    tag: string;
    title: string;
    items: ContactFaqItem[];
  };
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    submitCta: string;
    note: string;
    videoAlt: string;
  };
}

const EN_CONTACT_COPY: ContactCopy = {
  hero: {
    title: "Ready to build something real",
    description:
      "Let's talk about your project and choose the right approach for what you need—whether it's a new build, maintenance, or a one-off bug fix.",
    primaryCta: "Start",
    secondaryCta: "Pricing & questions",
  },
  introVideo: {
    alt: "Client collaboration overview",
    caption: "How we'll work together – short overview",
    badge: "Watch intro",
    note: "Replace this preview with a short intro or process video to set expectations before a call.",
  },
  form: {
    tag: "Contact",
    title: "Share a bit about your project",
    description:
      "Answer a few quick questions and I'll follow up with options, timelines, and transparent pricing. No spam, no pressure.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company / Organization",
    projectTypeLabel: "Project type",
    budgetLabel: "Budget range",
    detailsLabel: "Project details",
    detailsPlaceholder:
      "Share goals, timelines, and any links that help explain what you need.",
    submitCta: "Submit enquiry",
    note:
      "Forms don't send anywhere yet—backend and admin panel will handle submissions in the next steps.",
  },
  faq: {
    tag: "Questions",
    title: "How I work and what to expect",
    items: [
      {
        question: "How does the bug guarantee work?",
        answer:
          "You only pay when the bug is actually fixed and verified. If I can't solve it, there's no charge.",
      },
      {
        question: "What's your typical project timeline?",
        answer:
          "It depends on scope and complexity. Smaller sites take days or weeks, larger systems take longer—but you'll always get a clear estimate before we start.",
      },
      {
        question: "Do you handle existing projects?",
        answer:
          "Yes. I review the current codebase, identify risks, and keep things running while we improve it.",
      },
      {
        question: "Which technologies do you use?",
        answer:
          "Modern, proven stacks that stay current—like Next.js, Node, and modern DevOps tooling. I choose what fits your use case, not the buzzword.",
      },
      {
        question: "Can we talk before committing?",
        answer:
          "Absolutely. We can schedule a short call to discuss needs, expectations, and fit before any commitment.",
      },
    ],
  },
  newsletter: {
    title: "Stay updated on development insights",
    description:
      "Get updates on new projects, tech practices, and lessons learned from real client work—sent occasionally, not daily.",
    emailPlaceholder: "Your email",
    submitCta: "Subscribe",
    note:
      "By subscribing, you agree to receive occasional emails. You can unsubscribe any time.",
    videoAlt: "Newsletter and insight preview",
  },
};

const CONTACT_COPY: Record<LanguageCode, ContactCopy> = {
  en: EN_CONTACT_COPY,
  hi: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "कुछ वास्तविक बनाने के लिए तैयार हैं",
      description:
        "अपने प्रोजेक्ट के बारे में बात करें और सही अप्रोच चुनें — चाहे आपको नई वेबसाइट चाहिए, मेंटेनेंस, या किसी एक बार के बग-फिक्स की ज़रूरत हो।",
      primaryCta: "शुरू करें",
      secondaryCta: "प्राइसिंग और सवाल",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "संपर्क",
      title: "अपने प्रोजेक्ट के बारे में थोड़ा साझा करें",
      description:
        "कुछ छोटे सवालों के जवाब दें और मैं आपको विकल्प, टाइमलाइन और पारदर्शी प्राइसिंग के साथ जवाब दूंगा। न कोई स्पैम, न कोई दबाव।",
      nameLabel: "नाम",
      emailLabel: "ईमेल",
      companyLabel: "कंपनी / संगठन",
      projectTypeLabel: "प्रोजेक्ट टाइप",
      budgetLabel: "बजट रेंज",
      detailsLabel: "प्रोजेक्ट डिटेल्स",
      detailsPlaceholder:
        "अपने लक्ष्य, टाइमलाइन और कोई भी लिंक शेयर करें जो आपकी ज़रूरत समझाने में मदद करे।",
      submitCta: "क्वेरी सबमिट करें",
      note:
        "यह फ़ॉर्म अभी कहीं सबमिट नहीं होता — अगले चरण में बैकएंड और एडमिन पैनल सबमिशन संभालेंगे।",
    },
    faq: {
      ...EN_CONTACT_COPY.faq,
      tag: "प्रश्न",
      title: "मैं कैसे काम करता हूँ और आप क्या उम्मीद कर सकते हैं",
      items: [
        {
          question: "बग गारंटी कैसे काम करती है?",
          answer:
            "आप केवल तभी भुगतान करते हैं जब बग सच में फिक्स हो जाए और वेरिफाई हो जाए। अगर मैं उसे हल नहीं कर पाया, तो कोई चार्ज नहीं।",
        },
        {
          question: "आमतौर पर प्रोजेक्ट पूरा होने में कितना समय लगता है?",
          answer:
            "यह स्कोप और जटिलता पर निर्भर करता है। छोटे साइट्स कुछ दिन या हफ़्तों में बन जाते हैं, बड़े सिस्टम में ज़्यादा समय लगता है — लेकिन शुरू करने से पहले आपको हमेशा एक साफ़ टाइमलाइन मिलती है।",
        },
        {
          question: "क्या आप पहले से बने प्रोजेक्ट्स पर भी काम करते हैं?",
          answer:
            "हाँ। मैं मौजूदा कोडबेस की समीक्षा करता हूँ, रिस्क पहचानता हूँ और सुधार के साथ‑साथ सिस्टम को स्थिर रखता हूँ।",
        },
        {
          question: "आप कौन‑सी टेक्नोलॉजीज़ का इस्तेमाल करते हैं?",
          answer:
            "आधुनिक और भरोसेमंद स्टैक — जैसे Next.js, Node और मॉडर्न DevOps टूलिंग। मैं वही तकनीक चुनता हूँ जो आपके यूज़‑केस के लिए सही हो, सिर्फ़ ट्रेंड के लिए नहीं।",
        },
        {
          question: "क्या हम कमिटमेंट से पहले बात कर सकते हैं?",
          answer:
            "बिलकुल। हम एक छोटा कॉल शेड्यूल कर सकते हैं जहाँ आपकी ज़रूरत, उम्मीदें और फिट पर खुलकर बात हो सके — किसी तरह की बाध्यता के बिना।",
        },
      ],
    },
    newsletter: {
      ...EN_CONTACT_COPY.newsletter,
      title: "डेवलपमेंट इनसाइट्स से जुड़े रहें",
      description:
        "नए प्रोजेक्ट्स, टेक प्रैक्टिसेज़ और रियल क्लाइंट वर्क से सीखे गए अनुभवों के अपडेट पाएं — कभी‑कभी भेजे जाएंगे, रोज़ नहीं।",
      emailPlaceholder: "आपका ईमेल",
      submitCta: "सब्सक्राइब करें",
      note:
        "सब्सक्राइब करके आप कभी‑कभी आने वाले ईमेल के लिए सहमति देते हैं। आप कभी भी अनसब्सक्राइब कर सकते हैं।",
      videoAlt: "न्यूज़लेटर और इनसाइट प्रीव्यू",
    },
  },
  ar: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "جاهز لبناء شيء حقيقي",
      description:
        "دعنا نتحدث عن مشروعك ونختار النهج المناسب لما تحتاجه — سواء كان موقعًا جديدًا، صيانة، أو إصلاح خطأ واحد فقط.",
      primaryCta: "ابدأ",
      secondaryCta: "الأسعار والأسئلة",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "تواصل",
      title: "شارك بعض التفاصيل عن مشروعك",
      description:
        "أجب عن بعض الأسئلة السريعة وسأعود إليك بخيارات، وجداول زمنية، وتسعير واضح. بدون رسائل مزعجة أو ضغط.",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      companyLabel: "الشركة / الجهة",
      projectTypeLabel: "نوع المشروع",
      budgetLabel: "نطاق الميزانية",
      detailsLabel: "تفاصيل المشروع",
      detailsPlaceholder:
        "شارك الأهداف والجداول الزمنية وأي روابط تساعد في توضيح ما تحتاجه.",
      submitCta: "إرسال الطلب",
      note:
        "هذا النموذج لا يرسل أي بيانات بعد — في الخطوات القادمة سيتم ربطه بالباك إند ولوحة التحكم.",
    },
  },
  ur: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "کچھ حقیقت میں بنانے کے لیے تیار ہیں؟",
      description:
        "آئیے آپ کے پروجیکٹ کے بارے میں بات کریں اور آپ کی ضرورت کے مطابق درست اپروچ منتخب کریں — چاہے نیا بلڈ ہو، مینٹیننس، یا ایک بار کا بگ فکس۔",
      primaryCta: "شروع کریں",
      secondaryCta: "پرائسنگ اور سوالات",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "رابطہ",
      title: "اپنے پروجیکٹ کے بارے میں تھوڑا سا شیئر کریں",
      description:
        "چند مختصر سوالات کے جواب دیں، اور میں آپ کو آپشنز، ٹائم لائن اور شفاف پرائسنگ کے ساتھ ریپلائی کروں گا۔ نہ اسپیم، نہ پریشر۔",
      nameLabel: "نام",
      emailLabel: "ای میل",
      companyLabel: "کمپنی / ادارہ",
      projectTypeLabel: "پروجیکٹ کی قسم",
      budgetLabel: "بجٹ رینج",
      detailsLabel: "پروجیکٹ کی تفصیل",
      detailsPlaceholder:
        "اہداف، ٹائم لائن اور کوئی بھی لنکس شیئر کریں جو آپ کی ضرورت کو واضح کرنے میں مدد کریں۔",
      submitCta: "انکوائری بھیجیں",
      note:
        "یہ فارم فی الحال کہیں سبمٹ نہیں ہوتا — اگلے مرحلے میں بیک اینڈ اور ایڈمن پینل سبمیشنز ہینڈل کریں گے۔",
    },
  },
  fr: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "Prêt à construire quelque chose de concret",
      description:
        "Parlons de votre projet et choisissons la bonne approche pour vos besoins — nouveau site, maintenance ou simple correction de bug.",
      primaryCta: "Commencer",
      secondaryCta: "Tarifs & questions",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "Contact",
      title: "Partagez quelques détails sur votre projet",
      description:
        "Répondez à quelques questions rapides et je vous reviens avec des options, des délais et une tarification transparente. Pas de spam, pas de pression.",
      nameLabel: "Nom",
      emailLabel: "Email",
      companyLabel: "Entreprise / Organisation",
      projectTypeLabel: "Type de projet",
      budgetLabel: "Budget",
      detailsLabel: "Détails du projet",
      detailsPlaceholder:
        "Partagez vos objectifs, vos délais et tout lien qui aide à illustrer votre besoin.",
      submitCta: "Envoyer la demande",
      note:
        "Ce formulaire n'envoie encore rien — le backend et le panneau d'admin géreront les envois à l'étape suivante.",
    },
  },
  es: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "Listo para construir algo real",
      description:
        "Hablemos de tu proyecto y elijamos el enfoque correcto para lo que necesitas — ya sea un nuevo desarrollo, mantenimiento o la corrección puntual de un bug.",
      primaryCta: "Empezar",
      secondaryCta: "Precios y preguntas",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "Contacto",
      title: "Cuéntame un poco sobre tu proyecto",
      description:
        "Responde a unas pocas preguntas rápidas y te enviaré opciones, plazos y precios transparentes. Sin spam ni presión.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      companyLabel: "Empresa / Organización",
      projectTypeLabel: "Tipo de proyecto",
      budgetLabel: "Rango de presupuesto",
      detailsLabel: "Detalles del proyecto",
      detailsPlaceholder:
        "Comparte objetivos, plazos y cualquier enlace que ayude a explicar lo que necesitas.",
      submitCta: "Enviar consulta",
      note:
        "Este formulario todavía no envía datos — el backend y el panel de administración gestionarán los envíos en los siguientes pasos.",
    },
  },
  te: {
    ...EN_CONTACT_COPY,
    hero: {
      ...EN_CONTACT_COPY.hero,
      title: "ఏదైనా నిజమైనదాన్ని నిర్మించడానికి సిద్ధంగా ఉన్నారా?",
      description:
        "మీ ప్రాజెక్ట్ గురించి మాట్లాడి, మీ అవసరానికి సరిపడే సరైన దృక్పథాన్ని ఎంచుకుందాం — కొత్త బిల్డ్ కావచ్చు, మెయింటెనెన్స్ కావచ్చు లేదా ఒక్కసారి బగ్ ఫిక్స్ కావచ్చు.",
      primaryCta: "ప్రారంభించండి",
      secondaryCta: "ప్రైసింగ్ & ప్రశ్నలు",
    },
    form: {
      ...EN_CONTACT_COPY.form,
      tag: "సంప్రదించండి",
      title: "మీ ప్రాజెక్ట్ గురించి కొంచెం వివరించండి",
      description:
        "కొన్ని చిన్న ప్రశ్నలకు సమాధానం ఇవ్వండి, నేను ఆప్షన్లు, టైమ్‌లైన్‌లు మరియు క్లియర్ ప్రైసింగ్‌తో మిమ్మల్ని సంప్రదిస్తాను. స్పామ్ లేదు, ప్రెషర్ లేదు.",
      nameLabel: "పేరు",
      emailLabel: "ఈమెయిల్",
      companyLabel: "కంపెనీ / ఆర్గనైజేషన్",
      projectTypeLabel: "ప్రాజెక్ట్ రకం",
      budgetLabel: "బడ్జెట్ రేంజ్",
      detailsLabel: "ప్రాజెక్ట్ వివరాలు",
      detailsPlaceholder:
        "మీ లక్ష్యాలు, టైమ్‌లైన్‌లు మరియు మీ అవసరాన్ని వివరిచేందుకు సహాయపడే లింక్‌లను షేర్ చేయండి.",
      submitCta: "ఇంక్వయిరీ పంపండి",
      note:
        "ఈ ఫారమ్ ప్రస్తుతం ఎక్కడా సబ్మిట్ అవదు — తర్వాతి దశల్లో బ్యాక్‌ఎండ్ మరియు అడ్మిన్ ప్యానెల్ సమర్పణలను హ్యాండిల్ చేస్తాయి.",
    },
  },
};
