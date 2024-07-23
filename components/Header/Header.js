import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";

async function getData() {
    const res = await fetch('http://localhost:1337/api/global?populate[Header][populate]=*', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
        },
        next: {
            revalidate: 60
        }
    });

    if (!res.ok) {
        throw new Error('failed to fetch data');
    }

    return res.json();
}


export default async function Header({ className }) {
    const data = await getData();

    console.log(6, data.data);

    return (
        <header className={`${className} fixed z-20 top-0 p-4 font-semibold flex flex-wrap justify-between gap-3 w-full`}>
            <HeaderLogo data={data.data}/>
            <HeaderNav data={data.data}/>
        </header>
    )
}