import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import SupportedShops from '../components/SupportedShops';
import DMSalesJourney from '../components/DMSalesJourney';
import { REPLY_DELAY_MS } from '../components/ShopDMCard';

const EXPECTED_SHOPS = [
  ['Fashion & thrift', '/use-cases/fashion'],
  ['Beauty', '/use-cases/beauty'],
  ['Accessories', '/use-cases/accessories'],
  ['Bakeries & food', '/use-cases/home-bakeries-food-brands'],
] as const;

describe('imagery-led homepage sections', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('promotes every supported shop type with a real use-case link', () => {
    render(<SupportedShops />);

    expect(
      screen.getByRole('heading', { name: /Whatever you sell, the questions repeat/i })
    ).toBeInTheDocument();

    for (const [name, href] of EXPECTED_SHOPS) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href);
    }
    expect(screen.getAllByRole('link')).toHaveLength(EXPECTED_SHOPS.length);
  });

  it('keeps the supported-shop grid compact and free of repeated rules', () => {
    const { container } = render(<SupportedShops />);

    const shopImages = screen.getAllByRole('img');
    for (const image of shopImages) {
      expect(image.parentElement?.className).toContain('aspect-[4/5]');
    }
    expect(container.querySelectorAll('.border-t')).toHaveLength(0);
  });

  it('follows one Cocoa Rose Beauty order from stock question to delivery', () => {
    render(<DMSalesJourney />);

    expect(
      screen.getByRole('heading', { name: 'From “Is it available?” to “Rider ametoka”' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hi, is shade 08 still available\?/ })).toBeInTheDocument();
    expect(screen.getByTestId('journey-dm')).toBeInTheDocument();
    expect(screen.queryByTestId('journey-instagram-post')).not.toBeInTheDocument();
    expect(screen.getByText('Shared a post')).toBeInTheDocument();
    expect(screen.queryByText('Delivery to Kilimani is KSh 250.')).not.toBeInTheDocument();
    expect(screen.queryByText('One customer. One order. From the first question to the delivery update.')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sellogram asks the shop owner to confirm the payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/card payment/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Kasa Archive')).not.toBeInTheDocument();
    expect(screen.queryByText('Mide Beauty')).not.toBeInTheDocument();
    expect(screen.queryByText('Aster Fragrance')).not.toBeInTheDocument();

    expect(screen.getAllByText('Cocoa Rose Beauty')).toHaveLength(1);
    expect(screen.queryByText('Inside the sale')).not.toBeInTheDocument();
    expect(screen.queryByText('Accra')).not.toBeInTheDocument();
  });

  it('shows one stage at a time in one fixed visual area', () => {
    const { container } = render(<DMSalesJourney />);

    expect(container.querySelectorAll('[data-journey-frame]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-journey-visual]')).toHaveLength(1);
    expect(screen.queryByRole('img', { name: /Cocoa Rose Beauty model/i })).not.toBeInTheDocument();
  });

  it('lets the reader pick any of the five steps without scroll locking', () => {
    vi.useFakeTimers();
    const { container } = render(<DMSalesJourney />);
    const progress = screen.getByRole('list', { name: 'Order progress' });
    const steps = within(progress).getAllByRole('listitem');

    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveAttribute('aria-current', 'step');
    expect(container.querySelector('.sticky')).not.toBeInTheDocument();
    expect(container.querySelector('[data-journey-connector]')).toBeInTheDocument();

    fireEvent.click(within(progress).getByRole('button', { name: /Send me the payment details/ }));
    expect(steps[2]).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('Hi, is shade 08 still available?')).toBeInTheDocument();
    const pendingShopReplies = 3;
    for (let reply = 0; reply < pendingShopReplies; reply += 1) {
      act(() => {
        vi.advanceTimersByTime(REPLY_DELAY_MS);
      });
    }
    expect(screen.getByText(/Buy Goods till 946512/).className).toContain('bg-dawn-bright');

    fireEvent.click(within(progress).getByRole('button', { name: /Rider ametoka/ }));
    expect(screen.getByRole('img', { name: /Piki piki rider/ })).toBeInTheDocument();
  });

  it('opens the clicked stage description and closes the previous one', () => {
    render(<DMSalesJourney />);
    const progress = screen.getByRole('list', { name: 'Order progress' });

    fireEvent.click(within(progress).getByRole('button', { name: /How much is delivery to Kilimani/ }));

    expect(screen.getByText('Your shop sends the delivery fee in the same chat.').closest('[aria-hidden="true"]')).toBeNull();
    expect(
      screen.getByText('A customer shares your post to your DMs. Your shop confirms the stock and price.').closest('[aria-hidden="true"]')
    ).not.toBeNull();
  });

  it('shows the shop typing before its reply lands', () => {
    vi.useFakeTimers();
    render(<DMSalesJourney />);

    expect(screen.getByText('Hi, is shade 08 still available?')).toBeInTheDocument();
    expect(screen.getByTestId('dm-typing')).toBeInTheDocument();
    expect(screen.queryByText('Yes. Shade 08 is in stock. It’s KSh 1,200.')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(REPLY_DELAY_MS);
    });

    expect(screen.getByText('Yes. Shade 08 is in stock. It’s KSh 1,200.')).toBeInTheDocument();
    expect(screen.queryByTestId('dm-typing')).not.toBeInTheDocument();
  });

  describe('autoplay', () => {
    const observerCallbacks: IntersectionObserverCallback[] = [];

    const setFrameInView = (isIntersecting: boolean) => {
      act(() => {
        for (const callback of observerCallbacks) {
          callback([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
        }
      });
    };

    const timer = (container: HTMLElement) => container.querySelector<HTMLElement>('[data-journey-timer]');
    const currentStep = () =>
      within(screen.getByRole('list', { name: 'Order progress' }))
        .getAllByRole('listitem')
        .findIndex((step) => step.getAttribute('aria-current') === 'step');

    afterEach(() => {
      observerCallbacks.length = 0;
      vi.unstubAllGlobals();
    });

    const stubBrowser = ({ isReducedMotion = false } = {}) => {
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          constructor(callback: IntersectionObserverCallback) {
            observerCallbacks.push(callback);
          }
          observe() {}
          disconnect() {}
        }
      );
      vi.stubGlobal('matchMedia', (query: string) => ({ matches: isReducedMotion, media: query }));
    };

    it('moves to the next step each time the timer on the line finishes, then stops at the last step', () => {
      stubBrowser();
      const { container } = render(<DMSalesJourney />);
      setFrameInView(true);

      for (let step = 1; step <= 4; step += 1) {
        fireEvent.animationEnd(timer(container)!);
        expect(currentStep()).toBe(step);
      }
      expect(timer(container)).toBeNull();
    });

    it('runs the timer only while the visual is in view and nobody hovers or focuses the section', () => {
      stubBrowser();
      const { container } = render(<DMSalesJourney />);
      const section = container.querySelector('#dm-sales-journey')!;

      expect(timer(container)!.style.animationPlayState).toBe('paused');
      setFrameInView(true);
      expect(timer(container)!.style.animationPlayState).toBe('running');

      fireEvent.pointerEnter(section);
      expect(timer(container)!.style.animationPlayState).toBe('paused');
      fireEvent.pointerLeave(section);
      expect(timer(container)!.style.animationPlayState).toBe('running');

      setFrameInView(false);
      expect(timer(container)!.style.animationPlayState).toBe('paused');
      setFrameInView(true);
      expect(timer(container)!.style.animationPlayState).toBe('running');

      const lastStep = screen.getByRole('button', { name: /Rider ametoka/ });
      fireEvent.focus(lastStep);
      expect(timer(container)!.style.animationPlayState).toBe('paused');
      fireEvent.blur(lastStep);
      expect(timer(container)!.style.animationPlayState).toBe('running');
    });

    it('stops autoplay for good once the reader picks a step', () => {
      stubBrowser();
      const { container } = render(<DMSalesJourney />);
      setFrameInView(true);

      fireEvent.click(screen.getByRole('button', { name: /How much is delivery to Kilimani/ }));

      expect(currentStep()).toBe(1);
      expect(timer(container)).toBeNull();
    });

    it('does not autoplay when the reader prefers reduced motion', () => {
      stubBrowser({ isReducedMotion: true });
      const { container } = render(<DMSalesJourney />);
      setFrameInView(true);

      expect(timer(container)).toBeNull();
      expect(currentStep()).toBe(0);
    });
  });

  it('keeps the customer inside the shop DM', () => {
    render(<DMSalesJourney />);

    expect(screen.getByText('Cocoa Rose Beauty')).toBeInTheDocument();
    expect(screen.queryByText('Sellogram')).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /shop owner/i })).not.toBeInTheDocument();
  });
});
