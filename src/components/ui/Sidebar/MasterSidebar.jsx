import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import useContextState from "../../../hooks/useContextState";

const MasterSidebar = () => {
  const [showClients, setShowClients] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { setShowSidebar, setShowSocialLink, adminRole, setAddChecker } =
    useContextState();

  const settingsRef = useRef();
  useCloseModalClickOutside(settingsRef, () => {
    setShowSettings(false);
  });

  const clientsRef = useRef();
  useCloseModalClickOutside(clientsRef, () => {
    setShowClients(false);
  });

  const statementRef = useRef();
  useCloseModalClickOutside(statementRef, () => {
    setShowStatement(false);
  });
  const paymentsRef = useRef();
  useCloseModalClickOutside(paymentsRef, () => {
    setShowPayments(false);
  });
  const depositRef = useRef();
  useCloseModalClickOutside(depositRef, () => {
    setShowDeposit(false);
  });
  const withdrawRef = useRef();
  useCloseModalClickOutside(withdrawRef, () => {
    setShowWithdraw(false);
  });
  const exposureRef = useRef();
  useCloseModalClickOutside(exposureRef, () => {
    setShowExposure(false);
  });
  const staffRef = useRef();
  useCloseModalClickOutside(staffRef, () => {
    setShowStaff(false);
  });

  const reportRef = useRef();
  useCloseModalClickOutside(reportRef, () => {
    setShowReport(false);
  });
  const bonusRef = useRef();
  useCloseModalClickOutside(bonusRef, () => {
    setShowBonus(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowClients(false);
    setShowDeposit(false);
    setShowPayments(false);
    setShowStatement(false);
    setShowWithdraw(false);
    setShowSidebar(false);
    setShowExposure(false);
    setShowReport(false);
    setShowBonus(false);
    setShowSettings(false);
    setShowStaff(false);
  };
  return (
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link
          onClick={() => setShowSidebar(false)}
          to="/"
          className="menu-link"
        >
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>
      {adminRole === "master" && (
        <>
          <li
            ref={clientsRef}
            className={`menu-item ${showClients ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowClients((prev) => !prev);
                setShowDeposit(false);
                setShowSettings(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowExposure(false);
                setShowReport(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Clients">Clients</div>
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
                  onClick={() => handleNavigate("add-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Add Client</div>
                </a>
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
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/all-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">All Client</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/active-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Active Client</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/inactive-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Inactive Client</div>
                </Link>
              </li>
            </ul>
          </li>

          <li
            ref={statementRef}
            className={`menu-item ${showStatement ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowStatement((prev) => !prev);
                setShowClients(false);
                setShowSettings(false);
                setShowDeposit(false);
                setShowPayments(false);
                setShowWithdraw(false);
                setShowExposure(false);
                setShowReport(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Statement">Statement</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="All Statement">All Statement</div>
                </a>
              </li>

              <li className="menu-item">
                <a className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Deposit Statement">Deposit Statement</div>
                </a>
              </li>
              <li className="menu-item">
                <a className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Withdraw Statement">Withdraw Statement</div>
                </a>
              </li>
            </ul>
          </li>

          <li
            ref={paymentsRef}
            className={`menu-item ${showPayments ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowPayments((prev) => !prev);
                setShowClients(false);
                setShowSettings(false);
                setShowDeposit(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowExposure(false);
                setShowReport(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Payments">Payments</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-payment-method")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Payment Method">View Payment Method</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-bank-account")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Payment Method">Add Bank Account</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-QR")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Payment Method">Add QR</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-UPI")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Payment Method">Add UPI</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-USDT")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Payment Method">Add USDT</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}

      <li ref={depositRef} className={`menu-item ${showDeposit ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowDeposit((prev) => !prev);
            setShowClients(false);
            setShowSettings(false);
            setShowPayments(false);
            setShowStatement(false);
            setShowWithdraw(false);
            setShowExposure(false);
            setShowReport(false);
            setShowBonus(false);
            setShowStaff(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
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
              <div data-i18n="Rejected Deposit">UTR Search</div>
            </a>
          </li>
        </ul>
      </li>

      <li
        ref={withdrawRef}
        className={`menu-item ${showWithdraw ? "open" : ""}`}
      >
        <a
          onClick={() => {
            setShowWithdraw((prev) => !prev);
            setShowClients(false);
            setShowDeposit(false);
            setShowSettings(false);
            setShowPayments(false);
            setShowStatement(false);
            setShowExposure(false);
            setShowReport(false);
            setShowBonus(false);
            setShowStaff(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
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

      {adminRole === "master" && (
        <>
          <li ref={bonusRef} className={`menu-item ${showBonus ? "open" : ""}`}>
            <a
              onClick={() => {
                setShowBonus((prev) => !prev);
                setShowWithdraw(false);
                setShowSettings(false);
                setShowClients(false);
                setShowDeposit(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowExposure(false);
                setShowReport(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Bonus</div>
            </a>

            <ul className="menu-sub">
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
                  <div data-i18n="Pending Withdraw">Completed Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("rejected-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Rejected Bonus</div>
                </a>
              </li>
            </ul>
          </li>

          <li
            ref={exposureRef}
            className={`menu-item ${showExposure ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowExposure((prev) => !prev);
                setShowClients(false);
                setShowDeposit(false);
                setShowSettings(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowReport(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Exposure</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("market-analysis")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Market Analysis</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("current-bets")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Current Bets</div>
                </a>
              </li>
            </ul>
          </li>
          <li ref={staffRef} className={`menu-item ${showStaff ? "open" : ""}`}>
            <a
              style={{}}
              onClick={() => {
                setShowStaff((prev) => !prev);
                setShowExposure(false);
                setShowClients(false);
                setShowDeposit(false);
                setShowSettings(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowReport(false);
                setShowBonus(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Settings">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  to="/view-checker"
                  onClick={() => setShowSidebar(false)}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">View Checker</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setAddChecker(true);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Banner">Add Checker</div>
                </Link>
              </li>
            </ul>
          </li>
          <li
            ref={reportRef}
            className={`menu-item ${showReport ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowReport((prev) => !prev);
                setShowExposure(false);
                setShowClients(false);
                setShowSettings(false);
                setShowDeposit(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Report</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("client-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Client Report</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("deposit-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Deposit Report</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("first-deposit-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">First Deposit Report</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("no-deposit-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">No Deposit Report</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("withdraw-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Withdraw Report</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("transfer-statement")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Transfer Statement</div>
                </a>
              </li>
            </ul>
          </li>
          <li
            ref={settingsRef}
            className={`menu-item ${showSettings ? "open" : ""}`}
          >
            <a
              onClick={() => {
                setShowSettings((prev) => !prev);
                setShowReport(false);
                setShowExposure(false);
                setShowClients(false);
                setShowDeposit(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowBonus(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Settings</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => {
                    setShowSocialLink(true);
                    setShowSettings(false);
                    setShowSidebar(false);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Social Links</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}
    </ul>
  );
};

export default MasterSidebar;
