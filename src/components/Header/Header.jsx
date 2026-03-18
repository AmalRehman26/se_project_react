import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ handleOpenAddGarmentModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* Logo → Main page */}
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

      <button
        onClick={handleOpenAddGarmentModal}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      {/* Profile navigation */}
      <Link to="/profile" className="header__profile">
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's picture"
          className="header__avatar"
        />
      </Link>
    </header>
  );
}

export default Header;
