/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
*/

import Dashboard from "layouts/dashboard";
import EmployeeAccess from "layouts/access-management";
import Departments from "layouts/departments";
import Analytics from "layouts/analytics";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import GroupWorkIcon from "@mui/icons-material/GroupWork";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employee Access",
    key: "employee-access",
    icon: <SecurityIcon />,
    route: "/access-management",
    component: <EmployeeAccess />,
    children: [
      {
        type: "child",
        name: "All Employees",
        key: "all-employees",
        route: "/access-management/employees",
        component: <EmployeeAccess view="employees" />,
      },
      {
        type: "child",
        name: "Access History",
        key: "access-history",
        route: "/access-management/history",
        component: <EmployeeAccess view="history" />,
      },
      {
        type: "child",
        name: "Bulk Management",
        key: "bulk-management",
        route: "/access-management/bulk",
        component: <EmployeeAccess view="bulk" />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <GroupWorkIcon />,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Analytics",
    key: "analytics",
    icon: <AssessmentIcon />,
    route: "/analytics",
    component: <Analytics />,
    children: [
      {
        type: "child",
        name: "Access Trends",
        key: "access-trends",
        route: "/analytics/access-trends",
        component: <Analytics view="access-trends" />,
      },
      {
        type: "child",
        name: "Department Stats",
        key: "department-stats",
        route: "/analytics/department-stats",
        component: <Analytics view="department-stats" />,
      },
      {
        type: "child",
        name: "Audit Logs",
        key: "audit-logs",
        route: "/analytics/audit-logs",
        component: <Analytics view="audit-logs" />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <PersonIcon />,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;