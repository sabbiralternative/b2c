import { Link, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../../utils/handleLogOut";

const Dropdown = ({
  showDropdown,
  adminName,
  setShowDropdown,
  adminRole,
}) => {
  const navigate = useNavigate();
  return (
    <ul
      className={`dropdown-menu dropdown-menu-end  ${
        showDropdown ? "show" : ""
      }`}
      data-bs-popper="static"
    >
      <li>
        <div className="d-flex">
          <div className="flex-shrink-0 me-3">
            <div className="avatar avatar-online">
              <img
                src="/src/assets/img/avatars/1.png"
                className="rounded-circle"
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <span className="fw-semibold d-block lh-1">{adminName}</span>
            <small>{adminRole}</small>
          </div>
        </div>
      </li>
      <li>
        <div className="dropdown-divider"></div>
      </li>
      <li>
        <Link
          to="/change-password"
          onClick={() => {
            setShowDropdown(false);
          }}
          className="dropdown-item"
        >
          <i className="bx bx-user me-2"></i>
          <span className="align-middle">Change Password</span>
        </Link>
      </li>

      <li>
        <a
          onClick={() => {
            handleLogOut();
            navigate("/login");
          }}
          className="dropdown-item"
        >
          <i className="bx bx-power-off me-2"></i>
          <span className="align-middle">Log Out</span>
        </a>
      </li>
    </ul>
  );
};

export default Dropdown;
