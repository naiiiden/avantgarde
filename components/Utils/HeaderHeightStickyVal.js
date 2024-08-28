"use client";
import { useState, useEffect } from "react";

export default function HeaderHeightStickyVal({ children }) {
    const [headerHeight, setHeaderHeight] = useState('');

    const calculateHeaderHeight = () => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    };

    useEffect(() => {
        calculateHeaderHeight();

        window.addEventListener("resize", calculateHeaderHeight);
        return () => {
            window.removeEventListener('resize', calculateHeaderHeight);
        }
    }, [])

    return <div style={{ top: `${headerHeight}px` }} className={`h-fit lg:sticky`}>{children}</div>;
}
