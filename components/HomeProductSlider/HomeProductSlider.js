"use client";
import { useEffect } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/image";

import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    useEffect(() => {
        register();
    }, []);

    return (
        <swiper-container class="grid w-full fixed">
            {data.map((item, index) => 
                <swiper-slide key={index}>
                    <div style={{ backgroundImage: `url(${item.image})` }} className="h-screen bg-cover bg-center"></div>
                </swiper-slide>
            )}
        </swiper-container>
    )
}