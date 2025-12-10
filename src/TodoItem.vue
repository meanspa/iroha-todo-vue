<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    task: Object,
    index: Number
});

const emit = defineEmits([
    'toggleStatus',  //boolean value
    'updateTask',  //new task name
    'delTask',  //delete the task
]);

const isEditing = ref(false);
const editedName = ref(props.task.name);

const toggleStatus = (event) => { 
    //change the task status to done/active
    emit('toggleStatus', props.index, event.target.checked);
};

const delTask = () => {
    //delete tasks
    emit('delTask', props.index);
};

const startEdit = () => {
    //If it's already editing, do nothing
    isEditing.value = true;
    editedName.value = props.task.name;
};

const finishEdit = () => {
    //saves new task edited
    const trimmedName = editedName.value.trim();
    if (trimmedName === '') {
        //if empty, delete the task
        emit('delTask', props.index);
    } else {
        //update the task name
        emit('updateTask', props.index, trimmedName);
    }
    isEditing.value = false;
};
</script>

<template>
<li :class="{done: task.status === 'done'}" >  
    <!--checkbox-->
    <input
        class="toggle" 
        type="checkbox"
        :checked="task.status === 'done'"
        @change='toggleStatus'
    />

    <div class="content">
        <!--if editing-->
        <div v-if="isEditing">
            <input
                type="text"
                class="editing"
                v-model="editedName"
                @blur="finishEdit"
                @keyup.enter="finishEdit"
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
        <Button
            icon="/pencil.jpg"
            alt="edit"
            title="Edit this item"
            @click="startEdit"
        />

        <!--delete button-->
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

.actions {
    margin-left: auto;
    display: flex;
    gap: 0.25rem;
}
</style>
