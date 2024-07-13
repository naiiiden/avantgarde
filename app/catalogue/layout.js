import Header from "@/components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <div className="bg-slate-900">
        <Header className={"sticky"} maxWidth={"max-w-40"}/>
        {children}
    </div>
  );
}
