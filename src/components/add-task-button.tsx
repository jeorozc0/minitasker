import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import type { Task, PriorityLevel } from '@/types'
import { saveTasks, getTasks } from "@/utils/local-storage"

interface AddTaskButtonProps {
  onTaskAdded: (newTask: Task) => void;
}

function AddTaskButton({ onTaskAdded }: AddTaskButtonProps) {
  const [name, setName] = useState<string>("")
  const [priority, setPriority] = useState<string>("low")
  const [tasks, setTasks] = useState<Task[]>(getTasks())

  const handleSubmit = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: name,
      status: 'todo',
      priority: priority as PriorityLevel,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: []
    }

    addTask(newTask)
    onTaskAdded(newTask)
    console.log(tasks)
  }

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="taskName"
              placeholder="Name your task"
              className="col-span-3"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select onValueChange={setPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assign a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskButton
