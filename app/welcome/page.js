"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        sessionStorage.setItem("splashShown", "true");
    }, []);

    const handleClose = () => {
        router.push('/');
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0c0c0c] text-white font-bold" onClick={handleClose}>
            <h1>Avantgarde is an exquisite collection of carefully curated contemporary furniture designs.</h1>
        </div>
    )
}