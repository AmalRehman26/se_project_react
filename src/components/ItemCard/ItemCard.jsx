import "./ItemCard.css";

function ItemCard({ item, onClick }) {
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
    </li>
  );
}

export default ItemCard;
