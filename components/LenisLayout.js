"use client";
import { useEffect } from "react";
import Lenis from "lenis";

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
