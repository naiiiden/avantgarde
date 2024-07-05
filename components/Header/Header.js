import Link from "next/link";
import data from "./data.json";

export default function Header() {
    console.log(data);

    return (
        <header className="fixed top-0 text-white p-4 font-semibold text-lg flex justify-between w-full">
            <Link href="/">{data.name}</Link>
            <nav>
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