import { useState } from "react";
import { Card, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DnsIcon from "@mui/icons-material/Dns";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import EventNoteIcon from "@mui/icons-material/EventNote";

function ServicesList() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleMenuClick = (event, service) => {
    setSelectedService(service);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedService(null);
  };

  const getServiceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'ipam':
        return <DnsIcon color="info" />;
      case 'grafana':
        return <StorageIcon color="warning" />;
      case 'vpn':
        return <SecurityIcon color="success" />;
      default:
        return <EventNoteIcon color="primary" />;
    }
  };

  const columns = [
    {
      Header: "Service",
      accessor: "name",
      Cell: ({ value, row }) => (
        <MDBox display="flex" alignItems="center">
          {getServiceIcon(row.original.type)}
          <MDTypography variant="button" fontWeight="medium" ml={1}>
            {value}
          </MDTypography>
        </MDBox>
      ),
    },
    { Header: "Type", accessor: "type" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <MDBox
          px={1}
          py={0.5}
          borderRadius="lg"
          bgColor={value === "active" ? "success" : "error"}
          variant="gradient"
          width="80px"
          textAlign="center"
        >
          <MDTypography variant="caption" color="white" fontWeight="medium">
            {value.toUpperCase()}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Users",
      accessor: "users",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text">
          {value} active users
        </MDTypography>
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
            <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
            <MenuItem onClick={handleMenuClose}>Manage Access</MenuItem>
            <MenuItem onClick={handleMenuClose}>Edit Service</MenuItem>
            <MenuItem onClick={handleMenuClose}>View Logs</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Sample data
  const rows = [
    {
      name: "IPAM System",
      type: "ipam",
      status: "active",
      users: 45,
    },
    {
      name: "Grafana Dashboard",
      type: "grafana",
      status: "active",
      users: 32,
    },
    {
      name: "VPN Access",
      type: "vpn",
      status: "active",
      users: 78,
    },
  ];

  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <MDTypography variant="h6">Services Overview</MDTypography>
          <Tooltip title="Export">
            <IconButton size="small">
              <EventNoteIcon />
            </IconButton>
          </Tooltip>
        </MDBox>
        <DataTable
          table={{ columns, rows }}
          isSorted={true}
          entriesPerPage={true}
          showTotalEntries={true}
          noEndBorder
          canSearch={true}
        />
      </MDBox>
    </Card>
  );
}

export default ServicesList;