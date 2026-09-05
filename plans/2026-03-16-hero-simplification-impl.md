# Hero Simplification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the hero section to a centered, minimalist layout and convert the navbar to a floating pill shape, inspired by Softly's aesthetic.

**Architecture:** Two file changes — Header.tsx gets restructured as a floating pill nav with `fixed` positioning and `rounded-full` container. Hero.tsx drops the phone mockup, mobile chat, and feature pills, becoming a single centered column with large typography and soft background blobs.

**Tech Stack:** React, Tailwind CSS, existing lucide-react icons and tracking hooks.

---

### Task 1: Convert Header to Floating Pill Nav

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Rewrite the header element and outer wrapper**

Replace the full-width sticky `<header>` with a fixed, floating pill container. The outer `<header>` becomes a transparent fixed wrapper, and the inner content gets the pill styling.

```tsx
return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`max-w-3xl mx-auto rounded-full transition-all duration-300 ease-premium ${
          isScrolled
            ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl shadow-md border border-gray-200/30 dark:border-navy-700/30'
            : 'bg-white/70 dark:bg-navy-950/70 backdrop-blur-xl border border-gray-200/20 dark:border-navy-800/20'
        }`}
      >
        <div className="px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center gap-2"
            >
              <span
                className="text-xl font-bold text-navy-800 dark:text-white font-display tracking-tight
                           transition-all duration-300 group-hover:text-lime-500"
              >
                Mira
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackCTA(`header_nav_${item.id}`, item.label, 'header');
                    scrollToSection(item.id);
                  }}
                  className="nav-link-premium px-3 py-1.5 text-sm font-medium rounded-full
                             hover:bg-gray-100/80 dark:hover:bg-navy-800/80 dark:text-gray-300 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  const newTheme = isDark ? 'light' : 'dark';
                  trackPostHogEvent('theme_toggle', { theme: newTheme });
                  toggleTheme();
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700
                           transition-all duration-300"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-lime-500" />
                ) : (
                  <Moon className="w-4 h-4 text-navy-800" />
                )}
              </button>
              <a
                href="https://app.withmira.co"
                onClick={handleCTAClick}
                className="btn-premium group bg-lime-500 text-navy-800 px-5 py-2 rounded-full
                           font-semibold text-sm shadow-md flex items-center gap-2"
              >
                {HERO_CTA_COPY[heroCta]}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  const newTheme = isDark ? 'light' : 'dark';
                  trackPostHogEvent('theme_toggle', { theme: newTheme, location: 'header_mobile' });
                  toggleTheme();
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700
                           transition-all duration-300"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-lime-500" />
                ) : (
                  <Moon className="w-4 h-4 text-navy-800" />
                )}
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-navy-800 dark:text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-navy-800 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - drops from pill */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-premium ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-4 pt-2 border-t border-gray-100/50 dark:border-navy-700/50">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackCTA(`header_mobile_nav_${item.id}`, item.label, 'header_mobile');
                    scrollToSection(item.id);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-navy-800 dark:hover:text-white
                             hover:bg-gray-50 dark:hover:bg-navy-800 rounded-xl font-medium transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-navy-700">
              <a
                href="https://app.withmira.co"
                onClick={handleCTAClick}
                className="btn-premium w-full bg-lime-500 text-navy-800 px-6 py-3
                           rounded-full font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                {HERO_CTA_COPY[heroCta]}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
```

**Step 2: Verify in browser**

Run: `npm run dev`
Expected: Floating pill nav centered at top with rounded corners. On scroll, shadow appears. Mobile hamburger still works. All links/CTA functional.

**Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: convert header to floating pill navbar"
```

---

### Task 2: Simplify Hero to Centered Single Column

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Rewrite Hero component**

Remove the phone mockup, mobile chat preview, feature pills, and 2-column grid. Clean up unused imports. Center-align all content. Bump headline size.

The full replacement for `Hero.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCTATracking, useSectionTracking } from '../hooks/useTracking';
import { useHeroCtaExperiment, useHeroSubExperiment, HERO_CTA_COPY, HERO_SUB_COPY } from '../hooks/useExperiments';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackCTA } = useCTATracking();
  const sectionRef = useSectionTracking('hero', 'Hero Section');
  const heroCta = useHeroCtaExperiment();
  const heroSub = useHeroSubExperiment();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    trackCTA('hero_cta_button', HERO_CTA_COPY[heroCta], 'hero', {
      button_location: 'hero_section',
      button_type: 'primary',
      hero_headline: 'Let Customers Shop Without Waiting For You To Reply',
      experiment_variant: heroCta,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-warm-50 via-white to-gray-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-32 pb-24 overflow-hidden"
    >
      {/* Soft animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-lime-500/5 to-transparent rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-navy-500/3 to-transparent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-lime-400/3 to-transparent rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Badge */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2
                           bg-gradient-to-r from-lime-500/10 to-lime-500/5
                           border border-lime-500/20 rounded-full
                           text-lime-600 text-sm font-semibold
                           shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Designed for social-first sellers
            </span>
          </div>

          {/* Headline */}
          <div className={`space-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-navy-800 dark:text-white tracking-tight leading-[1.1]">
              Let Customers <span className="relative inline-block">
                <span className="gradient-text">Shop</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                </svg>
              </span> Without Waiting On{' '}
              <span className="relative inline-block">
                <span className="gradient-text">You</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#C0DC2D" strokeWidth="4" strokeLinecap="round" className="animate-draw-line" />
                </svg>
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto font-body ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            {HERO_SUB_COPY[heroSub]}
          </p>

          {/* CTA */}
          <div
            className={`flex items-center justify-center pt-4 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="https://app.withmira.co"
              onClick={(e) => {
                e.preventDefault();
                handleCTAClick();
                window.location.href = 'https://app.withmira.co';
              }}
              className="btn-premium group bg-lime-500 text-navy-800 px-8 py-4 rounded-2xl
                         text-base font-bold shadow-lg shadow-lime-500/20
                         flex items-center justify-center gap-2.5"
            >
              {HERO_CTA_COPY[heroCta]}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
```

**Step 2: Verify in browser**

Run: `npm run dev`
Expected: Centered hero with large headline, badge, description, and CTA. No phone mockup. No feature pills. Soft blurred background blobs. Proper spacing below floating nav.

**Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: simplify hero to centered minimalist layout"
```

---

### Task 3: Visual QA and Final Adjustments

**Files:**
- Possibly modify: `src/components/Header.tsx`, `src/components/Hero.tsx`

**Step 1: Check desktop and mobile viewports**

Open browser dev tools and test:
- Desktop (1440px): Pill nav centered, hero text large and centered
- Tablet (768px): Nav transitions to mobile, hero scales down
- Mobile (375px): Full-width pill with margin, hero stacks properly

**Step 2: Check dark mode**

Toggle dark mode. Verify pill nav and hero backgrounds look correct.

**Step 3: Test all interactive elements**

- Nav links scroll to correct sections
- CTA buttons link to app.withmira.co
- Theme toggle works
- Mobile menu opens/closes
- Animations fire on page load

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual QA adjustments for hero simplification"
```
