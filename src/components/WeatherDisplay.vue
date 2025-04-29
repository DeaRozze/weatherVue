<script setup>
defineProps({
  weather: Object,
  error: String
});
</script>

<template>
  <div v-if="weather" class="weather-card">
    <h2>{{ weather.location.name }}, {{ weather.location.country }}</h2>
    <div class="weather-info">
      <img :src="weather.current.condition.icon" alt="Погода" />
      <p>{{ weather.current.temp_c }}°C (ощущается как {{ weather.current.feelslike_c }}°C)</p>
    </div>
    <p>{{ weather.current.condition.text }}</p>
    <p>Ветер: {{ weather.current.wind_kph }} км/ч, {{ weather.current.wind_dir }}</p>
    <p>Влажность: {{ weather.current.humidity }}%</p>
  </div>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
.weather-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
}

.error {
  color: red;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>