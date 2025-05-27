import { Button } from "./components";
import { useBuyDrawer } from "./widgets";

export default function App() {
  const { openDrawer } = useBuyDrawer();

  return (
    <div className="p-4 bg-background h-screen">
      <h1 className="text-h1 text-fg mb-2">@buy-stars/components</h1>

      <Button onClick={openDrawer}>
        Open Drawer
      </Button>
    </div>
  );
}
