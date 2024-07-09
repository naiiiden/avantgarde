"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    const sliderRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

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
        };

        swiper.on('slideChange', handleSlideChange);
        return () => {
            swiper.off('slideChange', handleSlideChange);
        };
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
            <div className="z-10 fixed inset-0" onMouseMove={updateCursorPosition}>
                <button aria-label="Prev slide" className="cursor-none border fixed w-1/2 left-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slidePrev()}></button>
                <button aria-label="Next slide" className="cursor-none border fixed w-1/2 right-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slideNext()}></button>
                <div style={{ ...cursorPosition }} className="absolute -z-10 font-semibold text-5xl tracking-tighter min-w-36">{currentSlideIndex + 1} / {data.length}</div>
            </div>
        </>
    )
}