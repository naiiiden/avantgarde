"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    const sliderRef = useRef(null);
    const controlsRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
    const [productLinkHref, setProductLinkHref] = useState(null);

    const updateCursorPosition = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
    
        setCursorPosition({ top: `${cursorY}px`, left: `${cursorX}px` });
    };

    useEffect(() => {
        register();

        const swiper = sliderRef.current.swiper;
        const handleSlideChange = () => {
            setCurrentSlideIndex(swiper.realIndex);
            setProductLinkHref(data[swiper.realIndex].name);
            console.log(swiper.realIndex);
        };

        swiper.on('slideChange', handleSlideChange);
        return () => {
            swiper.off('slideChange', handleSlideChange);
        };
    }, []);

    return (
        <>
            <swiper-container ref={sliderRef} class="grid w-full fixed z-10" loop>
                {data.map((item, index) => 
                    <swiper-slide key={index}>
                        <div style={{ backgroundImage: `url(${item.image})` }} className="h-screen bg-cover bg-center"></div>
                    </swiper-slide>
                )}
            </swiper-container>
            <div ref={controlsRef} className="z-10 fixed inset-0 group" onMouseMove={updateCursorPosition}>
                <button aria-label="Prev slide" className="cursor-none fixed w-1/2 left-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slidePrev()}></button>
                <button aria-label="Next slide" className="cursor-none fixed w-1/2 right-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slideNext()}></button>
                <div style={{ ...cursorPosition }} className="hidden group-hover:block absolute -z-10 font-semibold text-5xl tracking-tighter min-w-40 text-white">{currentSlideIndex + 1} / {data.length}</div>
            </div>
            {productLinkHref !== null && <Link href={productLinkHref} className="absolute font-semibold z-40 bottom-12 right-4 py-2 px-8 bg-black text-white">
                View product
            </Link>}
        </>
    )
}