"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav({ data }) {
    const pathname = usePathname();

    return (
        <nav className="ml-auto overflow-x-auto">
            <ul className="text-end flex gap-4">
                {data.attributes['Header'].links.map((link) => 
                    <li key={link.text}>
                        <Link href={`/${link.url}`} className={`${pathname === `/${link.url}` ? 'underline decoration-2 italic' : ''} leading-none`}>
                            {link.text}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}