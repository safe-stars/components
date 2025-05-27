import { useState } from "react";
import { Button } from "./components";
import { BuyDrawer } from "./widgets";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-2">@buy-stars/components</h1>

      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <BuyDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
