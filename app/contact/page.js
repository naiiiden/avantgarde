import { getData } from "../utilities/getData";

export default async function Page() {
    const data = await getData('http://localhost:1337/api/information-page');

    return (
        <main className="main-reveal px-4 pb-4 max-w-5xl">
            <h1>contact</h1>
        </main>
    )
}