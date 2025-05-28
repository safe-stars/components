import { Button } from "./components";
import { useBuyDrawer } from "./widgets";

export default function App() {
  const { openDrawer } = useBuyDrawer();

  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-4 break-all">@buy-stars/components</h1>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={openDrawer}>
          Купить звезды
        </Button>

        <Button onClick={() => openDrawer({ stars: 100 })}>
          Купить ⭐100
        </Button>

        <Button onClick={() => openDrawer({ stars: 500 })}>
          Купить ⭐500
        </Button>
      </div>
    </div>
  );
}
