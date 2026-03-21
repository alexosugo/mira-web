/** Height of the fixed floating nav (pill ~56px + top padding 16px + buffer). */
const NAV_OFFSET = 80;

/**
 * Smoothly scrolls to a page section, offsetting for the fixed floating nav.
 *
 * @param sectionId - The DOM id of the target section element.
 * @returns true if the element was found and scrolled to, false otherwise.
 */
export function scrollToSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}
