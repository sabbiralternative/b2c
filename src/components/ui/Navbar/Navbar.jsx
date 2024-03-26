const Navbar = () => {
  return (
    <nav
      className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="container-xxl">
        <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
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

          <a className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
            <i className="bx bx-x bx-sm align-middle"></i>
          </a>
        </div>

        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-search-wrapper me-2 me-xl-0">
              <a className="nav-item nav-link search-toggler">
                <i className="bx bx-search bx-sm"></i>
              </a>
            </li>

            <li className="nav-item me-2 me-xl-0">
              <a className="nav-link style-switcher-toggle hide-arrow">
                <i className="bx bx-sm bx-sun"></i>
              </a>
            </li>
            <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <i className="bx bx-grid-alt bx-sm"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end py-0">
                <div className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                    <a
                      className="dropdown-shortcuts-add text-body"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Add shortcuts"
                    >
                      <i className="bx bx-sm bx-plus-circle"></i>
                    </a>
                  </div>
                </div>
                <div className="dropdown-shortcuts-list scrollable-container">
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-calendar fs-4"></i>
                      </span>
                      <a className="stretched-link">Calendar</a>
                      <small className="text-muted mb-0">Appointments</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-food-menu fs-4"></i>
                      </span>
                      <a className="stretched-link">Invoice App</a>
                      <small className="text-muted mb-0">Manage Accounts</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-user fs-4"></i>
                      </span>
                      <a className="stretched-link">User App</a>
                      <small className="text-muted mb-0">Manage Users</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-check-shield fs-4"></i>
                      </span>
                      <a className="stretched-link">Role Management</a>
                      <small className="text-muted mb-0">Permission</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-pie-chart-alt-2 fs-4"></i>
                      </span>
                      <a className="stretched-link">Dashboard</a>
                      <small className="text-muted mb-0">User Profile</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-cog fs-4"></i>
                      </span>
                      <a className="stretched-link">Setting</a>
                      <small className="text-muted mb-0">
                        Account Settings
                      </small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-help-circle fs-4"></i>
                      </span>
                      <a className="stretched-link">Help Center</a>
                      <small className="text-muted mb-0">FAQs & Articles</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="bx bx-window-open fs-4"></i>
                      </span>
                      <a className="stretched-link">Modals</a>
                      <small className="text-muted mb-0">Useful Popups</small>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <i className="bx bx-bell bx-sm"></i>
                <span className="badge bg-danger rounded-pill badge-notifications">
                  5
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end py-0">
                <li className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h5 className="text-body mb-0 me-auto">Notification</h5>
                    <a
                      className="dropdown-notifications-all text-body"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Mark all as read"
                    >
                      <i className="bx fs-4 bx-envelope-open"></i>
                    </a>
                  </div>
                </li>
                <li className="dropdown-notifications-list scrollable-container">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img
                              src="assets/img/avatars/1.png"
                              alt
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">Congratulation Lettie 🎉</h6>
                          <p className="mb-0">
                            Won the monthly best seller gold badge
                          </p>
                          <small className="text-muted">1h ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-danger">
                              CF
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">Charles Franklin</h6>
                          <p className="mb-0">Accepted your connection</p>
                          <small className="text-muted">12hr ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img
                              src="assets/img/avatars/2.png"
                              alt
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">New Message ✉️</h6>
                          <p className="mb-0">
                            You have new message from Natalie
                          </p>
                          <small className="text-muted">1h ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-success">
                              <i className="bx bx-cart"></i>
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">Whoo! You have new order 🛒 </h6>
                          <p className="mb-0">
                            ACME Inc. made new order $1,154
                          </p>
                          <small className="text-muted">1 day ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img
                              src="assets/img/avatars/9.png"
                              alt
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">
                            Application has been approved 🚀{" "}
                          </h6>
                          <p className="mb-0">
                            Your ABC project application has been approved.
                          </p>
                          <small className="text-muted">2 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-success">
                              <i className="bx bx-pie-chart-alt"></i>
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">Monthly report is generated</h6>
                          <p className="mb-0">
                            July monthly financial report is generated{" "}
                          </p>
                          <small className="text-muted">3 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img
                              src="assets/img/avatars/5.png"
                              alt
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">Send connection request</h6>
                          <p className="mb-0">
                            Peter sent you connection request
                          </p>
                          <small className="text-muted">4 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <img
                              src="assets/img/avatars/6.png"
                              alt
                              className="w-px-40 h-auto rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">New message from Jane</h6>
                          <p className="mb-0">
                            Your have new message from Jane
                          </p>
                          <small className="text-muted">5 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            <span className="avatar-initial rounded-circle bg-label-warning">
                              <i className="bx bx-error"></i>
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">CPU is running high</h6>
                          <p className="mb-0">
                            CPU Utilization Percent is currently at 88.63%,
                          </p>
                          <small className="text-muted">5 days ago</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                          <a className="dropdown-notifications-read">
                            <span className="badge badge-dot"></span>
                          </a>
                          <a className="dropdown-notifications-archive">
                            <span className="bx bx-x"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-menu-footer border-top">
                  <a className="dropdown-item d-flex justify-content-center p-3">
                    View all notifications
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="assets/img/avatars/1.png"
                    className="rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="assets/img/avatars/1.png"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block lh-1">
                        a23moneyadmin
                      </span>
                      <small>hyper_master</small>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">Change Password</span>
                  </a>
                </li>

                <li>
                  <a className="dropdown-item">
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="navbar-search-wrapper search-input-wrapper container-xxl d-none">
          <input
            type="text"
            className="form-control search-input border-0"
            placeholder="Search..."
            aria-label="Search..."
          />
          <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
