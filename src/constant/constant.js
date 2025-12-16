export const AdminRole = {
  master: "master",
  hyper_master: "hyper_master",
  admin_master: "admin_master",
  admin_staff: "admin_staff",
  branch_staff: "branch_staff",
  super_master: "super_master",
};
export const Status = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const clientColor = {
  0: "white",
  1: "#39da8a",
  2: "#ff5b5c",
  3: "#fdac41",
  4: "#00cfdd",
};

export const Permission = {
  dashboard: "dashboard",
  branch: "branch",
  client: "client",
  setting: "setting",
  exposure: "exposure",
  report: "report",
  deposit: "deposit",
  withdraw: "withdraw",
  complaint: "complaint",
  staff: "staff",
  payment: "payment",
  directDeposit: "directDeposit",
  directWithdraw: "directWithdraw",
  bonus: "bonus",
  password: "password",
};

export const permissionsList = [
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
  { label: "Client", value: "client" },
  { label: "Payment", value: "payment" },
  { label: "Report", value: "report" },
  {
    label: "Direct Deposit",
    value: "directDeposit",
  },
  {
    label: "Deposit With Slip",
    value: "depositWithSlip",
  },
  {
    label: "Direct Withdraw",
    value: "directWithdraw",
  },
  { label: "Settings", value: "setting" },
  { label: "Bonus", value: "bonus" },
  { label: "Exposure", value: "exposure" },
  { label: "Dashboard", value: "dashboard" },
  {
    label: "Password",
    value: "password",
  },
  {
    label: "Branch",
    value: "branch",
  },
  {
    label: "Complaint",
    value: "complaint",
  },
  {
    label: "Staff",
    value: "staff",
  },
];
