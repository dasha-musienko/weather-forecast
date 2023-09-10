import { fetchWeather } from './weatherService';
import { createsMarkup } from './rendersWebsite';
import { createsChart } from './chartService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
console.log(Notify);

const refs = {
  cityInput: document.querySelector('.geo-input'),
  mainEl: document.querySelector('main'),
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
  labels: [],
  data: [],

  myChart: null,
};

refs.cityInput.addEventListener('input', cityInputHandler);
refs.searchBtn.addEventListener('click', searchBtnClickHandler);

fetchService('kyiv');
function cityInputHandler(e) {
  tempValues.city = e.currentTarget.value.toLowerCase();
}

function searchBtnClickHandler() {
  fetchService(tempValues.city);
}

function resetsValues() {
  tempValues.city = '';
  tempValues.data = [];
  tempValues.labels = [];
  refs.cityInput.value = '';
}

function fetchService(city) {
  fetchWeather(city)
    .then(data => {
      refs.mainEl.className = '';

      if (tempValues.myChart) {
        tempValues.myChart.destroy();
      }
      console.log(data);

      createsMarkup(data, refs, tempValues);
      createsChart(tempValues);
    })
    .catch(err => {
      Notify.failure('Enter a valid city');
    })
    .finally(() => {
      resetsValues();
    });
}
