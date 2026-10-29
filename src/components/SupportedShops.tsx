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
    name: 'Bakeries & food',
    href: '/use-cases/home-bakeries-food-brands',
    image: '/images/shops/bakery-food.webp',
    imageAlt: 'Baker packing fresh pastries and customer orders',
    imageWidth: 1122,
    imageHeight: 1402,
    question: 'Can I order this for Saturday?',
    imagePosition: 'object-top',
  },
];

const ALSO_SOLD = [
  { image: '/images/shops/fragrance.webp', position: 'object-center' },
  { image: '/images/shops/skincare-haircare.webp', position: 'object-center' },
  { image: '/images/shops/daily-drop.webp', position: 'object-left' },
] as const;

const TILE_OFFSETS = ['', 'sm:mt-16', 'lg:mt-8', 'sm:mt-16 lg:mt-24'] as const;
const BUBBLE_TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'] as const;

const SupportedShops = () => {
  return (
    <section id="supported-shops" className="py-6 sm:py-8 lg:py-10">
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] rounded-2xl bg-cobalt px-6 py-14 text-white sm:px-10 sm:py-16 lg:p-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="max-w-4xl font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-semibold leading-[0.98] tracking-tight [text-wrap:balance] lg:col-span-8">
              Whatever you sell, the questions repeat
            </h2>
            <div className="flex items-center gap-5 lg:col-span-4">
              <div className="flex shrink-0 -space-x-3" aria-hidden="true">
                {ALSO_SOLD.map((item) => (
                  <img
                    key={item.image}
                    src={item.image}
                    alt=""
                    width={1122}
                    height={1402}
                    loading="lazy"
                    decoding="async"
                    className={`h-14 w-14 rounded-full object-cover ring-4 ring-cobalt ${item.position}`}
                  />
                ))}
              </div>
              <p className="max-w-xs text-base leading-relaxed text-white/85 [text-wrap:pretty]">
                Also fragrance, skincare, daily drops and more. Sellogram learns the answers from your shop.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {SHOPS.map((shop, index) => (
              <a
                key={shop.href}
                href={shop.href}
                className={`group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${TILE_OFFSETS[index] ?? ''}`}
              >
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cobalt-deep">
                    <img
                      src={shop.image}
                      alt={shop.imageAlt}
                      width={shop.imageWidth}
                      height={shop.imageHeight}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className={`h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] ${shop.imagePosition ?? ''}`}
                    />
                  </div>
                  <p
                    className={`absolute bottom-4 left-4 right-6 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-base font-medium leading-snug text-ink shadow-[0_16px_40px_rgba(9,71,127,0.35)] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-0 ${BUBBLE_TILTS[index] ?? ''}`}
                  >
                    “{shop.question}”
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between gap-5">
                  <h3 className="font-display text-xl font-semibold">{shop.name}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/65 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedShops;
