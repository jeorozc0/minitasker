import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import AddTaskButton from './components/add-task-button';
import { useDarkMode } from './hooks/use-dark-mode';



function App() {
  useDarkMode();

  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: 'droppable-1',
  });
  const { setNodeRef: setSecondDroppableRef } = useDroppable({
    id: 'droppable-2',
  });
  const { setNodeRef: setThirdDroppableRef } = useDroppable({
    id: 'droppable-3',
  });

  return (
    <DndContext>
      <div className="h-screen w-screen p-40">
        <div className="flex flex-col h-full gap-8">
          <div><AddTaskButton /></div>
          <div className="grid grid-flow-col h-full w-full gap-4 grid-cols-3">
            <div ref={setFirstDroppableRef} className="h-full bg-yellow-50 rounded-md"></div>
            <div ref={setSecondDroppableRef} className="h-full bg-yellow-50 rounded-md"></div>
            <div ref={setThirdDroppableRef} className="h-full bg-yellow-50 rounded-md"></div>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
