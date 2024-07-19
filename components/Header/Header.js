import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";

export default function Header({ className }) {
    return (
        <header className={`${className} fixed z-20 top-0 p-4 font-semibold flex flex-wrap justify-between gap-3 w-full`}>
            <HeaderLogo/>
            <HeaderNav/>
        </header>
    )
}