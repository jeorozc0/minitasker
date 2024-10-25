import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import AddTaskButton from './components/add-task-button';
import { useDarkMode } from './hooks/use-dark-mode';
import { getTasks, saveTasks } from './utils/local-storage';
import { Task } from './types';
import TaskCard from './components/task';
import { useEffect, useState } from 'react';



function App() {
  useDarkMode();

  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTodoTasks(tasks.filter((task) => task.status === 'todo'));
    setInProgressTasks(tasks.filter((task) => task.status === 'in-progress'));
    setDoneTasks(tasks.filter((task) => task.status === 'done'));
  }, [tasks]);

  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: 'droppable-1',
  });
  const { setNodeRef: setSecondDroppableRef } = useDroppable({
    id: 'droppable-2',
  });
  const { setNodeRef: setThirdDroppableRef } = useDroppable({
    id: 'droppable-3',
  });


  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      // Optionally, save the updated tasks to local storage
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  function handleStatusChange(taskId: string, newStatus: 'todo' | 'in-progress' | 'done') {
    setTasks((prevTasks: Task[]) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }



  return (
    <DndContext>
      <div className="h-screen w-screen p-40">
        <div className="flex flex-col h-full gap-8">
          <div>
            <AddTaskButton onTaskAdded={handleTaskAdded} />
          </div>
          <div className="grid grid-flow-col h-full w-full gap-4 grid-cols-3">
            {/* To Do Column */}
            <div
              ref={setFirstDroppableRef}
              className="flex flex-col text-black gap-2 p-4 h-full bg-yellow-50 rounded-md"
            >
              <h2 className="text-xl font-bold">To Do</h2>
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>

            {/* In Progress Column */}
            <div
              ref={setSecondDroppableRef}
              className="flex flex-col text-black gap-2 p-4 h-full bg-yellow-50 rounded-md"
            >
              <h2 className="text-xl font-bold">In Progress</h2>
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>

            {/* Done Column */}
            <div
              ref={setThirdDroppableRef}
              className="flex flex-col text-black gap-2 p-4 h-full bg-yellow-50 rounded-md"
            >
              <h2 className="text-xl font-bold">Done</h2>
              {doneTasks.map((task) => (
                <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );

}

export default App
