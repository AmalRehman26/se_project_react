import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onAddClick,
  handleOpenItemModal,
  onLikeItem,
  isLoggedIn,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add clothes
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onClick={() => handleOpenItemModal(item)}
            onLikeItem={onLikeItem}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
