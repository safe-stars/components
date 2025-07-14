import { BuyStarsButton } from "./widgets/BuyStarsButton";

export default function App() {
  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-4 break-all">@buy-stars/components</h1>
      
      <div className="flex gap-4 flex-wrap">
        <BuyStarsButton />
        <BuyStarsButton stars={100} />
        <BuyStarsButton stars={500} />
        <BuyStarsButton
          stars={1000}
          classes={{
            button: "!bg-gradient-to-r from-emerald-900 to-teal-900 hover:from-emerald-800 hover:to-teal-800 border-2 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] font-mono font-bold text-sm tracking-wider transform hover:scale-105 transition-all duration-300 rounded-none skew-x-[-5deg] hover:skew-x-0 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-emerald-400/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
            spinner: "text-emerald-400 animate-pulse",
            drawer: {
              overlay: "bg-black/80 backdrop-blur-md",
              content: "bg-gradient-to-br from-slate-900 to-slate-800 text-emerald-100 border-2 border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.2)] rounded-none",
              header: "bg-gradient-to-r from-emerald-900 to-teal-900 text-emerald-100 border-b-2 border-emerald-400 font-mono tracking-wider",
              title: "text-emerald-100 font-bold text-lg drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              closeButton: "text-emerald-100 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 border border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] font-mono font-bold rounded-none transform hover:rotate-90 transition-all duration-300"
            }
          }}
        />
      </div>
    </div>
  );
}
