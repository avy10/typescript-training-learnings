export const MENU_DATA = [
  {
    label: "My Inbox",
    path: "swat/my-inbox",
    // submenu: [],
  },
  {
    label: "Watchlist",
    path: "swat/watchlist",
    // submenu: [],
  },
  {
    label: "Office Inbox",
    path: "swat/office-inbox",
    submenu: [
      {
        label: "Mining Inbox",
        path: "swat/office-inbox/mining",
        submenu: [
          {
            label: "Mining Role ",
            path: "swat/mining/role",
          },
          {
            label: "Mining User ",
            path: "swat/mining/user",
          },
          {
            label: "Mining Office User ",
            path: "swat/mining/office-user",
          },
        ],
      },
      {
        label: "Oil & Gas Inbox",
        path: "swat/office-inbox/oil-gas",
        submenu: [
          {
            label: "Oil & Gas Role Administration",
            path: "swat/oil-gas/role",
          },
          {
            label: "Oil & Gas User Administration",
            path: "swat/oil-gas/user",
          },
          {
            label: "Oil & Gas Office User Administration",
            path: "swat/oil-gas/office-user",
          },
        ],
      },
      {
        label: "Consolidated Inbox",
        path: "swat/consolidated",
      },
      {
        label: "BSO Inbox",
        path: "swat/bso",
      },
    ],
  },
  {
    label: "Workload",
    path: "swat/workload",
    submenu: [
      {
        label: "Create New Review ",
        path: "new-review",
      },
      {
        label: "View User Inbox",
        path: "swat/view-user",
      },
      {
        label: "View User Open Reviews",
        path: "swat/open-view",
      },
      {
        label: "Bulk Assignment  ",
        path: "bulk-assignment",
      },
    ],
  },
  {
    label: "Dashboards",
    path: undefined,
    submenu: [
      {
        label: "Office Dashboard",
        path: "swat/office",
      },
      {
        label: "User Dashboard",
        path: "swat/user",
      },
    ],
  },
  {
    label: "Notifications",
    path: "swat/notifications",
    // submenu: [],
  },
  {
    label: "Search",
    path: "swat/search",
    // submenu: [],
  },
  {
    label: "COOP",
    path: "swat/coop",
    // submenu: [],
  },
  {
    label: "Admin",
    path: "swat/admin",
    submenu: [
      {
        label: "Administration",
        path: "swat/administration",
        submenu: [
          {
            label: "Role Administration",
            path: "swat/role-admin",
          },
          {
            label: "User Administration",
            path: "swat/user-admin",
          },
          {
            label: "Office User Administration",
            path: "swat/office-user-admin",
          },
        ],
      },
      {
        label: "Effect",
        path: "swat/effect",
        submenu: [
          { label: "Effectiveness Queue", path: "swat/queue" },
          {
            label: "Effectiveness Transmitted",
            path: "swat/transmitted",
          },
          { label: "PAC Effect / Qualify", path: "pac-quality" },
        ],
      },
      {
        label: "View User Inbox",
        path: "",
      },
      {
        label: "Term User - Open Tasks",
        path: "",
      },
      {
        label: "Update Owner Org",
        path: "",
      },
      {
        label: "Task Reassignment",
        path: "",
      },
      {
        label: "Update DRS/DOS Form Type",
        path: "",
      },
      {
        label: "User By Role",
        path: "",
      },
      {
        label: "Review Actions",
        path: "",
      },
      {
        label: "Modify SWAT Filing",
        path: "",
      },
      {
        label: "Modify Review Data",
        path: "",
      },
      {
        label: "Manage Designations",
        path: "",
      },
      {
        label: "Manage Offices",
        path: "",
      },
      {
        label: "Manage Roles",
        path: "",
      },
      {
        label: "Modify Review Filing Rel",
        path: "",
      },
      {
        label: "Application Configuration",
        path: "",
      },
      {
        label: "Change Owner Branch",
        path: "",
      },
      {
        label: "Checklist Configuration",
        path: "",
      },
      {
        label: "Monitor Review Rule 418",
        path: "",
      },
      {
        label: "Change CIFR",
        path: "",
      },
      {
        label: "Manage Menus",
        path: "",
      },
      {
        label: "Overflow: Route to Other Office",
        path: "",
      },
      {
        label: "Modify Additional Info",
        path: "",
      },
      {
        label: "Modify Review Round  ",
        path: "",
      },
    ],
  },
  {
    label: "Support",
    path: "swat/support",
    submenu: [
      {
        label: "Create New Document",
        path: "",
      },
      {
        label: "Update Document",
        path: "",
      },
      {
        label: "Add New Company",
        path: "",
      },
      {
        label: "Add New Letter Template",
        path: "",
      },
      {
        label: "Update Letter Template",
        path: "",
      },
      {
        label: "Email Requests and History",
        path: "",
      },
      {
        label: "SWAT Dynamic Labels",
        path: "",
      },
      {
        label: "Manage SWAT LOVs",
        path: "",
      },
      {
        label: "Screening Dynamic Fields",
        path: "",
      },
      {
        label: "SEC Holidays",
        path: "",
      },
    ],
  },
  {
    label: "Report",
    path: "swat/report",
    submenu: [
      {
        label: "Dashboard Export",
        path: "",
      },
    ],
  },
];
