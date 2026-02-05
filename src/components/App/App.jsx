import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultClothingItems } from "../../utils/defaultClothes";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    temperature: { F: 32, C: 0 },
    condition: "cold",
    isDay: true,
    type: "sunny",
  });

  useEffect(() => {
    getWeather()
      .then((data) => {
        console.log("Raw API response:", data);
        const parsedWeather = parseWeatherData(data);
        console.log("Parsed weather data:", parsedWeather);
        setWeatherData(parsedWeather);
      })
      .catch((error) => {
        console.error("Weather API Error:", error);
        console.log("Using default weather data");
      });
  }, []);

  function handleOpenItemModal(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            weatherData={weatherData}
          />

          <Main
            clothingItems={clothingItems}
            handleOpenItemModal={handleOpenItemModal}
            weatherData={weatherData}
          />

          <Footer />
        </div>

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
        />

        <ModalWithForm
          title="New garment"
          name="add-garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
        >
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              name="name"
              placeholder="Name"
              required
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              name="imageUrl"
              placeholder="Image URL"
              required
            />
          </label>

          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>

            <label className="modal__label_type_radio">
              <input
                type="radio"
                className="modal__radio-input"
                name="weather"
                value="hot"
                required
              />
              Hot
            </label>

            <label className="modal__label_type_radio">
              <input
                type="radio"
                className="modal__radio-input"
                name="weather"
                value="warm"
              />
              Warm
            </label>

            <label className="modal__label_type_radio">
              <input
                type="radio"
                className="modal__radio-input"
                name="weather"
                value="cold"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
