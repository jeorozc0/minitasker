import { Button } from "./components/ui/button"
import { DndContext } from '@dnd-kit/core';

function App() {
  return (
    <DndContext>
      <div className="h-screen w-screen p-40">
        <div className="flex flex-col h-full gap-8">
          <div><Button>Add task</Button></div>
          <div className="grid grid-flow-col h-full w-full gap-4 grid-cols-3">
            <div className="h-full bg-yellow-50 rounded-md"></div>
            <div className="h-full bg-yellow-50 rounded-md"></div>
            <div className="h-full bg-yellow-50 rounded-md"></div>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
