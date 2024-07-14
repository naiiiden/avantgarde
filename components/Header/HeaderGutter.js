"use client";
import { useState, useEffect } from "react";

export default function HeaderGutter() {
    const [headerHeight, setHeaderHeight] = useState(0);

    const updateHeaderHeight = () => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    };

    useEffect(() => {
        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);
        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
        }
    }, [])
    
    return (
        <div style={{ height: headerHeight }}></div>
    )
}