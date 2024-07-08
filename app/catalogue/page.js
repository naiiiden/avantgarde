import Image from "next/image";
import Link from "next/link";
import data from "@/public/chairs.json";

export default function Page() {
    return (
        <main>
            <ul className="p-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {data.map((item, index) =>
                    <li key={index}>
                        <Link href={item.name}>
                            <Image className="w-full h-full aspect-square" src={item.image} width={500} height={500} alt={item.name}/>
                        </Link>
                    </li>
                )}
            </ul>
        </main>
    )
}