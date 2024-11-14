import { Link } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useState } from "react";

const HyperMasterSidebar = () => {
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const {
    setShowSidebar,
    setShowAddBranch,
    setShowSocialLink,
    setSiteNotification,
  } = useContextState();
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
            setShowExposure(false);
            setShowReport(false);
            setShowDeposit(false);
            setShowWithdraw(false);
            setShowClients(false);
            setShowBonus(false);
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
      <li className={`menu-item ${showClients ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowClients((prev) => !prev);
            setShowBranch(false);
            setShowSettings(false);
            setShowExposure(false);
            setShowReport(false);
            setShowDeposit(false);
            setShowWithdraw(false);
            setShowBonus(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Branch">Clients</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/view-client"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">View Clients</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/clients-with-balance"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">Clients with balance</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showSettings ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowSettings((prev) => !prev);
            setShowBranch(false);
            setShowExposure(false);
            setShowReport(false);
            setShowDeposit(false);
            setShowWithdraw(false);
            setShowClients(false);
            setShowBonus(false);
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
            <Link
              onClick={() => setShowSidebar(false)}
              to="/add-banner"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Add Banner</div>
            </Link>
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
          <li className="menu-item">
            <a
              onClick={() => {
                setSiteNotification(true);
                setShowSidebar(false);
              }}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Social Links">Site Notification</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showExposure ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowExposure((prev) => !prev);
            setShowSettings(false);
            setShowBranch(false);
            setShowReport(false);
            setShowDeposit(false);
            setShowWithdraw(false);
            setShowClients(false);
            setShowBonus(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Exposure</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/market-analysis"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Market Analysis</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/current-bets"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Current Bets</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showReport ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowReport((prev) => !prev);
            setShowExposure(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowDeposit(false);
            setShowWithdraw(false);
            setShowClients(false);
            setShowBonus(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Report</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/client-report"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Client Report</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/deposit-report"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Deposit Report</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/withdraw-report"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Withdraw Report</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showDeposit ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowDeposit((prev) => !prev);
            setShowReport(false);
            setShowExposure(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowClients(false);
            setShowWithdraw(false);
            setShowBonus(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Deposit</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-deposit"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Deposit</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/completed-deposit"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Completed Deposit</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/rejected-deposit"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Rejected Deposit</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showWithdraw ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowWithdraw((prev) => !prev);
            setShowDeposit(false);
            setShowReport(false);
            setShowExposure(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowClients(false);
            setShowBonus(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Withdraw</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-withdraw"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Withdraw</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/completed-withdraw"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Completed Withdraw</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/rejected-withdraw"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Rejected Withdraw</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${showBonus ? "open" : ""}`}>
        <a
          style={{}}
          onClick={() => {
            setShowBonus((prev) => !prev);
            setShowWithdraw(false);
            setShowDeposit(false);
            setShowReport(false);
            setShowExposure(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowClients(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Bonus</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/view-bonus"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">View Bonus</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/add-bonus"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Add Bonus</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/pending-bonus"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Pending Bonus</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/completed-bonus"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Completed Bonus</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/rejected-bonus"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Rejected Bonus</div>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default HyperMasterSidebar;
