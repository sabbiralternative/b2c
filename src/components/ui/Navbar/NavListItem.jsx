import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
const NavListItem = () => {
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <aside
      id="layout-menu"
      className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
      style={{ touchAction: "none", userSelect: "none" }}
      //   "
      //   touch-action: none;
      //   user-select: none;
      //   -webkit-user-drag: none;
      //   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      // "
      // data-bg-className="bg-menu-theme"
    >
      <div className="container-xxl d-flex h-100">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="menu-horizontal-wrapper">
          <ul className="menu-inner" style={{ marginLeft: "0px" }}>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Dashboards">Dashboards</div>
              </Link>
            </li>

            <li className={`menu-item ${showBranch ? "open" : ""}`}>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setShowBranch((prev) => !prev);
                  setShowSettings(false);
                }}
                className="menu-link menu-toggle"
              >
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Branch">Branch</div>
                {showBranch ? (
                  <MdOutlineKeyboardArrowUp
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                )}
              </a>

              <ul className="menu-sub">
                <li className="menu-item ">
                  <Link
                    onClick={() => setShowBranch(false)}
                    to="/view-branches"
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Branches">View Branches</div>
                  </Link>
                </li>

                <li className="menu-item">
                  <a className="menu-link">
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Branch">Add Branch</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className={`menu-item ${showSettings ? "open" : ""}`}>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setShowSettings((prev) => !prev);
                  setShowBranch(false);
                }}
                className="menu-link menu-toggle"
              >
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Settings">Settings</div>
                {showSettings ? (
                  <MdOutlineKeyboardArrowUp
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                )}
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a className="menu-link">
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">View Banners</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a className="menu-link">
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Banner">Add Banner</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a className="menu-link">
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Social Links</div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default NavListItem;
