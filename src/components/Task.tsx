import { User } from "./User";
// import { tasks } from "../api/index";

export type Task = {
  id: number;
  title: string;
  assignee: User | null;
  status: string;
  creationDate: Date;
  description: string;
  relatedTasks: Task[];
  watchers: User[];
};

export var tasks: Task[] = [];
var nextId = 0;

export const createTask = (
  title: string,
  assignee: User | null,
  status: string,
  description: string,
  relatedTasks: Task[]
): Task => {
  const newTask: Task = {
    id: nextId,
    title: title,
    assignee: assignee,
    status: status,
    creationDate: new Date(),
    description: description,
    relatedTasks: relatedTasks,
    watchers: [],
  };
  nextId++;
  return newTask;
};

export const addNewTask = (
  title: string,
  assignee: User | null,
  status: string,
  description: string,
  relatedTasks: Task[]
): Task[] => {
  tasks.push(createTask(title, assignee, status, description, relatedTasks));
  return tasks;
};

// const getTaskById = (id: number): Task | undefined => {
//   return tasks.find((task) => task.id === id);
// };

// const removeTaskById = (id: number): void => {
//   tasks = tasks.filter((task) => task.id !== id);
// };
