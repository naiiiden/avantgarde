import Header from "@/components/Header/Header";
import HeaderGutter from "@/components/Header/HeaderGutter";

export default function RootLayout({ children }) {
  return (
    <>
        <Header/>
        {/* <HeaderGutter/> */}
        {children}
    </>
  );
}
