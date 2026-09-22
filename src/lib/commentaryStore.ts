import { supabase, isSupabaseConfigured, isMissingTableError, type ViewRow } from './supabase';

/**
 * Storage for H.E. Zeenat Kureshi's "My View" commentary on live news.
 *
 * Backed by Supabase (table `public.views`). A published view is stored in the
 * database and is therefore visible to every visitor on every device -- it is
 * genuinely on the internet, not a note in one browser.
 *
 * Row Level Security decides who may write; see supabase/migrations/001_views.sql.
 */

export interface ViewNote {
  /** The source article a view responds to -- its URL, used as the natural key. */
  articleId: string;
  articleTitle: string;
  publication: string;
  sector?: string;
  body: string;
  author: string;
  updatedAt: number;
}

export type BackendState =
  | 'ready'          // table exists, reads and writes work
  | 'unconfigured'   // no Supabase credentials in the environment
  | 'missing-table'  // credentials fine, migration not run yet
  | 'unreachable';   // network or project problem

const rowToNote = (row: ViewRow): ViewNote => ({
  articleId: row.article_id,
  articleTitle: row.article_title,
  publication: row.publication ?? '',
  sector: row.sector ?? undefined,
  body: row.body,
  author: row.author,
  updatedAt: new Date(row.updated_at).getTime(),
});

export interface LoadResult {
  notes: ViewNote[];
  state: BackendState;
}

export const loadNotes = async (): Promise<LoadResult> => {
  if (!supabase) return { notes: [], state: 'unconfigured' };

  const { data, error } = await supabase
    .from('views')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      notes: [],
      state: isMissingTableError(error) ? 'missing-table' : 'unreachable',
    };
  }

  return { notes: (data as ViewRow[]).map(rowToNote), state: 'ready' };
};

export interface SaveResult {
  published: boolean;
  error?: string;
}

export const saveNote = async (note: ViewNote): Promise<SaveResult> => {
  if (!supabase) return { published: false, error: 'Publishing is not configured.' };

  const { error } = await supabase.from('views').upsert(
    {
      article_id: note.articleId,
      article_title: note.articleTitle,
      publication: note.publication || null,
      sector: note.sector ?? null,
      body: note.body,
      author: note.author,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'article_id' },
  );

  if (error) {
    if (isMissingTableError(error)) {
      return { published: false, error: 'The views table has not been created yet.' };
    }
    // RLS rejects writes from anyone who is not signed in as the office.
    if (error.code === '42501' || /row-level security/i.test(error.message)) {
      return { published: false, error: 'Sign in as the office to publish a view.' };
    }
    return { published: false, error: error.message };
  }

  return { published: true };
};

export const deleteNote = async (articleId: string): Promise<{ error?: string }> => {
  if (!supabase) return { error: 'Publishing is not configured.' };
  const { error } = await supabase.from('views').delete().eq('article_id', articleId);
  return error ? { error: error.message } : {};
};

/**
 * Live updates: a view published from the office laptop appears on a visitor's
 * open page without a refresh.
 */
export const subscribeToViews = (onChange: () => void): (() => void) => {
  if (!supabase) return () => {};

  const channel = supabase
    .channel('public:views')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'views' }, onChange)
    .subscribe();

  const client = supabase;
  return () => {
    client.removeChannel(channel);
  };
};

export { isSupabaseConfigured };
