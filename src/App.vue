<script setup>
import { storeToRefs } from 'pinia';
import { store } from './store';
import Button from './Button.vue';
import TodoItem from './TodoItem.vue';

const tasksStore = store();
const { tasks, newTask } = storeToRefs(tasksStore);
const {
    addTask,
    toggleStatus,
    delTask,
    editTask,
    saveEditTask,
    removeTask,
} = tasksStore
</script>

<template>
  <div class="app">
    <h1>My Todo List</h1>

    <form @submit.prevent="addTask">
        <input
            type="text"
            placeholder="Add a new task"
            v-model="newTask"
        />
        <Button type="submit">Add</Button>
    </form>

    <ul>
        <TodoItem 
            v-for="(task, index) in tasks" 
            :key="index"
            :task="task"
            :index="index"
            @toggleStatus="toggleStatus"
            @delTask="delTask"
            @editTask="editTask"
            @saveEditTask="saveEditTask"
        />  
    </ul>

    <!--remove all tasks done-->
    <div class="toolbar">
        <Button @click="removeTask">Clear Completed</Button>
    </div>
  </div>
</template>

<style scoped>
.app {
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background-color: aliceblue;
    margin: 0;
    padding: 2rem;
}

h1 {
    text-align: center;
    color: black;
}

form {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

input[type="text"] {
    padding: 0.5rem;
    font-size: 1rem;
    width: 250px;
    margin-right: 0.5rem;
}

ul {
    list-style: none;
    padding: 0;
    max-width: 400px;
    margin: 0 auto;
}

.toolbar {
    max-width: 400px;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
}
</style>
