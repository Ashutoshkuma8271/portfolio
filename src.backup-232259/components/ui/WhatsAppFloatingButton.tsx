import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Zeenat Kureshi's Office, I would like to inquire about strategic trade / media collaboration."
  )}`;

  return (
    <div className="fixed bottom-4 right-3 xs:bottom-5 xs:right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Mini Tooltip Popover */}
      {isOpen && (
        <div className="mb-3 w-72 bg-emerald-950 border border-gold-500/40 rounded-2xl shadow-luxury-lg p-4 text-ivory-500 backdrop-blur-md animate-fade-in">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                Official Trade Desk
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-700 hover:text-ivory-500 p-1 rounded-md"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-ivory-700 mb-3 leading-relaxed">
            Connect directly with the Executive Office for trade advisory, speaking invitations, or media requests.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-ivory-500 text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-800 text-gold-400 hover:text-emerald-950 hover:bg-gold-500 shadow-luxury-lg border border-gold-500/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contact Zeenat Kureshi on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500 border-2 border-emerald-950" />
        </span>
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
