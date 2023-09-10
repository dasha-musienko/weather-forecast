export function fetchWeather(city) {
  console.log(city);
  BASE_URL = 'http://api.weatherapi.com/v1/';
  API_KEY = '6f3bf7a06a84400a8c1181835232108';

  return fetch(`${BASE_URL}forecast.json?key=${API_KEY}&q=${city}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}
