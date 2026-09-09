export interface ShopDMMessage {
  readonly from: 'customer' | 'shop';
  readonly text: string;
}

interface ShopDMCardProps {
  readonly shopName: string;
  readonly initials: string;
  readonly messages: readonly ShopDMMessage[];
  readonly sharedPost?: {
    readonly image: string;
    readonly imageAlt: string;
    readonly title: string;
  };
  readonly className?: string;
  readonly compact?: boolean;
}

const ShopDMCard = ({
  shopName,
  initials,
  messages,
  sharedPost,
  className = '',
  compact = false,
}: ShopDMCardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-[1.15rem] border border-white/75 bg-white/95 shadow-[0_18px_60px_rgba(14,30,23,0.18)] backdrop-blur-md ${className}`}
    >
      <div className={`flex items-center gap-3 border-b border-line ${compact ? 'px-3 py-2.5' : 'px-4 py-3'}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-night font-semibold text-paper ${
            compact ? 'h-7 w-7 text-[0.62rem]' : 'h-8 w-8 text-xs'
          }`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className={`truncate font-semibold text-ink ${compact ? 'text-xs' : 'text-sm'}`}>{shopName}</p>
          <p className={`text-ink-faint ${compact ? 'text-[0.62rem]' : 'text-[0.7rem]'}`}>Instagram</p>
        </div>
      </div>

      <div className={compact ? 'space-y-2 px-3 py-3' : 'space-y-2.5 px-3 py-3 sm:px-4 sm:py-4'}>
        {sharedPost && (
          <div className="flex overflow-hidden rounded-xl border border-line bg-white">
            <img
              src={sharedPost.image}
              alt={sharedPost.imageAlt}
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              className="h-14 w-20 shrink-0 object-cover"
            />
            <div className="min-w-0 px-2.5 py-2">
              <p className="text-[0.6rem] text-ink-faint">Shared a post</p>
              <p className="mt-0.5 truncate text-[0.68rem] font-semibold text-ink">{sharedPost.title}</p>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={`${message.from}-${index}-${message.text}`}
            className={`flex ${message.from === 'shop' ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`max-w-[88%] rounded-2xl px-3 py-2 leading-snug ${
                compact ? 'text-[0.68rem]' : 'text-[0.72rem] sm:text-xs'
              } ${
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
  );
};

export default ShopDMCard;
