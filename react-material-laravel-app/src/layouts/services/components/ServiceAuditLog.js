import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Icons
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BlockIcon from "@mui/icons-material/Block";
import EventIcon from "@mui/icons-material/Event";

function ServiceAuditLog({ serviceId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    actionType: "all",
    dateRange: "all",
    user: "",
  });

  // Event type configurations
  const eventTypes = {
    access_granted: {
      icon: <VpnKeyIcon fontSize="small" />,
      color: "success",
      label: "Access Granted",
    },
    access_revoked: {
      icon: <BlockIcon fontSize="small" />,
      color: "error",
      label: "Access Revoked",
    },
    settings_changed: {
      icon: <SettingsIcon fontSize="small" />,
      color: "info",
      label: "Settings Changed",
    },
    security_event: {
      icon: <SecurityIcon fontSize="small" />,
      color: "warning",
      label: "Security Event",
    },
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [serviceId, filters]);

  const fetchAuditLogs = async () => {
    try {
      // API call would go here
      // For now, using mock data
      setLogs([
        {
          id: 1,
          timestamp: new Date().toISOString(),
          eventType: "access_granted",
          user: "John Doe",
          details: "Granted access to IPAM system",
          ipAddress: "192.168.1.100",
          metadata: {
            accessLevel: "admin",
            grantedBy: "Jane Smith",
          },
        },
        // Add more mock logs...
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportLogs = () => {
    // Implementation for exporting logs
    console.log("Exporting logs...");
  };

  const columns = [
    {
      Header: "Event Type",
      accessor: "eventType",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          <MDBox
            component="span"
            width={34}
            height={34}
            mr={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            bgColor={eventTypes[value].color}
            color="white"
          >
            {eventTypes[value].icon}
          </MDBox>
          <MDTypography variant="button" fontWeight="medium">
            {eventTypes[value].label}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "User",
      accessor: "user",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          <PersonIcon sx={{ mr: 1 }} fontSize="small" />
          <MDTypography variant="button">{value}</MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Details",
      accessor: "details",
      width: "40%",
      Cell: ({ value, row }) => (
        <MDBox>
          <MDTypography variant="button">{value}</MDTypography>
          {row.original.metadata && (
            <MDBox mt={0.5} display="flex" gap={1}>
              {Object.entries(row.original.metadata).map(([key, value]) => (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  size="small"
                  color="default"
                  variant="outlined"
                />
              ))}
            </MDBox>
          )}
        </MDBox>
      ),
    },
    {
      Header: "IP Address",
      accessor: "ipAddress",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text">
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "Timestamp",
      accessor: "timestamp",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          <EventIcon sx={{ mr: 1 }} fontSize="small" />
          <MDTypography variant="caption">
            {new Date(value).toLocaleString()}
          </MDTypography>
        </MDBox>
      ),
    },
  ];

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <MDTypography variant="h6" fontWeight="medium">
              Audit Log
            </MDTypography>
            <MDTypography variant="caption" color="text">
              Detailed activity history and security events
            </MDTypography>
          </Grid>
          <Grid item>
            <MDBox display="flex" gap={1}>
              <Tooltip title="Export Logs">
                <IconButton onClick={exportLogs}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={3} mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Event Type"
                value={filters.actionType}
                onChange={(e) => handleFilterChange('actionType', e.target.value)}
                size="small"
              >
                <MenuItem value="all">All Events</MenuItem>
                {Object.entries(eventTypes).map(([key, config]) => (
                  <MenuItem key={key} value={key}>
                    <MDBox display="flex" alignItems="center">
                      {config.icon}
                      <MDTypography ml={1} variant="button">
                        {config.label}
                      </MDTypography>
                    </MDBox>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Time Range"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                size="small"
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search User"
                value={filters.user}
                onChange={(e) => handleFilterChange('user', e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
        </MDBox>

        <Divider />

        <MDBox mt={3}>
          <DataTable
            table={{ columns, rows: logs }}
            canSearch
            showTotalEntries
            isSorted
            noEndBorder
            entriesPerPage
            loading={loading}
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ServiceAuditLog;