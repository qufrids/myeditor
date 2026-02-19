export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="mt-2 text-[13px] text-slate-400">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.8] text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using cambridgewriters services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">2. Services Description</h2>
            <p>cambridgewriters provides academic writing, editing, and consulting services. Our work is intended as reference material and study aids to support your own academic development.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">3. User Responsibilities</h2>
            <p>You are responsible for providing accurate information, using our services ethically, and complying with your institution&apos;s academic integrity policies.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">4. Intellectual Property</h2>
            <p>Upon full payment, copyright of the delivered work transfers to you. However, we retain the right to use anonymised samples for quality assurance purposes.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">5. Payment Terms</h2>
            <p>Payment is required as specified at the time of order. Prices are quoted in GBP and include all applicable taxes.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">6. Revision Policy</h2>
            <p>We offer unlimited free revisions within 14 days of delivery, provided the revision requests are within the scope of the original requirements.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">7. Refund Policy</h2>
            <p>Refunds are available in accordance with our refund policy. Full refunds are issued if we fail to deliver by the agreed deadline or if the work substantially deviates from the requirements.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">8. Limitation of Liability</h2>
            <p>cambridgewriters&apos;s liability is limited to the amount paid for the specific service. We are not liable for any consequential damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">10. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:info@cambridgewriters.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">info@cambridgewriters.co.uk</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
