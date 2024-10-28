import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import AddTaskButton from './components/add-task-button';
import { useDarkMode } from './hooks/use-dark-mode';
import { getTasks, saveTasks } from './utils/local-storage';
import { Task, TaskStatus } from './types';
import { useEffect, useState } from 'react';
import DroppableColumn from './components/droppable-column';

function App() {
  useDarkMode();

  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setTodoTasks(tasks.filter((task) => task.status === 'todo'));
    setInProgressTasks(tasks.filter((task) => task.status === 'in-progress'));
    setDoneTasks(tasks.filter((task) => task.status === 'done'));
  }, [tasks]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    console.log('Updating status:', taskId, newStatus);
    setTasks((prevTasks: Task[]) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log('Drag end event:', { active, over });

    if (!over) return;

    const taskId = active.id.toString();
    const overId = over.id.toString();

    console.log('Processing drag:', { taskId, overId });

    if (overId === 'todo' || overId === 'in-progress' || overId === 'done') {
      handleStatusChange(taskId, overId as TaskStatus);
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="h-screen w-screen p-40">
        <div className="flex flex-col h-full gap-8">
          <div>
            <AddTaskButton onTaskAdded={handleTaskAdded} />
          </div>
          <div className="grid grid-flow-col h-full w-full gap-4 grid-cols-3">
            <DroppableColumn
              id="todo"
              title="To Do"
              tasks={todoTasks}
              onStatusChange={handleStatusChange}
            />

            <DroppableColumn
              id="in-progress"
              title="In Progress"
              tasks={inProgressTasks}
              onStatusChange={handleStatusChange}
            />

            <DroppableColumn
              id="done"
              title="Done"
              tasks={doneTasks}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
