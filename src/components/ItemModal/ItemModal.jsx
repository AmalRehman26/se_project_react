import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  const isOwn = card.owner === currentUser?._id;

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function handleConfirmDelete() {
    setShowConfirm(false);
    onDelete(card);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
  }

  return (
    <>
      <div
        className={`modal ${isOpen && !showConfirm ? "modal_opened" : ""}`}
        onClick={onClose}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="modal__close" onClick={onClose} />

          <div className="modal__image-container">
            <img
              src={card.imageUrl || card.link}
              alt={card.name}
              className="modal__image"
            />
          </div>

          <div className="modal__caption">
            <div className="modal__info">
              <h2 className="modal__title">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            {isOwn && (
              <button
                type="button"
                className="modal__delete"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`modal ${showConfirm ? "modal_opened" : ""}`}>
        <div
          className="modal__content modal__content_confirm"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal__close"
            onClick={handleCancelDelete}
          />
          <p className="modal__confirm-text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <button
            type="button"
            className="modal__confirm-delete"
            onClick={handleConfirmDelete}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__confirm-cancel"
            onClick={handleCancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
