<script setup lang="ts">
import Listvue from "./components/List.vue";
import { computed, ref } from "vue";
import { useDefaultList } from "./js/DefaultList.ts";
import { storeToRefs } from "pinia";
import { List } from "./types/List.ts";

const { taskList } = storeToRefs(useDefaultList());
const mapLists = ref<Map<List["id"], List>>(new Map());
const dList = computed(() => ({
  id: 1,
  name: "Done",
  color: "#ff9090",
  tasks: [...taskList.value],
}));
let msgName = ref("");
let color = ref("white");
const dialog = ref(false);

const addList = () => {
  const newList: List = {
    id: mapLists.value.size + 1,
    name: msgName.value,
    color: color.value,
    tasks: [],
  };
  mapLists.value.set(newList.id, newList);

  dialog.value = false;
  msgName.value = "";
  color.value = "white";
};

const addTask = (listId: number, msgName: string, msgDescr: string) => {
  const el = mapLists.value.get(listId);
  if (!el) {
    return;
  }
  const newTask = {
    id: String(el.tasks.length + 1),
    name: msgName,
    description: msgDescr,
    checked: false,
  };

  el.tasks.push(newTask);
};

const delList = (listId: number) => {
  mapLists.value.delete(listId);
};
</script>

<template>
  <div class="main">
    <dialog :open="dialog">
      <form>
        <input type="text" placeholder="Name" v-model="msgName" />
        <input type="color" value="#ffffff" v-model="color" />
      </form>
      <button @click="dialog = false">Cancel</button>
      <button @click="addList">Add</button>
    </dialog>

    <div id="title">
      <h2>To-do List</h2>
      <button @click="dialog = true">+</button>
    </div>

    <div class="lists">
      <Listvue
        v-for="list in [...mapLists.values()]"
        :list="list"
        @add-task="addTask"
        @del-List="delList"
      />
      <Listvue :list="dList" read-only />
    </div>
  </div>
</template>

<style scoped>
dialog::backdrop {
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 200;
}

.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#title {
  display: flex;
  justify-content: center;
  padding: 1rem 1.5rem;
  background: #9c9cfa;
  gap: 1rem;
}

.lists {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  height: 100%;
}
</style>
