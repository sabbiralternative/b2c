import { useEffect, useRef, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { AdminRole } from "../../../constant/constant";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarItem, setSidebarItem] = useState(null);
  const [permission, setPermission] = useState([]);
  const {
    setShowSidebar,
    showSidebar,
    setShowAddSuperBranch,
    token,
    setShowAddBranch,
    setShowSocialLink,
    setShowAddStaff,
    setShowAddBranchStaff,
    adminRole,
    setAddWhiteLabel,
    setShowDWLimit,
  } = useContextState();
  /* close modal click outside */
  const sidebarRef = useRef();
  useCloseModalClickOutside(sidebarRef, () => {
    setShowSidebar(false);
  });

  const handleOpenSidebarItem = (item) => {
    if (sidebarItem === item) {
      setSidebarItem(null);
    } else {
      setSidebarItem(item);
    }
  };

  useEffect(() => {
    if (adminRole) {
      const decode = jwtDecode(token);
      const permissions = decode?.permissions;
      console.log(permissions);
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
            <Link
              onClick={() => setShowSidebar(false)}
              to={navItem?.href}
              className="menu-link"
            >
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
            className={`menu-item ${
              sidebarItem === navItem?.key ? "open" : ""
            }`}
          >
            <a
              onClick={() => handleOpenSidebarItem(navItem?.key)}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
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
                          setShowSidebar(false);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-user"></i>
                        <div data-i18n="View Clients">{child?.label}</div>
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
                          setShowSidebar(false);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-user"></i>
                        <div data-i18n="View Clients">{child?.label}</div>
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
      ref={sidebarRef}
      id="layout-menu"
      className="layout-menu menu menu-vertical bg-menu-theme"
      style={{
        touchAction: "none",
        userSelect: "none",
        transform: `translate(${showSidebar ? "0" : "-100%"}, 0)`,
        transition: "0.5s",
        transitionDuration: ".3s",
      }}
    >
      <div className="container-xxl d-flex h-100 flex-column p-0">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="navbar-brand app-brand demo d-xl-flex py-0 me-4">
          <a className="app-brand-link gap-2">
            <span className="app-brand-logo demo">
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 26 26"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>icon</title>
                <defs>
                  <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="linearGradient-1"
                  >
                    <stop stopColor="#5A8DEE" offset="0%"></stop>
                    <stop stopColor="#699AF9" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                    id="linearGradient-2"
                  >
                    <stop stopColor="#FDAC41" offset="0%"></stop>
                    <stop stopColor="#E38100" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g
                  id="Pages"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Login---V2"
                    transform="translate(-667.000000, -290.000000)"
                  >
                    <g id="Login" transform="translate(519.000000, 244.000000)">
                      <g id="Logo" transform="translate(148.000000, 42.000000)">
                        <g id="icon" transform="translate(0.000000, 4.000000)">
                          <path
                            d="M13.8863636,4.72727273 C18.9447899,4.72727273 23.0454545,8.82793741 23.0454545,13.8863636 C23.0454545,18.9447899 18.9447899,23.0454545 13.8863636,23.0454545 C8.82793741,23.0454545 4.72727273,18.9447899 4.72727273,13.8863636 C4.72727273,13.5423509 4.74623858,13.2027679 4.78318172,12.8686032 L8.54810407,12.8689442 C8.48567157,13.19852 8.45300462,13.5386269 8.45300462,13.8863636 C8.45300462,16.887125 10.8856023,19.3197227 13.8863636,19.3197227 C16.887125,19.3197227 19.3197227,16.887125 19.3197227,13.8863636 C19.3197227,10.8856023 16.887125,8.45300462 13.8863636,8.45300462 C13.5386269,8.45300462 13.19852,8.48567157 12.8689442,8.54810407 L12.8686032,4.78318172 C13.2027679,4.74623858 13.5423509,4.72727273 13.8863636,4.72727273 Z"
                            id="Combined-Shape"
                            fill="#4880EA"
                          ></path>
                          <path
                            d="M13.5909091,1.77272727 C20.4442608,1.77272727 26,7.19618701 26,13.8863636 C26,20.5765403 20.4442608,26 13.5909091,26 C6.73755742,26 1.18181818,20.5765403 1.18181818,13.8863636 C1.18181818,13.540626 1.19665566,13.1982714 1.22574292,12.8598734 L6.30410592,12.859962 C6.25499466,13.1951893 6.22958398,13.5378796 6.22958398,13.8863636 C6.22958398,17.8551125 9.52536149,21.0724191 13.5909091,21.0724191 C17.6564567,21.0724191 20.9522342,17.8551125 20.9522342,13.8863636 C20.9522342,9.91761479 17.6564567,6.70030817 13.5909091,6.70030817 C13.2336969,6.70030817 12.8824272,6.72514561 12.5388136,6.77314791 L12.5392575,1.81561642 C12.8859498,1.78721495 13.2366963,1.77272727 13.5909091,1.77272727 Z"
                            id="Combined-Shape2"
                            fill="url(#linearGradient-1)"
                          ></path>
                          <rect
                            id="Rectangle"
                            fill="url(#linearGradient-2)"
                            x="0"
                            y="0"
                            width="7.68181818"
                            height="7.68181818"
                          ></rect>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span className="app-brand-text demo menu-text fw-bold">B2C</span>
          </a>

          <a
            onClick={() => setShowSidebar(false)}
            className="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
          >
            <i className="bx bx-x bx-sm align-middle"></i>
          </a>
        </div>
        {/* {adminRole === "hyper_master" ||
        adminRole === "admin_master" ||
        adminRole === AdminRole.super_master ? (
          <HyperMasterSidebar />
        ) : null}
        {adminRole === "master" ||
        adminRole === "admin_staff" ||
        adminRole === "branch_staff" ? (
          <MasterSidebar />
        ) : null} */}
        <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
          {handleRenderSidebar(navItems)}
        </ul>

        <div className="menu-horizontal-wrapper"></div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default Sidebar;
