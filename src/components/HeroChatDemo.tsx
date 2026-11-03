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
      className="relative isolate pb-6 sm:pb-0"
    >
      <div className="overflow-hidden rounded-2xl bg-ink shadow-[0_30px_90px_rgba(19,30,9,0.16)]">
        <img
          src={HERO_IMAGE_SRC}
          alt="Nairobi fashion seller photographing a denim look against a cobalt-blue stairwell"
          width={1536}
          height={1024}
          loading="eager"
          decoding="async"
          sizes="(min-width: 1024px) 66vw, calc(100vw - 2.5rem)"
          className="block h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-3 -mt-12 sm:absolute sm:-bottom-10 sm:right-6 sm:mx-0 sm:mt-0 sm:w-[46%] lg:-bottom-14 lg:right-8 lg:w-[42%] xl:w-[38%]">
        <ShopDMCard shopName="Nia Thrift" initials="NT" messages={MESSAGES} />
      </div>

      <div className="relative z-20 mx-8 mt-4 flex max-w-[17rem] items-center justify-between gap-4 rounded-xl border border-white/75 bg-white/95 px-4 py-3 shadow-[0_16px_48px_rgba(19,30,9,0.16)] backdrop-blur-md sm:absolute sm:-left-4 sm:top-8 sm:mx-0 sm:mt-0 sm:w-[34%] sm:max-w-none sm:-rotate-3 lg:-left-6 lg:top-10 lg:w-[30%]">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink sm:text-sm">Patchwork denim set</p>
          <p className="mt-0.5 font-mono text-xs text-ink-faint">KSh 6,000 · Size M</p>
        </div>
        <span className="shrink-0 rounded-full bg-fern px-2 py-1 font-body text-xs font-semibold uppercase tracking-wide text-ink">
          in stock
        </span>
      </div>
    </figure>
  );
};

export default HeroChatDemo;
