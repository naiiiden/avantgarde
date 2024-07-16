import Link from "next/link";
import data from "./data.json";

import HeaderLogo from "./HeaderLogo";

export default function Header({ className }) {
    return (
        <header className={`${className} z-20 top-0 text-white p-4 font-semibold flex flex-wrap justify-between gap-3 w-full`}>
            <HeaderLogo/>
            <nav className="ml-auto">
                <ul className="text-end flex gap-4">
                    {data.links.map((link) => 
                        <li key={link.name}>
                            <Link href={`/${link.url}`} className="block leading-none">
                                {link.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}