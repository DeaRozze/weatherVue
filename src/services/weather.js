const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export async function getCurrentWeather(city) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=ru`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} (${response.statusText})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка запроса:", error);
    throw error; // Передаём ошибку в компонент
  }
}
