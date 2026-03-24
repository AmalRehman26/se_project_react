import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");

  const navigate = useNavigate();

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
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error fetching clothing items:", err));
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(parseWeatherData(data)))
      .catch((err) => console.error("Weather API Error:", err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          setToken(jwt);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register");
  }

  function handleOpenLoginModal() {
    setActiveModal("login");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  function handleRegister(values, resetForm) {
    auth
      .signup(values)
      .then(() =>
        auth.signin({ email: values.email, password: values.password }),
      )
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        return auth.checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error("Registration error:", err));
  }

  function handleLogin(values, resetForm) {
    auth
      .signin(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        return auth.checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error("Login error:", err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleAddItem(item, resetForm) {
    api
      .addItem(item, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  }

  function handleDeleteItem(card) {
    api
      .deleteItem(card._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        handleCloseModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  }

  function handleLikeItem(card) {
    const isLiked = card.likes.includes(currentUser._id);
    const likeAction = isLiked ? api.dislikeItem : api.likeItem;

    likeAction(card._id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((item) =>
            item._id === updatedItem._id ? updatedItem : item,
          ),
        );
      })
      .catch((err) => console.error("Error liking item:", err));
  }

  function handleUpdateUser(values, resetForm) {
    const updatedValues = {
      name: values.name || currentUser.name,
      avatar: values.avatar || currentUser.avatar,
    };

    api
      .updateUser(updatedValues, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error("Error updating user:", err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleOpenAddGarmentModal={handleOpenAddGarmentModal}
              handleOpenLoginModal={handleOpenLoginModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    weatherData={weatherData}
                    isLoggedIn={isLoggedIn}
                    onLikeItem={handleLikeItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id,
                      )}
                      handleOpenItemModal={handleOpenItemModal}
                      onAddClick={handleOpenAddGarmentModal}
                      onSignOut={handleSignOut}
                      onEditProfile={handleOpenEditProfileModal}
                    />
                  </ProtectedRoute>
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
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onSwitchToLogin={handleOpenLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSwitchToRegister={handleOpenRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
