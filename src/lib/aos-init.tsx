'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export function AosInit() {
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 100,
      startEvent: 'DOMContentLoaded',
    });

    // Recalculate positions after images and fonts load
    const refreshAOS = () => {
      AOS.refresh();
    };

    window.addEventListener('load', refreshAOS);

    return () => {
      window.removeEventListener('load', refreshAOS);
    };
  }, []);

  return null;
}
