import { defineStore } from "pinia";
import { ref } from "vue";

export const store = defineStore('tasks', () => {
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

    return {
        tasks,
        newTask,
        addTask,
        toggleStatus,
        delTask,
        editTask,
        saveEditTask,
        removeTask,
    }
})