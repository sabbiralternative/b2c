const AddBankAccount = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add New Bank
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bank Account Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="bank_account_name"
                      value=""
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_number_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Account Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="account_number"
                      className="form-control"
                      value=""
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="ifsc_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    IFSC
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="ifsc"
                      className="form-control"
                      value=""
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Bank Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="bank_name"
                      className="form-control"
                      value=""
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Minimum Deposit Amount
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="min_amount"
                      required=""
                      min="100"
                      value=""
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Maximum Deposit Amount
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      min="200"
                      required=""
                      name="max_amount"
                      value=""
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBankAccount;
