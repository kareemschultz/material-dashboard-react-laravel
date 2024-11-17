import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SecurityIcon from "@mui/icons-material/Security";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Components
import DepartmentsList from "./components/DepartmentsList";
import DepartmentAccessOverview from "./components/DepartmentAccessOverview";
import NewDepartmentModal from "./components/NewDepartmentModal";

function Departments() {
  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalEmployees: 0,
    pendingRequests: 0,
    biometricRegistered: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartmentStats();
  }, []);

  const fetchDepartmentStats = async () => {
    try {
      // API call here
      setStats({
        totalDepartments: 12,
        totalEmployees: 150,
        pendingRequests: 5,
        biometricRegistered: 120
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Header Section */}
        <MDBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h4" fontWeight="medium">
            Department Management
          </MDTypography>
          <MDButton
            variant="gradient"
            color="info"
            startIcon={<AddCircleIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            New Department
          </MDButton>
        </MDBox>

        {/* Statistics Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<GroupIcon />}
                title="Total Departments"
                count={stats.totalDepartments}
                percentage={{
                  color: "success",
                  amount: "+2",
                  label: "new this month"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<PersonAddIcon />}
                title="Total Employees"
                count={stats.totalEmployees}
                percentage={{
                  color: "success",
                  amount: "+15",
                  label: "increase"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<SecurityIcon />}
                title="Access Requests"
                count={stats.pendingRequests}
                percentage={{
                  color: "warning",
                  amount: stats.pendingRequests,
                  label: "pending approval"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<FingerprintIcon />}
                title="Biometric Registered"
                count={stats.biometricRegistered}
                percentage={{
                  color: "success",
                  amount: "80%",
                  label: "completion"
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Charts & Lists */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DepartmentsList />
            </Grid>
            <Grid item xs={12} md={4}>
              <DepartmentAccessOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      {/* New Department Modal */}
      <NewDepartmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log("New department data:", data);
          setIsModalOpen(false);
        }}
      />
      
      <Footer />
    </DashboardLayout>
  );
}

export default Departments;