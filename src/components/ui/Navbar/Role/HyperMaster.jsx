import { useEffect, useRef, useState } from "react";
import useContextState from "../../../../hooks/useContextState";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetDWCount from "../../../../hooks/Master/useGetDWCount";
import notification from "../../../../assets/notification.wav";
const HyperMaster = () => {
  const {
    setShowAddBranch,
    setShowSocialLink,
    setSiteNotification,
    setAddChecker,
    adminRole,
    setAddWhiteLabel,
  } = useContextState();
  const { dwCount } = useGetDWCount();
  const [showClients, setShowClients] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showWhiteLabel, setShowWhiteLabel] = useState(false);
  const navigate = useNavigate();

  /* Sound notification start */
  const [depositCount, setDepositCount] = useState(null);
  const [withdrawCount, setWithdrawCount] = useState(null);
  const depositRefCount = useRef(depositCount);
  const withdrawRefCount = useRef(withdrawCount);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    if (dwCount?.depositCount >= 0 || dwCount?.withdrawCount >= 0) {
      if (
        (playSound &&
          depositCount !== null &&
          depositCount > depositRefCount.current) ||
        (playSound &&
          withdrawCount !== null &&
          withdrawCount > withdrawRefCount.current)
      ) {
        new Audio(notification).play();
      }
      depositRefCount.current = depositCount;
      withdrawRefCount.current = withdrawCount;
      setDepositCount(dwCount?.depositCount);
      setWithdrawCount(dwCount?.withdrawCount);
      setPlaySound(true);
    }
  }, [depositCount, withdrawCount, playSound, dwCount]);
  /* Sound notification end */

  const clientsRef = useRef();
  useCloseModalClickOutside(clientsRef, () => {
    setShowClients(false);
  });

  const depositRef = useRef();
  useCloseModalClickOutside(depositRef, () => {
    setShowDeposit(false);
  });
  const withdrawRef = useRef();
  useCloseModalClickOutside(withdrawRef, () => {
    setShowWithdraw(false);
  });

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

  const bonusRef = useRef();
  useCloseModalClickOutside(bonusRef, () => {
    setShowBonus(false);
  });
  const staffRef = useRef();
  useCloseModalClickOutside(staffRef, () => {
    setShowStaff(false);
  });
  const whiteLabelRef = useRef();
  useCloseModalClickOutside(whiteLabelRef, () => {
    setShowWhiteLabel(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowBranch(false);
    setShowSettings(false);
    setShowExposure(false);
    setShowReport(false);
    setShowWithdraw(false);
    setShowDeposit(false);
    setShowClients(false);
    setShowBonus(false);
    setShowStaff(false);
    setShowWhiteLabel(false);
  };
  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link to="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>

      {adminRole === "admin_master" && (
        <li
          ref={whiteLabelRef}
          className={`menu-item ${showWhiteLabel ? "open" : ""}`}
        >
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => {
              setShowWhiteLabel(true);
              setShowBranch(false);
              setShowWithdraw(false);
              setShowDeposit(false);
              setShowExposure(false);
              setShowSettings(false);
              setShowReport(false);
              setShowClients(false);
              setShowBonus(false);
              setShowStaff(false);
            }}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Branch">Whitelabel</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item ">
              <a
                onClick={() => handleNavigate("view-whitelabel")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">View Whitelabel</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => {
                  setAddWhiteLabel(true);
                  setShowBranch(false);
                }}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Branch">Add Whitelabel</div>
              </a>
            </li>
          </ul>
        </li>
      )}

      {adminRole !== "admin_master" && (
        <>
          <li
            ref={branchRef}
            className={`menu-item ${showBranch ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={() => {
                setShowBranch(true);
                setShowWithdraw(false);
                setShowDeposit(false);
                setShowExposure(false);
                setShowSettings(false);
                setShowReport(false);
                setShowClients(false);
                setShowBonus(false);
                setShowStaff(false);
                setShowWhiteLabel(false);
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
            ref={clientsRef}
            className={`menu-item ${showClients ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={() => {
                setShowClients(true);
                setShowBranch(false);
                setShowWithdraw(false);
                setShowDeposit(false);
                setShowExposure(false);
                setShowSettings(false);
                setShowReport(false);
                setShowBonus(false);
                setShowBonus(false);
                setShowStaff(false);
                setShowWhiteLabel(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Clients</div>
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
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="View Clients">View Clients</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("clients-with-balance")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Clients with balance</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("all-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">All Clients</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("active-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Active Clients</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("inactive-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Inactive Clients</div>
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
                setShowWithdraw(false);
                setShowDeposit(false);
                setShowExposure(false);
                setShowBranch(false);
                setShowReport(false);
                setShowClients(false);
                setShowBonus(false);
                setShowStaff(false);
                setShowWhiteLabel(false);
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
              <li className="menu-item">
                <a
                  onClick={() => {
                    setSiteNotification(true);
                    setShowSettings(false);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Social Links">Site Notification</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}

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
            setShowWithdraw(false);
            setShowDeposit(false);
            setShowBranch(false);
            setShowReport(false);
            setShowClients(false);
            setShowBonus(false);
            setShowStaff(false);
            setShowWhiteLabel(false);
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
      <li ref={reportRef} className={`menu-item ${showReport ? "open" : ""}`}>
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => {
            setShowReport(true);
            setShowExposure(false);
            setShowWithdraw(false);
            setShowDeposit(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowClients(false);
            setShowBonus(false);
            setShowStaff(false);
            setShowWhiteLabel(false);
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
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("transfer-statement")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Transfer Statement</div>
            </a>
          </li>
        </ul>
      </li>
      <li ref={depositRef} className={`menu-item ${showDeposit ? "open" : ""}`}>
        <a
          onMouseEnter={() => {
            setShowDeposit(true);
            setShowReport(false);
            setShowClients(false);
            setShowExposure(false);
            setShowWithdraw(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowBonus(false);
            setShowStaff(false);
            setShowWhiteLabel(false);
          }}
          className="menu-link menu-toggle"
        >
          {depositCount ? (
            <span
              style={{
                borderRadius: "5px",
                backgroundColor: "#39da8a",
                marginRight: "5px",
                padding: "0px 4px",
                color: "black",
                fontWeight: "500",
              }}
            >
              {depositCount}
            </span>
          ) : (
            <i className="menu-icon tf-icons bx bx-layout"></i>
          )}

          <div data-i18n="Deposit">Deposit</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pending-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Deposit">Pending Deposit</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("completed-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Deposit">Completed Deposit</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("rejected-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Deposit">Rejected Deposit</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("utr-search")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Deposit"> UTR Search</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        ref={withdrawRef}
        className={`menu-item ${showWithdraw ? "open" : ""}`}
      >
        <a
          onMouseEnter={() => {
            setShowWithdraw(true);
            setShowDeposit(false);
            setShowReport(false);
            setShowExposure(false);
            setShowClients(false);
            setShowSettings(false);
            setShowBranch(false);
            setShowBonus(false);
            setShowStaff(false);
            setShowWhiteLabel(false);
          }}
          className="menu-link menu-toggle"
        >
          {withdrawCount ? (
            <span
              style={{
                borderRadius: "5px",
                backgroundColor: "#39da8a",
                marginRight: "5px",
                padding: "0px 4px",
                color: "black",
                fontWeight: "500",
              }}
            >
              {withdrawCount}
            </span>
          ) : (
            <i className="menu-icon tf-icons bx bx-layout"></i>
          )}

          <div data-i18n="Withdraw">Withdraw</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pending-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Pending Withdraw</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("completed-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Completed Withdraw</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("rejected-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Withdraw">Rejected Withdraw</div>
            </a>
          </li>
        </ul>
      </li>

      {adminRole !== "admin_master" && (
        <>
          <li ref={bonusRef} className={`menu-item ${showBonus ? "open" : ""}`}>
            <a
              onMouseEnter={() => {
                setShowBonus(true);
                setShowWithdraw(false);
                setShowDeposit(false);
                setShowReport(false);
                setShowExposure(false);
                setShowClients(false);
                setShowSettings(false);
                setShowBranch(false);
                setShowStaff(false);
                setShowWhiteLabel(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>

              <div data-i18n="Withdraw">Bonus</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">View Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Add Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("pending-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Pending Bonus</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("completed-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Completed Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("rejected-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Rejected Withdraw">Rejected Bonus</div>
                </a>
              </li>
            </ul>
          </li>
          <li ref={staffRef} className={`menu-item ${showStaff ? "open" : ""}`}>
            <a
              onMouseEnter={() => {
                setShowStaff(true);
                setShowBonus(false);
                setShowWithdraw(false);
                setShowDeposit(false);
                setShowReport(false);
                setShowExposure(false);
                setShowClients(false);
                setShowSettings(false);
                setShowBranch(false);
                setShowWhiteLabel(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>

              <div data-i18n="Withdraw">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-checker")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">View Checker</div>
                </a>
              </li>
              <li className="menu-item">
                <a onClick={() => setAddChecker(true)} className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Add Checker</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}
    </ul>
  );
};

export default HyperMaster;
