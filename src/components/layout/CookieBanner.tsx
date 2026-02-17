"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          style={{ background: "rgba(19,42,58,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid #1A3448" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <p className="text-[13px] text-[#A0A0A0] max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre{" "}
              <a href="/politique-confidentialite" className="text-[#F4DDC3] hover:underline">politique de confidentialité</a>.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#0E202D]"
                style={{
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                }}
              >
                Personnaliser
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 hover:bg-[#F4DDC3] hover:text-[#0E202D]"
                style={{
                  borderColor: "#F4DDC3",
                  color: "#F4DDC3",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                }}
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
