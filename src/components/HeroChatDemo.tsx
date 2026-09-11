import ShopDMCard, { type ShopDMMessage } from './ShopDMCard';

const HERO_IMAGE_SRC = '/images/hero/cobalt-stairwell.webp';

const MESSAGES: ShopDMMessage[] = [
  { from: 'customer', text: 'Hii denim set bado iko in M?' },
  { from: 'shop', text: 'Iko. Full set ni KSh 6,000.' },
  { from: 'customer', text: 'Na delivery Kilimani?' },
  { from: 'shop', text: 'KSh 250. Ukichukua leo rider can bring it this afternoon.' },
];

/**
 * Hero proof surface: the merchant world plus the shop DM that Sellogram powers.
 * Sellogram stays behind the shop identity; the customer only sees the shop.
 */
const HeroChatDemo = () => {
  return (
    <figure
      aria-label="Example Nia Thrift Instagram DM conversation about a denim set and delivery to Kilimani"
      className="relative isolate"
    >
      <div className="overflow-hidden rounded-xl bg-ink shadow-[0_30px_90px_rgba(19,30,9,0.16)] sm:rounded-2xl">
        <img
          src={HERO_IMAGE_SRC}
          alt="Nairobi fashion seller photographing a denim look against a cobalt-blue stairwell"
          width={1536}
          height={1024}
          loading="eager"
          decoding="async"
          sizes="(min-width: 1600px) 1536px, calc(100vw - 2rem)"
          className="block h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-3 -mt-10 sm:absolute sm:left-[4%] sm:top-[7%] sm:mx-0 sm:mt-0 sm:w-[31%] lg:w-[28%] xl:w-[26%]">
        <ShopDMCard shopName="Nia Thrift" initials="NT" messages={MESSAGES} />
      </div>

      <div className="relative z-20 mx-8 -mt-2 flex max-w-[17rem] items-center justify-between gap-4 rounded-xl border border-white/75 bg-white/95 px-4 py-3 shadow-[0_16px_48px_rgba(19,30,9,0.16)] backdrop-blur-md sm:absolute sm:bottom-[8%] sm:left-[4%] sm:mx-0 sm:mt-0 sm:w-[29%] sm:max-w-none lg:w-[25%]">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink sm:text-sm">Patchwork denim set</p>
          <p className="mt-0.5 font-mono text-[0.65rem] text-ink-faint sm:text-xs">KSh 6,000 · Size M</p>
        </div>
        <span className="shrink-0 rounded-full bg-fern/10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wide text-fern-deep">
          in stock
        </span>
      </div>
    </figure>
  );
};

export default HeroChatDemo;
