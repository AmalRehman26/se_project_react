import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

import sunnyday from "../../images/weather/sunnyday.svg";
import sunnynight from "../../images/weather/sunnynight.svg";
import cloudyday from "../../images/weather/cloudyday.svg";
import cloudynight from "../../images/weather/cloudynight.svg";
import rainday from "../../images/weather/rainday.svg";
import rainnight from "../../images/weather/rainnight.svg";
import stormday from "../../images/weather/stormday.svg";
import stormnight from "../../images/weather/stormnight.svg";
import snowday from "../../images/weather/snowday.svg";
import snownight from "../../images/weather/snownight.svg";
import fogday from "../../images/weather/fogday.svg";
import fognight from "../../images/weather/fognight.svg";

const weatherImages = {
  sunny: { day: sunnyday, night: sunnynight },
  cloudy: { day: cloudyday, night: cloudynight },
  rain: { day: rainday, night: rainnight },
  storm: { day: stormday, night: stormnight },
  snow: { day: snowday, night: snownight },
  fog: { day: fogday, night: fognight },
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const timeOfDay = weatherData.isDay ? "day" : "night";
  const weatherType = weatherData.type || "sunny";

  const weatherImage =
    weatherImages[weatherType]?.[timeOfDay] || weatherImages.sunny.day;

  return (
    <section
      className={`weather-card weather-card_type_${weatherType}-${timeOfDay}`}
    >
      <img src={weatherImage} alt="" className="weather-card__image" />
      <p className="weather-card__temp">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
