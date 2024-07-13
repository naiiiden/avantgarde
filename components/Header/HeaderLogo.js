"use client";
import Link from "next/link";
import data from "./data.json";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import avantgarde from "@/public/avantgarde.svg";

export default function HeaderLogo() {
    const pathname = usePathname();
    const [imageWidth, setImageWidth] = useState("100%");

    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                if (window.scrollY === 0) {
                    setImageWidth("100%");
                } else {
                    setImageWidth("1%");
                }
            };
    
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [pathname]);

    return (
        <Link style={{ width: imageWidth }} href="/" className={`w-full min-w-40 ${pathname === "/" ? "" : "max-w-40"} transition-all duration-300`}>
            <Image className="w-full" priority src={avantgarde} alt={data.name}/>
        </Link>
    )
}