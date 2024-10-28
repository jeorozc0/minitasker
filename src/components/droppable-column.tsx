import { useDroppable } from '@dnd-kit/core';
import { Task } from '@/types';
import TaskCard from './task';

interface DroppableColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

function DroppableColumn({
  id,
  title,
  tasks,
  onStatusChange
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col text-black gap-2 p-4 h-full rounded-md transition-colors ${isOver ? 'bg-yellow-100 ring-2 ring-yellow-400' : 'bg-yellow-50'
        }`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-col gap-2 flex-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default DroppableColumn
