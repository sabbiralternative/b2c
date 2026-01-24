import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import handleRandomToken from "../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../api";
import toast from "react-hot-toast";
import UpdateBonus from "../../components/modal/HyperMaster/Bonus/UpdateBonus";
import Swal from "sweetalert2";
import { useLossBackQuery } from "../../hooks/lossback";

const ViewLossBackBonus = () => {
  const [editBonusId, setEditBonusId] = useState("");
  const { data, refetch } = useLossBackQuery({
    type: "view_lossback_bonus",
  });
  const { token } = useContextState();

  const handleDeleteBonus = async (bonus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${bonus?.event_name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "delete_lossback_bonus",
          lossback_bonus_id: bonus?.lossback_bonus_id,
          token: generatedToken,
        };
        const res = await axios.post(API.lossback, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetch();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.description);
        }
      }
    });
  };

  return (
    <>
      {editBonusId && (
        <UpdateBonus
          editBonusId={editBonusId}
          setEditBonusId={setEditBonusId}
          refetchBonus={refetch}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Lossback Bonus</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Bonus</th>
                  <th>Event Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Expire Date</th>
                  <th>Minimum Loss Amount</th>
                  <th>Mode</th>
                  <th>Visible On</th>
                  <th>Punter Id</th>
                  <th>Referral Id</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((loss_back, i) => {
                  return (
                    <tr key={i}>
                      <td>{loss_back?.bonus_percentage}</td>

                      <td>{loss_back?.event_name}</td>

                      <td>{loss_back?.from_date}</td>
                      <td>{loss_back?.to_date}</td>
                      <td>{loss_back?.expires_at}</td>
                      <td>{loss_back?.minimum_loss_amount}</td>
                      <td>{loss_back?.mode}</td>
                      <td>{loss_back?.visible_on}</td>
                      <td>{loss_back?.punter_id}</td>
                      <td>{loss_back?.referral_id}</td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            loss_back?.status === "ACTIVE"
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {loss_back?.status}
                        </span>
                      </td>
                      <td>{loss_back?.date_added}</td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() => handleDeleteBonus(loss_back)}
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          D
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLossBackBonus;
