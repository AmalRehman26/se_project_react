import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onAddClick, handleOpenItemModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        handleOpenItemModal={handleOpenItemModal}
      />
    </div>
  );
}

export default Profile;
