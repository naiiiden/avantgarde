"use client";
import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "@/app/context/CartContext";

export default function HeaderNav({ data }) {
    const pathname = usePathname();
    const { cart } = useContext(CartContext);

    return (
        <nav className="ml-auto overflow-x-auto">
            <ul className="text-end flex gap-4">
                {data.attributes['Header'].links.map((link) => 
                    <li key={link.text}>
                        <Link href={`/${link.url}`} className={`${pathname === `/${link.url}` ? 'underline italic' : 'hover:underline'} decoration-2 leading-none`}>
                            {link.text} {link.text.toLowerCase() === "cart" && <span className="before:content-['('] after:content-[')'] inline-flex">{cart.length}</span>}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}