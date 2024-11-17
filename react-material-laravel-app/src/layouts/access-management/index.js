import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Components
import EmployeeAccessList from "./components/EmployeeAccessList";
import AccessSummary from "./components/AccessSummary";
import AccessHistory from "./components/AccessHistory";
import BulkManagement from "./components/BulkManagement";
import QuickAccessMenu from "./components/QuickAccessMenu";

function AccessManagement({ view = "employees" }) {
  const { pathname } = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuickAction = (actionType) => {
    // Handle quick actions
    console.log('Quick action:', actionType);
  };

  const renderView = () => {
    switch (view) {
      case "history":
        return <AccessHistory />;
      case "bulk":
        return <BulkManagement />;
      default:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <EmployeeAccessList key={refreshKey} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AccessSummary />
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDTypography variant="h3" fontWeight="medium">
                Access Management
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>

        {renderView()}

        <QuickAccessMenu onAction={handleQuickAction} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AccessManagement;