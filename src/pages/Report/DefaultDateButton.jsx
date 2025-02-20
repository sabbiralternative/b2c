import { defaultDate } from "../../utils/defaultDate";

const DefaultDateButton = ({ setStartDate, setEndDate }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button
        type="button"
        onClick={() => {
          setStartDate(new Date());
          setEndDate(new Date());
        }}
        className="btn btn-primary btn-xs"
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => {
          setStartDate(defaultDate(1));
          setEndDate(defaultDate(1));
        }}
        className="btn btn-primary btn-xs"
      >
        Yesterday
      </button>
      <button
        type="button"
        onClick={() => {
          setStartDate(defaultDate(7));
          setEndDate(defaultDate(7));
        }}
        className="btn btn-primary btn-xs"
      >
        This Week
      </button>
    </div>
  );
};

export default DefaultDateButton;
