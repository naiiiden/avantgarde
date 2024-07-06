"use client";
import Link from "next/link";
import data from "./data.json";
import Image from "next/image";
import { useState, useEffect } from "react";

import avantgarde from "@/public/avantgarde.svg";

export default function HeaderLogo() {
    const [imageWidth, setImageWidth] = useState("100%");

    useEffect(() => {
        const handleScroll = () => {
            const newWidth = Math.max(50, 100 - window.scrollY / 20) + "%";
            setImageWidth(newWidth);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Link style={{ width: imageWidth }} href="/" className="w-full">
            <Image className="w-full" priority src={avantgarde} alt={data.name}/>
        </Link>
    )
}