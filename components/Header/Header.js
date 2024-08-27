import Link from "next/link";
import Image from "next/image";

import HeaderNav from "./HeaderNav";
import { getData } from "@/app/utilities/getData";

export default async function Header() {
    const data = await getData('http://localhost:1337/api/global?populate[Header][populate]=*');

    return (
        <header className={`sticky z-20 top-0 p-4 flex flex-wrap justify-between gap-3 w-full capitalize`}>
            <Link href="/" className={`w-full min-w-40 transition-all duration-300 opacity-[.825] hover:opacity-100`}>
                <Image className="w-full" priority src={`http://localhost:1337${data.data.attributes['Header']['Image'].data.attributes.url}`} width={1} height={1} alt={data.data.attributes['Header']['Image'].data.attributes.alternativeText}/>
            </Link>
            <HeaderNav data={data.data}/>
        </header>
    )
}