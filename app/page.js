import data from "@/public/chairs.json";

export default function Home() {
  console.log(data);

  return (
    <div style={{ backgroundImage: `url(${data[0].image})` }} className="bg-black h-screen bg-cover bg-center grid items-end">
      <h1 className="text-white font-semibold text-xl p-4 max-w-72 ml-auto lg:text-3xl lg:max-w-[25rem]">An exquisite collection of contemporary furniture designs. All images rights belong to Google’s Arts and Culture and their respective owners.</h1>
    </div>
  )
}