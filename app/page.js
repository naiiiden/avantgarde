import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import { getData } from "./utilities/getData";

export default async function Home() {
  const data = await getData('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99');

  return (
    <main>
      <HomeProductSilder data={data.data}/>
    </main>
  )
}