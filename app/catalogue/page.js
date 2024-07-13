import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function Page() {
    return (
        <main className="">
            <ul className="grid grid-cols-2 lg:grid-cols-2">
                {data.map((item, index) =>
                    <li key={index}>
                        <Link href={item.name}>
                            <Image className="w-full h-full aspect-square" src={item.image} width={1500} height={1500} alt={item.name}/>
                        </Link>
                    </li>
                )}
            </ul>
        </main>
    )
}