"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable Lenis on desktop (768px+) to avoid heavy JS on mobile
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
