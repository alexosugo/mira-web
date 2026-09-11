import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react';

interface InstagramPostCardProps {
  readonly image: string;
  readonly imageAlt: string;
}

const InstagramPostCard = ({ image, imageAlt }: InstagramPostCardProps) => (
  <article
    data-testid="journey-instagram-post"
    className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-2xl bg-white text-ink shadow-[0_18px_60px_rgba(5,23,90,0.25)]"
    aria-label="Cocoa Rose Beauty Instagram post"
  >
    <header className="flex items-center gap-3 px-3 py-2.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[0.65rem] font-semibold text-paper"
        aria-hidden="true"
      >
        CR
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">cocoarosebeauty</p>
        <p className="text-[0.65rem] text-ink-faint">Nairobi</p>
      </div>
      <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
    </header>

    <div data-journey-frame className="h-[clamp(8rem,18svh,15rem)] bg-cobalt-deep sm:h-[clamp(11rem,26svh,17rem)] lg:h-[min(48vh,28rem)]">
      <img
        src={image}
        alt={imageAlt}
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1440px) 560px, (min-width: 1024px) 42vw, calc(100vw - 4.5rem)"
        className="h-full w-full object-cover"
      />
    </div>

    <footer className="px-3 py-2.5">
      <div className="flex items-center gap-3" aria-hidden="true">
        <Heart className="h-5 w-5" />
        <MessageCircle className="h-5 w-5" />
        <Send className="h-5 w-5" />
        <Bookmark className="ml-auto h-5 w-5" />
      </div>
      <p className="mt-2 text-xs">
        <span className="font-semibold">cocoarosebeauty</span> Shade 08 lip gloss. KSh 1,200.
      </p>
    </footer>
  </article>
);

export default InstagramPostCard;
