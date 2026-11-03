export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
  const fbq: ((...args: unknown[]) => void) | undefined;
}
