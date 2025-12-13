import { defineStore } from "pinia";
import { ref } from "vue";
// Pinia store for managing todo list tasks

export const store = defineStore('tasks', () => {
    // ref for tasks array and new task input
    // task: { name: string, status: 'active' | 'done' }
    // newTask: string
    // timestamp: string (ISO format)
    const tasks = ref([]);
    const newTask = ref('');
    const timestamp = () => new Date().toISOString();

    const addTask = () => {
        // adds a new task with name, status(active), and timestamps
        if (newTask.value.trim() !== '') {
            tasks.value.push({
                name: newTask.value,
                status: 'active',
                createdAt: timestamp(),
                updatedAt: null,
                completedAt: null,
            });
            newTask.value='';
        };
    };

    const toggleStatus = (index, isDone) => { 
        // change the task status to done/active
        // isDone: boolean (true: done, false: active)
        const task = tasks.value[index];
        if (!task) return; //safety check
        task.status = isDone ? 'done' : 'active';
        // updates the status based on isDone boolean
        task.completedAt = isDone ? timestamp() : null;
        // set completedAt timestamp if done, else null
    };

    const delTask = (index) => {
        // deletes task at index
        tasks.value.splice(index, 1);
    };

    const removeTask = () => { 
        // removes all tasks with status 'done'
        for (let i = tasks.value.length-1; i >= 0; i--) {
            if (tasks.value[i].status === 'done') {
                tasks.value.splice(i, 1);
            };
        };
    };

    // expose state and actions to components
    return {
        tasks,
        newTask,
        addTask,
        toggleStatus,
        delTask,
        removeTask,
    };
});