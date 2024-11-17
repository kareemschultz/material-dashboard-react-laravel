import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AccessTrendsChart from "./components/AccessTrendsChart";
import DepartmentStats from "./components/DepartmentStats";
import AuditLogs from "./components/AuditLogs";

function Analytics({ view = "access-trends" }) {
  const renderView = () => {
    switch (view) {
      case "department-stats":
        return <DepartmentStats />;
      case "audit-logs":
        return <AuditLogs />;
      default:
        return <AccessTrendsChart />;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <MDTypography variant="h3" fontWeight="medium">
                Analytics
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            {renderView()}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;