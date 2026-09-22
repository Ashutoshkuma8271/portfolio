import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  title = 'H.E. Zeenat Kureshi — Keynote Address & GCC Bilateral Dialogue'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-emerald-950/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-emerald-950 border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold-500/20 bg-emerald-900/50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <h4 className="font-serif text-base sm:text-lg text-ivory-500 font-semibold truncate pr-4">
                  {title}
                </h4>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-emerald-900 border border-gold-500/30 hover:border-gold-400 text-ivory-600 hover:text-gold-400 flex items-center justify-center transition-colors"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={videoUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-emerald-900/40 border-t border-gold-500/10 flex items-center justify-between text-xs text-ivory-700">
              <span>Official Video Archive • Office of H.E. Zeenat Kureshi</span>
              <span className="text-gold-400 font-label text-xs">Press ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
