import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import "./Header.css";

function Header({ handleOpenAddGarmentModal }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__place">
        <time className="header__datetime" dateTime={now.toISOString()}>
          {dateStr}
        </time>
        , New York
      </p>
      <button
        onClick={handleOpenAddGarmentModal}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <p className="header__username">Terrence Tegegne</p>
      <img
        src={avatar}
        alt="Terrence Tegegne's picture"
        className="header__avatar"
      />
    </header>
  );
}

export default Header;
