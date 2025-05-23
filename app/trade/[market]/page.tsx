"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";
import TradingViewWidget from "@/app/components/TradeView";



export default function Page() {
    const { market } = useParams();
    console.log(market);
    return <div className="flex flex-row flex-1 mr-2">
        <div className="flex flex-col flex-1 px-2">
            <MarketBar market={market as string} />
            <div className="flex flex-row h-[520px]">
                <div className="flex flex-col flex-1 m-2">
                    <TradingViewWidget market={market as string} />
                </div>
                <div className="flex flex-col w-[250px] h-[500px] bg-[#14151a] rounded-lg m-1 mx-2 mt-2 overflow-hidden">
                    <Depth market={market as string} /> 
                </div>
            </div>
        </div>
        <div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
        </div>
    </div>
}