import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.condition;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temperature[currentTemperatureUnit]}°{" "}
        {currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="main__card-list">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => handleOpenItemModal(item)}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
