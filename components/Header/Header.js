import Link from "next/link";
import data from "./data.json";
import Image from "next/image";

import avantgarde from "@/public/avantgarde.svg";

export default function Header() {
    console.log(data);

    return (
        <header className="fixed top-0 text-white p-4 font-semibold text-lg flex flex-col justify-between w-full">
            {/* <Link href="/">{data.name}</Link> */}
            <Image className="w-full" src={avantgarde} alt={data.name}/>
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