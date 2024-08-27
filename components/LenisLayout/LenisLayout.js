"use client";
import Lenis from "lenis";

import { useEffect } from "react";

export default function LenisLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
        syncTouch: true,
    });

    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
