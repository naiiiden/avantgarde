import ReactMarkdown from "react-markdown"
import { getData } from "../utilities/getData";

export default async function Page() {
    const data = await getData('http://localhost:1337/api/information-page');

    return (
        <main className="px-4 pb-4 max-w-5xl">
            <ReactMarkdown className="information-rich-text">
                {data.data.attributes['InformationContent']}
            </ReactMarkdown>
        </main>
    )
}