import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import useGetDWCount from "../../../hooks/Master/useGetDWCount";
import { Link, useNavigate } from "react-router-dom";
import notification from "../../../assets/notification.wav";

const NavListItem = () => {
  const [navList, setNavList] = useState(null);
  const [permission, setPermission] = useState([]);
  const {
    setShowSocialLink,
    adminRole,
    setShowAddStaff,
    token,
    setAddWhiteLabel,
    setShowAddSuperBranch,
    setShowAddBranch,
    setShowAddBranchStaff,
    setShowDWLimit,
  } = useContextState();
  const { dwCount } = useGetDWCount();
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

  useEffect(() => {
    if (adminRole) {
      const decode = jwtDecode(token);
      const permissions = decode?.permissions;

      setPermission(permissions?.length > 0 ? permissions : []);
    } else {
      setPermission([
        "deposit",
        "withdraw",
        "client",
        "report",
        "payment",
        "bonus",
        "exposure",
        "settings",
        "staff",
      ]);
    }
  }, [adminRole, token]);

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      show: permission.includes("dashboard"),
    },
    {
      tab: "Clients",
      key: "client",
      show: permission.includes("client"),
      children: [
        {
          label: "View Clients",
          href: "/view-client",
          show: true,
        },
        {
          label: "Add Client",
          href: "/add-client",
          show: true,
        },
        {
          label: "Clients With Balance",
          href: "/clients-with-balance",
          show: true,
        },
        {
          label: "All Client",
          href: "/all-client",
          show: true,
        },
        {
          label: "Active Client",
          href: "/active-client",
          show: true,
        },
        {
          label: "Inactive Client",
          href: "/inactive-client",
          show: true,
        },
        {
          label: "Suspended Client",
          href: "/suspended-client",
          show: true,
        },
      ],
    },
    {
      tab: "Payments",
      key: "payment",
      show: permission.includes("payment"),
      children: [
        {
          label: "View Payment Method",
          href: "/view-payment-method",
          show: true,
        },
        {
          label: "Add Bank Account",
          href: "/add-bank-account",
          show: true,
        },
        {
          label: "Add QR",
          href: "/add-QR",
          show: true,
        },
        {
          label: "Add UPI",
          href: "/add-UPI",
          show: true,
        },
        {
          label: "Add Whatsapp Deposit",
          href: "/add-whatsapp-deposit",
          show: true,
        },
        {
          label: "Add USDT (TRC20)",
          href: "/add-USDT-TRC20",
          show: true,
        },
        {
          label: "Add USDT (BEP20)",
          href: "/add-USDT-BEP20",
          show: true,
        },
        {
          label: "Add UPI Payment Gateway",
          href: "/add-payment-gateway",
          show: true,
        },
        {
          label: "Add TOIT Payment Gateway",
          href: "/add-toit-payment-gateway",
          show: true,
        },
        {
          label: "Add i100 Payment Gateway",
          href: "/add-i100-payment-gateway",
          show: true,
        },
      ],
    },
    {
      tab: "Deposit",
      key: "deposit",
      show: permission.includes("deposit"),
      children: [
        {
          label: "Pending Deposit",
          href: "/pending-deposit",
          show: true,
        },
        {
          label: "Completed Deposit",
          href: "/completed-deposit",
          show: true,
        },
        {
          label: "Rejected Deposit",
          href: "/rejected-deposit",
          show: true,
        },
        {
          label: "UTR Search",
          href: "/utr-search",
          show: true,
        },
      ],
    },
    {
      tab: "Withdraw",
      key: "withdraw",
      show: permission.includes("withdraw"),
      children: [
        {
          label: "Pending Withdraw",
          href: "/pending-withdraw",
          show: true,
        },
        {
          label: "Completed Withdraw",
          href: "/completed-withdraw",
          show: true,
        },
        {
          label: "Rejected Withdraw",
          href: "/rejected-withdraw",
          show: true,
        },
      ],
    },
    {
      tab: "Exposure",
      key: "exposure",
      show: permission.includes("exposure"),
      children: [
        {
          label: "Market Analysis",
          href: "/market-analysis",
          show: true,
        },
        {
          label: "Current Bets",
          href: "/current-bets",
          show: true,
        },
      ],
    },
    {
      tab: "Bonus",
      key: "bonus",
      show: permission.includes("bonus"),
      children: [
        {
          label: "Pending Bonus",
          href: "/pending-bonus",
          show: true,
        },
        {
          label: "Completed Bonus",
          href: "/completed-bonus",
          show: true,
        },
        {
          label: "Rejected Bonus",
          href: "/rejected-bonus",
          show: true,
        },
      ],
    },
    {
      tab: "Report",
      key: "report",
      show: permission.includes("report"),
      children: [
        {
          label: "Client Report",
          href: "/client-report",
          show: true,
        },
        {
          label: "Deposit Report",
          href: "/deposit-report",
          show: true,
        },
        {
          label: "1st Deposit Report",
          href: "/1st-deposit-report",
          show: true,
        },
        {
          label: "Last Deposit Report",
          href: "/last-deposit-report",
          show: true,
        },
        {
          label: "No Deposit Report",
          href: "/no-deposit-report",
          show: true,
        },
        {
          label: "No deposit last 15 days",
          href: "/no-deposit-report-last-15-days",
          show: true,
        },
        {
          label: "Withdraw Report",
          href: "/withdraw-report",
          show: true,
        },
        {
          label: "Transfer Statement",
          href: "/transfer-statement",
          show: true,
        },
        {
          label: "Client Branch Change Report",
          href: "/client-branch-change-report",
          show: true,
        },
      ],
    },
    {
      tab: "Settings",
      key: "setting",
      show: permission.includes("setting"),
      children: [
        {
          label: "View Banners",
          href: "/view-banner",
          show: true,
        },
        {
          label: "Add Banner",
          href: "/add-banner",
          show: true,
        },
        {
          label: "Add Login Banner",
          href: "/add-login-banner",
          show: true,
        },
        {
          label: "Social Links",
          setState: setShowSocialLink,
          show: true,
        },
        {
          label: "Update D/W Limit",
          setState: setShowDWLimit,
          show: true,
        },

        {
          label: "View Notifications",
          href: "/view-notification",
          show: true,
        },
        {
          label: "Add Notifications",
          href: "/add-notification",
          show: true,
        },
        {
          label: "View Bonus",
          href: "/view-bonus",
          show: permission.includes("bonus"),
        },
        {
          label: "Add Bonus",
          href: "/add-bonus",
          show: permission.includes("bonus"),
        },
        {
          label: "Pending Bonus",
          href: "/pending-bonus",
          show: permission.includes("bonus"),
        },

        {
          label: "Completed Bonus",
          href: "/completed-bonus",
          show: permission.includes("bonus"),
        },
        {
          label: "Rejected Bonus",
          href: "/rejected-bonus",
          show: permission.includes("bonus"),
        },
      ],
    },
    {
      tab: "Complaints",
      key: "complaint",
      show: permission?.includes("complaint"),
      children: [
        {
          label: "Pending Complaints",
          href: "/pending-complaints",
          show: true,
        },
        {
          label: "Resolved Complaints",
          href: "/resolved-complaints",
          show: true,
        },
      ],
    },
    {
      tab: "Staff",
      key: "staff",
      show: permission.includes("bonus"),
      children: [
        {
          label: "View Staff",
          href: "/view-staff",
          show: true,
        },
        {
          label:
            adminRole === AdminRole.hyper_master
              ? "Add Admin Staff"
              : "Add Staff",
          setState: setShowAddStaff,
          show: true,
        },
        {
          label: "Add Branch Staff",
          setState: setShowAddBranchStaff,
          show: adminRole === AdminRole.hyper_master,
        },
      ],
    },
    {
      tab: "Whitelabel",
      key: "whitelabel",
      show: permission.includes("whitelabel"),
      children: [
        {
          label: "View Whitelabel",
          href: "/view-whitelabel",
          show: true,
        },
        {
          label: "Add Whitelabel",
          setState: setAddWhiteLabel,
          show: true,
        },
      ],
    },
    {
      tab: "Branch",
      key: "branch",
      show: permission.includes("branch"),
      children: [
        {
          label: "View Branch",
          href: "/view-branch",
          show: true,
        },
        {
          label: "Add Branch",
          setState: setShowAddBranch,
          show: true,
        },

        {
          label: "View Super Branch",
          href: "/view-super-branch",
          show: true,
        },
        {
          label: "Add Super Branch",
          setState: setShowAddSuperBranch,
          show: true,
        },
      ],
    },
  ];

  const handleRenderSidebar = (navItems) => {
    return navItems?.map((navItem, navIndex) => {
      if (navItem?.label) {
        if (!navItem?.show) return;
        return (
          <li key={navIndex} className="menu-item">
            <Link to={navItem?.href} className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Dashboards">{navItem?.label}</div>
            </Link>
          </li>
        );
      }

      if (navItem?.tab) {
        if (!navItem?.show) return;
        return (
          <li
            key={navIndex}
            onMouseEnter={() => setNavList(navItem?.key)}
            onMouseLeave={() => setNavList(null)}
            className={`menu-item ${navList === navItem?.key ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              {navItem?.key === "deposit" && depositCount > 0 && (
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
              )}
              {navItem?.key === "withdraw" && withdrawCount > 0 && (
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
              )}
              {navItem?.key === "bonus" && dwCount > 0 && (
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
              )}
              {navItem?.key !== "deposit" &&
                navItem?.key !== "withdraw" &&
                navItem?.key !== "bonus" && (
                  <i className="menu-icon tf-icons bx bx-layout"></i>
                )}

              <div data-i18n={navItem?.tab}>{navItem?.tab}</div>
            </a>

            <ul className="menu-sub">
              {navItem?.children?.map((child) => {
                if (!child?.show) return;
                if (child?.href) {
                  return (
                    <li key={child?.href} className="menu-item">
                      <a
                        onClick={() => {
                          navigate(child?.href);
                          setNavList(null);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-user"></i>
                        <div data-i18n={child?.label}>{child?.label}</div>
                      </a>
                    </li>
                  );
                }
                if (child?.setState) {
                  return (
                    <li key={child?.label} className="menu-item">
                      <a
                        onClick={() => {
                          child?.setState(true);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="Pending Withdraw">{child?.label}</div>
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        );
      }
    });
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0 "
      style={{ touchAction: "none", userSelect: "none" }}
    >
      <div className="container-xxl d-flex h-100">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="menu-horizontal-wrapper">
          {/* {adminRole === "hyper_master" ||
          adminRole === "admin_master" ||
          adminRole === AdminRole.super_master ? (
            <HyperMaster />
          ) : null}
          {adminRole === "master" ||
          adminRole === "admin_staff" ||
          adminRole === "branch_staff" ? (
            <Master />
          ) : null} */}

          <ul className="menu-inner" style={{ marginLeft: "0px" }}>
            {handleRenderSidebar(navItems)}
          </ul>
        </div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default NavListItem;
