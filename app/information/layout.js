import Header from "@/components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <div>
        <Header className={"invert"}/>
        {children}
    </div>
  );
}
