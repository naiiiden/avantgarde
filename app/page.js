import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header className={"invert fixed"}/>
      <main>
        <HomeProductSilder/>
      </main>
    </>
  )
}