import Header from "@/components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <div className="">
        <Header className={"sticky invert"} maxWidth={"max-w-40"}/>
        {children}
    </div>
  );
}
