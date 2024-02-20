<script setup>
const props = defineProps ({
    message: String
})
</script>

<template>
    <div class="flex mt-5 justify-center">
        <p class="text-white">{{ props.message }}</p>
    </div>
</template>