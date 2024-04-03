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
  const navigate = useNavigate();
  const { setShowSidebar } = useContextState();

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

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowClients(false);
    setShowDeposit(false);
    setShowPayments(false);
    setShowStatement(false);
    setShowWithdraw(false);
    setShowSidebar(false);
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
          <div data-i18n="Dashboards">Dashboards</div>
        </Link>
      </li>

      <li ref={clientsRef} className={`menu-item ${showClients ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowClients((prev) => !prev);
            setShowDeposit(false);
            setShowPayments(false);
            setShowStatement(false);
            setShowWithdraw(false);
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
            setShowDeposit(false);
            setShowPayments(false);
            setShowWithdraw(false);
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
            <a  className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Deposit Statement">Deposit Statement</div>
            </a>
          </li>
          <li className="menu-item">
            <a  className="menu-link">
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
            setShowDeposit(false);
            setShowStatement(false);
            setShowWithdraw(false);
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
            <a onClick={() => handleNavigate("add-QR")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add QR</div>
            </a>
          </li>
          <li className="menu-item">
            <a onClick={() => handleNavigate("add-UPI")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add UPI</div>
            </a>
          </li>
        </ul>
      </li>

      <li ref={depositRef} className={`menu-item ${showDeposit ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowDeposit((prev) => !prev);
            setShowClients(false);
            setShowPayments(false);
            setShowStatement(false);
            setShowWithdraw(false);
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
            setShowPayments(false);
            setShowStatement(false);
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
    </ul>
  );
};

export default MasterSidebar;
