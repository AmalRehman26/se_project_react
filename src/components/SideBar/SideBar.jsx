import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__edit" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__signout" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
