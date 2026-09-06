interface SupportedShop {
  name: string;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
  tags: string[];
  layout: string;
  aspect: string;
}

const SHOPS: SupportedShop[] = [
  {
    name: 'Daily-drop shops',
    href: '/use-cases/daily-drop-shops',
    image: '/images/shops/daily-drop.webp',
    imageAlt: 'Fashion sellers moving a rack of fresh pieces through the city',
    description: 'New stock moves fast. Sellogram keeps product and availability questions moving with it.',
    tags: ['drops', 'stock', 'delivery'],
    layout: 'lg:col-span-7',
    aspect: 'aspect-[3/2]',
  },
  {
    name: 'Fashion & thrift',
    href: '/use-cases/fashion',
    image: '/images/shops/fashion-thrift.webp',
    imageAlt: 'Fashion seller measuring denim at a bright city worktable',
    description: 'Sizes, measurements, prices, and stock answered in the shop DM.',
    tags: ['sizes', 'measurements', 'stock'],
    layout: 'lg:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Beauty',
    href: '/use-cases/beauty',
    image: '/images/shops/beauty.webp',
    imageAlt: 'Beauty seller packing colorful products in a bright studio',
    description: 'Shade, bundle, stock, and delivery questions without the endless back and forth.',
    tags: ['shades', 'bundles', 'delivery'],
    layout: 'lg:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Accessories',
    href: '/use-cases/accessories',
    image: '/images/shops/accessories.webp',
    imageAlt: 'Accessories seller wrapping a gift order by hand',
    description: 'Bags, jewellery, gifts, compatibility questions, and the details buyers need before they order.',
    tags: ['details', 'gifts', 'orders'],
    layout: 'lg:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Fragrance',
    href: '/use-cases/fragrances',
    image: '/images/shops/fragrance.webp',
    imageAlt: 'Male fragrance maker working with bottles and scent materials',
    description: 'Notes, decant sizes, availability, and delivery details answered from your own shop information.',
    tags: ['notes', 'decants', 'stock'],
    layout: 'lg:col-span-4',
    aspect: 'aspect-[4/5]',
  },
  {
    name: 'Bakeries & food',
    href: '/use-cases/home-bakeries-food-brands',
    image: '/images/shops/bakery-food.webp',
    imageAlt: 'Baker packing fresh pastries and customer orders',
    description: 'Today’s availability, order timing, delivery areas, and menu questions while you keep making.',
    tags: ['menu', 'timing', 'delivery'],
    layout: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    name: 'Skincare & haircare',
    href: '/use-cases/skincare-haircare-makers',
    image: '/images/shops/skincare-haircare.webp',
    imageAlt: 'Skincare maker preparing jars and bottles in a sunlit studio',
    description: 'Product facts, ingredients, sizes, stock, and orders answered between batches.',
    tags: ['products', 'sizes', 'orders'],
    layout: 'lg:col-span-5',
    aspect: 'aspect-[16/10]',
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

        <div className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          {SHOPS.map((shop) => (
            <a
              key={shop.href}
              href={shop.href}
              className={`group block ${shop.layout}`}
            >
              <div className={`overflow-hidden rounded-[1.5rem] bg-paper-raised ${shop.aspect}`}>
                <img
                  src={shop.image}
                  alt={shop.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-5">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{shop.name}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-light sm:text-base">
                    {shop.description}
                  </p>
                </div>
                <span className="mt-1 text-xl text-ink-faint transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${shop.name} capabilities`}>
                {shop.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-ink-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedShops;
