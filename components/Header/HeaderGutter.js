"use client";
import { useState, useEffect } from "react";

export default function HeaderGutter() {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const height = header.offsetHeight;
            setHeaderHeight(height);
        }
    }, [])
    
    return (
        <div style={{ height: headerHeight }}></div>
    )
}