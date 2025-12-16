//   const navItems = [
//     {
//       label: "Dashboard",
//       href: "/",
//       show: permission.includes("dashboard"),
//     },
//     {
//       tab: "Clients",
//       key: "client",
//       show: permission.includes("client"),
//       children: [
//         {
//           label: "View Clients",
//           href: "/view-client",
//           show: true,
//         },
//         {
//           label: "Add Client",
//           href: "/add-client",
//           show: true,
//         },
//         {
//           label: "Clients With Balance",
//           href: "/clients-with-balance",
//           show: true,
//         },
//         {
//           label: "All Client",
//           href: "/all-client",
//           show: true,
//         },
//         {
//           label: "Active Client",
//           href: "/active-client",
//           show: true,
//         },
//         {
//           label: "Inactive Client",
//           href: "/inactive-client",
//           show: true,
//         },
//         {
//           label: "Suspended Client",
//           href: "/suspended-client",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Payments",
//       key: "payment",
//       show: permission.includes("payment"),
//       children: [
//         {
//           label: "View Payment Method",
//           href: "/view-payment-method",
//           show: true,
//         },
//         {
//           label: "Add Bank Account",
//           href: "/add-bank-account",
//           show: true,
//         },
//         {
//           label: "Add QR",
//           href: "/add-QR",
//           show: true,
//         },
//         {
//           label: "Add UPI",
//           href: "/add-UPI",
//           show: true,
//         },
//         {
//           label: "Add Whatsapp Deposit",
//           href: "/add-whatsapp-deposit",
//           show: true,
//         },
//         {
//           label: "Add USDT (TRC20)",
//           href: "/add-USDT-TRC20",
//           show: true,
//         },
//         {
//           label: "Add USDT (BEP20)",
//           href: "/add-USDT-BEP20",
//           show: true,
//         },
//         {
//           label: "Add UPI Payment Gateway",
//           href: "/add-payment-gateway",
//           show: true,
//         },
//         {
//           label: "Add TOIT Payment Gateway",
//           href: "/add-toit-payment-gateway",
//           show: true,
//         },
//         {
//           label: "Add i100 Payment Gateway",
//           href: "/add-i100-payment-gateway",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Deposit",
//       key: "deposit",
//       show: permission.includes("deposit"),
//       children: [
//         {
//           label: "Pending Deposit",
//           href: "/pending-deposit",
//           show: true,
//         },
//         {
//           label: "Completed Deposit",
//           href: "/completed-deposit",
//           show: true,
//         },
//         {
//           label: "Rejected Deposit",
//           href: "/rejected-deposit",
//           show: true,
//         },
//         {
//           label: "UTR Search",
//           href: "/utr-search",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Withdraw",
//       key: "withdraw",
//       show: permission.includes("withdraw"),
//       children: [
//         {
//           label: "Pending Withdraw",
//           href: "/pending-withdraw",
//           show: true,
//         },
//         {
//           label: "Completed Withdraw",
//           href: "/completed-withdraw",
//           show: true,
//         },
//         {
//           label: "Rejected Withdraw",
//           href: "/rejected-withdraw",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Exposure",
//       key: "exposure",
//       show: permission.includes("exposure"),
//       children: [
//         {
//           label: "Market Analysis",
//           href: "/market-analysis",
//           show: true,
//         },
//         {
//           label: "Current Bets",
//           href: "/current-bets",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Bonus",
//       key: "bonus",
//       show: permission.includes("bonus"),
//       children: [
//         {
//           label: "Pending Bonus",
//           href: "/pending-bonus",
//           show: true,
//         },
//         {
//           label: "Completed Bonus",
//           href: "/completed-bonus",
//           show: true,
//         },
//         {
//           label: "Rejected Bonus",
//           href: "/rejected-bonus",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Report",
//       key: "report",
//       show: permission.includes("report"),
//       children: [
//         {
//           label: "Client Report",
//           href: "/client-report",
//           show: true,
//         },
//         {
//           label: "Deposit Report",
//           href: "/deposit-report",
//           show: true,
//         },
//         {
//           label: "1st Deposit Report",
//           href: "/1st-deposit-report",
//           show: true,
//         },
//         {
//           label: "Last Deposit Report",
//           href: "/last-deposit-report",
//           show: true,
//         },
//         {
//           label: "No Deposit Report",
//           href: "/no-deposit-report",
//           show: true,
//         },
//         {
//           label: "No deposit last 15 days",
//           href: "/no-deposit-report-last-15-days",
//           show: true,
//         },
//         {
//           label: "Withdraw Report",
//           href: "/withdraw-report",
//           show: true,
//         },
//         {
//           label: "Transfer Statement",
//           href: "/transfer-statement",
//           show: true,
//         },
//         {
//           label: "Client Branch Change Report",
//           href: "/client-branch-change-report",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Settings",
//       key: "setting",
//       show: permission.includes("setting"),
//       children: [
//         {
//           label: "View Banners",
//           href: "/view-banner",
//           show: true,
//         },
//         {
//           label: "Add Banner",
//           href: "/add-banner",
//           show: true,
//         },
//         {
//           label: "Add Login Banner",
//           href: "/add-login-banner",
//           show: true,
//         },
//         {
//           label: "Social Links",
//           setState: setShowSocialLink,
//           show: true,
//         },
//         {
//           label: "Update D/W Limit",
//           setState: setShowDWLimit,
//           show: true,
//         },

//         {
//           label: "View Notifications",
//           href: "/view-notification",
//           show: true,
//         },
//         {
//           label: "Add Notifications",
//           href: "/add-notification",
//           show: true,
//         },
//         {
//           label: "View Bonus",
//           href: "/view-bonus",
//           show: permission.includes("bonus"),
//         },
//         {
//           label: "Add Bonus",
//           href: "/add-bonus",
//           show: permission.includes("bonus"),
//         },
//         {
//           label: "Pending Bonus",
//           href: "/pending-bonus",
//           show: permission.includes("bonus"),
//         },

//         {
//           label: "Completed Bonus",
//           href: "/completed-bonus",
//           show: permission.includes("bonus"),
//         },
//         {
//           label: "Rejected Bonus",
//           href: "/rejected-bonus",
//           show: permission.includes("bonus"),
//         },
//       ],
//     },
//     {
//       tab: "Complaints",
//       key: "complaint",
//       show: permission?.includes("complaint"),
//       children: [
//         {
//           label: "Pending Complaints",
//           href: "/pending-complaints",
//           show: true,
//         },
//         {
//           label: "Resolved Complaints",
//           href: "/resolved-complaints",
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Staff",
//       key: "staff",
//       show: permission.includes("bonus"),
//       children: [
//         {
//           label: "View Staff",
//           href: "/view-staff",
//           show: true,
//         },
//         {
//           label:
//             adminRole === AdminRole.hyper_master
//               ? "Add Admin Staff"
//               : "Add Staff",
//           setState: setShowAddStaff,
//           show: true,
//         },
//         {
//           label: "Add Branch Staff",
//           setState: setShowAddBranchStaff,
//           show: adminRole === AdminRole.hyper_master,
//         },
//       ],
//     },
//     {
//       tab: "Whitelabel",
//       key: "whitelabel",
//       show: permission.includes("whitelabel"),
//       children: [
//         {
//           label: "View Whitelabel",
//           href: "/view-whitelabel",
//           show: true,
//         },
//         {
//           label: "Add Whitelabel",
//           setState: setAddWhiteLabel,
//           show: true,
//         },
//       ],
//     },
//     {
//       tab: "Branch",
//       key: "branch",
//       show: permission.includes("branch"),
//       children: [
//         {
//           label: "View Branch",
//           href: "/view-branch",
//           show: true,
//         },
//         {
//           label: "Add Branch",
//           setState: setShowAddBranch,
//           show: true,
//         },

//         {
//           label: "View Super Branch",
//           href: "/view-super-branch",
//           show: true,
//         },
//         {
//           label: "Add Super Branch",
//           setState: setShowAddSuperBranch,
//           show: true,
//         },
//       ],
//     },
//   ];
