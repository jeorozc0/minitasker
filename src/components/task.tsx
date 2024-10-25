import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types";
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: 'grab',
  };

  return (
    <Card className="w-full h-auto" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default TaskCard;
