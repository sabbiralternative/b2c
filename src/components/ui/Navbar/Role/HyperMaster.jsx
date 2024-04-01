import { useRef, useState } from "react";
import useContextState from "../../../../hooks/useContextState";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";

const HyperMaster = () => {
  const { setShowAddBranch, setShowSocialLink } = useContextState();
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();
  const settingsRef = useRef();
  useCloseModalClickOutside(settingsRef, () => {
    setShowSettings(false);
  });
  const branchRef = useRef();
  useCloseModalClickOutside(branchRef, () => {
    setShowBranch(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowBranch(false);
    setShowSettings(false);
  };
  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link to="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboards</div>
        </Link>
      </li>
      <li ref={branchRef} className={`menu-item ${showBranch ? "open" : ""}`}>
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => {
            setShowBranch(true);
            setShowSettings(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Branch">Branch</div>
          {/* {showBranch ? (
                    <MdOutlineKeyboardArrowUp
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  )} */}
        </a>

        <ul className="menu-sub">
          <li className="menu-item ">
            <a
              onClick={() => handleNavigate("view-branches")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">View Branches</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => {
                setShowAddBranch(true);
                setShowBranch(false);
              }}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Branch">Add Branch</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        ref={settingsRef}
        className={`menu-item ${showSettings ? "open" : ""}`}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => {
            setShowSettings(true);
            setShowBranch(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Settings</div>
          {/* {showSettings ? (
                    <MdOutlineKeyboardArrowUp
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  )} */}
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("view-banner")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">View Banners</div>
            </a>
          </li>

          <li className="menu-item">
            <a   onClick={() => handleNavigate("add-banner")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Add Banner</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => {
                setShowSocialLink(true);
                setShowSettings(false);
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

export default HyperMaster;
