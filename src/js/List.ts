import { ITask } from "./Task.ts";
import { Ref } from "vue";

export class List {
  id: number;
  name: string;
  color: string;
  tasks: Ref<ITask[]>;

  constructor(id: number, name: string, color: string, tasks: Ref<ITask[]>) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.tasks = tasks;
  }
}
