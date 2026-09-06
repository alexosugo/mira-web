export interface ShopDMMessage {
  from: 'customer' | 'shop';
  text: string;
}

interface ShopDMCardProps {
  shopName: string;
  initials: string;
  messages: ShopDMMessage[];
  className?: string;
  compact?: boolean;
}

const ShopDMCard = ({
  shopName,
  initials,
  messages,
  className = '',
  compact = false,
}: ShopDMCardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/75 bg-white/95 shadow-[0_18px_60px_rgba(14,30,23,0.18)] backdrop-blur-md ${className}`}
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
