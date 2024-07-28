"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import Image from "next/image";

export default function HomeProductSlider({ data }) {
    const sliderRef = useRef(null);
    const controlsRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: -100, left: 0 });

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
            swiper.slideToLoop(localStorageCurrentSlideIndex, 0);
            setCurrentSlideIndex(localStorageCurrentSlideIndex);
        }

        const handleSlideChange = () => {
            const newIndex = swiper.realIndex;
            setCurrentSlideIndex(newIndex);
            localStorage.setItem('swiperIndex', newIndex);
        };

        swiper.on('slideChange', handleSlideChange);

        return () => {
            swiper.off('slideChange', handleSlideChange);
        };
    }, [data]);

    return (
        <div className="group cursor-none" onMouseMove={updateCursorPosition}>
            <swiper-container ref={sliderRef} class="grid w-full fixed z-10" slides-per-view="1.9" centered-slides="true" loop="true" slide-to-clicked-slide="true" loop-additional-slides="1">
                {data.map((item, index) => 
                    <swiper-slide class="flex items-center h-screen swiper-slide" key={index}>
                        <Link href={`product/${item.attributes.urlHandle}`} className="w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-2xl mx-auto">
                            <Image unoptimized priority src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} width={700} height={700} alt=""/>
                        </Link>
                    </swiper-slide>
                )}
            </swiper-container>
            <div style={{ ...cursorPosition }} className="hidden lg:group-hover:block fixed pointer-events-none select-none z-10 font-semibold text-5xl tracking-tighter min-w-40">{currentSlideIndex + 1} / {data.length}</div>
            <div className="flex flex-col gap-4 fixed z-40 bottom-0 right-0 p-4">
                <div className="font-semibold text-lg tracking-tighter text-end lg:hidden">{currentSlideIndex + 1} / {data.length}</div>
                <h1 className="font-semibold text-xs lg:text-sm">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
            </div>
        </div>
    )
}