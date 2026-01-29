import "./WeatherCard.css";
import cloud from "../../images/cloud.svg";
function WeatherCard() {
  return (
    <section className="weather-card">
      <img src={cloud} alt="cloudy weather" className="weather-card__image" />
      <p className="weather-card__temp">75&deg;F</p>
    </section>
  );
}

export default WeatherCard;
