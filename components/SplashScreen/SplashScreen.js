import SplashScreenClient from "./SplashScreenClient";
import { getData } from "@/app/utilities/getData";

export default async function SplashScreen() {
    const data = await getData('http://localhost:1337/api/splash-screen-page');
    
    return (
        <SplashScreenClient data={data}/>
    ) 
}