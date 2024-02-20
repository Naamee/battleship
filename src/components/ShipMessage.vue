<script setup>
const props = defineProps ({
    message: String
})
</script>

<template>
    <div class="flex mt-5 justify-center">
        <p class="text-white text-sm">{{ props.message }}</p>
    </div>
</template>