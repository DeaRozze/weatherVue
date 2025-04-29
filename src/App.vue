<script setup>
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import { getCurrentWeather } from './services/weather';

const weather = ref(null);
const error = ref('');

async function handleSearch(city) {
  if (!city.trim()) return; // Игнорируем пустой ввод

  try {
    weather.value = await getCurrentWeather(city);
    error.value = '';
  } catch (err) {
    error.value = 'Город не найден или ошибка сервера';
    weather.value = null;
  }
}
</script>

<template>
  <div class="app">
    <h1>Погодное приложение</h1>
    <SearchBar @search="handleSearch" />
    <WeatherDisplay :weather="weather" :error="error" />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
