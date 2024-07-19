"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import data from "@/public/chairs.json";
import Image from "next/image";

export default function HomeProductSlider() {
    const sliderRef = useRef(null);
    const controlsRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: -100, left: 0 });
    const [productLinkHref, setProductLinkHref] = useState(data[0].urlHandle);

    const updateCursorPosition = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
    
        setCursorPosition({ top: `${cursorY - 20}px`, left: `${cursorX - 59}px` });
    };

    useEffect(() => {
        register();

        const swiper = sliderRef.current.swiper;
        const localStorageCurrentSlideIndex = parseInt(localStorage.getItem('swiperIndex'));

        if (localStorageCurrentSlideIndex !== null) {
            swiper.slideTo(localStorageCurrentSlideIndex, 0);
            
            setCurrentSlideIndex(localStorageCurrentSlideIndex);
            setProductLinkHref(data[localStorageCurrentSlideIndex].urlHandle);
        }

        const handleSlideChange = () => {
            const newIndex = swiper.realIndex;

            setCurrentSlideIndex(newIndex);
            setProductLinkHref(data[newIndex].urlHandle);

            localStorage.setItem('swiperIndex', newIndex);
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
                    <swiper-slide class="flex items-center h-screen" key={index}>
                        <Image className="max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] mx-auto" src={item.image} width={1500} height={1500} alt=""/>
                    </swiper-slide>
                )}
            </swiper-container>
            <div ref={controlsRef} className="hidden lg:block z-10 fixed inset-0 group" onMouseMove={updateCursorPosition}>
                <button aria-label="Prev slide" className="cursor-none fixed w-1/2 left-0 top-0 h-full rotate-180" onClick={() => sliderRef.current.swiper.slidePrev()}></button>
                <button aria-label="Next slide" className="cursor-none fixed w-1/2 right-0 top-0 h-full" onClick={() => sliderRef.current.swiper.slideNext()}></button>
                <div style={{ ...cursorPosition }} className="hidden group-hover:block absolute -z-10 font-semibold text-5xl tracking-tighter min-w-40">{currentSlideIndex + 1} / {data.length}</div>
            </div>
            <div className="fixed z-40 max-lg:w-full flex items-center justify-between bottom-20 sm:bottom-16 md:bottom-12 lg:bottom-[3.25rem] right-0 px-4">
                <div className="font-semibold text-lg tracking-tighter text-end lg:hidden">{currentSlideIndex + 1} / {data.length}</div>
                {productLinkHref !== null && <Link href={`product/${productLinkHref}`} className="font-semibold py-2 px-8 bg-black text-white">
                    View product
                </Link>}
            </div>
        </>
    )
}