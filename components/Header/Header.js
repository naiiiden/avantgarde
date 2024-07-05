import Link from "next/link";
import data from "./data.json";

export default function Header() {
    console.log(data);

    return (
        <header className="fixed top-0 text-white p-4 font-semibold text-lg">
            <Link href="/">{data.name}</Link>
        </header>
    )
}