import { ArrowUpRight } from 'lucide-react';

interface SupportedShop {
  readonly name: string;
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly question: string;
  readonly imagePosition?: string;
}

const SHOPS: readonly SupportedShop[] = [
  {
    name: 'Daily-drop shops',
    href: '/use-cases/daily-drop-shops',
    image: '/images/shops/daily-drop.webp',
    imageAlt: 'Fashion sellers moving a rack of fresh pieces through the city',
    imageWidth: 1536,
    imageHeight: 1024,
    question: 'How much is the blue set?',
  },
  {
    name: 'Fashion & thrift',
    href: '/use-cases/fashion',
    image: '/images/shops/fashion-thrift.webp',
    imageAlt: 'Fashion seller measuring denim at a bright city worktable',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Is size 10 still in stock?',
  },
  {
    name: 'Beauty',
    href: '/use-cases/beauty',
    image: '/images/shops/beauty.webp',
    imageAlt: 'Beauty seller packing colorful products in a bright studio',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Which shade matches this?',
  },
  {
    name: 'Accessories',
    href: '/use-cases/accessories',
    image: '/images/shops/accessories.webp',
    imageAlt: 'Accessories seller wrapping a gift order by hand',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Can you deliver today?',
  },
  {
    name: 'Fragrance',
    href: '/use-cases/fragrances',
    image: '/images/shops/fragrance.webp',
    imageAlt: 'Male fragrance maker working with bottles and scent materials',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Do you have a 30ml decant?',
  },
  {
    name: 'Bakeries & food',
    href: '/use-cases/home-bakeries-food-brands',
    image: '/images/shops/bakery-food.webp',
    imageAlt: 'Baker packing fresh pastries and customer orders',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Can I order this for Saturday?',
    imagePosition: 'object-top',
  },
  {
    name: 'Skincare & haircare',
    href: '/use-cases/skincare-haircare-makers',
    image: '/images/shops/skincare-haircare.webp',
    imageAlt: 'Skincare maker preparing jars and bottles in a sunlit studio',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'How big is the bottle?',
    imagePosition: 'object-top',
  },
];

const SupportedShops = () => {
  return (
    <section id="supported-shops" className="bg-cobalt py-20 text-white sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-4xl font-display text-[clamp(2rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-tight [text-wrap:balance]">
          Whatever you sell, the questions repeat
        </h2>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:gap-x-8 lg:gap-y-12">
          {SHOPS.map((shop) => (
            <a
              key={shop.href}
              href={shop.href}
              className="group block"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-cobalt-deep sm:aspect-[4/3] sm:rounded-2xl">
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
              <div className="mt-4 flex items-start justify-between gap-5">
                <div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{shop.name}</h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                    “{shop.question}”
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/65 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </a>
          ))}
          <a
            href="https://app.sellogram.co"
            className="group flex aspect-[4/3] flex-col justify-between rounded-xl bg-paper p-7 text-ink transition-transform duration-200 hover:-translate-y-1 sm:aspect-[4/3] sm:rounded-2xl sm:p-9"
          >
            <h3 className="max-w-[12ch] font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Sell on Instagram?
            </h3>
            <span className="flex items-center justify-between text-lg font-medium">
              Put Sellogram to work
              <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportedShops;
