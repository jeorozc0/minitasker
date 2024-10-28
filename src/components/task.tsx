import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';

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

  const style: CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : undefined,
    cursor: 'grab',
  };

  return (
    <div className="w-full touch-manipulation">
      <Card
        ref={setNodeRef}
        style={style}
        className="w-full h-auto"
        {...listeners}
        {...attributes}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-base">{task.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default TaskCard;
