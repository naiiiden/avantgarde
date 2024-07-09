"use client";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/image";

import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    const sliderRef = useRef(null);

    console.log(sliderRef);

    useEffect(() => {
        register();
    }, []);

    return (
        <>
            <swiper-container ref={sliderRef} class="grid w-full fixed" loop>
                {data.map((item, index) => 
                    <swiper-slide key={index}>
                        <div style={{ backgroundImage: `url(${item.image})` }} className="h-screen bg-cover bg-center"></div>
                    </swiper-slide>
                )}
            </swiper-container>
            <div className="z-10">
                <button aria-label="Prev slide" className="border fixed w-1/2 left-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slidePrev()}>
                    <svg width="18" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8.9a1 1 0 0 1-1.414 0L.395 5.708a1 1 0 0 1-.001-1.415L3.586 1.1A1 1 0 0 1 5 2.515L3.515 4H17a1 1 0 1 1 0 2H3.515L5 7.485A1 1 0 0 1 5 8.9Z" fill="#000"></path>
                    </svg>
                </button>
                <button aria-label="Next slide" className="border fixed w-1/2 right-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slideNext()}>
                    <svg width="18" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8.9a1 1 0 0 1-1.414 0L.395 5.708a1 1 0 0 1-.001-1.415L3.586 1.1A1 1 0 0 1 5 2.515L3.515 4H17a1 1 0 1 1 0 2H3.515L5 7.485A1 1 0 0 1 5 8.9Z" fill="#000"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}