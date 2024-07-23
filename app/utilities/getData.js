export async function getData(url) {
    const res = await fetch(url, {
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