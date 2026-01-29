import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__caption">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
