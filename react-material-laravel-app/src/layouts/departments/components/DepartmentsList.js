import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Icon,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  LinearProgress
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SecurityIcon from "@mui/icons-material/Security";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Assessment } from "@mui/icons-material";

function DepartmentsList() {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleActionClick = (event, department) => {
    setSelectedDept(department);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedDept(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'info';
    }
  };

  const getMetricIcon = (type) => {
    switch (type) {
      case 'members':
        return <GroupIcon fontSize="small" />;
      case 'access':
        return <SecurityIcon fontSize="small" />;
      case 'biometric':
        return <FingerprintIcon fontSize="small" />;
      default:
        return <Assessment fontSize="small" />;
    }
  };

  const MetricBox = ({ icon, value, label }) => (
    <MDBox display="flex" alignItems="center">
      <MDBox
        mr={1}
        display="flex"
        bgcolor="grey.100"
        borderRadius="lg"
        p={1}
        color="inherit"
      >
        {icon}
      </MDBox>
      <MDBox>
        <MDTypography variant="h6" fontWeight="medium">
          {value}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {label}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Department", accessor: "name", width: "25%" },
    {
      Header: "Status",
      accessor: "status",
      width: "10%",
      Cell: ({ value }) => (
        <Chip
          label={value}
          color={getStatusColor(value)}
          size="small"
          sx={{ minWidth: 75 }}
        />
      ),
    },
    {
      Header: "Members",
      accessor: "members",
      Cell: ({ value }) => (
        <MetricBox
          icon={getMetricIcon('members')}
          value={value}
          label="Total Members"
        />
      ),
    },
    {
      Header: "Access Stats",
      accessor: "accessStats",
      Cell: ({ value }) => (
        <MDBox>
          <LinearProgress 
            variant="determinate" 
            value={(value.granted / value.total) * 100}
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
          <MDTypography variant="caption" color="text">
            {value.granted} / {value.total} Services Granted
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Biometric",
      accessor: "biometric",
      Cell: ({ value }) => (
        <MetricBox
          icon={getMetricIcon('biometric')}
          value={`${value}%`}
          label="Registered"
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <IconButton
            size="small"
            onClick={(e) => handleActionClick(e, row.original)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate(`/departments/${selectedDept?.id}`)}>
              <EditIcon sx={{ mr: 1 }} fontSize="small" />
              View Details
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <SecurityIcon sx={{ mr: 1 }} fontSize="small" />
              Manage Access
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Sample data - replace with API call
  const rows = [
    {
      id: 1,
      name: "IT Department",
      status: "active",
      members: 25,
      accessStats: { granted: 75, total: 100 },
      biometric: 90,
    },
    {
      id: 2,
      name: "HR Department",
      status: "active",
      members: 15,
      accessStats: { granted: 45, total: 80 },
      biometric: 85,
    },
    // Add more departments...
  ];

  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6">Departments Overview</MDTypography>
          <MDBox display="flex" gap={1}>
            <Tooltip title="Export Data">
              <IconButton size="small">
                <Icon>download</Icon>
              </IconButton>
            </Tooltip>
          </MDBox>
        </MDBox>
        
        <MDBox mt={3}>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={true}
            isSorted={true}
            noEndBorder
            entriesPerPage={true}
            canSearch={true}
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default DepartmentsList;