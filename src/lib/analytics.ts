declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Safely send a custom event to Umami Analytics.
 * Silently does nothing if running on the server, if Umami is not loaded,
 * or if an ad-blocker is active.
 *
 * @example
 * trackEvent('contact_submit', { success: true });
 * trackEvent('terminal_command', { command: 'help' });
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.umami?.track) {
    try {
      window.umami.track(name, properties);
    } catch {
      // Silently catch any telemetry errors to avoid interrupting the user flow
    }
  }
}
