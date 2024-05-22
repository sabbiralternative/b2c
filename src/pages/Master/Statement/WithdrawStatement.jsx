import { DateRangePicker } from "rsuite";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import useDatePicker from "../../../hooks/useDatePicker";
import useContextState from "../../../hooks/useContextState";

const WithdrawStatement = () => {
  const { site } = useContextState();
  const { formattedEndDate, formattedStartDate, onChange } = useDatePicker();
  const payload = {
    type: "viewWithdraw",
    status: "APPROVED",
    site,
    fromDate: formattedStartDate,
    toDate: formattedEndDate,
  };
  const { allWithdraw, refetchAllWithdraw } = useGetALLWithdraw(payload);

  const handleGetDepositStatements = async (e) => {
    e.preventDefault();
    refetchAllWithdraw();
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleGetDepositStatements}
            >
              <div className="col-md-6 col-12 mb-4">
                <label htmlFor="flatpickr-range" className="form-label">
                  Range Picker
                </label>
                <DateRangePicker
                  format="dd-MM-yyyy"
                  editable
                  onChange={onChange}
                  defaultValue={[
                    new Date(new Date().setDate(new Date().getDate() - 7)),
                    new Date(),
                  ]}
                  block
                />
              </div>

              <div className="col-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <Withdraw data={allWithdraw} title="Completed Withdraw" />
    </div>
  );
};

export default WithdrawStatement;
