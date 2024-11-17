import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SecurityIcon from "@mui/icons-material/Security";
import DnsIcon from "@mui/icons-material/Dns";
import StorageIcon from "@mui/icons-material/Storage";

function ServicesDashboard() {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/v2/services");
      const data = await response.json();
      setServicesData(data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch services");
      setLoading(false);
    }
  };

  const handleMenuClick = (event, service) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(service);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedService(null);
  };

  const getServiceIcon = (type) => {
    switch (type.toLowerCase()) {
      case "ipam":
        return <DnsIcon />;
      case "grafana":
        return <StorageIcon />;
      case "vpn":
        return <SecurityIcon />;
      default:
        return <Icon>settings</Icon>;
    }
  };

  const columns = [
    { Header: "Service", accessor: "name", width: "20%" },
    { 
      Header: "Type", 
      accessor: "type",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          {getServiceIcon(value)}
          <MDTypography variant="caption" color="text" ml={1}>
            {value}
          </MDTypography>
        </MDBox>
      )
    },
    { Header: "Status", accessor: "status" },
    { 
      Header: "Users",
      accessor: "users_count",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text">
          {value || 0} active users
        </MDTypography>
      )
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <Tooltip title="Service Actions">
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, row.original)}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
            <MenuItem onClick={handleMenuClose}>Manage Access</MenuItem>
            <MenuItem onClick={handleMenuClose}>View Status</MenuItem>
            <MenuItem onClick={handleMenuClose}>Export Users</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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
                <MDTypography variant="h6" color="white">
                  Services Management
                </MDTypography>
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={() => {/* Handle new service */}}
                >
                  Add New Service
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {error && (
                  <MDAlert color="error" dismissible>
                    {error}
                  </MDAlert>
                )}
                <DataTable
                  table={{ columns, rows: servicesData }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  loading={loading}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ServicesDashboard;