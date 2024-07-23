import ReactMarkdown from "react-markdown"

async function getData() {
    const res = await fetch('http://localhost:1337/api/information-page', {
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

export default async function Page() {
    const data = await getData();

    return (
        <main className="main-reveal px-4 pb-4 max-w-5xl">
            <ReactMarkdown className="information-rich-text">
                {data.data.attributes['InformationContent']}
            </ReactMarkdown>
        </main>
    )
}