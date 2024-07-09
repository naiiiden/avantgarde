import Link from "next/link";
import data from "./data.json";

import HeaderLogo from "./HeaderLogo";

export default function Header({ className }) {
    return (
        <header className={`${className} fixed z-20 top-0 text-white p-4 font-semibold text-lg flex flex-wrap justify-between gap-4 w-full`}>
            <HeaderLogo/>
            <nav className="ml-auto">
                <ul className="text-end grid gap-3">
                    {data.links.map((link) => 
                        <li key={link.name}>
                            <Link href={link.url} className="block leading-none">
                                {link.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}