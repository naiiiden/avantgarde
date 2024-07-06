"use client";
import Link from "next/link";
import data from "./data.json";
import Image from "next/image";
import { useState, useEffect } from "react";

import avantgarde from "@/public/avantgarde.svg";

export default function Header() {
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

    // console.log(data);

    return (
        <header className="fixed top-0 text-white p-4 font-semibold text-lg flex flex-wrap justify-between w-full">
            <Link style={{ width: imageWidth }} href="/" className="w-full">
                <Image className="w-full" priority src={avantgarde} alt={data.name}/>
            </Link>
            <nav className="ml-auto">
                <ul className="text-end">
                    {data.links.map((link) => 
                        <li key={link.name}>
                            <Link href={link.url}>
                                {link.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}