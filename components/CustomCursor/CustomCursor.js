"use client";
import { useState, useEffect } from "react";

export default function CustomCursor() {
    const [cursorPosition, setCursorPosition] = useState({ top: -100, left: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState("");

    const updateCursorPosition = (e) => {
        setCursorPosition({ top: `${e.clientY - 14}px`, left: `${e.clientX - 10}px` });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isHovering) {
                updateCursorPosition(e);
            }
        };

        const handleMouseEnter = (e) => {
            const text = e.target.getAttribute("data-cursor-text");
            setHoverText(text);
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setHoverText("");
        };

        const attachListeners = () => {
            const linkElements = document.querySelectorAll("[data-cursor-text]");
            linkElements.forEach(link => {
                link.addEventListener("mouseenter", handleMouseEnter);
                link.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        const observer = new MutationObserver(() => {
            attachListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        document.addEventListener("mousemove", handleMouseMove);
        attachListeners();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            observer.disconnect();
        };
    }, [isHovering]);

    return (
        <div
            style={{ ...cursorPosition }}
            className={`${isHovering ? "block" : "hidden"} uppercase fixed pointer-events-none select-none z-10 font-bold text-4xl tracking-tighter min-w-40`}
        >
            <span className="-ml-28">{hoverText}</span>
        </div>
    );
}
