<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import { getCurrentWeather } from './services/weather';

const weather = ref(null);
const error = ref('');
const searchHistory = ref([]);

// Загрузка истории при старте
onMounted(() => {
  searchHistory.value = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
});

async function handleSearch(city) {
  if (!city.trim()) return;

  try {
    // Запрос к API или кешу
    const cachedData = localStorage.getItem(`weather_${city}`);
    weather.value = cachedData ? JSON.parse(cachedData) : await getCurrentWeather(city);

    // Обновляем кеш и историю
    if (!cachedData) {
      localStorage.setItem(`weather_${city}`, JSON.stringify(weather.value));
    }
    updateHistory(city);

    error.value = '';
  } catch (err) {
    error.value = 'Город не найден';
  }
}

function updateHistory(city) {
  const history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
  if (!history.includes(city)) {
    const newHistory = [city, ...history].slice(0, 5);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    searchHistory.value = newHistory; // Реактивное обновление
  }
}
</script>

<template>
  <div class="app">
    <h1>Погодное приложение</h1>
    <SearchBar @search="handleSearch" />
    <WeatherDisplay :weather="weather" :error="error" />
    <div v-if="searchHistory.length" class="history">
      <h3>Недавние запросы:</h3>
      <ul>
        <li v-for='(item) in searchHistory' :key='item.id' @click='handleSearch(item)'>
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.history {
  margin-top: 20px;
}

.history ul {
  list-style: none;
  padding: 0;
}

.history li {
  cursor: pointer;
  padding: 5px;
}
</style>
