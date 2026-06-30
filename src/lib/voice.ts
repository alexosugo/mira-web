// Phrases banned by docs/voice-and-tone.md. Single source of truth referenced by
// the content test harness so banned language cannot ship. Keep this list in
// sync with the "Words to Avoid" section of the voice guide.
export const BANNED_PHRASES = [
  'streamline',
  'optimize',
  'innovative',
  'leverage',
  'utilize',
  'facilitate',
  'ai-powered',
  'ai powered',
  'machine learning',
  'nlp',
  'natural language processing',
  'automation engine',
  'our platform',
  'solutions',
  'ecosystem',
  'touchpoints',
] as const;

// Exclamation points are banned outright (voice guide: "remove them").
export const BANNED_PUNCTUATION = ['!'] as const;

/** Match a phrase case-insensitively on word boundaries. */
const phraseRegex = (phrase: string): RegExp => new RegExp(`\\b${phrase}\\b`, 'i');

/** True if the text contains any banned phrase. */
export const hasBannedPhrase = (text: string): boolean =>
  BANNED_PHRASES.some((phrase) => phraseRegex(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(text));

/** True if the text contains any banned punctuation. */
export const hasBannedPunctuation = (text: string): boolean =>
  BANNED_PUNCTUATION.some((mark) => text.includes(mark));

/** True if the text violates any voice rule. */
export const violatesVoice = (text: string): boolean =>
  hasBannedPhrase(text) || hasBannedPunctuation(text);
