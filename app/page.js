import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { getData } from "./utilities/getData";

export default async function Home() {
  const data = await getData('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99');

  return (
    <>
        <SplashScreen/>
        <main>
        <h1 className="sr-only">An exquisite collection of contemporary furniture designs.</h1>
        <HomeProductSilder data={data.data}/>
        </main>
    </>
  )
}