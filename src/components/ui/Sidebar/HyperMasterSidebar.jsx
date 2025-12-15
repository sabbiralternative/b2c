import { Link, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useState } from "react";
import { AdminRole } from "../../../constant/constant";

const HyperMasterSidebar = () => {
  const navigate = useNavigate();
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
    "whitelabel",
    "branch",
    "complaint",
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
      show: adminRole !== AdminRole.branch_staff,
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
      show: adminRole !== "admin_master" && permission.includes("branch"),
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
        adminRole !== AdminRole.super_master && permission.includes("setting"),
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
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      {handleRenderSidebar(navItems)}
    </ul>
  );
};

export default HyperMasterSidebar;
