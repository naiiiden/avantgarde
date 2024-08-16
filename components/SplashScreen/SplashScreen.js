"use client";
import { useState } from "react";

export default function SplashScreen() {
    const [splashViewed, setSplashViewed] = useState(sessionStorage.getItem("splashShown"));

    function closeSplash() {
        sessionStorage.setItem("splashShown", "true");
        setSplashViewed(true);
    }

    return (
        <div className={`fixed inset-0 z-50 bg-[#0c0c0c] text-white font-bold ${!splashViewed ? '' : '-translate-y-full'} transition-all duration-1000`} onClick={closeSplash}>
            <div className="text-2xl md:text-3xl max-w-2xl" aria-hidden="true">Avantgarde is an exquisite collection of carefully curated contemporary furniture designs and a fictional store. All images rights belong to <a href="https://artsandculture.google.com/" target="_blank">Google’s Arts and Culture</a> and their respective owners.</div>
        </div>
    ) 
}