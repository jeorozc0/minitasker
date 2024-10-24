import type { Task } from '@/types'

// Get tasks from localStorage
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks')
  return tasks ? JSON.parse(tasks) : []
}

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Add a new task
export const addTask = (task: Task) => {
  const tasks = getTasks()
  tasks.push(task)
  saveTasks(tasks)
}

