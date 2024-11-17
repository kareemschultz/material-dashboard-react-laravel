import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Chip,
  Menu,
  LinearProgress,
  Box,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Import the ManageAccessModal
import ManageAccessModal from "./ManageAccessModal";

// Icons
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import HubIcon from "@mui/icons-material/Hub";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function EmployeeAccessList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickFilters, setQuickFilters] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  const handleQuickFilterToggle = (filter) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const AccessIcon = ({ granted, type, onClick }) => {
    const iconProps = {
      sx: { 
        fontSize: "1.5rem",
        color: granted ? "success.main" : "error.light",
        transition: "all 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
          color: granted ? "success.dark" : "error.main",
        }
      },
      onClick: onClick
    };

    const getIcon = () => {
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

    return (
      <Tooltip 
        title={
          <Box>
            <MDTypography variant="caption" color="white" fontWeight="bold">
              {type.toUpperCase()}
            </MDTypography>
            <MDTypography variant="caption" color="white" display="block">
              Status: {granted ? 'Granted' : 'Not Granted'}
            </MDTypography>
            <MDTypography variant="caption" color="white" display="block">
              Click to {granted ? 'revoke' : 'grant'} access
            </MDTypography>
          </Box>
        }
      >
        {getIcon()}
      </Tooltip>
    );
  };

  const EmployeeRow = ({ employee }) => {
    const [rowHovered, setRowHovered] = useState(false);

    return (
      <MDBox 
        p={2} 
        mb={1} 
        bgcolor={rowHovered ? "grey.100" : "white"} 
        borderRadius="lg" 
        shadow="sm"
        onMouseEnter={() => setRowHovered(true)}
        onMouseLeave={() => setRowHovered(false)}
        sx={{ transition: "all 0.2s" }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={3}>
            <MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                {employee.name}
              </MDTypography>
              <MDBox display="flex" alignItems="center">
                <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                <MDTypography variant="caption" color="text">
                  Employed: {employee.employedDate}
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={2}>
            <Chip 
              label={employee.department}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox display="flex" alignItems="center" gap={2}>
              <AccessIcon 
                granted={employee.biometric} 
                type="biometric"
                onClick={() => handleQuickAccessToggle(employee.id, 'biometric')}
              />
              <AccessIcon 
                granted={employee.vpn} 
                type="vpn"
                onClick={() => handleQuickAccessToggle(employee.id, 'vpn')}
              />
              <AccessIcon 
                granted={employee.grafana} 
                type="grafana"
                onClick={() => handleQuickAccessToggle(employee.id, 'grafana')}
              />
              <AccessIcon 
                granted={employee.ipam} 
                type="ipam"
                onClick={() => handleQuickAccessToggle(employee.id, 'ipam')}
              />
              <AccessIcon 
                granted={employee.teleport} 
                type="teleport"
                onClick={() => handleQuickAccessToggle(employee.id, 'teleport')}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={1}>
            <MDBox display="flex" justifyContent="flex-end">
              <Tooltip title="Manage Access">
                <IconButton 
                  size="small"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setIsModalOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                size="small"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    );
  };

  const handleExport = () => {
    // Implementation for exporting data
    console.log("Exporting data...");
  };

  const handleImport = () => {
    // Implementation for importing data
    console.log("Importing data...");
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Implement refresh logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  // Sample data and the rest of the implementation...

  return (
    <Card>
      <MDBox p={3}>
        {/* Header Section */}
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <MDBox>
            <MDTypography variant="h5" fontWeight="medium">
              Employee Access Management
            </MDTypography>
            <MDTypography variant="caption" color="text">
              Manage access rights and permissions for all employees
            </MDTypography>
          </MDBox>
          <MDBox display="flex" gap={1}>
            <Tooltip title="Import Data">
              <IconButton onClick={handleImport}>
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Data">
              <IconButton onClick={handleExport}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
        </MDBox>

        {/* Search and Filter Section */}
        <Grid container spacing={3} alignItems="center" mb={3}>
          <Grid item xs={12} md={8}>
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
        </Grid>

        {/* Quick Filters */}
        <MDBox mb={3} display="flex" gap={1} flexWrap="wrap">
          {[
            { label: 'Missing Biometric', value: 'no-biometric' },
            { label: 'VPN Access', value: 'vpn' },
            { label: 'New Employees', value: 'new' },
            { label: 'Pending Access', value: 'pending' },
          ].map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              onClick={() => handleQuickFilterToggle(filter.value)}
              color={quickFilters.includes(filter.value) ? "primary" : "default"}
              variant={quickFilters.includes(filter.value) ? "filled" : "outlined"}
            />
          ))}
        </MDBox>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Employee List */}
        <MDBox>
          {/* Add your employee rows here */}
        </MDBox>

        {/* Manage Access Modal */}
        <ManageAccessModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={selectedEmployee}
          onSave={async (accessRights) => {
            // Handle saving access rights
            console.log('Saving access rights:', accessRights);
            setIsModalOpen(false);
          }}
        />

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => setMenuAnchor(null)}>View Details</MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>Access History</MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>Export Profile</MenuItem>
        </Menu>
      </MDBox>
    </Card>
  );
}

export default EmployeeAccessList;