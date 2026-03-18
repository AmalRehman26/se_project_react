import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
