"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import data from "@/public/chairs.json";

export default function HomeProductSilder() {
    const sliderRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
            <div className="z-10">
                <button aria-label="Prev slide" className="border fixed w-1/2 left-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slidePrev()}></button>
                <button aria-label="Next slide" className="border fixed w-1/2 right-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slideNext()}></button>
                <div className="">{currentSlideIndex + 1} / {data.length}</div>
            </div>
        </>
    )
}