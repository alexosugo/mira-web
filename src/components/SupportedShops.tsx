import { ArrowUpRight } from 'lucide-react';

interface SupportedShop {
  readonly name: string;
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly description: string;
  readonly details: string;
  readonly layout: string;
  readonly aspect: string;
  readonly imagePosition?: string;
}

const SHOPS: readonly SupportedShop[] = [
  {
    name: 'Daily-drop shops',
    href: '/use-cases/daily-drop-shops',
    image: '/images/shops/daily-drop.webp',
    imageAlt: 'Fashion sellers moving a rack of fresh pieces through the city',
    imageWidth: 1672,
    imageHeight: 941,
    description: 'New stock moves fast. Sellogram keeps product and availability questions moving with it.',
    details: 'Drops · stock · delivery',
    layout: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    name: 'Fashion & thrift',
    href: '/use-cases/fashion',
    image: '/images/shops/fashion-thrift.webp',
    imageAlt: 'Fashion seller measuring denim at a bright city worktable',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Sizes, measurements, prices, and stock answered in the shop DM.',
    details: 'Sizes · measurements · stock',
    layout: 'lg:col-span-5 lg:mt-24',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Beauty',
    href: '/use-cases/beauty',
    image: '/images/shops/beauty.webp',
    imageAlt: 'Beauty seller packing colorful products in a bright studio',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Shade, bundle, stock, and delivery questions without the endless back and forth.',
    details: 'Shades · bundles · delivery',
    layout: 'lg:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Accessories',
    href: '/use-cases/accessories',
    image: '/images/shops/accessories.webp',
    imageAlt: 'Accessories seller wrapping a gift order by hand',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Bags, jewellery, gifts, compatibility questions, and the details buyers need before they order.',
    details: 'Details · gifts · orders',
    layout: 'lg:col-span-4 lg:mt-16',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Fragrance',
    href: '/use-cases/fragrances',
    image: '/images/shops/fragrance.webp',
    imageAlt: 'Male fragrance maker working with bottles and scent materials',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Notes, decant sizes, availability, and delivery details answered from your own shop information.',
    details: 'Notes · decants · stock',
    layout: 'lg:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Bakeries & food',
    href: '/use-cases/home-bakeries-food-brands',
    image: '/images/shops/bakery-food.webp',
    imageAlt: 'Baker packing fresh pastries and customer orders',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Today’s availability, order timing, delivery areas, and menu questions while you keep making.',
    details: 'Menu · timing · delivery',
    layout: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
    imagePosition: 'object-top',
  },
  {
    name: 'Skincare & haircare',
    href: '/use-cases/skincare-haircare-makers',
    image: '/images/shops/skincare-haircare.webp',
    imageAlt: 'Skincare maker preparing jars and bottles in a sunlit studio',
    imageWidth: 1122,
    imageHeight: 1402,
    description: 'Product facts, ingredients, sizes, stock, and orders answered between batches.',
    details: 'Products · sizes · orders',
    layout: 'lg:col-span-5',
    aspect: 'aspect-[16/10]',
    imagePosition: 'object-top',
  },
];

const SupportedShops = () => {
  return (
    <section id="supported-shops" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern">Built around real shops</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,1.5rem+3vw,4.4rem)] font-semibold leading-[1] tracking-tight text-ink [text-wrap:balance]">
              Made for the kinds of shops that sell on Instagram
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-light lg:col-span-4 lg:justify-self-end">
            From daily drops to beauty, fragrance, and food, Sellogram helps shops that already
            sell through DMs.
          </p>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-flow-row-dense lg:grid-cols-12 lg:gap-x-7 lg:gap-y-20">
          {SHOPS.map((shop) => (
            <a
              key={shop.href}
              href={shop.href}
              className={`group block ${shop.layout}`}
            >
              <div className={`overflow-hidden rounded-xl bg-paper-raised sm:rounded-2xl ${shop.aspect}`}>
                <img
                  src={shop.image}
                  alt={shop.imageAlt}
                  width={shop.imageWidth}
                  height={shop.imageHeight}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className={`h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02] ${shop.imagePosition ?? ''}`}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-5 border-t border-line pt-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{shop.name}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-light sm:text-base">
                    {shop.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
                {shop.details}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedShops;
