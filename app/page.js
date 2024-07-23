import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import Header from "@/components/Header/Header";
import { getData } from "./utilities/getData";

export default async function Home() {
  const data = await getData('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99');

  return (
    <>
      <Header/>
      <main>
        <HomeProductSilder data={data.data}/>
      </main>
    </>
  )
}