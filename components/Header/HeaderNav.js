"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function HeaderNav({ data }) {
    const pathname = usePathname();
    const { cart } = useContext(CartContext);

    return (
        <nav className="ml-auto mb-4 px-4 w-full capitalize flex justify-end sticky top-4 z-40">
            <ul className="text-end flex gap-4 overflow-x-auto ">
                {data.attributes['Header'].links.map((link) => 
                    <li key={link.text}>
                        <Link href={`/${link.url}`} className={`${pathname === `/${link.url}` ? 'underline italic opacity-100' : 'opacity-65 hover:underline hover:opacity-100'} decoration-2 leading-none inline-flex font-semibold`}>
                            {link.text} {link.text.toLowerCase() === "cart" && 
                            <span>
                                &nbsp;
                                <span className="before:content-['('] after:content-[')'] inline-flex">{cart.length}</span>
                            </span>
                            }
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}