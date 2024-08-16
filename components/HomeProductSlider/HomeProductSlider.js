"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import Image from "next/image";

export default function HomeProductSlider({ data }) {
    const sliderRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ top: -100, left: 0 });
    const [hoverOnProductLink, setHoverOnProductLink] = useState(false);

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

        if (!isNaN(localStorageCurrentSlideIndex)) {
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
        <div className="group cursor-none fixed inset-0" onMouseMove={updateCursorPosition}>
            <swiper-container ref={sliderRef} class="grid w-full z-10" slides-per-view="1.9" centered-slides="true" loop="true" loop-additional-slides="1" speed="600" breakpoints='{ "1024": { "allowTouchMove": false } }'>
                {data.map((item, index) => 
                    <swiper-slide class="flex items-center h-screen" key={index} onClick={() => sliderRef.current?.swiper.slideToLoop(index)}>
                        <Link 
                            onMouseEnter={() => setHoverOnProductLink(true)} 
                            onMouseLeave={() => setHoverOnProductLink(false)} 
                            href={`product/${item.attributes.urlHandle}`} 
                            className="w-full h-full grid content-center cursor-none"
                        >
                            <Image className="select-none w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-2xl mx-auto" unoptimized priority src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} width={700} height={700} alt={item.attributes.name}/>
                            <h2 className="w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-2xl mx-auto font-semibold uppercase text-[.5rem] md:text-[.625rem]">{item.attributes.name}</h2>
                        </Link>
                    </swiper-slide>
                )}
            </swiper-container>
            <div style={{ ...cursorPosition }} className="hidden lg:group-hover:block uppercase fixed pointer-events-none select-none z-10 font-bold text-4xl tracking-tighter min-w-40">
                {hoverOnProductLink === true ? 
                    <span className="-ml-28">View product</span>
                    :
                    <span>{currentSlideIndex + 1} / {data.length}</span>
                }
            </div>
            <div className="flex flex-col gap-4 fixed z-40 bottom-0 right-0 p-4">
                <div className="font-semibold text-lg tracking-tighter text-end lg:hidden">{currentSlideIndex + 1} / {data.length}</div>
            </div>
        </div>
    )
}