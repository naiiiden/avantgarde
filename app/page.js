import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import data from "@/public/chairs.json";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // console.log(data);

  const randomItemFromCollection = data[(Math.floor(Math.random() * data.length))];
  console.log(1, randomItemFromCollection);

  return (
    <>
      <div className="bg-black h-screen bg-cover bg-center flex flex-col-reverse">
        <h1 className="text-white font-semibold text-xs p-4 ml-auto relative z-20 lg:text-sm 2xl:text-base">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
        <HomeProductSilder/>
      </div>
    </>
  )
}