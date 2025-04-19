import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetDWCount from "../../../../hooks/Master/useGetDWCount";
import notification from "../../../../assets/notification.wav";
import useContextState from "../../../../hooks/useContextState";
import { jwtDecode } from "jwt-decode";

const Master = () => {
  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const [clientPermission, setClientPermission] = useState(false);
  const [reportPermission, setReportPermission] = useState(false);
  const [paymentPermission, setPaymentPermission] = useState(false);
  const { readOnly, setShowSocialLink, adminRole, setAddChecker, token } =
    useContextState();
  const { dwCount } = useGetDWCount();
  const [showClients, setShowClients] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showStaff, setShowStaff] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
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

  /* close modal click outside */

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

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowClients(false);
    setShowDeposit(false);
    setShowPayments(false);
    setShowStatement(false);
    setShowWithdraw(false);
    setShowExposure(false);
    setShowReport(false);
    setShowSettings(false);
    setShowBonus(false);
    setShowStaff(false);
  };

  useEffect(() => {
    if (adminRole) {
      if (adminRole === "branch_staff") {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;

        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        const clientPermission = permissions?.includes("client") ?? false;
        const reportPermission = permissions?.includes("report") ?? false;
        const paymentPermission = permissions?.includes("payment") ?? false;
        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
        setClientPermission(clientPermission);
        setReportPermission(reportPermission);
        setPaymentPermission(paymentPermission);
      } else {
        setDepositPermission(true);
        setWithdrawPermission(true);
        setClientPermission(true);
        setReportPermission(true);
        setPaymentPermission(true);
      }
    }
  }, [adminRole, token]);

  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      {adminRole !== "branch_staff" && (
        <li className="menu-item">
          <Link tp="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Dashboards">Dashboard</div>
          </Link>
        </li>
      )}

      {adminRole === "master" ||
      adminRole === "admin_staff" ||
      (adminRole === "branch_staff" && clientPermission) ? (
        <li
          ref={clientsRef}
          className={`menu-item ${showClients ? "open" : ""}`}
        >
          <a
            onMouseEnter={() => {
              setShowClients(true);
              setShowSettings(false);
              setShowDeposit(false);
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
            {!readOnly && adminRole !== "admin_staff" && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Add Client</div>
                </a>
              </li>
            )}

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
      ) : null}

      {/* <li
        ref={statementRef}
        className={`menu-item ${showStatement ? "open" : ""}`}
      >
        <a
          onMouseEnter={() => {
            setShowStatement(true);
            setShowClients(false);
            setShowDeposit(false);
            setShowPayments(false);
            setShowWithdraw(false);
            setShowExposure(false);
            setShowReport(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Statement">Statement</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("deposit-statement")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Deposit Statement">Deposit Statement</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("withdraw-statement")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Withdraw Statement">Withdraw Statement</div>
            </a>
          </li>
        </ul>
      </li> */}
      {adminRole === "master" ||
      (adminRole === "branch_staff" && paymentPermission) ? (
        <li
          ref={paymentsRef}
          className={`menu-item ${showPayments ? "open" : ""}`}
        >
          <a
            onMouseEnter={() => {
              setShowPayments(true);
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

            {!readOnly && (
              <>
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
                    onClick={() => handleNavigate("add-whatsapp-deposit")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">
                      Add Whatsapp Deposit
                    </div>
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
              </>
            )}
          </ul>
        </li>
      ) : null}
      {depositPermission && (
        <li
          ref={depositRef}
          className={`menu-item ${showDeposit ? "open" : ""}`}
        >
          <a
            onMouseEnter={() => {
              setShowDeposit(true);
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
      )}
      {withdrawPermission && (
        <li
          ref={withdrawRef}
          className={`menu-item ${showWithdraw ? "open" : ""}`}
        >
          <a
            onMouseEnter={() => {
              setShowWithdraw(true);
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
      )}

      {adminRole === "master" && (
        <>
          <li ref={bonusRef} className={`menu-item ${showBonus ? "open" : ""}`}>
            <a
              onMouseEnter={() => {
                setShowBonus(true);
                setShowWithdraw(false);
                setShowClients(false);
                setShowDeposit(false);
                setShowSettings(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowExposure(false);
                setShowReport(false);
                setShowStaff(false);
              }}
              className="menu-link menu-toggle"
            >
              {dwCount?.claimCount !== 0 ? (
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
                  {dwCount?.claimCount}
                </span>
              ) : (
                <i className="menu-icon tf-icons bx bx-layout"></i>
              )}

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
                setShowClients(false);
                setShowSettings(false);
                setShowDeposit(false);
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
          <li ref={staffRef} className={`menu-item ${showStaff ? "open" : ""}`}>
            <a
              onMouseEnter={() => {
                setShowStaff(true);
                setShowExposure(false);
                setShowClients(false);
                setShowSettings(false);
                setShowDeposit(false);
                setShowPayments(false);
                setShowStatement(false);
                setShowWithdraw(false);
                setShowReport(false);
                setShowBonus(false);
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>

              <div data-i18n="Withdraw">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-staff")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">View Staff</div>
                </a>
              </li>
              <li className="menu-item">
                <a onClick={() => setAddChecker(true)} className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Add Staff</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}
      {adminRole === "master" ||
      adminRole === "admin_staff" ||
      (adminRole === "branch_staff" && reportPermission) ? (
        <li ref={reportRef} className={`menu-item ${showReport ? "open" : ""}`}>
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => {
              setShowReport(true);
              setShowWithdraw(false);
              setShowExposure(false);
              setShowClients(false);
              setShowDeposit(false);
              setShowPayments(false);
              setShowStatement(false);
              setShowBonus(false);
              setShowStaff(false);
            }}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Settings">Report</div>
          </a>

          <ul className="menu-sub">
            {clientPermission && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("client-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Client Report</div>
                </a>
              </li>
            )}

            {depositPermission && (
              <>
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
                    onClick={() => handleNavigate("first-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">First Deposit Report</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("no-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">No Deposit Report</div>
                  </a>
                </li>
              </>
            )}
            {withdrawPermission && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("withdraw-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Withdraw Report</div>
                </a>
              </li>
            )}

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
      ) : null}

      {adminRole === "master" && (
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
              setShowReport(false);
              setShowWithdraw(false);
              setShowExposure(false);
              setShowClients(false);
              setShowDeposit(false);
              setShowPayments(false);
              setShowStatement(false);
              setShowBonus(false);
              setShowStaff(false);
            }}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Settings">Settings</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => {
                  setShowSocialLink(true);
                  setShowSettings(false);
                }}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Banners">Social Links</div>
              </a>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Master;
