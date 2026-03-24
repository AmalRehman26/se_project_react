import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onClick, onLikeItem, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = currentUser && item.likes.includes(currentUser._id);

  function handleLikeClick(e) {
    e.stopPropagation();
    onLikeItem(item);
  }

  return (
    <li className="card" onClick={onClick}>
      <h2 className="card__title">{item.name}</h2>
      <div className="card__image-wrapper">
        <img
          src={item.link || item.imageUrl}
          alt={item.name}
          className="card__image"
        />
      </div>
      {isLoggedIn && (
        <button
          className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
          onClick={handleLikeClick}
          type="button"
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
