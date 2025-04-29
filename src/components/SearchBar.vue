<script setup>
import { ref } from 'vue';
const city = ref('');
defineEmits(['search']);
</script>

<template>
  <div class="search-bar">
    <input v-model="city" @keyup.enter="$emit('search', city)" placeholder="Например: Москва" />
    <button @click="$emit('search', city)">Узнать погоду</button>
  </div>
</template>

<style scoped>
.search-bar {
  margin: 20px 0;
}

input {
  padding: 8px;
  margin-right: 10px;
}
</style>