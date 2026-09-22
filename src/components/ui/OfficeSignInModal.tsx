import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, LogIn, AlertTriangle } from 'lucide-react';
import { useOfficeAuth } from '../../contexts/OfficeAuthContext';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSignedIn?: () => void;
}

/**
 * Sign-in for the Office of H.E. Zeenat Kureshi.
 *
 * Deliberately not linked from the public navigation: it opens only when an
 * authoring action needs it. Visitors have no reason to see a login form on a
 * diplomatic portal.
 */
export const OfficeSignInModal: React.FC<Props> = ({ isOpen, onClose, onSignedIn }) => {
  const { signIn } = useOfficeAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setBusy(true);
    setError(null);
    const { error: err } = await signIn(email.trim(), password);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setPassword('');
    onSignedIn?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-emerald-950/75 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-gold-500/35 bg-surface-raised shadow-luxury-lg"
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5">
              <div>
                <p className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
                  Secretariat access
                </p>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-ink-heading">
                  Office Sign-In
                </h3>
                <p className="mt-1 font-sans text-2xs text-ink-faint">
                  Required to publish commentary to the live site.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-gold-600 hover:text-gold-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="px-6 py-5">
              <label className="mb-2 block font-label text-2xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Office email
              </label>
              <div className="relative mb-4">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gold-600" />
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="office@zeenatkureshi.com"
                  className="w-full rounded-xl border border-hairline bg-surface py-2.5 pl-10 pr-4 font-sans text-sm text-ink outline-none transition-all focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <label className="mb-2 block font-label text-2xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gold-600" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-hairline bg-surface py-2.5 pl-10 pr-4 font-sans text-sm text-ink outline-none transition-all focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              {error && (
                <p className="mt-3 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 font-sans text-2xs leading-relaxed text-ink-soft">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                  <span>{error}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={busy || !email.trim() || !password}
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-surface-deep py-3.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-300 shadow-md transition-all hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogIn className="h-3.5 w-3.5" />
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
