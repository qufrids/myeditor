export const metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">Refund Policy</h1>
        <p className="mt-2 text-[13px] text-slate-400">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.8] text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">1. Our Commitment</h2>
            <p>At cambridgewriters, customer satisfaction is our top priority. If you are not satisfied with our service, we offer a fair and transparent refund process.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">2. Full Refund Eligibility</h2>
            <p>You are entitled to a full refund in the following circumstances:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-500 dark:text-slate-400">
              <li>We fail to deliver your order by the agreed deadline</li>
              <li>The delivered work substantially deviates from your original requirements</li>
              <li>You cancel your order before a writer has been assigned</li>
              <li>Duplicate payment was made</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">3. Partial Refund</h2>
            <p>A partial refund may be issued if you cancel after work has begun, or if only part of the requirements were not met after revision attempts. The amount will be calculated based on the work completed.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">4. Revision Process First</h2>
            <p>Before requesting a refund, we ask that you allow us to revise the work. We offer unlimited free revisions within 14 days of delivery. Most concerns are resolved through the revision process.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">5. Non-Refundable Situations</h2>
            <p>Refunds will not be issued in the following cases:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-500 dark:text-slate-400">
              <li>The work was completed and delivered as per your requirements</li>
              <li>Refund is requested after 14 days of delivery</li>
              <li>The order was completed but you changed your mind</li>
              <li>Poor academic result (we provide writing assistance, not grade guarantees)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">6. How to Request a Refund</h2>
            <p>To request a refund, contact our support team at <a href="mailto:info@cambridgewriters.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">info@cambridgewriters.co.uk</a> with your order details and reason for the request. We aim to process all refund requests within 5–7 business days.</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white mb-3">7. Contact Us</h2>
            <p>For any refund-related queries, please reach out to <a href="mailto:info@cambridgewriters.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">info@cambridgewriters.co.uk</a>. We are happy to assist.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
