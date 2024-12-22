export const handleDownLineId = (
  setModal,
  downLineId,
  setDownLineId,
  payloadRole,
  setPayloadRole
) => {
  setModal((prev) => !prev);
  setDownLineId("");
  setDownLineId(downLineId);
  setPayloadRole(payloadRole);
};
