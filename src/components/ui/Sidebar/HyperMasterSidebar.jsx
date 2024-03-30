import { Link } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useState } from "react";

const HyperMasterSidebar = () => {
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { setShowSidebar, setShowAddBranch, setShowSocialLink } =
    useContextState();
  return (
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link
          onClick={() => setShowSidebar(false)}
          to="/"
          className="menu-link"
        >
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboards</div>
        </Link>
      </li>

      <li className={`menu-item ${showBranch ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowBranch((prev) => !prev);
            setShowSettings(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Branch">Branch</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/view-branches"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">View Branches</div>
            </Link>
          </li>

          <li className="menu-item">
            <a
              onClick={() => {
                setShowAddBranch(true);
                setShowSidebar(false);
              }}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Branch">Add Branch</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showSettings ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowSettings((prev) => !prev);
            setShowBranch(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Settings</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/view-banner"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">View Banners</div>
            </Link>
          </li>

          <li className="menu-item">
            <a className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Add Banner</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => {
                setShowSocialLink(true);
                setShowSidebar(false);
              }}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Social Links">Social Links</div>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default HyperMasterSidebar;
