import { useState, useEffect } from "react";
import Header from "../Header/Header";
import * as api from "../../utils/api";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
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
    api
      .getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
      });
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => {
        const parsedWeather = parseWeatherData(data);
        setWeatherData(parsedWeather);
      })
      .catch((error) => {
        console.error("Weather API Error:", error);
      });
  }, []);

  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("preview");
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

  function handleAddItem(item, resetForm) {
    api.addItem(item).then((newItem) => {
      setClothingItems((items) => [newItem, ...items]);
      resetForm();
      handleCloseModal();
    });
  }

  function handleDeleteItem(card) {
    api.deleteItem(card._id).then(() => {
      setClothingItems((items) =>
        items.filter((item) => item._id !== card._id),
      );
      handleCloseModal();
    });
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

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  weatherData={weatherData}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          onClose={handleCloseModal}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          onDelete={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
