import { BuyStarsButton } from "./widgets/BuyStarsButton";

export default function App() {

  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-4 break-all">@buy-stars/components</h1>
      
      <div className="flex gap-4 flex-wrap">
        <BuyStarsButton classes={{ Button: { root: 'bg-red-500' }}} />
      </div>
    </div>
  );
}
