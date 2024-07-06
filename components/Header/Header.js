import Link from "next/link";
import data from "./data.json";

import HeaderLogo from "./HeaderLogo";

export default function Header() {
    return (
        <header className="fixed top-0 text-white p-4 font-semibold text-lg flex flex-wrap justify-between w-full">
            <HeaderLogo/>
            <nav className="ml-auto">
                <ul className="text-end">
                    {data.links.map((link) => 
                        <li key={link.name}>
                            <Link href={link.url}>
                                {link.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}