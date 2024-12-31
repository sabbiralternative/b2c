import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import EditPayment from "../modal/Master/Payment/EditPayment";
import CreditReference from "../modal/CreditReference";
import SiteNotification from "../modal/HyperMaster/Settings/SiteNotification";
import toast from "react-hot-toast";
import DirectDeposit from "../modal/Master/Client/DirectDeposit";
import AddChecker from "../modal/HyperMaster/Staff/AddChecker";
import AddWhiteLabel from "../modal/AdminMaster/AddWhiteLabel";

const MainLayout = () => {
  const {
    directDeposit,
    setDirectDeposit,
    setGetToken,
    siteNotification,
    setSiteNotification,
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
    payloadRole,
    setClientDeposit,
    showEditPayment,
    setShowEditPayment,
    showCreditRef,
    setShowCreditRef,
    registrationStatus,
    showAddChecker,
    setAddChecker,
    addWhiteLabel,
    setAddWhiteLabel,
    id,
  } = useContextState();
  const navigate = useNavigate();
  const location = useLocation();

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

  /* Handle login read only without password */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const readOnlyLoginData = queryParams.get("data");
    if (readOnlyLoginData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(readOnlyLoginData));
        localStorage.setItem("readOnly", parsedData?.readOnly);
        localStorage.setItem("adminToken", parsedData?.token);
        localStorage.setItem("adminName", parsedData?.loginname);
        localStorage.setItem("adminRole", parsedData?.role);
        localStorage.setItem("adminSite", parsedData?.site);
        setGetToken((prev) => !prev);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  }, [location, setGetToken]);
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
            {siteNotification && (
              <SiteNotification setSiteNotification={setSiteNotification} />
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
                id={id}
                role={payloadRole}
                setShowChangeStatus={setShowChangeStatus}
                downlineId={downLineId}
                registrationStatus={registrationStatus}
              />
            )}
            {/* Modals end for Hyper_master and master*/}
            {showChangePassword && (
              <ChangePassword
                id={id}
                role={payloadRole}
                setShowChangePassword={setShowChangePassword}
                downlineId={downLineId}
              />
            )}
            {/* Modals end for Hyper_master*/}
            {/* Modals end for master*/}
            {clientDeposit && (
              <ClientDeposit
                id={id}
                setClientDeposit={setClientDeposit}
                downlineId={downLineId}
                role={payloadRole}
              />
            )}
            {directDeposit && (
              <DirectDeposit
                id={id}
                role={payloadRole}
                setDirectDeposit={setDirectDeposit}
                downlineId={downLineId}
              />
            )}

            {showEditPayment && (
              <EditPayment setShowEditPayment={setShowEditPayment} />
            )}
            {showCreditRef && (
              <CreditReference
                id={id}
                role={payloadRole}
                setShowCreditRef={setShowCreditRef}
                downlineId={downLineId}
              />
            )}

            {showAddChecker && <AddChecker setShowAddChecker={setAddChecker} />}
            {addWhiteLabel && (
              <AddWhiteLabel setShowAddWhiteLabel={setAddWhiteLabel} />
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
