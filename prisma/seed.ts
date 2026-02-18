import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin@123456", 12);
  await prisma.user.upsert({
    where: { email: "admin@editorsforuk.com" },
    update: {},
    create: {
      email: "admin@editorsforuk.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("✅ Admin user created");

  // Create services
  const services = [
    {
      title: "Assignment Writing",
      slug: "assignment",
      description: "Expert assignment writing services tailored to your specific requirements. Our qualified writers deliver meticulously researched, perfectly structured assignments that meet the highest academic standards.",
      shortDesc: "Professional assignment help from subject-matter experts",
      icon: "FileText",
      heroTitle: "Premium Assignment Writing Service",
      heroSubtitle: "Get expertly crafted assignments that exceed expectations",
      features: [
        "Custom-written from scratch",
        "Subject-specialist writers",
        "Thorough research & analysis",
        "Proper academic formatting",
        "Free plagiarism report",
        "Unlimited revisions",
      ],
      benefits: [
        "Expert Writers — PhD-qualified with deep subject expertise",
        "Original Content — 100% plagiarism-free, custom-written work",
        "On-Time Delivery — Never miss a deadline with our reliable service",
        "Quality Assured — Multi-stage quality checks before delivery",
        "Any Subject — Coverage across all academic disciplines",
        "Affordable Pricing — Competitive rates with no hidden charges",
      ],
      process: [
        { step: 1, title: "Submit Requirements", description: "Share your assignment brief, guidelines, and deadline" },
        { step: 2, title: "Writer Assignment", description: "We match you with the best expert in your field" },
        { step: 3, title: "Research & Writing", description: "Your writer crafts a thorough, well-researched piece" },
        { step: 4, title: "Quality Check & Delivery", description: "Final review, plagiarism check, and on-time delivery" },
      ],
      metaTitle: "Assignment Writing Service UK | Expert Academic Help | EditorsForUK",
      metaDesc: "Get premium assignment writing help from UK-based experts. Custom-written, plagiarism-free assignments delivered on time. Order now!",
      sortOrder: 1,
    },
    {
      title: "Essay Writing",
      slug: "essay",
      description: "Compelling, well-argued essays crafted by academic professionals. From argumentative to analytical, our writers produce essays that demonstrate critical thinking and academic excellence.",
      shortDesc: "Professionally written essays that earn top marks",
      icon: "BookOpen",
      heroTitle: "Expert Essay Writing Service",
      heroSubtitle: "Articulate, well-researched essays that impress",
      features: [
        "Compelling arguments",
        "Critical analysis",
        "Proper citations",
        "Multiple essay types",
        "Free bibliography",
        "Revision guarantee",
      ],
      benefits: [
        "Skilled Writers — Experienced in all essay formats and styles",
        "Strong Arguments — Well-structured, backed by credible sources",
        "Perfect Citations — Harvard, APA, MLA, Chicago — any style",
        "Fast Turnaround — Urgent essays delivered within 24 hours",
        "Grade Guarantee — We aim for the highest possible grade",
        "Full Support — Direct communication with your writer",
      ],
      process: [
        { step: 1, title: "Share Your Topic", description: "Provide essay topic, requirements, and referencing style" },
        { step: 2, title: "Expert Matching", description: "Paired with a writer specialising in your subject" },
        { step: 3, title: "Drafting & Review", description: "Carefully crafted with rigorous academic standards" },
        { step: 4, title: "Final Delivery", description: "Polished essay delivered with plagiarism report" },
      ],
      metaTitle: "Essay Writing Service UK | Professional Essay Help | EditorsForUK",
      metaDesc: "Premium essay writing service by UK academic experts. Well-argued, properly cited essays delivered on time. Get started today!",
      sortOrder: 2,
    },
    {
      title: "Coursework Help",
      slug: "coursework",
      description: "Comprehensive coursework assistance that covers every aspect of your module requirements. Our experts deliver detailed, well-structured coursework that demonstrates thorough understanding.",
      shortDesc: "Complete coursework solutions from qualified experts",
      icon: "GraduationCap",
      heroTitle: "Professional Coursework Writing Service",
      heroSubtitle: "Comprehensive coursework that showcases your learning",
      features: [
        "Module-specific expertise",
        "Comprehensive coverage",
        "Practical applications",
        "Data analysis support",
        "Proper methodology",
        "Full referencing",
      ],
      benefits: [
        "Module Experts — Writers familiar with UK university module structures",
        "Complete Solutions — Every section covered thoroughly and accurately",
        "Research Depth — Extensive research with academic and industry sources",
        "Practical Focus — Real-world applications and case studies included",
        "Flexible Deadlines — From urgent to extended timelines",
        "Continuous Support — Updates and revisions throughout the process",
      ],
      process: [
        { step: 1, title: "Provide Module Details", description: "Share your module handbook, brief, and marking criteria" },
        { step: 2, title: "Expert Selection", description: "Matched with a specialist in your specific module" },
        { step: 3, title: "In-Depth Development", description: "Thorough research and structured writing" },
        { step: 4, title: "Review & Submit", description: "Quality assured and delivered for your review" },
      ],
      metaTitle: "Coursework Writing Service UK | Expert Coursework Help | EditorsForUK",
      metaDesc: "Get professional coursework writing help from UK experts. Comprehensive, well-researched coursework delivered on time. Order now!",
      sortOrder: 3,
    },
    {
      title: "Dissertation Writing",
      slug: "dissertation",
      description: "End-to-end dissertation support from proposal to final submission. Our PhD-qualified writers guide you through every chapter, ensuring academic rigour and original contribution to your field.",
      shortDesc: "PhD-level dissertation writing and guidance",
      icon: "Scroll",
      heroTitle: "Premium Dissertation Writing Service",
      heroSubtitle: "Your path to academic distinction starts here",
      features: [
        "PhD-qualified writers",
        "Chapter-by-chapter support",
        "Original research design",
        "Statistical analysis",
        "Literature review expertise",
        "Viva preparation guidance",
      ],
      benefits: [
        "PhD Writers — Writers who have completed their own dissertations",
        "Full Chapters — From introduction to conclusion, every chapter covered",
        "Research Design — Robust methodology and framework development",
        "Data Analysis — Quantitative, qualitative, or mixed methods support",
        "Iterative Process — Regular drafts and supervisor feedback integration",
        "Confidential — Complete privacy and non-disclosure guaranteed",
      ],
      process: [
        { step: 1, title: "Initial Consultation", description: "Discuss your research area, objectives, and timeline" },
        { step: 2, title: "Proposal & Planning", description: "Develop research proposal and detailed plan" },
        { step: 3, title: "Chapter Development", description: "Systematic writing with regular progress updates" },
        { step: 4, title: "Review & Refinement", description: "Thorough review, editing, and final polish" },
      ],
      metaTitle: "Dissertation Writing Service UK | PhD Expert Help | EditorsForUK",
      metaDesc: "Premium dissertation writing service by PhD-qualified experts. Full chapter support, original research, confidential service. Start today!",
      sortOrder: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log("✅ Services created");

  // Create testimonials
  const testimonials = [
    {
      name: "Sarah Mitchell",
      university: "University of Manchester",
      course: "Business Management",
      rating: 5,
      content: "Absolutely outstanding service. My dissertation was delivered on time with exceptional quality. The writer clearly understood the subject matter and the arguments were compelling. I received a First — couldn't be happier!",
      isVerified: true,
      isFeatured: true,
    },
    {
      name: "James Richardson",
      university: "University of Edinburgh",
      course: "Computer Science",
      rating: 5,
      content: "The assignment help I received was phenomenal. The code examples were clean, the documentation thorough, and the theoretical explanations were spot-on. My professor was genuinely impressed.",
      isVerified: true,
      isFeatured: true,
    },
    {
      name: "Amara Okafor",
      university: "King's College London",
      course: "Law",
      rating: 5,
      content: "I was struggling with my contract law essay and the team delivered beyond my expectations. The legal analysis was rigorous, the case citations were impeccable, and the argument structure was flawless.",
      isVerified: true,
      isFeatured: true,
    },
    {
      name: "David Chen",
      university: "Imperial College London",
      course: "Mechanical Engineering",
      rating: 5,
      content: "Incredible attention to detail. The technical accuracy of my coursework was perfect, and the calculations were thoroughly checked. The writer even included additional diagrams that strengthened my submission.",
      isVerified: true,
      isFeatured: false,
    },
    {
      name: "Emily Watson",
      university: "University of Oxford",
      course: "English Literature",
      rating: 5,
      content: "The literary analysis in my essay was sophisticated and deeply insightful. The writer demonstrated genuine expertise in Victorian literature. Received the highest mark in my seminar group.",
      isVerified: true,
      isFeatured: true,
    },
    {
      name: "Mohammed Al-Rashid",
      university: "UCL",
      course: "Economics",
      rating: 4,
      content: "Very professional service from start to finish. The econometric analysis was well-executed, and the writer incorporated all my feedback promptly. Highly recommend for economics students.",
      isVerified: true,
      isFeatured: false,
    },
    {
      name: "Charlotte Davies",
      university: "University of Cambridge",
      course: "Psychology",
      rating: 5,
      content: "My research proposal was crafted with such precision and academic rigour. The methodology section was particularly strong. This service gave me the confidence I needed for my PhD application.",
      isVerified: true,
      isFeatured: true,
    },
    {
      name: "Ryan O'Connor",
      university: "LSE",
      course: "International Relations",
      rating: 5,
      content: "The quality of writing was exceptional — clear, analytical, and well-sourced. The essay engaged with contemporary debates in a way that showed real understanding of the field. Worth every penny.",
      isVerified: true,
      isFeatured: false,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log("✅ Testimonials created");

  // Create stats counters
  const stats = [
    { label: "Orders Completed", value: 15000, suffix: "+", icon: "CheckCircle", sortOrder: 1 },
    { label: "Expert Writers", value: 500, suffix: "+", icon: "Users", sortOrder: 2 },
    { label: "Average Rating", value: 49, suffix: "/5", icon: "Star", sortOrder: 3 },
    { label: "Satisfaction Rate", value: 98, suffix: "%", icon: "ThumbsUp", sortOrder: 4 },
  ];

  for (const stat of stats) {
    await prisma.statsCounter.create({ data: stat });
  }
  console.log("✅ Stats counters created");

  // Create FAQs
  const faqs = [
    {
      question: "How does the ordering process work?",
      answer: "Simply fill out our order form with your requirements, deadline, and academic level. We'll match you with the best writer for your subject, and you'll receive your completed work before your deadline.",
      category: "general",
      sortOrder: 1,
    },
    {
      question: "Are your writers qualified?",
      answer: "Yes, all our writers hold at least a Master's degree, with many holding PhDs from leading UK universities. Each writer undergoes rigorous vetting, including writing tests and credential verification.",
      category: "general",
      sortOrder: 2,
    },
    {
      question: "Is the work plagiarism-free?",
      answer: "Absolutely. Every piece of work is written from scratch and runs through advanced plagiarism detection software. We provide a free plagiarism report with every order for your peace of mind.",
      category: "general",
      sortOrder: 3,
    },
    {
      question: "What if I need revisions?",
      answer: "We offer unlimited free revisions within 14 days of delivery. Simply share your feedback, and your writer will make the necessary adjustments to ensure you're completely satisfied.",
      category: "general",
      sortOrder: 4,
    },
    {
      question: "How do you ensure confidentiality?",
      answer: "Your privacy is paramount. We use encrypted communications, never share your personal information, and all writers sign strict NDAs. Your academic institution will never know you used our service.",
      category: "general",
      sortOrder: 5,
    },
    {
      question: "What subjects do you cover?",
      answer: "We cover virtually every academic discipline including Business, Law, Nursing, Engineering, Computer Science, Psychology, Education, Economics, Marketing, Sociology, History, Literature, and many more.",
      category: "general",
      sortOrder: 6,
    },
    {
      question: "Can I communicate with my writer?",
      answer: "Yes, you can communicate directly with your assigned writer throughout the process. This ensures your requirements are fully understood and any questions can be addressed promptly.",
      category: "general",
      sortOrder: 7,
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a comprehensive money-back guarantee. If the work doesn't meet the agreed-upon requirements after revisions, you're entitled to a full or partial refund depending on the circumstances.",
      category: "general",
      sortOrder: 8,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log("✅ FAQs created");

  // Create blog posts
  const blogPosts = [
    {
      title: "How to Write a First-Class Essay: A Complete Guide",
      slug: "how-to-write-first-class-essay",
      excerpt: "Discover the proven strategies and techniques that distinguish a first-class essay from the rest. From structuring your argument to perfecting your citations.",
      content: `<h2>Introduction</h2><p>Writing a first-class essay requires more than just good writing skills. It demands critical thinking, thorough research, and a clear argumentative structure. In this comprehensive guide, we'll walk you through the essential steps to crafting an essay that stands out.</p><h2>Understanding the Question</h2><p>Before you write a single word, spend time truly understanding what the essay question is asking. Break it down into its component parts. Identify the key terms, the instruction words (analyse, evaluate, discuss), and the scope of the question.</p><h2>Research Strategy</h2><p>A first-class essay demonstrates wide reading and engagement with scholarly sources. Use your university library databases, Google Scholar, and recommended reading lists. Aim for a mix of seminal texts and recent publications.</p><h2>Structure and Argument</h2><p>Your essay should have a clear thesis statement, logically organised paragraphs, and a compelling conclusion. Each paragraph should make one key point, supported by evidence and analysis.</p><h2>Critical Analysis</h2><p>Don't just describe — analyse. Evaluate the strengths and weaknesses of different arguments. Show that you can think independently and engage critically with the material.</p><h2>Conclusion</h2><p>A strong conclusion doesn't just summarise — it synthesises. Bring together your key arguments and show how they answer the original question. Leave the reader with a clear sense of your position.</p>`,
      category: "Academic Writing",
      tags: ["essay writing", "study tips", "academic skills"],
      isPublished: true,
      metaTitle: "How to Write a First-Class Essay | EditorsForUK Blog",
      metaDesc: "Learn proven strategies for writing first-class essays. Expert tips on research, structure, and critical analysis from EditorsForUK.",
    },
    {
      title: "Top 10 Dissertation Mistakes to Avoid",
      slug: "top-10-dissertation-mistakes",
      excerpt: "Avoid these common pitfalls that can derail your dissertation. Learn from the experiences of thousands of students and set yourself up for success.",
      content: `<h2>Introduction</h2><p>Your dissertation is likely the most significant piece of academic work you'll undertake. Yet many students make avoidable mistakes that compromise their results. Here are the top 10 pitfalls to watch out for.</p><h2>1. Starting Too Late</h2><p>Procrastination is the enemy of a good dissertation. Start your research and planning early, even if writing begins later.</p><h2>2. Choosing Too Broad a Topic</h2><p>A focused, well-defined research question is essential. Trying to cover too much ground leads to superficial analysis.</p><h2>3. Poor Literature Review</h2><p>Your lit review should be critical and analytical, not just a summary of sources. Show how existing research relates to your study.</p><h2>4. Weak Methodology</h2><p>Justify your methodological choices clearly. Explain why your approach is the most appropriate for your research question.</p><h2>5. Ignoring Supervisor Feedback</h2><p>Your supervisor's expertise is invaluable. Take their feedback seriously and incorporate it into your revisions.</p><h2>6. Inconsistent Referencing</h2><p>Choose a referencing style and stick to it consistently throughout. Use referencing management software to help.</p><h2>7. Neglecting Proofreading</h2><p>Grammatical errors and typos undermine your credibility. Always proofread thoroughly before submission.</p><h2>8. Data Overload Without Analysis</h2><p>Presenting data without interpreting it adds no value. Always analyse what your findings mean.</p><h2>9. Weak Conclusion</h2><p>Your conclusion should address your research question directly and discuss the implications of your findings.</p><h2>10. Not Backing Up Your Work</h2><p>Use cloud storage and multiple backups. Losing your work to a technical failure is devastating and avoidable.</p>`,
      category: "Research",
      tags: ["dissertation", "research tips", "common mistakes"],
      isPublished: true,
      metaTitle: "Top 10 Dissertation Mistakes to Avoid | EditorsForUK Blog",
      metaDesc: "Avoid common dissertation pitfalls. Expert advice on planning, writing, and completing your dissertation successfully.",
    },
    {
      title: "Understanding Harvard Referencing: The Complete Guide",
      slug: "harvard-referencing-guide",
      excerpt: "Master the Harvard referencing system with our detailed guide. From in-text citations to reference lists, learn everything you need to know.",
      content: `<h2>What is Harvard Referencing?</h2><p>Harvard referencing is one of the most widely used citation systems in UK universities. It uses an author-date format for in-text citations and a detailed reference list at the end of your work.</p><h2>In-Text Citations</h2><p>When you reference a source in your text, include the author's surname and the year of publication in brackets, e.g., (Smith, 2023). For direct quotes, include the page number: (Smith, 2023, p. 45).</p><h2>Reference List</h2><p>Your reference list should appear at the end of your work, organised alphabetically by author surname. Each entry should include the full details needed to locate the source.</p><h2>Books</h2><p>Author, A.B. (Year) Title of book. Edition. Place of publication: Publisher.</p><h2>Journal Articles</h2><p>Author, A.B. (Year) 'Title of article', Journal Name, Volume(Issue), pp. xx-xx.</p><h2>Websites</h2><p>Author/Organisation (Year) Title of page. Available at: URL (Accessed: Date).</p><h2>Tips for Success</h2><p>Be consistent, use referencing management tools like Mendeley or Zotero, and always check your university's specific requirements as there can be slight variations.</p>`,
      category: "Study Tips",
      tags: ["referencing", "harvard", "citations", "academic writing"],
      isPublished: true,
      metaTitle: "Harvard Referencing Guide | EditorsForUK Blog",
      metaDesc: "Complete guide to Harvard referencing. Learn in-text citations, reference lists, and formatting rules for UK universities.",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log("✅ Blog posts created");

  // Create site settings
  const settings = [
    { key: "site_name", value: "EditorsForUK", type: "text", group: "general" },
    { key: "site_tagline", value: "Premium Academic Writing Services", type: "text", group: "general" },
    { key: "contact_email", value: "info@editorsforuk.com", type: "text", group: "contact" },
    { key: "contact_phone", value: "+44 20 1234 5678", type: "text", group: "contact" },
    { key: "hero_title", value: "Excellence in Academic Writing", type: "text", group: "homepage" },
    { key: "hero_subtitle", value: "Premium academic support trusted by students across UK universities. Expert writers, guaranteed quality, delivered on time.", type: "text", group: "homepage" },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log("✅ Site settings created");

  // Create policy pages
  const policies = [
    {
      title: "Privacy Policy",
      slug: "privacy-policy",
      content: `<h2>Privacy Policy</h2><p>Last updated: February 2026</p><h3>1. Introduction</h3><p>EditorsForUK ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.</p><h3>2. Information We Collect</h3><p>We collect information you provide directly, including your name, email address, phone number, academic details, and order requirements. We also collect technical data such as your IP address, browser type, and usage patterns.</p><h3>3. How We Use Your Information</h3><p>We use your information to: provide and improve our services, process your orders, communicate with you, ensure quality control, and comply with legal obligations.</p><h3>4. Data Protection</h3><p>We implement industry-standard security measures to protect your personal data. All communications are encrypted, and access to personal information is restricted to authorised personnel only.</p><h3>5. Your Rights</h3><p>You have the right to access, correct, delete, or restrict the processing of your personal data. You can exercise these rights by contacting us at privacy@editorsforuk.com.</p><h3>6. Cookies</h3><p>We use cookies to improve your browsing experience. You can manage cookie preferences through your browser settings.</p><h3>7. Contact Us</h3><p>For privacy-related inquiries, please contact us at privacy@editorsforuk.com.</p>`,
      metaTitle: "Privacy Policy | EditorsForUK",
      metaDesc: "Read our privacy policy to understand how EditorsForUK protects your personal information.",
    },
    {
      title: "Terms of Service",
      slug: "terms-of-service",
      content: `<h2>Terms of Service</h2><p>Last updated: February 2026</p><h3>1. Acceptance of Terms</h3><p>By accessing and using EditorsForUK services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p><h3>2. Services Description</h3><p>EditorsForUK provides academic writing, editing, and consulting services. Our work is intended as reference material and study aids to support your own academic development.</p><h3>3. User Responsibilities</h3><p>You are responsible for providing accurate information, using our services ethically, and complying with your institution's academic integrity policies.</p><h3>4. Intellectual Property</h3><p>Upon full payment, copyright of the delivered work transfers to you. However, we retain the right to use anonymised samples for quality assurance purposes.</p><h3>5. Payment Terms</h3><p>Payment is required as specified at the time of order. Prices are quoted in GBP and include all applicable taxes.</p><h3>6. Revision Policy</h3><p>We offer unlimited free revisions within 14 days of delivery, provided the revision requests are within the scope of the original requirements.</p><h3>7. Refund Policy</h3><p>Refunds are available in accordance with our refund policy. Full refunds are issued if we fail to deliver by the agreed deadline or if the work substantially deviates from the requirements.</p><h3>8. Limitation of Liability</h3><p>EditorsForUK's liability is limited to the amount paid for the specific service. We are not liable for any consequential damages arising from the use of our services.</p><h3>9. Changes to Terms</h3><p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p><h3>10. Contact</h3><p>For questions about these terms, contact us at legal@editorsforuk.com.</p>`,
      metaTitle: "Terms of Service | EditorsForUK",
      metaDesc: "Read the terms of service for EditorsForUK academic writing services.",
    },
  ];

  for (const policy of policies) {
    await prisma.policyPage.upsert({
      where: { slug: policy.slug },
      update: policy,
      create: policy,
    });
  }
  console.log("✅ Policy pages created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
