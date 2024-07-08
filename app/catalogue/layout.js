import Header from "@/components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <>
        <Header className={"invert"}/>
        {children}
    </>
  );
}
