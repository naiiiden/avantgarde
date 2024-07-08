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
        <div>
            <swiper-container class="w-full grid">
                {data.map((item, index) => 
                    <swiper-slide key={index}>
                        <Image src={item.image} width={200} height={200} alt={item.name}/>
                    </swiper-slide>
                )}
            </swiper-container>
        </div>
    )
}