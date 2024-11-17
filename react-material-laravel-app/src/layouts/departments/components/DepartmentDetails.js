import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  Tab,
  Tabs,
  Chip,
  Avatar,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SecurityIcon from "@mui/icons-material/Security";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import MetricsCard from "components/MetricsCard";
import AccessRightsList from "components/AccessRightsList";
import UsersList from "components/UsersList";
import ActivityTimeline from "components/ActivityTimeline";

function DepartmentDetails() {
  const { departmentId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    fetchDepartmentDetails();
  }, [departmentId]);

  const fetchDepartmentDetails = async () => {
    try {
      // API call would go here
      setDepartment({
        id: departmentId,
        name: "IT Department",
        code: "IT-001",
        status: "active",
        metrics: {
          totalMembers: 45,
          activeMembers: 42,
          pendingRequests: 3,
          accessRights: 156,
          biometricRegistered: 40,
        },
        recentActivities: [
          {
            type: "access_granted",
            user: "John Doe",
            service: "IPAM",
            timestamp: "2024-11-16T10:30:00",
          },
          // Add more activities...
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch department details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* Header Section */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDTypography variant="h6" color="white">
                    {department.name}
                  </MDTypography>
                  <MDTypography variant="caption" color="white" opacity={0.8}>
                    Department Code: {department.code}
                  </MDTypography>
                </MDBox>
                <Chip
                  label={department.status.toUpperCase()}
                  color={department.status === "active" ? "success" : "error"}
                  size="small"
                />
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={3}>
                  {/* Metrics Cards */}
                  <Grid item xs={12} md={4}>
                    <MetricsCard
                      title="Total Members"
                      value={department.metrics.totalMembers}
                      icon={<GroupIcon />}
                      color="info"
                      trend={{ value: "+5%", label: "than last month" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MetricsCard
                      title="Access Rights"
                      value={department.metrics.accessRights}
                      icon={<VpnKeyIcon />}
                      color="success"
                      trend={{ value: "+12", label: "new this week" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MetricsCard
                      title="Biometric Registered"
                      value={`${(department.metrics.biometricRegistered / department.metrics.totalMembers * 100).toFixed(0)}%`}
                      icon={<SecurityIcon />}
                      color="warning"
                      progress={department.metrics.biometricRegistered / department.metrics.totalMembers * 100}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <MDBox mt={3}>
          <Card>
            <MDBox p={2}>
              <Tabs
                value={activeTab}
                onChange={(e, value) => setActiveTab(value)}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab 
                  icon={<GroupIcon />} 
                  label="Members" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<SecurityIcon />} 
                  label="Access Rights" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<AssessmentIcon />} 
                  label="Analytics" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<EventNoteIcon />} 
                  label="Activity" 
                  iconPosition="start"
                />
              </Tabs>
            </MDBox>

            <MDBox p={3}>
              {activeTab === 0 && (
                <UsersList
                  departmentId={departmentId}
                  onAddUser={() => {}}
                  onRemoveUser={() => {}}
                />
              )}
              {activeTab === 1 && (
                <AccessRightsList
                  departmentId={departmentId}
                  onGrantAccess={() => {}}
                  onRevokeAccess={() => {}}
                />
              )}
              {activeTab === 2 && (
                <DepartmentAnalytics departmentId={departmentId} />
              )}
              {activeTab === 3 && (
                <ActivityTimeline
                  activities={department.recentActivities}
                />
              )}
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DepartmentDetails;