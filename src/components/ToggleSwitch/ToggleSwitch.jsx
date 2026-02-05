import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        id="temp-switch"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <label htmlFor="temp-switch" className="toggle-switch__label">
        <span
          className={`toggle-switch__button ${
            currentTemperatureUnit === "F" ? "toggle-switch__button_active" : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__button ${
            currentTemperatureUnit === "C" ? "toggle-switch__button_active" : ""
          }`}
        >
          C
        </span>
        <span className="toggle-switch__slider"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
