// Phrases banned by the Sellogram brand bundle (02-voice-and-tone.md), summarised in
// docs/voice-and-tone.md. Single source of truth referenced by the content test
// harness so banned language cannot ship. Bare "automation" is not listed only
// because the /instagram-dm-automation page must name the search term it
// answers; everywhere else, avoid it too.
export const BANNED_PHRASES = [
  // Corporate operating language
  'streamline',
  'optimize',
  'optimise',
  'leverage',
  'utilize',
  'utilise',
  'facilitate',
  'scale your support',
  'increase throughput',
  'high-volume workflow',
  'high-volume workflows',
  'operational efficiency',
  'steady dm traffic',
  'carrying real dm volume',
  'engagement engine',
  // Technology and category language
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
  'omnichannel',
  // Hype and empty promise language
  'innovative',
  'revolutionary',
  'game-changing',
  'effortless',
  'seamless',
  'supercharge',
  'never miss a sale',
  '24/7',
  'sell on autopilot',
  'human-like',
  'perfect answers',
  // Familiar generated-copy patterns
  'say goodbye',
  'in today’s fast-paced',
  "in today's fast-paced",
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
