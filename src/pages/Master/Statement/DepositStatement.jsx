import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";
import useDatePicker from "../../../hooks/useDatePicker";
import { DateRangePicker } from "rsuite";
import Deposit from "../../../components/ui/Master/Deposit";
import { Settings } from "../../../api";

const DepositStatement = () => {
  const { formattedEndDate, formattedStartDate, onChange } = useDatePicker();
  const payload = {
    type: "viewUTR",
    status: "APPROVED",
    fromDate: formattedStartDate,
    toDate: formattedEndDate,
    site:Settings.siteUrl
  };
  const {
    allUTRs: depositStatements,
    refetchAllUTRs: refetchDepositStatements,
  } = useGetALLDeposit(payload);

  const handleGetDepositStatements = async (e) => {
    e.preventDefault();
    refetchDepositStatements();
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
      <div className="col-12">
        <Deposit data={depositStatements} title="Completed Deposit" />
      </div>
    </div>
  );
};

export default DepositStatement;
