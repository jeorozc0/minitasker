import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    position: isDragging ? 'relative' : undefined,
    width: isDragging ? '100%' : undefined,
    height: isDragging ? 'auto' : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`w-full h-auto cursor-grab active:cursor-grabbing ${isDragging ? 'shadow-lg' : ''
        }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default TaskCard;
