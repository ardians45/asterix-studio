"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const FB_PIXEL_ID = "4422552327987552";

// Helper to trigger custom pixel events manually
export const trackPixelEvent = (name: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};

export default function MetaPixel() {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay script injection until user interaction or 4s fallback
    let loaded = false;
    const loadPixel = () => {
      if (loaded) return;
      loaded = true;
      setIsLoaded(true);

      // Inject Meta Pixel Script dynamically
      if (typeof window !== "undefined" && !(window as any).fbq) {
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

        (window as any).fbq("init", FB_PIXEL_ID);
        (window as any).fbq("track", "PageView");
      }
    };

    const triggerEvents = ["scroll", "touchstart", "mousemove", "click", "keydown"];
    const handleInteraction = () => {
      loadPixel();
      triggerEvents.forEach((event) => window.removeEventListener(event, handleInteraction));
    };

    triggerEvents.forEach((event) => window.addEventListener(event, handleInteraction, { passive: true }));
    const timer = setTimeout(loadPixel, 4000);

    return () => {
      clearTimeout(timer);
      triggerEvents.forEach((event) => window.removeEventListener(event, handleInteraction));
    };
  }, []);

  useEffect(() => {
    // Track PageView on route change if pixel is already initialized
    if (isLoaded && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, isLoaded]);

  useEffect(() => {
    // Scroll 50% Tracker
    let hasTrackedScroll = false;
    const handleScroll = () => {
      if (hasTrackedScroll) return;
      const scrollDepth = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      if (scrollDepth >= totalHeight * 0.5) {
        trackPixelEvent("Scroll50Percent");
        hasTrackedScroll = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
