import '@testing-library/jest-dom';

// React DOM only listens for unprefixed animationend when AnimationEvent exists, and jsdom lacks it.
if (!('AnimationEvent' in window)) {
  Object.defineProperty(window, 'AnimationEvent', { value: class AnimationEvent extends Event {} });
}
