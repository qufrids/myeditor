export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-[13px] text-slate-400">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.8] text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">1. Introduction</h2>
            <p>cambridgewriters (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, phone number, academic details, and order requirements. We also collect technical data such as your IP address, browser type, and usage patterns.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
            <p>We use your information to: provide and improve our services, process your orders, communicate with you, ensure quality control, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">4. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal data. All communications are encrypted, and access to personal information is restricted to authorised personnel only.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, delete, or restrict the processing of your personal data. You can exercise these rights by contacting us at <a href="mailto:info@cambridgewriters.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">info@cambridgewriters.co.uk</a>.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">6. Cookies</h2>
            <p>We use cookies to improve your browsing experience. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">7. Contact Us</h2>
            <p>For privacy-related inquiries, please contact us at <a href="mailto:info@cambridgewriters.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">info@cambridgewriters.co.uk</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
