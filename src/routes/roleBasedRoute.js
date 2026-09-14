export const roleBasedRoute = () => {
  return [
    {
      label: "Dashboard",
      href: "/",
      permission: "dashboard",
    },
    {
      label: "View Branch",
      href: "/view-branch",
      permission: "branch",
    },

    {
      label: "View Super Branch",
      href: "/view-super-branch",
      permission: "branch",
    },

    {
      label: "View Clients",
      href: "/view-client",
      permission: "client",
    },
    {
      label: "Add Client",
      href: "/add-client",
      permission: "add_client",
    },
    {
      label: "Clients With Balance",
      href: "/clients-with-balance",
      permission: "client",
    },
    {
      label: "All Client",
      href: "/all-client",
      permission: "client",
    },
    {
      label: "Active Client",
      href: "/active-client",
      permission: "client",
    },
    {
      label: "Inactive Client",
      href: "/inactive-client",
      permission: "client",
    },
    {
      label: "Suspended Client",
      href: "/suspended-client",
      permission: "client",
    },
    {
      label: "Non-Trusted Clients",
      href: "/non-trusted-clients",
      permission: "client",
    },
    {
      label: "Trusted Clients",
      href: "/trusted-clients",
      permission: "client",
    },
    {
      label: "VIP Clients",
      href: "/vip-clients",
      permission: "client",
    },
    {
      label: "VVIP Clients",
      href: "/vvip-clients",
      permission: "client",
    },
    {
      label: "Premium Clients",
      href: "/premium-clients",
      permission: "client",
    },
    {
      label: "Withdraw Lock Clients",
      href: "/withdraw-lock-clients",
      permission: "client",
    },
    {
      label: "Pending Deposit",
      href: "/pending-deposit",
      permission: "deposit",
    },
    {
      label: "Completed Deposit",
      href: "/completed-deposit",
      permission: "deposit",
    },
    {
      label: "Rejected Deposit",
      href: "/rejected-deposit",
      permission: "deposit",
    },
    {
      label: "UTR Search",
      href: "/utr-search",
      permission: "deposit",
    },
    {
      label: "Pending Withdraw",
      href: "/pending-withdraw",
      permission: "withdraw",
    },
    {
      label: "Completed Withdraw",
      href: "/completed-withdraw",
      permission: "withdraw",
    },
    {
      label: "Rejected Withdraw",
      href: "/rejected-withdraw",
      permission: "withdraw",
    },
    {
      label: "Pending Withdraw - Gateway",
      href: "/pending-withdraw-gateway",
      permission: "withdraw",
    },
    {
      label: "Search Withdraw",
      href: "/search-withdraw",
      permission: "withdraw",
    },

    {
      label: "Market Analysis",
      href: "/market-analysis",
      permission: "exposure",
    },
    {
      label: "Current Bets",
      href: "/current-bets",
      permission: "exposure",
    },
    {
      label: "View Admin",
      href: "/view-admin",
      permission: "admin",
    },

    {
      label: "Active Accounts",
      href: "/active-accounts",
      permission: "payment",
    },
    {
      label: "Inactive Accounts",
      href: "/inactive-accounts",
      permission: "payment",
    },
    {
      label: "Disabled Accounts",
      href: "/disabled-accounts",
      permission: "payment",
    },
    {
      label: "Add Bank Account",
      href: "/add-bank-account",
      permission: "payment",
    },
    {
      label: "Add QR",
      href: "/add-QR",
      permission: "payment",
    },
    {
      label: "Add UPI",
      href: "/add-UPI",
      permission: "payment",
    },
    {
      label: "Add Whatsapp Deposit",
      href: "/add-whatsapp-deposit",
      permission: "payment",
    },
    {
      label: "Add USDT (TRC20)",
      href: "/add-USDT-TRC20",
      permission: "payment",
    },
    {
      label: "Add USDT (BEP20)",
      href: "/add-USDT-BEP20",
      permission: "payment",
    },
    {
      label: "Add UPI Payment Gateway",
      href: "/add-upi-payment-gateway",
      permission: "payment",
    },
    {
      label: "Add TOIT Payment Gateway",
      href: "/add-toit-payment-gateway",
      permission: "payment",
    },
    {
      label: "Add Goldy Payment Gateway",
      href: "/add-goldy-payment-gateway",
      permission: "payment",
    },
    {
      label: "Add FirstPay Payment Gateway",
      href: "/add-firstpay-payment-gateway",
      permission: "payment",
    },

    {
      label: "Add i100 Payment Gateway",
      href: "/add-i100-payment-gateway",
      permission: "payment",
    },
    {
      label: "Add UPI Click Gateway",
      href: "/add-upi-click-gateway",
      permission: "payment",
    },
    {
      label: "Market Analysis",
      href: "/market-analysis",
      permission: "exposure",
    },
    {
      label: "Current Bets",
      href: "/current-bets",
      permission: "exposure",
    },
    {
      label: "View Affiliate",
      href: "/view-affiliate",
      permission: "affiliate",
    },
    {
      label: "View Banners",
      href: "/view-banner",
      permission: "setting",
    },
    {
      label: "Add Banner",
      href: "/add-banner",
      permission: "setting",
    },
    {
      label: "Add Login Banner",
      href: "/add-login-banner",
      permission: "setting",
    },
    {
      label: "Add APK Download Banner",
      href: "/add-apk-download-banner",
      permission: "setting",
    },

    {
      label: "View Notifications",
      href: "/view-notification",
      permission: "setting",
    },
    {
      label: "Add Notifications",
      href: "/add-notification",
      permission: "setting",
    },
    {
      label: "Pending Complaints",
      href: "/pending-complaints",
      permission: "complaint",
    },
    {
      label: "Resolved Complaints",
      href: "/resolved-complaints",
      permission: "complaint",
    },
    {
      label: "View Blogs",
      href: "/view-blogs",
      permission: "blog",
    },
    {
      label: "Add Blog",
      href: "/add-blog",
      permission: "blog",
    },
    {
      label: "View Bonus",
      href: "/view-bonus",
      permission: "bonus",
    },
    {
      label: "Add Bonus",
      href: "/add-bonus",
      permission: "bonus",
    },
    {
      label: "Add Lossback Bonus by Event",
      href: "/add-loss-back-bonus-by-event",
      permission: "bonus",
    },
    {
      label: "Add Lossback Bonus by Date",
      href: "/add-loss-back-bonus-by-date",
      permission: "bonus",
    },
    {
      label: "View Lossback Bonus",
      href: "/view-lossback-bonus",
      permission: "bonus",
    },
    {
      label: "Lossback Bonus Report",
      href: "/lossback-bonus-report",
      permission: "bonus",
    },
    {
      label: "View Coupons",
      href: "/view-coupons",
      permission: "bonus",
    },
    {
      label: "Add Coupon",
      href: "/add-coupon",
      permission: "bonus",
    },
    {
      label: "Coupon Bonus Report",
      href: "/coupon-bonus-report",
      permission: "bonus",
    },
    {
      label: "Pending Bonus",
      href: "/pending-bonus",
      permission: "bonus",
    },
    {
      label: "Completed Bonus",
      href: "/completed-bonus",
      permission: "bonus",
    },
    {
      label: "Rejected Bonus",
      href: "/rejected-bonus",
      permission: "bonus",
    },

    {
      label: "Client Report",
      href: "/client-report",
      permission: "report",
    },
    {
      label: "Deposit Report",
      href: "/deposit-report",
      permission: "report",
    },
    {
      label: "1st Deposit Report",
      href: "/1st-deposit-report",
      permission: "report",
    },
    {
      label: "Last Deposit Report",
      href: "/last-deposit-report",
      permission: "report",
    },
    {
      label: "No Deposit Report",
      href: "/no-deposit-report",
      permission: "report",
    },

    {
      label: "Withdraw Report",
      href: "/withdraw-report",
      permission: "report",
    },
    {
      label: "Direct Deposit Report",
      href: "/direct-deposit-report",
      permission: "report",
    },
    {
      label: "Direct Withdraw Report",
      href: "/direct-withdraw-report",
      permission: "report",
    },
    {
      label: "Transfer Statement",
      href: "/transfer-statement",
      permission: "report",
    },
    {
      label: "Client Branch Change Report",
      href: "/client-branch-change-report",
      permission: "report",
    },
    {
      label: "Lossback Bonus Report",
      href: "/lossback-bonus-report",
      permission: "report",
    },
    {
      label: "Dream Report",
      href: "/dream-report",
      permission: "report",
    },
    {
      label: "View Staff",
      href: "/view-staff",
      permission: "staff",
    },

    {
      label: "Pending New Account",
      href: "/punt-pending-new-account",
      permission: "punt",
    },
    {
      label: "Pending Deposit",
      href: "/punt-pending-deposit",
      permission: "punt",
    },
    {
      label: "Pending Withdraw",
      href: "/punt-pending-withdraw",
      permission: "punt",
    },
    {
      label: "Pending Change Password",
      href: "/punt-pending-change-password",
      permission: "punt",
    },
    {
      label: "View Whitelable",
      href: "/view-whitelable",
      permission: "whitelable",
    },
    {
      label: "Add Whitelable",
      href: "/add-whitelable",
      permission: "whitelable",
    },
  ];
};
