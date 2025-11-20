<script setup>
import { ref } from 'vue';

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
    if (task.editing === true) {
        return
    } else {
        task.editing = true;
    } 
};

const saveEditTask = (index, event) => {
    //saves new task edited
    const task = tasks.value[index];
    const newText = event.target.value.trim();
    if (newText === '') {
        tasks.value.splice(index, 1);
    } else {
        task.name = newText;
        task.editing = false;
    }
}

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
        <button type="submit">Add</button>
    </form>

    <ul>
        <li 
            v-for="(task, index) in tasks" 
            :key="index"
            :class="{done: task.status === 'done'}"
        >  
            <!--checkbox-->
            <input
                class="toggle" 
                type="checkbox"
                :checked="task.status === 'done'"
                @change='toggleStatus(index, $event)'
                name="toggle"
            />

            <div class="content">
                <!--if editing-->
                <div v-if="task.editing">
                    <input
                        type="text"
                        class="editing"
                        v-model="task.name"
                        @blur="saveEditTask(index, $event)"
                        @keyup.enter="saveEditTask(index, $event)"
                    />
                </div>
                <!--if not editing-->
                <div v-else>
                    <span>{{ task.name }}</span>
                </div>
            </div>

            <!--action buttons-->
            <div class="actions">
                <!--editing button-->
                <button
                    type="button"
                    @click="editTask(index)"
                    title = "Edit this item"
                >
                    <img src="/pencil.jpg" alt="edit" class="icon"/>
                </button>

                <!--delete button-->
                <button
                    type="button"
                    @click="delTask(index)"
                    title = "Delete this item"
                >
                    <img src="/trash.jpg" alt="delete" class="icon"/>
                </button>
            </div>
        </li>
    </ul>

    <!--remove all tasks done-->
    <div class="toolbar">
        <button @click="removeTask">Clear Completed</button>
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

button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: blue;
    color: aliceblue;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover { background-color: darkblue; }

ul {
    list-style: none;
    padding: 0;
    max-width: 400px;
    margin: 0 auto;
}

li {
    background: white;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}

li.done {
    color: darkgrey;
    text-decoration: line-through;
    background-color: lightgray;
}

li input.toggle {
  cursor: pointer;
  margin-right: 0.25rem;
}

.icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.actions {
    margin-left: auto;
    display: flex;
    gap: 0.25rem;
}

.toolbar {
    max-width: 400px;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
}
</style>
