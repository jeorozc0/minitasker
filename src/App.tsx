import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import AddTaskButton from './components/add-task-button';
import { useDarkMode } from './hooks/use-dark-mode';
import { getTasks } from './utils/local-storage';
import { Task } from './types';



function App() {
  useDarkMode();
  const tasks = getTasks()

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
            <div ref={setFirstDroppableRef} className="flex flex-col text-black gap-2 h-full bg-yellow-50 rounded-md">
              {tasks.map((task: Task) => {
                return (
                  <p>{task.id}</p>
                )
              })}
            </div>
            <div ref={setSecondDroppableRef} className="h-full bg-yellow-50 rounded-md"></div>
            <div ref={setThirdDroppableRef} className="h-full bg-yellow-50 rounded-md"></div>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
