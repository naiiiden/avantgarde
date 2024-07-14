import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function Page() {
    return (
        <main className="">
            <ul className="px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) =>
                    <li key={index} className="relative">
                        <Link href={`product/${item.urlHandle}`}>
                            <Image className="" src={item.image} width={1500} height={1500} alt=""/>
                            <h2 className="top-0 p-1.5 text-sm font-medium">{item.name}</h2>
                        </Link>
                    </li>
                )}
            </ul>
        </main>
    )
}