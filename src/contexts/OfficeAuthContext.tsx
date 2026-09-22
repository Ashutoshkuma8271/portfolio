import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Sign-in state for the Office of H.E. Zeenat Kureshi.
 *
 * Visitors never see an authoring control. The "My View" composer only becomes
 * available once an office account is signed in, because the database will
 * reject writes from anyone else anyway -- this keeps the UI honest about that
 * rather than letting someone type a view that can never save.
 */
interface OfficeAuthValue {
  session: Session | null;
  isOffice: boolean;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const OfficeAuthContext = createContext<OfficeAuthValue | undefined>(undefined);

export const OfficeAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<OfficeAuthValue>(
    () => ({
      session,
      isOffice: Boolean(session),
      ready,
      signIn: async (email, password) => {
        if (!supabase) return { error: 'Publishing is not configured.' };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : {};
      },
      signOut: async () => {
        if (supabase) await supabase.auth.signOut();
      },
    }),
    [session, ready],
  );

  return <OfficeAuthContext.Provider value={value}>{children}</OfficeAuthContext.Provider>;
};

export const useOfficeAuth = (): OfficeAuthValue => {
  const ctx = useContext(OfficeAuthContext);
  if (!ctx) throw new Error('useOfficeAuth must be used within an OfficeAuthProvider');
  return ctx;
};
