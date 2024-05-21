<script setup lang="ts">
import TaskVue from "./Task.vue";
import { computed, ref } from "vue";
import { List } from "../types/List.ts";
import { useDefaultList } from "../js/DefaultList.ts";
import { storeToRefs } from "pinia";

const props = withDefaults(
  defineProps<{
    list: List;
    readOnly?: boolean;
  }>(),
  {
    readOnly: false,
  },
);

const { taskList } = storeToRefs(useDefaultList());

const emits = defineEmits<{
  (e: "addTask", value: number, msgName: string, msgDescr: string): void;
  (e: "delList", value: number): void;
}>();
const sortType = ref<"asc" | "desc" | "none">("none");
const msgName = ref("");
const msgDescr = ref("");
const dialogTask = ref(false);
const dialogTaskModif = ref(false);

const updateSortType = () => {
  switch (sortType.value) {
    case "none":
      sortType.value = "asc";
      return;
    case "asc":
      sortType.value = "desc";
      return;
    case "desc":
      sortType.value = "none";
      return;
    default:
      return;
  }
};

const tasks = computed(() => {
  if (sortType.value === "none") {
    return props.list.tasks;
  } else if (sortType.value === "asc") {
    return [...props.list.tasks].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return [...props.list.tasks].sort((a, b) => b.name.localeCompare(a.name));
  }
});

const color = computed(() => props.list.color);

const delTask = (id: string) => {
  const index = props.list.tasks.findIndex((task) => task.id === id);

  if (index >= 0) {
    props.list.tasks.splice(index, 1);
  }
};

const updateTaskChecked = (value: { checked: boolean; id: string }) => {
  const taskIndex = props.list.tasks.findIndex((task) => task.id === value.id);

  console.log(taskIndex);
  if (taskIndex < 0) {
    return;
  }

  props.list.tasks[taskIndex].checked = value.checked;

  console.log(value.checked);
  if (value.checked) {
    taskList.value = [...taskList.value, props.list.tasks[taskIndex]];
  } else {
    taskList.value = taskList.value.filter(
      (task) => task.id !== props.list.tasks[taskIndex].id,
    );
  }
};

const reset = () => {
  dialogTask.value = false;
  msgName.value = "";
  msgDescr.value = "";
};
</script>

<template>
  <div class="list">
    <dialog :open="dialogTask">
      <div class="dialogBackground">
        <form>
          <input type="text" placeholder="Name" v-model="msgName" />
          <input type="text" placeholder="Descr" v-model="msgDescr" />
        </form>
        <button @click="dialogTask = false">Cancel</button>
        <button
          @click="
            emits('addTask', props.list.id, msgName, msgDescr);
            reset();
          "
        >
          Add
        </button>
      </div>
    </dialog>

    <dialog :open="dialogTaskModif">
      <div class="dialogBackground">
        <form>
          <input type="text" placeholder="Name" v-model="props.list.name" />
          <input type="color" v-model="props.list.color" />
        </form>
        <button @click="dialogTaskModif = false">Validate</button>
      </div>
    </dialog>

    <div class="header">
      <span>{{ list.name }}</span>
      <div class="cardButtons">
        <button class="sort-button" @click="updateSortType">
          {{ sortType }}
        </button>
        <button v-if="!readOnly" @click="dialogTask = true">
          <img src="../assets/add.png" />
        </button>
        <button v-if="!readOnly" @click="emits('delList', props.list.id)">
          <img src="../assets/delete.png" />
        </button>
        <button v-if="!readOnly" @click="dialogTaskModif = true">
          <img src="../assets/modify.png" />
        </button>
      </div>
    </div>
    <div class="tasks">
      <TaskVue
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @del-task="delTask"
        @updateStatus="updateTaskChecked"
      />
    </div>
  </div>
</template>

<style scoped>
.list {
  background: v-bind(color);
  width: 20rem;
  display: flex;
  flex-direction: column;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cardButtons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  button:not(.sort-button) {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    padding: 0;
  }

  img {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
}
</style>
