import { defineStore } from "pinia";
import { Task } from "./Task.ts";
import { ref } from "vue";

export const useDefaultList = defineStore("defaultList", () => {
  const taskList = ref<Task[]>([]);

  return {
    taskList,
  };
});
