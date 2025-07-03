// Utility function for smooth scrolling to the contact form
export const scrollToContactForm = () => {
  const formElement = document.getElementById('contact-form');
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};