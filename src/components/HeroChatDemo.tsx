const HERO_IMAGE_SRC = '/images/sellogram-hero-nairobi.webp';

interface ChatMessage {
  from: 'customer' | 'shop';
  text: string;
}

const MESSAGES: ChatMessage[] = [
  { from: 'customer', text: 'Hii denim set bado iko in M?' },
  { from: 'shop', text: 'Iko. Full set ni KSh 6,000.' },
  { from: 'customer', text: 'Na delivery Kilimani?' },
  { from: 'shop', text: 'KSh 250. Ukichukua leo rider can bring it this afternoon.' },
];

/**
 * Hero proof surface: the real merchant world plus the shop DM that Sellogram powers.
 * Sellogram stays behind the shop identity; the customer only sees the shop they messaged.
 */
const HeroChatDemo = () => {
  return (
    <figure
      aria-label="Example Nia Thrift Instagram DM conversation about a denim set and delivery to Kilimani"
      className="relative isolate overflow-hidden rounded-[1.75rem] bg-night"
    >
      <img
        src={HERO_IMAGE_SRC}
        alt="Nairobi fashion seller photographing a denim look against a cobalt-blue stairwell"
        width={900}
        height={600}
        loading="eager"
        decoding="async"
        className="aspect-[3/2] h-full w-full object-cover"
      />

      <div className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-auto sm:left-[48%] sm:top-5 sm:w-[46%]">
        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-night text-xs font-semibold text-paper">
              NT
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">Nia Thrift</p>
              <p className="text-[0.7rem] text-ink-faint">Instagram</p>
            </div>
          </div>

          <div className="space-y-2.5 px-3 py-3 sm:px-4 sm:py-4">
            {MESSAGES.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`flex ${message.from === 'shop' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-[0.72rem] leading-snug sm:text-xs ${
                    message.from === 'shop'
                      ? 'rounded-br-md bg-fern/10 text-ink'
                      : 'rounded-bl-md bg-paper text-ink'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-3 top-3 flex w-[12rem] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-3 py-3 backdrop-blur-sm sm:bottom-5 sm:left-[58%] sm:top-auto sm:w-[31%]">
        <div className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-raised text-lg sm:h-12 sm:w-11 sm:text-xl" aria-hidden="true">
          👖
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink sm:text-sm">Patchwork denim set</p>
          <p className="mt-0.5 font-mono text-[0.65rem] text-ink-faint sm:text-xs">KSh 6,000 · Size M</p>
        </div>
      </div>
    </figure>
  );
};

export default HeroChatDemo;
