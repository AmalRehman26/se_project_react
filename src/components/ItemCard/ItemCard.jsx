import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(data)}>
      <h2 className="card__title">{data.name}</h2>
      <img src={data.link} alt={data.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
