import { JustForYou } from "./products/just-for-you-component";
import { NewArrival } from "./products/new-arrival-component";
import { PopularProduct } from "./products/popular-peoduct-component";
import { Banner } from "./slider/slider-component";
import { SectionAd } from "./advertisement/section-ad-component";


export function Home(){
    return (
        <>
            <Banner></Banner>
            <PopularProduct></PopularProduct>
            <SectionAd></SectionAd>
            <NewArrival></NewArrival>
            <SectionAd></SectionAd>
            <JustForYou></JustForYou>
        </>
    );
}