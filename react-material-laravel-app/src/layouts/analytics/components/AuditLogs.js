import { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BlockIcon from '@mui/icons-material/Block';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function AuditLogs() {
  const [timeRange, setTimeRange] = useState('week');
  const [filterType, setFilterType] = useState('all');

  const getActionIcon = (type) => {
    switch (type) {
      case 'access_granted':
        return <VpnKeyIcon color="success" />;
      case 'access_revoked':
        return <BlockIcon color="error" />;
      case 'user_added':
        return <PersonAddIcon color="info" />;
      case 'user_removed':
        return <PersonRemoveIcon color="warning" />;
      default:
        return <SecurityIcon color="primary" />;
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'access_granted':
        return 'success';
      case 'access_revoked':
        return 'error';
      case 'user_added':
        return 'info';
      case 'user_removed':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      Header: "Timestamp",
      accessor: "timestamp",
      width: "15%",
    },
    {
      Header: "Action",
      accessor: "action",
      width: "20%",
      Cell: ({ value, row }) => (
        <MDBox display="flex" alignItems="center">
          {getActionIcon(row.original.type)}
          <MDTypography variant="caption" fontWeight="medium" ml={1}>
            {value}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "User",
      accessor: "user",
      width: "20%",
    },
    {
      Header: "Service",
      accessor: "service",
      width: "15%",
      Cell: ({ value }) => (
        <Chip 
          label={value} 
          size="small" 
          variant="outlined"
        />
      ),
    },
    {
      Header: "Details",
      accessor: "details",
      width: "30%",
    },
  ];

  // Sample data
  const rows = [
    {
      timestamp: "2024-11-16 10:30:00",
      action: "Access Granted",
      type: "access_granted",
      user: "John Doe",
      service: "VPN",
      details: "Granted VPN access with standard permissions",
    },
    // Add more audit log entries...
  ];

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Time Range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="small"
            >
              <MenuItem value="day">Last 24 Hours</MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Action Type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All Actions</MenuItem>
              <MenuItem value="access_granted">Access Granted</MenuItem>
              <MenuItem value="access_revoked">Access Revoked</MenuItem>
              <MenuItem value="user_added">User Added</MenuItem>
              <MenuItem value="user_removed">User Removed</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <DataTable
          table={{ columns, rows }}
          canSearch
          showTotalEntries
          isSorted
          noEndBorder
          entriesPerPage
        />
      </MDBox>
    </Card>
  );
}

export default AuditLogs;