const APIkey = "526a66d549b6d0233efd8a86ad2cb6ef";
const latitude = 40.7128;
const longitude = -74.006;

export const getWeather = () => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

  return fetch(weatherApi).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const parseWeatherData = (data) => {
  const weather = {};
  weather.city = data.name;

  weather.temperature = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  weather.condition = getWeatherCondition(weather.temperature.F);

  const currentTime = Date.now() / 1000;
  weather.isDay =
    currentTime >= data.sys.sunrise && currentTime <= data.sys.sunset;

  weather.type = getWeatherType(data.weather[0].id);

  return weather;
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const getWeatherType = (id) => {
  if (id >= 200 && id < 300) {
    return "storm";
  }

  if (id >= 300 && id < 600) {
    return "rain";
  }

  if (id >= 600 && id < 700) {
    return "snow";
  }

  if (id >= 700 && id < 800) {
    return "fog";
  }

  if (id === 800) {
    return "sunny";
  }

  if (id > 800) {
    return "cloudy";
  }
  return "sunny";
};
