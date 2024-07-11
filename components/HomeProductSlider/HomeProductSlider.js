"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    const sliderRef = useRef(null);
    const controlsRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: -100, left: 0 });
    const [productLinkHref, setProductLinkHref] = useState(data[0].name);

    const updateCursorPosition = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
    
        setCursorPosition({ top: `${cursorY - 20}px`, left: `${cursorX - 59}px` });
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
            <swiper-container ref={sliderRef} class="grid w-full fixed z-10 lg:static" loop>
                {data.map((item, index) => 
                    <swiper-slide key={index}>
                        <div style={{ backgroundImage: `url(${item.image})` }} className="h-screen lg:h-[125vh] xl:h-[175vh] 2xl:h-[200vh] xl:bg-[length:100%_100%] bg-cover bg-center"></div>
                    </swiper-slide>
                )}
            </swiper-container>
            <div ref={controlsRef} className="hidden lg:block z-10 fixed inset-0 group" onMouseMove={updateCursorPosition}>
                <button aria-label="Prev slide" className="cursor-none fixed w-1/2 left-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slidePrev()}></button>
                <button aria-label="Next slide" className="cursor-none fixed w-1/2 right-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slideNext()}></button>
                <div style={{ ...cursorPosition }} className="hidden group-hover:block absolute -z-10 font-semibold text-5xl tracking-tighter min-w-40 text-white">{currentSlideIndex + 1} / {data.length}</div>
            </div>
            <div className="fixed z-40 max-lg:w-full flex items-center justify-between bottom-20 sm:bottom-16 md:bottom-12 lg:bottom-[3.25rem] right-0 px-4">
                <div className="font-semibold text-lg tracking-tighter text-white text-end lg:hidden">{currentSlideIndex + 1} / {data.length}</div>
                {productLinkHref !== null && <Link href={productLinkHref} className="font-semibold py-2 px-8 bg-black text-white">
                    View product
                </Link>}
            </div>
        </>
    )
}