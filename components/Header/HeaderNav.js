"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import data from "./data.json";

export default function HeaderNav() {
    const pathname = usePathname();

    return (
        <nav className="ml-auto">
            <ul className="text-end flex gap-4">
                {data.links.map((link) => 
                    <li key={link.name}>
                        <Link href={`${link.url}`} className={`${pathname === link.url ? 'underline decoration-2 italic' : ''} leading-none`}>
                            {link.name}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}