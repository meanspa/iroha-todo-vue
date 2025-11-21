<script setup>
import IconButton from './Button.vue';

const props = defineProps({
    task: Object,
    index: Number
});

const emit = defineEmits([
    'toggleStatus',
    'delTask',
    'editTask',
    'saveEditTask'
]);

const toggleStatus = (event) => { 
    //change the task status to done/active
    emit('toggleStatus', props.index, event);
};

const delTask = () => {
    //delete tasks
    emit('delTask', props.index);
};

const editTask = () => {
    //If it's already editing, do nothing
    emit('editTask', props.index); 
};

const saveEditTask = (event) => {
    //saves new task edited
    emit('saveEditTask', props.index, event);
};
</script>

<template>
<li 
    :class="{done: task.status === 'done'}"
>  
    <!--checkbox-->
    <input
        class="toggle" 
        type="checkbox"
        :checked="task.status === 'done'"
        @change='toggleStatus'
    />

    <div class="content">
        <!--if editing-->
        <div v-if="task.editing">
            <input
                type="text"
                class="editing"
                v-model="task.name"
                @blur="saveEditTask(event)"
                @keyup.enter="saveEditTask(event)"
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
        <IconButton
            icon="/pencil.jpg"
            alt="edit"
            title="Edit this item"
            @click="editTask"
        />

        <!--delete button-->
        <IconButton
            icon="/trash.jpg"
            alt="delete"
            title="Delete this item"
            @click="delTask(index)"
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
