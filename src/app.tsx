import { Button } from "./components";
import { useBuyDrawer } from "./widgets";

export default function App() {
  const { openDrawer } = useBuyDrawer();

  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-2">@buy-stars/components</h1>

      <div className="flex flex-col gap-2">
        <Button onClick={openDrawer}>
          Купить звезды
        </Button>

        <Button onClick={() => openDrawer({ stars: 100 })}>
          Купить 100 звезд
        </Button>
      </div>
    </div>
  );
}
