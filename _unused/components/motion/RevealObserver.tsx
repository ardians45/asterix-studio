"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `[data-reveal]` element on the page.
 * When an element first comes into view it gets `data-inview`, and the CSS in
 * globals.css plays its entrance once. Elements added later (client components that
 * mount after hydration) are picked up by a MutationObserver.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    const observeAll = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview])").forEach((el) => io.observe(el));
    };
    observeAll(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]:not([data-inview])")) io.observe(node);
          observeAll(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
