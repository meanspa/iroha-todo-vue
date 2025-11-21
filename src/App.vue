<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import TodoItem from './TodoItem.vue';

const tasks = ref([]);
const newTask = ref('');

const addTask = () => {
    //adds object with name, status(active), and editing(false)
    if (newTask.value.trim() !== '') {
        tasks.value.push({
            name: newTask.value,
            status: "active",
            editing: false
        });
        newTask.value='';
    }
};

const toggleStatus = (index, event) => { 
    //change the task status to done/active
    const task = tasks.value[index];
    if (event.target.checked) {
      task.status ='done';
    } else {
      task.status = 'active';
    }
};

const delTask = (index) => {
    //delete tasks
    tasks.value.splice(index, 1);
};

const editTask = (index) => {
    //If it's already editing, do nothing
    const task = tasks.value[index];
    if (task.editing) {
        return
    } else {
        task.editing = true;
    } 
};

const saveEditTask = (index, event) => {
    //saves new task edited
    const task = tasks.value[index];
    const newText = task.name.trim();
    if (newText === '') {
        tasks.value.splice(index, 1);
    } else {
        task.name = newText;
        task.editing = false;
    }
};

const removeTask = () => { 
    //removes all 'done' tasks
    for (let i = tasks.value.length-1; i >= 0; i--) {
        if (tasks.value[i].status === 'done') {
            tasks.value.splice(i, 1);
        }
    }
};
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
