import data from "@/public/chairs.json";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // console.log(data);

  const randomItemFromCollection = data[(Math.floor(Math.random() * data.length))];
  console.log(1, randomItemFromCollection);

  return (
    <>
      <div style={{ backgroundImage: `url(${randomItemFromCollection.image})` }} className="bg-black h-screen bg-cover bg-center grid items-end">
        <h1 className="text-white font-semibold text-xs p-4 ml-auto lg:text-xs">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
      </div>
      {/* <div className="">
        <ul className="p-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.map((item, index) =>
            <li key={index}>
              <Link href={item.name}>
                <Image className="w-full h-full aspect-square" src={item.image} width={500} height={500} alt={item.name}/>
              </Link>
            </li>
          )}
        </ul>
      </div> */}
    </>
  )
}