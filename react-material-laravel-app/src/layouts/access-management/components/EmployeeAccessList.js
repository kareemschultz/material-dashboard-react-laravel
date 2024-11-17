import { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import HubIcon from "@mui/icons-material/Hub";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FilterListIcon from "@mui/icons-material/FilterList";

function EmployeeAccessList() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Sample data
  const employees = [
    {
      id: 1,
      name: "Christopher Deen",
      department: "General Manager",
      employedDate: "2021.02.03",
      biometric: true,
      vpn: true,
      grafana: true,
      ipam: true,
      teleport: true,
    },
    {
      id: 2,
      name: "Navendra Jadubeer",
      department: "Personal Assistant",
      employedDate: "2021.03.01",
      biometric: true,
      vpn: false,
      grafana: true,
      ipam: false,
      teleport: false,
    },
    // Add more employees...
  ];

  const ServiceIcon = ({ type, active }) => {
    const iconProps = {
      sx: {
        fontSize: "1.5rem",
        color: active ? "success.main" : "error.main",
        transition: "all 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
        }
      }
    };

    switch (type) {
      case "biometric":
        return <FingerprintIcon {...iconProps} />;
      case "vpn":
        return <VpnKeyIcon {...iconProps} />;
      case "grafana":
        return <StorageIcon {...iconProps} />;
      case "ipam":
        return <DnsIcon {...iconProps} />;
      case "teleport":
        return <HubIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const EmployeeRow = ({ employee }) => (
    <MDBox
      p={2}
      mb={2}
      bgcolor="white"
      borderRadius="lg"
      shadow="sm"
      sx={{
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateX(6px)",
          boxShadow: 2,
        }
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              {employee.name}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              Employed: {employee.employedDate}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={2}>
          <Chip 
            label={employee.department} 
            size="small"
            color="info"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox display="flex" alignItems="center" gap={2}>
            <Tooltip title={`Biometric: ${employee.biometric ? 'Active' : 'Inactive'}`}>
              <span>
                <ServiceIcon type="biometric" active={employee.biometric} />
              </span>
            </Tooltip>
            <Tooltip title={`VPN: ${employee.vpn ? 'Active' : 'Inactive'}`}>
              <span>
                <ServiceIcon type="vpn" active={employee.vpn} />
              </span>
            </Tooltip>
            <Tooltip title={`Grafana: ${employee.grafana ? 'Active' : 'Inactive'}`}>
              <span>
                <ServiceIcon type="grafana" active={employee.grafana} />
              </span>
            </Tooltip>
            <Tooltip title={`IPAM: ${employee.ipam ? 'Active' : 'Inactive'}`}>
              <span>
                <ServiceIcon type="ipam" active={employee.ipam} />
              </span>
            </Tooltip>
            <Tooltip title={`Teleport: ${employee.teleport ? 'Active' : 'Inactive'}`}>
              <span>
                <ServiceIcon type="teleport" active={employee.teleport} />
              </span>
            </Tooltip>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={1}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </MDBox>
  );

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="it">IT Department</MenuItem>
              <MenuItem value="management">Management</MenuItem>
              <MenuItem value="operations">Operations</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Tooltip title="Add Employee">
              <IconButton color="primary">
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filters">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {employees.map((employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        ))}
      </MDBox>
    </Card>
  );
}

export default EmployeeAccessList;