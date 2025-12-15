import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { jwtDecode } from "jwt-decode";
import { AdminRole } from "../../../constant/constant";

const MasterSidebar = () => {
  const [sidebarItem, setSidebarItem] = useState(null);
  const [permission, setPermission] = useState([]);

  const navigate = useNavigate();
  const {
    setShowSidebar,
    setShowSocialLink,
    adminRole,
    setShowAddStaff,
    token,
  } = useContextState();

  useEffect(() => {
    if (adminRole) {
      if (
        adminRole === AdminRole.branch_staff ||
        adminRole === AdminRole.admin_staff
      ) {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;

        setPermission(permissions);
      } else {
        setPermission([
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
      }
    }
  }, [adminRole, token]);

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
      tab: "Clients",
      key: "client",
      show:
        (adminRole === "master" ||
          adminRole === "admin_staff" ||
          adminRole === "branch_staff") &&
        permission.includes("client"),
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
      tab: "Statement",
      key: "statement",
      show: adminRole === AdminRole.master,
      children: [
        {
          label: "All Statement",
          href: "/all-statement",
          show: true,
        },
        {
          label: "Deposit Statement",
          href: "/deposit-statement",
          show: true,
        },
        {
          label: "Withdraw Statement",
          href: "/withdraw-statement",
          show: true,
        },
      ],
    },
    {
      tab: "Payments",
      key: "payment",
      show:
        (adminRole === AdminRole.master ||
          adminRole === AdminRole.admin_staff ||
          adminRole === AdminRole.branch_staff) &&
        permission.includes("payment"),
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
          show:
            adminRole !== AdminRole.master &&
            adminRole !== AdminRole.branch_staff,
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
      tab: "Bonus",
      key: "bonus",
      show:
        (adminRole === "master" || adminRole === AdminRole.branch_staff) &&
        permission.includes("bonus"),
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
      tab: "Exposure",
      key: "exposure",
      show:
        (adminRole === "master" || adminRole === AdminRole.branch_staff) &&
        permission.includes("bonus"),
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
      tab: "Staff",
      key: "staff",
      show:
        (adminRole === "master" || adminRole === AdminRole.branch_staff) &&
        permission.includes("bonus"),
      children: [
        {
          label: "View Staff",
          href: "/view-staff",
          show: true,
        },
        {
          label: "Add Staff",
          setState: setShowAddStaff,
          show: true,
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
          show: adminRole === AdminRole.admin_staff,
        },
        {
          label: "Withdraw Report",
          href: "/withdraw-report",
          show: true,
        },
        {
          label: "Direct Deposit Report",
          href: "/direct-deposit-report",
          show: adminRole === AdminRole.admin_staff,
        },
        {
          label: "Direct Withdraw Report",
          href: "/direct-withdraw-report",
          show: adminRole === AdminRole.admin_staff,
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
          label: "Social Links",
          setState: setShowSocialLink,
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
            adminRole === AdminRole.admin_staff && permission.includes("bonus"),
        },
        {
          label: "Add Bonus",
          href: "/add-bonus",
          show:
            adminRole === AdminRole.admin_staff && permission.includes("bonus"),
        },
        {
          label: "Pending Bonus",
          href: "/pending-bonus",
          show:
            adminRole === AdminRole.admin_staff && permission.includes("bonus"),
        },

        {
          label: "Completed Bonus",
          href: "/completed-bonus",
          show:
            adminRole === AdminRole.admin_staff && permission.includes("bonus"),
        },
        {
          label: "Rejected Bonus",
          href: "/rejected-bonus",
          show:
            adminRole === AdminRole.admin_staff && permission.includes("bonus"),
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

export default MasterSidebar;
