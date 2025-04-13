
export const AskTable = ({ asks }: { asks: [string, string][] }) => {
    let currentTotal = 0;
    const relevantAsks = asks.slice(0, 15);
    relevantAsks.reverse();
    let asksWithTotal: [String, String, number][] = [];
    for (let i = relevantAsks.length - 1; i >= 0; i--) {
        const [price, quantity] = relevantAsks[i];
        asksWithTotal.push([price, quantity, currentTotal += Number(quantity)]);
    }

    const maxTotal = relevantAsks.reduce((acc, [_, qunatity]) => acc + Number(qunatity), 0)
    asksWithTotal.reverse();
    return <div>
        {asksWithTotal.map(([price, quantity, total]) => (
            <Ask
                key={price.toString()}
                price={price.toString()}
                quantity={quantity.toString()}
                total={total}
                maxTotal={maxTotal}
            />
        ))}
    </div>
};

interface AskProps {
    price: string;
    quantity: string;
    total: number;
    maxTotal: number;
}

function Ask({ price, quantity, total, maxTotal }: AskProps) {
    const percentWidth = maxTotal > 0 ? (total / maxTotal) * 100 : 0;

    return (
        <div
            className="relative my-1 w-full overflow-hidden hover:bg-slate-800 transition-colors duration-100"
        >
            <div
                className="absolute top-0 left-0 h-full bg-red-900/30 transition-all duration-300 ease-out"
                style={{ width: `${percentWidth}%` }}
            />

            <div className="flex justify-between text-xs w-full py-1 relative z-10">
                <div className="text-red-500 font-medium">
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
