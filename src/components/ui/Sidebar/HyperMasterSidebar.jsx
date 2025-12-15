import { Link } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useState } from "react";
import { AdminRole } from "../../../constant/constant";

const HyperMasterSidebar = () => {
  const [sidebarItem, setSidebarItem] = useState(null);
  const [permission, setPermission] = useState([
    "dashboard",
    "deposit",
    "withdraw",
    "client",
    "report",
    "payment",
    "bonus",
    "exposure",
    "setting",
    "staff",
  ]);

  const {
    setShowAddSuperBranch,
    setShowSidebar,
    setShowAddBranch,
    setShowSocialLink,
    setShowAddStaff,

    setShowAddBranchStaff,
    adminRole,
    setAddWhiteLabel,
    setShowDWLimit,
  } = useContextState();

  const handleOpenSidebarItem = (item) => {
    if (sidebarItem === item) {
      setSidebarItem(null);
    } else {
      setSidebarItem(item);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      tab: "Whitelabel",
      key: "whitelabel",
      show: adminRole === "admin_master" && permission.includes("whitelabel"),
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
      show:
        adminRole === AdminRole.hyper_master &&
        adminRole !== AdminRole.super_master &&
        permission.includes("branch"),
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
          show:
            adminRole === AdminRole.hyper_master &&
            adminRole !== AdminRole.super_master,
        },
        {
          label: "Add Super Branch",
          setState: setShowAddSuperBranch,
          show:
            adminRole === AdminRole.hyper_master &&
            adminRole !== AdminRole.super_master,
        },
      ],
    },
    {
      tab: "Clients",
      key: "client",
      show: adminRole !== "admin_master" && permission.includes("client"),
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
      tab: "Settings",
      key: "setting",
      show:
        adminRole !== AdminRole.master &&
        adminRole !== AdminRole.branch_staff &&
        adminRole === AdminRole.admin_staff &&
        permission.includes("setting"),
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
          show: adminRole === AdminRole.hyper_master,
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
          show:
            adminRole !== "admin_master" &&
            adminRole !== AdminRole.super_master &&
            permission.includes("bonus"),
        },
        {
          label: "Add Bonus",
          href: "/add-bonus",
          show:
            adminRole !== "admin_master" &&
            adminRole !== AdminRole.super_master &&
            permission.includes("bonus"),
        },
        {
          label: "Pending Bonus",
          href: "/pending-bonus",
          show:
            adminRole !== "admin_master" &&
            adminRole !== AdminRole.super_master &&
            permission.includes("bonus"),
        },

        {
          label: "Completed Bonus",
          href: "/completed-bonus",
          show:
            adminRole !== "admin_master" &&
            adminRole !== AdminRole.super_master &&
            permission.includes("bonus"),
        },
        {
          label: "Rejected Bonus",
          href: "/rejected-bonus",
          show:
            adminRole !== "admin_master" &&
            adminRole !== AdminRole.super_master &&
            permission.includes("bonus"),
        },
      ],
    },
    {
      tab: "Exposure",
      key: "exposure",
      show:
        adminRole === AdminRole.admin_staff && permission.includes("exposure"),
      children: [
        {
          label: "Market Analysis",
          href: "/market-analysis",
        },
        {
          label: "Current Bets",
          href: "/current-bets",
        },
      ],
    },
    {
      tab: "Report",
      key: "report",
      show:
        adminRole === "master" ||
        (adminRole === "branch_staff" && permission.includes("report")) ||
        (adminRole === AdminRole.admin_staff && permission.includes("report")),
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
          show: adminRole === AdminRole.hyper_master,
        },
        {
          label: "Last Deposit Report",
          href: "/last-deposit-report",
          show: adminRole === AdminRole.hyper_master,
        },
        {
          label: "No Deposit Report",
          href: "/no-deposit-report",
          show: adminRole === AdminRole.hyper_master,
        },
        {
          label: "Withdraw Report",
          href: "/withdraw-report",
          show: adminRole === AdminRole.hyper_master,
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
      tab: "Complaints",
      key: "complaint",
      show: true,
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
      show:
        adminRole !== "admin_master" &&
        adminRole !== AdminRole.super_master &&
        permission.includes("bonus"),
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
  ];
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
      {adminRole === "admin_master" && (
        <li
          className={`menu-item ${sidebarItem === "whiteLabel" ? "open" : ""}`}
        >
          <a
            onClick={() => handleOpenSidebarItem("whiteLabel")}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Branch">Whitelabel</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <Link
                onClick={() => setShowSidebar(false)}
                to="/view-whitelabel"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">View Whitelabel</div>
              </Link>
            </li>

            <li className="menu-item">
              <a
                onClick={() => {
                  setAddWhiteLabel(true);
                  setShowSidebar(false);
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
          {" "}
          <li className={`menu-item ${sidebarItem === "branch" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("branch")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Branch</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/view-branch"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">View Branch</div>
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
              {adminRole === AdminRole.hyper_master &&
                adminRole !== AdminRole.super_master && (
                  <>
                    <li className="menu-item">
                      <Link
                        onClick={() => setShowSidebar(false)}
                        to="/view-super-branch"
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="View Branches">View Super Branch</div>
                      </Link>
                    </li>

                    <li className="menu-item">
                      <a
                        onClick={() => {
                          setShowAddSuperBranch(true);
                          setShowSidebar(false);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="Add Branch">Add Super Branch</div>
                      </a>
                    </li>
                  </>
                )}
            </ul>
          </li>
          <li className={`menu-item ${sidebarItem === "client" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("client")}
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
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/suspended-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Suspended Client</div>
                </Link>
              </li>
            </ul>
          </li>
          {adminRole !== AdminRole.super_master && (
            <li
              className={`menu-item ${sidebarItem === "setting" ? "open" : ""}`}
            >
              <a
                onClick={() => handleOpenSidebarItem("setting")}
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
                {adminRole === AdminRole.hyper_master && (
                  <li className="menu-item">
                    <Link
                      onClick={() => setShowSidebar(false)}
                      to="/add-login-banner"
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="Add Banner">Add Login Banner</div>
                    </Link>
                  </li>
                )}

                <li className="menu-item">
                  <Link
                    onClick={() => {
                      setShowSocialLink(true);
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Social Links</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link
                    onClick={() => {
                      setShowDWLimit(true);
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Update D/W Limit</div>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link
                    to="/view-notification"
                    onClick={() => {
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">View Notifications</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link
                    to="/add-notification"
                    onClick={() => {
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Add Notifications</div>
                  </Link>
                </li>
                {adminRole !== "admin_master" &&
                  adminRole !== AdminRole.super_master && (
                    <>
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
                          <div data-i18n="Pending Withdraw">
                            Completed Bonus
                          </div>
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
                    </>
                  )}

                {/* <li className="menu-item">
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
                </li> */}
              </ul>
            </li>
          )}
        </>
      )}

      <li className={`menu-item ${sidebarItem === "exposure" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("exposure")}
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
      <li className={`menu-item ${sidebarItem === "report" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("report")}
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

          {/* <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/deposit-report"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Deposit Report</div>
            </Link>
          </li> */}

          <li className="menu-item">
            <Link to="/deposit-report" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Deposit Report</div>
            </Link>
          </li>
          {adminRole === AdminRole.hyper_master && (
            <>
              <li className="menu-item">
                <Link to="/1st-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">1st Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/last-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Last Deposit Report</div>
                </Link>
              </li>
              {/* <li className="menu-item">
                <Link to="/2nd-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">2nd Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/3rd-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">3rd Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/4th-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">4th Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/5th-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">5th Deposit Report</div>
                </Link>
              </li> */}
            </>
          )}

          <li className="menu-item">
            <Link to="/no-deposit-report" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">No Deposit Report</div>
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
      <li className={`menu-item ${sidebarItem === "deposit" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("deposit")}
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
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/utr-search"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">UTR Search</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${sidebarItem === "withdraw" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("withdraw")}
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
      <li className={`menu-item ${sidebarItem === "complaints" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("complaints")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Complaints</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-complaints"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Complaints</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/resolved-complaints"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Resolved Complaints</div>
            </Link>
          </li>
        </ul>
      </li>
      {adminRole !== "admin_master" && adminRole !== AdminRole.super_master && (
        <>
          <li className={`menu-item ${sidebarItem === "staff" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("staff")}
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
                    setShowAddStaff(true);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Banner">
                    {" "}
                    {adminRole === AdminRole.hyper_master
                      ? "Add Admin Staff"
                      : "Add Staff"}
                  </div>
                </Link>
              </li>
              {adminRole === AdminRole.hyper_master && (
                <li className="menu-item">
                  <Link
                    onClick={() => {
                      setShowSidebar(false);
                      setShowAddBranchStaff(true);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Banner">Add Branch Staff</div>
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </>
      )}
    </ul>
  );
};

export default HyperMasterSidebar;
