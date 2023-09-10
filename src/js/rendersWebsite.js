export function createsMarkup(obj, refs, tempValues) {
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

  function createsStartForecastTime() {
    let time = obj.location.localtime.split(' ')[1];
    let timeArr = time.split(':');

    if (timeArr[0] % 2) {
      timeArr[0] = +timeArr[0] + 1;
    } else {
      timeArr[0] = +timeArr[0] + 2;
    }

    return timeArr[0];
  }

  createsForecastMarkup(createsForecastObj());

  function createsForecastObj() {
    const resultArray = obj.forecast.forecastday[0].hour.filter(
      (el, idx, arr) =>
        +el.time.split(' ')[1].split(':')[0] > +createsStartForecastTime()
    );

    return resultArray.length < 5
      ? obj.forecast.forecastday[0].hour.slice(-5)
      : resultArray.slice(0, 5);
  }

  function createsForecastMarkup(obj) {
    [...refs.forecastItems].map((el, idx) => {
      el.querySelector('.forecast__time').innerHTML =
        obj[idx].time.split(' ')[1];
      el.querySelector('.forecast__temperature--value').innerHTML =
        obj[idx].temp_c;
      el.querySelector('.forecast__wind-value').innerHTML = obj[idx].wind_kph;

      tempValues.labels.push(obj[idx].time.split(' ')[1]);
      tempValues.data.push(obj[idx].temp_c);
    });
  }

  const weatherConditions = [
    'sunny',
    'cloudy',
    'overcast',
    'mist',
    'rain',
    'snow',
    'sleet',
    'drizzle',
    'thundery',
    'thunder',
    'blizzard',
    'fog',
    'ice',
    'shower',
    'showers',
    'clear',
  ];

  let weatherConditionWord = obj.current.condition.text
    .toLowerCase()
    .split(' ')
    .find(el => weatherConditions.includes(el));

  refs.mainEl.classList.add(weatherConditionWord);
}
