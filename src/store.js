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
                status: 'active',
            });
            newTask.value='';
        }
    };

    const toggleStatus = (index, isDone) => { 
        //change the task status to done/active
        const task = tasks.value[index];
        if (!task) return;
        task.status = isDone ? 'done' : 'active';
    };

    const updateTask = (index, newName) => {
        //updates task name
        const task = tasks.value[index];
        task.name = newName;
    }

    const delTask = (index) => {
        //delete tasks
        tasks.value.splice(index, 1);
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
        updateTask,
        delTask,
        removeTask,
    }
})