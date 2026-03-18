import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onAddClick={onAddClick} />
    </div>
  );
}

export default Profile;
