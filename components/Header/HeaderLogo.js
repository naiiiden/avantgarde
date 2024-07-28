import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo({ data }) {
    return (
        <Link href="/" className={`w-full min-w-40 transition-all duration-300`}>
            <Image className="w-full" priority src={`http://localhost:1337${data.attributes['Header']['Image'].data.attributes.url}`} width={1} height={1} alt={data.attributes['Header']['Image'].data.attributes.alternativeText}/>
        </Link>
    )
}