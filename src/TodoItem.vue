<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

// props passes from parent component(App.vue)
// --- task: task object with name and status
// --- index: Number of the task in the tasks array
const props = defineProps({
    task: Object,
    index: Number
});

// emits events to parent component(App.vue)
// --- toggleStatus: tell parent that checkbox changed
// --- updateTask: tell parent to update task name
// --- delTask: tell parent to delete this task
const emit = defineEmits([
    'toggleStatus',  //boolean value (done or not)
    'updateTask',  //new task name
    'delTask',  //no value
]);

// local editing state
// --- isEditing: whether the task is being edited
// --- editedName: temporary storage for edited task name
const isEditing = ref(false);
const editedName = ref(props.task.name);

const toggleStatus = (event) => {
    // called when checkbox is toggled
    // emits 'toggleStatus' event to parent with new status
    emit('toggleStatus', props.index, event.target.checked);
};

const delTask = () => {
    // emits 'delTask' event to parent to delete this task
    emit('delTask', props.index);
};

const startEdit = () => {
    // starts editing mode
    // copies current task name to editedName
    isEditing.value = true;
    editedName.value = props.task.name;
};

const finishEdit = () => {
    // called when editing is finished (on blur or enter key)
    // trims the edited name and checks if it's empty
    const trimmedName = editedName.value.trim();
    if (trimmedName === '') {
        // if empty, request deletion
        emit('delTask', props.index);
    } else {
        // otherwise, request update
        emit('updateTask', props.index, trimmedName);
    }
    // exit editing mode
    isEditing.value = false;
};
</script>

<template>
<li :class="{done: task.status === 'done'}" >  
    <!--checkbox-->
    <input
        class="todo-checkbox" 
        type="checkbox"
        :checked="task.status === 'done'"
        @change='toggleStatus'
    />

    <div class="todo-text">
        <!--if editing, show an input field-->
        <div v-if="isEditing">
            <input
                type="text"
                class="edit-input"
                v-model="editedName"
                @blur="finishEdit"
                @keyup.enter="finishEdit"
            />
        </div>

        <!--if not editing, just show the task name-->
        <div v-else>
            <span>{{ task.name }}</span>
        </div>
    </div>

    <!--action buttons: edit + delete-->
    <div class="todo-actions">
        <!--editing button: enters edit mode-->
        <Button
            icon="/pencil.jpg"
            alt="edit"
            title="Edit this item"
            @click="startEdit"
        />

        <!--delete button: requests deletion-->
        <Button
            icon="/trash.jpg"
            alt="delete"
            title="Delete this item"
            @click="delTask"
        />
    </div>
</li>
</template>

<style scoped>
/* one list item */
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

/* input field when editing */
.todo-text {
  flex: 1 1 auto;
  min-width: 0;
}

/* visual style when a task is marked done */
li.done {
    color: darkgrey;
    text-decoration: line-through;
    background-color: lightgray;
}

/* checkbox styling */
li input.todo-checkbox {
  cursor: pointer;
  margin-right: 0.25rem;
}

/* Action buttons container */
.todo-actions {
    margin-left: auto;
    display: flex;
    gap: 0.25rem;
}
</style>
