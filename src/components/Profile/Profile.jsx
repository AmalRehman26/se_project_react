import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onAddClick,
  handleOpenItemModal,
  onSignOut,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        handleOpenItemModal={handleOpenItemModal}
      />
    </div>
  );
}

export default Profile;
