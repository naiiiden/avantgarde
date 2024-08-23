"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function SplashScreenClient({ data }) {
    const [splashViewed, setSplashViewed] = useState(sessionStorage.getItem("splashShown"));

    console.log(data);

    function closeSplash() {
        sessionStorage.setItem("splashShown", "true");
        setSplashViewed(true);
    }

    // <div className="relative z-40 text-2xl md:text-3xl max-w-2xl">Avantgarde is an exquisite collection of carefully curated contemporary furniture designs and a fictional store. All image rights belong to <a href="https://artsandculture.google.com/" target="_blank" tabIndex={splashViewed ? -1 : 1}>Google’s Arts and Culture</a> and their respective owners.</div>

    return (
        <div onBlur={closeSplash} className={`fixed grid items-center justify-end inset-0 z-50 bg-[#0c0c0c] text-white font-bold ${!splashViewed ? '' : '-translate-y-full'} transition-all duration-1000`}>
            <div className="fixed inset-0 z-30 cursor-pointer" onClick={closeSplash}></div>
            <div className="p-4 splash-text" aria-hidden="true">
                <ReactMarkdown className="relative z-40 text-2xl md:text-3xl max-w-2xl">
                    {data.data.attributes.mainText}
                </ReactMarkdown>
                <div className="mt-3 uppercase text-sm">{data.data.attributes.btnText}</div>
            </div>
        </div>
    ) 
}