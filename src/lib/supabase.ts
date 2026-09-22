import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for "My View" commentary.
 *
 * The publishable key is compiled into the browser bundle. That is how Supabase
 * is designed to work -- the key identifies the project, it does not grant
 * permission. What the key may actually do is decided by Row Level Security in
 * `supabase/migrations/001_views.sql`: anyone may read published views, only a
 * signed-in office account may write them.
 *
 * If the environment variables are absent the app still runs; the commentary
 * layer simply reports itself as unconfigured rather than throwing on load.
 */

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const publishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined
)?.trim();

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, publishableKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/** Shape of a row in public.views. */
export interface ViewRow {
  id: string;
  article_id: string;
  article_title: string;
  publication: string | null;
  sector: string | null;
  body: string;
  author: string;
  created_at: string;
  updated_at: string;
}

/**
 * Distinguishes "the table has not been created yet" from ordinary failures,
 * so the UI can tell the office to run the migration instead of showing a
 * generic error.
 */
export const isMissingTableError = (error: { code?: string; message?: string } | null) =>
  error?.code === 'PGRST205' || /schema cache/i.test(error?.message ?? '');
