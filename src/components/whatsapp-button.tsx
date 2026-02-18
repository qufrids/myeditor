"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const WA_NUMBER = "447428822494";
const WA_MESSAGE = "Hi! I'd like to get a quote for academic writing help.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-8 sm:right-7">
      {/* Tooltip / chat bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative max-w-[220px] rounded-2xl rounded-br-sm border border-slate-200/60 bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-white/[0.08] dark:bg-slate-900"
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Chat with us!</p>
            <p className="mt-0.5 text-[12px] leading-[1.5] text-slate-500 dark:text-slate-400">
              Get an instant quote on WhatsApp — we reply within minutes.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Start Chat
            </a>
            {/* Triangle pointer */}
            <div className="absolute -bottom-[7px] right-4 h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white dark:border-t-slate-900" />
            <div className="absolute -bottom-[8px] right-4 h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-slate-200/60 dark:border-t-white/[0.08]" style={{ zIndex: -1 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp FAB */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", damping: 18, stiffness: 260 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(37,211,102,0.60)] sm:h-[58px] sm:w-[58px]"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:animate-ping group-hover:opacity-30" />
        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.46.643 4.768 1.77 6.77L2 30l7.418-1.744A13.935 13.935 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 01-5.83-1.59l-.418-.247-4.404 1.035 1.055-4.296-.27-.44A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.606c-.344-.172-2.038-1.004-2.353-1.12-.315-.113-.545-.17-.774.172-.229.343-.888 1.12-1.09 1.35-.2.228-.4.257-.744.086-.344-.172-1.452-.536-2.767-1.708-1.023-.913-1.713-2.04-1.914-2.385-.2-.343-.021-.529.151-.7.155-.153.344-.4.516-.6.171-.199.229-.343.344-.571.114-.229.057-.429-.028-.601-.087-.172-.774-1.866-1.06-2.556-.28-.67-.564-.58-.774-.59l-.658-.012c-.229 0-.601.086-.916.429-.315.343-1.202 1.175-1.202 2.865 0 1.692 1.23 3.325 1.402 3.554.17.228 2.42 3.696 5.865 5.185.82.354 1.46.565 1.96.723.823.262 1.573.225 2.165.136.66-.099 2.038-.833 2.325-1.637.287-.8.287-1.49.2-1.636-.085-.143-.314-.228-.658-.4z" />
        </svg>
      </motion.a>
    </div>
  );
}
