import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({
  handleOpenAddGarmentModal,
  handleOpenLoginModal,
  handleOpenRegisterModal,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>

      <p className="header__place">
        <time className="header__datetime" dateTime={now.toISOString()}>
          {dateStr}
        </time>
        , {weatherData.city || "New York"}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <div className="header__user-container">
          <button
            onClick={handleOpenAddGarmentModal}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__profile">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="header__auth-buttons">
          <button
            className="header__signup-btn"
            onClick={handleOpenRegisterModal}
          >
            Sign Up
          </button>
          <button className="header__signin-btn" onClick={handleOpenLoginModal}>
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
