import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../ui/Navbar/Navbar";
import { handleLogOut } from "../../utils/handleLogOut";
import { Settings } from "../../api";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import disableDevtool from "disable-devtool";
import Sidebar from "../ui/Sidebar/Sidebar";
import NavListItem from "../ui/Navbar/NavListItem";
import Footer from "../ui/Footer/Footer";
import AddBranch from "../modal/HyperMaster/Branch/AddBranch";
import SocialLink from "../modal/HyperMaster/Settings/SocialLink";
import Deposit from "../modal/HyperMaster/Branch/Deposit";
import Withdraw from "../modal/HyperMaster/Branch/Withdraw";
import ClientDeposit from "../modal/Master/Client/Deposit";
import ChangeStatus from "../modal/ChangeStatus";
import ChangePassword from "../modal/ChangePassword";
import EditPendingDeposit from "../modal/Master/Deposit/EditPendingDeposit";
import EditPendingWithdraw from "../modal/Master/Withdraw/EditPendingWithdraw";
import EditPayment from "../modal/Master/Payment/EditPayment";
import CreditReference from "../modal/CreditReference";

const MainLayout = () => {
  const {
    tokenLoading,
    showSidebar,
    showAddBranch,
    setShowAddBranch,
    showSocialLink,
    setShowSocialLink,
    showChangePassword,
    setShowChangePassword,
    setShowDeposit,
    showDeposit,
    setShowWithdraw,
    showWithdraw,
    setShowChangeStatus,
    showChangeStatus,
    downLineId,
    clientDeposit,
    setClientDeposit,
    editPendingDeposit,
    setEditPendingDeposit,
    editPendingWithdraw,
    setEditPendingWithdraw,
    showEditPayment,
    setShowEditPayment,
    showCreditRef,
    setShowCreditRef,
  } = useContextState();
  const navigate = useNavigate();

  /* TODO */
  const token = localStorage.getItem("adminToken");
  const disabledDevtool = Settings.disabledDevtool;
  /*if Token expire logout user */
  useEffect(() => {
    let isTokenExpired;
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      isTokenExpired = expirationTime < Date.now() / 1000;
      if (isTokenExpired) {
        handleLogOut();
        navigate("/login");
      }
      /* if forceLogin true in notice.json and token not available then logout */
    } else if (Settings.forceLogin) {
      if (!token) {
        handleLogOut();
        navigate("/login");
      }
    }
  }, [navigate, token, tokenLoading]);

  /* Disabled devtool based on settings */
  useEffect(() => {
    if (disabledDevtool) {
      disableDevtool({
        ondevtoolopen: (type) => {
          const info = "devtool opened!; type =" + type;
          if (info) {
            handleLogOut();
            navigate("/login");
          }
        },
      });
    }
  }, [navigate, disabledDevtool]);
  return (
    <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
      <div className="layout-container">
        <Navbar />

        <div className="layout-page">
          <div className="content-wrapper">
            {showSidebar ? <Sidebar /> : <NavListItem />}

            <Outlet />
            {/* Modals start for Hyper_master*/}
            {showAddBranch && <AddBranch setShowAddBranch={setShowAddBranch} />}
            {showSocialLink && (
              <SocialLink setShowSocialLink={setShowSocialLink} />
            )}
            {showDeposit && (
              <Deposit
                downlineId={downLineId}
                setShowDeposit={setShowDeposit}
              />
            )}
            {showWithdraw && (
              <Withdraw
                downlineId={downLineId}
                setShowWithdraw={setShowWithdraw}
              />
            )}
            {/* Modals end for Hyper_master and master*/}
            {showChangeStatus && (
              <ChangeStatus
                setShowChangeStatus={setShowChangeStatus}
                downlineId={downLineId}
              />
            )}
            {/* Modals end for Hyper_master and master*/}
            {showChangePassword && (
              <ChangePassword
                setShowChangePassword={setShowChangePassword}
                downlineId={downLineId}
              />
            )}
            {/* Modals end for Hyper_master*/}
            {/* Modals end for master*/}
            {clientDeposit && (
              <ClientDeposit
                setClientDeposit={setClientDeposit}
                downlineId={downLineId}
              />
            )}
            {editPendingDeposit && (
              <EditPendingDeposit
                editPendingDeposit={editPendingDeposit}
                setEditPendingDeposit={setEditPendingDeposit}
              />
            )}
            {editPendingWithdraw && (
              <EditPendingWithdraw
                editPendingWithdraw={editPendingWithdraw}
                setEditPendingWithdraw={setEditPendingWithdraw}
              />
            )}
            {showEditPayment && (
              <EditPayment setShowEditPayment={setShowEditPayment} />
            )}
            {showCreditRef && (
              <CreditReference
                setShowCreditRef={setShowCreditRef}
                downlineId={downLineId}
              />
            )}
            <Footer />
          </div>

          <div className="content-backdrop fade "></div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
