export default function Page({ params }) {
    console.log("product params:", params.slug);

    return (
        <h1>{params.slug}</h1>
    )
}