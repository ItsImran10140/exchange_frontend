export const BidTable = ({ bids }: { bids: [string, string][] }) => {
    let currentTotal = 0;
    const relevantBids = bids.slice(0, 15);
    const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => [price, quantity, currentTotal += Number(quantity)]);
    const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

    return <div>
        {bidsWithTotal?.map(([price, quantity, total]) => <Bid maxTotal={maxTotal} total={total} key={price} price={price} quantity={quantity} />)}
    </div>
}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    const percentWidth = maxTotal > 0 ? (total / maxTotal) * 100 : 0;

    return (
        <div
            className="relative my-1 w-full overflow-hidden hover:bg-slate-800 transition-colors duration-100"
        >
            <div
                className="absolute top-0 left-0 h-full bg-[#01a781]/30 transition-all duration-300 ease-out"
                style={{ width: `${percentWidth}%` }}
            />

            <div className="flex justify-between text-xs w-full py-1 relative z-10">
                <div className="text-green-500 font-medium">
                    {parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-slate-300">
                    {parseFloat(quantity).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}
                </div>
                <div className="text-slate-400">
                    {total.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                </div>
            </div>
        </div>
    );
}


