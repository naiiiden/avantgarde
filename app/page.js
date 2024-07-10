import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import data from "@/public/chairs.json";

export default function Home() {
  // console.log(data);

  const randomItemFromCollection = data[(Math.floor(Math.random() * data.length))];
  console.log(1, randomItemFromCollection);

  return (
    <>
      <div className="bg-black h-screen bg-cover bg-center max-lg:flex flex-col-reverse">
        <h1 className="text-white font-semibold text-xs p-4 ml-auto z-20 lg:text-sm lg:fixed lg:bottom-0 lg:right-0 2xl:text-base">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
        <HomeProductSilder/>
      </div>
    </>
  )
}