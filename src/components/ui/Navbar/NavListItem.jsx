import useContextState from "../../../hooks/useContextState";
import { useEffect, useRef, useState } from "react";
import useGetDWCount from "../../../hooks/Master/useGetDWCount";
import { Link, useNavigate } from "react-router-dom";
import notification from "../../../assets/notification.wav";
import { getNavItems } from "./navConfig";
import { usePermission } from "../../../hooks/use-permission";

const NavListItem = () => {
  const [navList, setNavList] = useState(null);
  const [childTabList, setChildTabList] = useState(null);
  const { permissions } = usePermission();
  const {
    setShowSocialLink,
    adminRole,
    setShowAddStaff,

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

  // Get navigation items from config file
  const navItems = getNavItems(permissions, adminRole, {
    setShowSocialLink,
    setShowAddStaff,
    setAddWhiteLabel,
    setShowAddSuperBranch,
    setShowAddBranch,
    setShowAddBranchStaff,
    setShowDWLimit,
  });

  const handleRenderNavbar = (navItems) => {
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
            {navItem?.willSubTab && navList === navItem?.key ? (
              <div
                style={{
                  position: "absolute",
                  background: "#232c3eff",
                  zIndex: 9999,
                  minWidth: "170px",
                }}
              >
                {navItem?.children?.map((childTab, childTabIndex) => {
                  if (!childTab?.show) return;
                  return (
                    <li
                      key={childTabIndex}
                      onMouseEnter={() => setChildTabList(childTab?.key)}
                      onMouseLeave={() => setChildTabList(null)}
                      className={`menu-item ${
                        childTabList === childTab?.key ? "open" : ""
                      }`}
                    >
                      <a className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bx-layout"></i>

                        <div data-i18n={childTab?.tab}>{childTab?.tab}</div>
                      </a>
                      <ul
                        style={{ left: "170px", top: "0px" }}
                        className="menu-sub"
                      >
                        {childTab?.children?.map((child) => {
                          if (!child?.show) return;
                          if (child?.href) {
                            return (
                              <li key={child?.href} className="menu-item">
                                <a
                                  onClick={() => {
                                    navigate(child?.href);
                                    setChildTabList(null);
                                  }}
                                  className="menu-link"
                                >
                                  <i className="menu-icon tf-icons bx bxs-user"></i>
                                  <div data-i18n={child?.label}>
                                    {child?.label}
                                  </div>
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
                                  <div data-i18n="Pending Withdraw">
                                    {child?.label}
                                  </div>
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  );
                })}
              </div>
            ) : (
              <ul className="menu-sub">
                {navItem?.children?.map((child) => {
                  if (!child?.show) return;

                  if (child?.willSubTab) {
                    return (
                      <a
                        key={child?.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                        onMouseEnter={() => setChildTabList(child?.key)}
                        onMouseLeave={() => setChildTabList(null)}
                        className="menu-link menu-toggle"
                      >
                        <i className="menu-icon tf-icons bx bx-layout"></i>
                        <div data-i18n="Settings">{child?.label}</div>
                        <ul
                          style={{
                            display:
                              childTabList === child?.key ? "block" : "none",
                            right: "100%",
                            top: "0px",
                            left: "-100%",
                            zIndex: "99999",
                            background: "#273143",
                          }}
                          className="menu-sub"
                        >
                          {child?.children?.map((child) => {
                            return (
                              <li key={child?.label} className="menu-item">
                                <a
                                  onClick={() => {
                                    navigate(child?.href);
                                    setChildTabList(null);
                                  }}
                                  className="menu-link"
                                >
                                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                                  <div data-i18n="Pending Withdraw">
                                    {child?.label}
                                  </div>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </a>
                    );
                  }
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
            )}
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
            {handleRenderNavbar(navItems)}
          </ul>
        </div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default NavListItem;
