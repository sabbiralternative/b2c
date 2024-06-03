import { useRef, useState } from "react";
import useContextState from "../../../../hooks/useContextState";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";

const HyperMaster = () => {
  const { setShowAddBranch, setShowSocialLink } = useContextState();
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate();
  const settingsRef = useRef();
  useCloseModalClickOutside(settingsRef, () => {
    setShowSettings(false);
  });
  const branchRef = useRef();
  useCloseModalClickOutside(branchRef, () => {
    setShowBranch(false);
  });
  const exposureRef = useRef();
  useCloseModalClickOutside(exposureRef, () => {
    setShowExposure(false);
  });
  const reportRef = useRef();
  useCloseModalClickOutside(reportRef, () => {
    setShowReport(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowBranch(false);
    setShowSettings(false);
    setShowExposure(false)
    setShowReport(false);
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
            setShowExposure(false);
            setShowSettings(false);
            setShowReport(false);
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
            setShowExposure(false);
            setShowBranch(false);
            setShowReport(false);
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
            <a
              onClick={() => handleNavigate("add-banner")}
              className="menu-link"
            >
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
      <li
        ref={exposureRef}
        className={`menu-item ${showExposure ? "open" : ""}`}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => {
            setShowExposure(true);
            setShowSettings(false);
            setShowBranch(false);
            setShowReport(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Exposure</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("market-analysis")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Market Analysis</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("current-bets")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Current Bets</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        ref={reportRef}
        className={`menu-item ${showReport ? "open" : ""}`}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => {
            setShowReport(true);
            setShowExposure(false);
            setShowSettings(false);
            setShowBranch(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Report</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("client-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Client Report</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("deposit-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Deposit Report</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("withdraw-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Withdraw Report</div>
            </a>
          </li>

        </ul>
      </li>
    </ul>
  );
};

export default HyperMaster;
