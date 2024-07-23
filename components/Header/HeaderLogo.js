"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeaderLogo({ data }) {
    const [imageWidth, setImageWidth] = useState("100%");

    useEffect(() => {
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
    }, []);

    return (
        <Link style={{ width: imageWidth }} href="/" className={`w-full min-w-40 transition-all duration-300`}>
            <Image className="w-full" priority src={`http://localhost:1337${data.attributes['Header']['Image'].data.attributes.url}`} width={1} height={1} alt={data.attributes['Header']['Image'].data.attributes.alternativeText}/>
        </Link>
    )
}