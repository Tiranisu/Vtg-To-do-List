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
  color: "rgba(255,144,144,0.52)",
  tasks: [...taskList.value],
}));
let msgName = ref("");
let color = ref("#dadada");
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
  color.value = "#dadada";
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
      <div id="dialog-content">
        <span>Create a new list :</span>
        <div>
          <input type="text" placeholder="Name" v-model="msgName" />
        </div>
        <div id="inputColor">
          <input type="color" value="#c5c5c5" v-model="color" />
        </div>
        <div id="dialogButtons">
          <button @click="dialog = false">Cancel</button>
          <button @click="addList">Add</button>
        </div>
      </div>
    </dialog>

    <div id="title">
      <h2>To-do List</h2>
      <button @click="dialog = true">+ Create new list</button>
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
dialog {
  border-radius: 0.7rem;
  gap: 1rem;

  #dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    #dialogButtons {
      display: flex;
      flex-direction: column;
    }
  }
}
dialog::backdrop {
  background-color: #c5c5c5;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 200;
}

.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #e66465, #9198e5);
}
#title {
  display: flex;
  justify-content: center;
  padding: 1rem 1.5rem;
  gap: 1rem;
  background: #9c9cfa;
  align-items: center;

  button {
    display: flex;
    padding: 1rem 1.5rem;
    justify-content: center;
    transition: background-color 1s ease-in-out;
    background-color: black;

    &:hover {
      background-color: red;
    }
  }
}

.lists {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  height: 100%;
  padding: 1rem;
}
</style>
