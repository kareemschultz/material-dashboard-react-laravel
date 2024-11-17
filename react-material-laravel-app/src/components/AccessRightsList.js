import { useState } from "react";
import {
  Card,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import SecurityIcon from "@mui/icons-material/Security";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

function AccessRightsList({ entityId, entityType = "service", onAccessChange }) {
  const [selectedAccess, setSelectedAccess] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessForm, setAccessForm] = useState({
    userId: "",
    accessLevel: "read",
    expiresAt: "",
    permissions: []
  });

  const handleMenuClick = (event, access) => {
    setSelectedAccess(access);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedAccess(null);
  };

  const handleEditAccess = () => {
    setAccessForm({
      userId: selectedAccess.userId,
      accessLevel: selectedAccess.accessLevel,
      expiresAt: selectedAccess.expiresAt,
      permissions: selectedAccess.permissions || []
    });
    handleMenuClose();
    setDialogOpen(true);
  };

  const handleRevokeAccess = async () => {
    try {
      setLoading(true);
      // API call would go here
      await onAccessChange?.('revoke', selectedAccess);
      handleMenuClose();
    } catch (error) {
      console.error('Failed to revoke access:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAccess = async () => {
    try {
      setLoading(true);
      // API call would go here
      await onAccessChange?.('update', { ...selectedAccess, ...accessForm });
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to update access:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon color="success" />;
      case 'expired':
        return <ErrorIcon color="error" />;
      case 'pending':
        return <AccessTimeIcon color="warning" />;
      default:
        return <BlockIcon color="error" />;
    }
  };

  const getAccessLevelIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'admin':
        return <SecurityIcon color="error" />;
      case 'write':
        return <VpnKeyIcon color="warning" />;
      case 'read':
        return <VpnKeyIcon color="info" />;
      default:
        return <VpnKeyIcon />;
    }
  };

  const columns = [
    {
      Header: "User",
      accessor: "user",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          <Chip
            label={value.name[0].toUpperCase()}
            color="primary"
            size="small"
            sx={{ mr: 1, width: 28, height: 28 }}
          />
          <MDBox>
            <MDTypography variant="button" fontWeight="medium">
              {value.name}
            </MDTypography>
            <MDTypography variant="caption" color="text" display="block">
              {value.email}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
    },
    {
      Header: "Access Level",
      accessor: "accessLevel",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          {getAccessLevelIcon(value)}
          <MDTypography variant="caption" fontWeight="medium" ml={1}>
            {value.toUpperCase()}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <MDBox display="flex" alignItems="center">
          {getStatusIcon(value)}
          <MDTypography variant="caption" fontWeight="medium" ml={1}>
            {value.toUpperCase()}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Expires",
      accessor: "expiresAt",
      Cell: ({ value }) => (
        value ? (
          <MDTypography variant="caption" color="text">
            {new Date(value).toLocaleDateString()}
          </MDTypography>
        ) : (
          <MDTypography variant="caption" color="text">
            Never
          </MDTypography>
        )
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <IconButton
            size="small"
            onClick={(e) => handleMenuClick(e, row.original)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditAccess}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Edit Access
            </MenuItem>
            <MenuItem onClick={handleRevokeAccess} sx={{ color: 'error.main' }}>
              <BlockIcon fontSize="small" sx={{ mr: 1 }} />
              Revoke Access
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Sample data - replace with API call
  const rows = [
    {
      user: { name: "John Doe", email: "john@example.com" },
      accessLevel: "admin",
      status: "active",
      expiresAt: "2024-12-31",
      permissions: ["read", "write", "admin"],
    },
    // Add more rows...
  ];

  return (
    <>
      <Card>
        <MDBox p={3}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <MDTypography variant="h6">Access Rights</MDTypography>
            <MDButton
              variant="gradient"
              color="info"
              size="small"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                setSelectedAccess(null);
                setDialogOpen(true);
              }}
            >
              Grant Access
            </MDButton>
          </MDBox>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

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

      {/* Access Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAccess ? "Edit Access Rights" : "Grant Access"}
        </DialogTitle>
        <DialogContent>
          <MDBox p={2}>
            <Grid container spacing={2}>
              {!selectedAccess && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="User ID or Email"
                    value={accessForm.userId}
                    onChange={(e) => setAccessForm(prev => ({ ...prev, userId: e.target.value }))}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Access Level"
                  value={accessForm.accessLevel}
                  onChange={(e) => setAccessForm(prev => ({ ...prev, accessLevel: e.target.value }))}
                >
                  <MenuItem value="read">Read Only</MenuItem>
                  <MenuItem value="write">Write</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Expires At"
                  value={accessForm.expiresAt}
                  onChange={(e) => setAccessForm(prev => ({ ...prev, expiresAt: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleSaveAccess} color="info" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : selectedAccess ? "Update" : "Grant"}
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AccessRightsList;