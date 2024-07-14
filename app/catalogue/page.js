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
                            <div className="absolute top-0 text-white font-medium">
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        </main>
    )
}