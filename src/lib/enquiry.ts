import { siteConfig } from '../data/siteConfig';

/**
 * One place that decides what "submit" actually does for every enquiry form.
 *
 * The old forms waited 800 ms and then displayed an invented reference number
 * -- nothing was sent anywhere. This does one of two honest things:
 *
 *  1. VITE_ENQUIRY_ENDPOINT is set  ->  POST the enquiry there (Formspree,
 *     Web3Forms, a Supabase Edge Function, your own API -- anything that
 *     accepts JSON) and report success only if the server says OK.
 *  2. Not set                       ->  build a pre-filled email to the right
 *     desk and hand it to the visitor's mail app, and say so plainly.
 */

export type EnquiryKind = 'investment' | 'collaborate' | 'media' | 'newsletter';

export interface EnquiryPayload {
  kind: EnquiryKind;
  /** Human-readable label -> value, in display order. */
  fields: Array<{ label: string; value: string }>;
}

export type SubmitResult =
  | { mode: 'sent'; ref: string }
  | { mode: 'email'; ref: string; href: string };

const ENDPOINT = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim();
/** Web3Forms-style providers want an access key in the body. Optional. */
const ACCESS_KEY = (import.meta.env.VITE_ENQUIRY_ACCESS_KEY as string | undefined)?.trim();

export const enquiryEndpointConfigured = Boolean(ENDPOINT);

const DESK: Record<EnquiryKind, { email: string; subject: string }> = {
  investment: { email: siteConfig.contact.tradeDeskEmail, subject: 'Investor enquiry' },
  collaborate: { email: siteConfig.contact.email, subject: 'Collaboration enquiry' },
  media: { email: siteConfig.contact.mediaEmail, subject: 'Media enquiry' },
  newsletter: { email: siteConfig.contact.email, subject: 'Executive Dispatch subscription' },
};

const makeRef = (kind: EnquiryKind) => {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZK-${kind.slice(0, 3).toUpperCase()}-${stamp}-${rand}`;
};

const toText = (p: EnquiryPayload, ref: string) =>
  [`Reference: ${ref}`, ...p.fields.filter((f) => f.value).map((f) => `${f.label}: ${f.value}`)].join('\n');

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  const ref = makeRef(payload.kind);
  const desk = DESK[payload.kind];
  const subject = `${desk.subject} [${ref}]`;

  if (ENDPOINT) {
    const body: Record<string, string> = {
      _subject: subject,
      reference: ref,
      form: payload.kind,
      page: typeof window !== 'undefined' ? window.location.href : '',
    };
    if (ACCESS_KEY) body.access_key = ACCESS_KEY;
    payload.fields.forEach((f) => {
      body[f.label] = f.value;
    });

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`);
    return { mode: 'sent', ref };
  }

  return { mode: 'email', ref, href: mailtoFor(payload, ref) };
}

/** A pre-filled email to the right desk -- the fallback whenever sending isn't possible. */
export function mailtoFor(payload: EnquiryPayload, ref: string): string {
  const desk = DESK[payload.kind];
  return `mailto:${desk.email}?subject=${encodeURIComponent(`${desk.subject} [${ref}]`)}&body=${encodeURIComponent(
    toText(payload, ref),
  )}`;
}

export const deskEmail = (kind: EnquiryKind) => DESK[kind].email;
export const whatsappLink = (text: string) =>
  `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * For the long-form page forms (Contact, Trade, Media, Women Cell). They used
 * to wait a second and show a success screen without sending anything. This
 * hands the validated data to the same submit path as the pop-up forms, and
 * returns the reference to show. If no endpoint is configured it opens the
 * visitor's email app, exactly like the pop-ups do.
 */
export async function sendForm(
  kind: EnquiryKind,
  data: Record<string, unknown>,
  formName: string,
): Promise<string> {
  const pretty = (k: string) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  const payload: EnquiryPayload = {
    kind,
    fields: [
      { label: 'Form', value: formName },
      ...Object.entries(data)
        .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
        .map(([k, v]) => ({ label: pretty(k), value: String(v) })),
    ],
  };
  let res: SubmitResult;
  try {
    res = await submitEnquiry(payload);
  } catch {
    // The endpoint failed: never leave the visitor stuck on a spinner --
    // fall back to their email app with everything filled in.
    const ref = makeRef(kind);
    res = { mode: 'email', ref, href: mailtoFor(payload, ref) };
  }
  if (res.mode === 'email' && typeof window !== 'undefined') window.location.href = res.href;
  return res.ref;
}
