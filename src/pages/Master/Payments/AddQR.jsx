const AddQR = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add New QR
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form>
                <div className="row mb-3" id="qr_code">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    QR Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="file"
                      id="fileToUpload"
                      name="fileToUpload"
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
                      required=""
                      name="max_amount"
                      value=""
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="exampleFormControlSelect1"
                    className="col-sm-2 col-form-label"
                  >
                    Status
                  </label>
                  <div className="col-sm-9" data-select2-id="26">
                    <div className="position-relative" data-select2-id="25">
                      <select
                        id="type"
                        name="status"
                        className="select2 form-select select2-hidden-accessible"
                        data-allow-clear="true"
                        aria-hidden="true"
                        required=""
                      >
                        <option value="" data-select2-id="2">
                          Select
                        </option>
                        <option value="1" data-select2-id="38" selected="">
                          Active
                        </option>
                        <option value="2" data-select2-id="39">
                          Inactive
                        </option>
                      </select>
                      {/*            <span
                        className="select2 select2-container select2-container--default select2-container--below select2-container--focus"
                        dir="ltr"
                        data-select2-id="1"
                        style="width: 468.25px"
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-disabled="false"
                            aria-labelledby="select2-multicol-country-container"
                          >
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation"></b>
                            </span>
                          </span>
                        </span>
                        <span
                          className="dropdown-wrapper"
                          aria-hidden="true"
                        ></span>
                      </span> */}
                    </div>
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

export default AddQR;
