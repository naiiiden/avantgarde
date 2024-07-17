import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header className={"fixed"}/>
      <main className="bg-black h-screen bg-cover bg-center max-lg:flex flex-col-reverse">
        <h1 className="text-white font-semibold text-xs p-4 ml-auto z-20 lg:text-sm lg:fixed lg:bottom-0 lg:right-0">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
        <HomeProductSilder/>
      </main>
    </>
  )
}