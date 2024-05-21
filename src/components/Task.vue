<script setup lang="ts">
import { Task } from "../types/Task";
import { ref } from "vue";
// import { watch, watchEffect } from "vue";
// import { useDefaultList } from "../js/DefaultList.ts";
// import { storeToRefs } from "pinia";

// const { taskList } = storeToRefs(useDefaultList());

const props = defineProps<{
  task: Task;
}>();

const checked = ref<boolean>(props.task.checked);

const emits = defineEmits<{
  (e: "updateStatus", value: { checked: boolean; id: string }): void;
  (e: "delTask", value: string): void;
}>();
</script>

<template>
  <div class="task">
    <div class="info">
      <h4>{{ task.name }}</h4>
      <p>{{ task.description }}</p>
    </div>
    <div class="action">
      <input
        type="checkbox"
        v-model="checked"
        :id="task.id"
        @change="emits('updateStatus', { checked, id: task.id })"
      />
      <button v-if="!task.checked" @click="emits('delTask', props.task.id)">
        <img src="../assets/delete.png" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.task {
  background: #ffffff;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem #6d6a6a;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;

  * {
    margin: 0;
  }

  h4 {
    font-weight: bold;
  }
}

.action {
  padding: 0 0.5rem;
}

button {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  padding: 0;
  img {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
}
</style>
