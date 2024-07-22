import HomeProductSilder from "@/components/HomeProductSlider/HomeProductSlider";
import Header from "@/components/Header/Header";

async function getData() {
  const res = await fetch('http://localhost:1337/api/products?populate=image&pagination[pageSize]=99', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
      },
      next: {
          revalidate: 3600
      }
  });

  if (!res.ok) {
      throw new Error('failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Header/>
      <main>
        <HomeProductSilder data={data.data}/>
      </main>
    </>
  )
}