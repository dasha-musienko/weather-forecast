const refs = {
  cityInput: document.querySelector('.geo-input'),
  searchBtn: document.querySelector('.search-btn'),
  currentTemp: document.querySelector('.day-stats__temperature-value'),
  feelslikeTemp: document.querySelector('.day-stats__feelslike-value'),
  cloudsValue: document.querySelector('.day-stats__clouds'),
  humidityValue: document.querySelector('.day-stats__humidity'),
  uvIdx: document.querySelector('.uv-header__value'),
  weatherTitle: document.querySelector('.weather__primary-title'),
  weatherCity: document.querySelector('.weather__location-city'),
  weatherCountry: document.querySelector('.weather__location-country'),
  weatherDate: document.querySelector('.weather__location-date'),
  weatherWindDir: document.querySelector('.weather__wind-dir'),
  weatherSpeed: document.querySelector('.weather__wind-kph'),
  weatherPressure: document.querySelector('.weather__pressure-mb'),
  weatherRain: document.querySelector('.weather__rain'),
  weatherSnow: document.querySelector('.weather__snow'),
  weatherMaxTemp: document.querySelector('.weather__max-temp'),
  weatherMinTemp: document.querySelector('.weather__min-temp'),
  forecastItems: document.querySelectorAll('.forecast-item'),
};

const tempValues = {
  city: '',
};

refs.cityInput.addEventListener('input', cityInputHandler);
refs.searchBtn.addEventListener('click', searchBtnClickHandler);

function cityInputHandler(e) {
  tempValues.city = e.currentTarget.value.toLowerCase();
}

function searchBtnClickHandler() {
  fetchWeather(tempValues.city).then(data => {
    console.log(data);

    createMarkup(data);
  });
}

function fetchWeather(city) {
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

function createMarkup(obj) {
  refs.currentTemp.innerHTML = obj.current.temp_c;
  refs.feelslikeTemp.innerHTML = obj.current.feelslike_c;
  refs.cloudsValue.innerHTML = obj.current.cloud;
  refs.humidityValue.innerHTML = obj.current.humidity;
  refs.uvIdx.innerHTML = obj.current.uv;
  refs.weatherTitle.innerHTML = obj.current.condition.text;
  refs.weatherCity.innerHTML = obj.location.name;
  refs.weatherCountry.innerHTML = obj.location.country;
  refs.weatherDate.innerHTML = obj.location.localtime;
  refs.weatherWindDir.innerHTML = obj.current.wind_dir;
  refs.weatherSpeed.innerHTML = obj.current.wind_kph;
  refs.weatherPressure.innerHTML = obj.current.pressure_mb;
  refs.weatherRain.innerHTML =
    obj.forecast.forecastday[0].day.daily_chance_of_rain;
  refs.weatherSnow.innerHTML =
    obj.forecast.forecastday[0].day.daily_chance_of_snow;
  refs.weatherMaxTemp.innerHTML = obj.forecast.forecastday[0].day.maxtemp_c;
  refs.weatherMinTemp.innerHTML = obj.forecast.forecastday[0].day.mintemp_c;
  [...refs.forecastItems].map((el, idx) => {
    el.querySelector('.forecast__time').innerHTML =
      obj.forecast.forecastday[0].hour[(idx + 1) * 2].time.split(' ')[1];
    el.querySelector('.forecast__temperature--value').innerHTML =
      obj.forecast.forecastday[0].hour[(idx + 1) * 2].temp_c;
    el.querySelector('.forecast__wind-value').innerHTML =
      obj.forecast.forecastday[0].hour[(idx + 1) * 2].wind_kph;
  });
}
