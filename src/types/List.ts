import { Task } from "./Task.ts";

export interface List {
  id: number;
  name: string;
  color: string;
  tasks: Task[];
}
