import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">User Name</p>
      </div>
    </div>
  );
}

export default SideBar;
