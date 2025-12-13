<script setup>
import { storeToRefs } from 'pinia';
import { store } from './store';
import IconButton from './IconButton.vue';
import TodoItem from './TodoItem.vue';

// Pinia store instance and refs
const tasksStore = store();
const { tasks, newTask } = storeToRefs(tasksStore);

// Destructure actions from the store so we can use them directly
const {
    addTask,
    toggleStatus,
    delTask,
    removeTask,
} = tasksStore
</script>

<template>
  <div class="app">
    <h1>My Todo List</h1>

    <!--form to add a new task-->
    <form @submit.prevent="addTask">
    <!--prevents the default page reload and calls addTask instead-->
        <input
            type="text"
            placeholder="Add a new task"
            v-model="newTask"
        />
        <IconButton type="submit">Add</IconButton>
    </form>

    <!--list of todo items-->
    <ul>
        <!--
            Render one ToDoItem component for each task in the tasks array.
            Props: task, index
                props pass data down to the child component
            Events: toggleStatus, delTask
                events listen for emitted events from the child component
                and call the corresponding action in the store
        -->
        <TodoItem 
            v-for="(task, index) in tasks"
            :key="index"
            :task="task"
            :index="index"
            @toggleStatus="toggleStatus"
            @delTask="delTask"
        />  
    </ul>

    <!--removes all tasks with status 'done'-->
    <div class="toolbar">
        <IconButton @click="removeTask">Clear Completed</IconButton>
    </div>
  </div>
</template>

<style scoped>
/* main app styles */
.app {
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background-color: aliceblue;
    margin: 0;
    padding: 2rem;
}

/* header */
h1 {
    text-align: center;
    color: black;
}

/* form to add new task */
form {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

/* input field for new task */
input[type="text"] {
    padding: 0.5rem;
    font-size: 1rem;
    width: 250px;
    margin-right: 0.5rem;
}

/* list of todo items */
ul {
    list-style: none;
    padding: 0;
    max-width: 400px;
    margin: 0 auto;
}

/* clear completed button */
.toolbar {
    max-width: 400px;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
}
</style>
