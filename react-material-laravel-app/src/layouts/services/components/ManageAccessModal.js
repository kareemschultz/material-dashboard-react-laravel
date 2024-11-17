import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Switch,
    FormControlLabel,
    TextField,
    MenuItem,
    IconButton,
    Tooltip,
    Chip,
    LinearProgress,
  } from "@mui/material";
  
  import MDBox from "components/MDBox";
  import MDButton from "components/MDButton";
  import MDTypography from "components/MDTypography";
  
  // Icons
  import CloseIcon from "@mui/icons-material/Close";
  import FingerprintIcon from "@mui/icons-material/Fingerprint";
  import VpnKeyIcon from "@mui/icons-material/VpnKey";
  import StorageIcon from "@mui/icons-material/Storage";
  import DnsIcon from "@mui/icons-material/Dns";
  import HubIcon from "@mui/icons-material/Hub";
  import InfoIcon from "@mui/icons-material/Info";
  import HistoryIcon from "@mui/icons-material/History";
  
  function ManageAccessModal({ open, onClose, employee, onSave }) {
    const [accessRights, setAccessRights] = React.useState({
      biometric: employee?.biometric || false,
      vpn: employee?.vpn || false,
      grafana: employee?.grafana || false,
      ipam: employee?.ipam || false,
      teleport: employee?.teleport || false,
    });
  
    const [loading, setLoading] = React.useState(false);
    const [showHistory, setShowHistory] = React.useState(false);
  
    const handleChange = (service) => {
      setAccessRights(prev => ({
        ...prev,
        [service]: !prev[service]
      }));
    };
  
    const handleSave = async () => {
      setLoading(true);
      try {
        await onSave(accessRights);
        onClose();
      } catch (error) {
        console.error('Failed to save access rights:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const ServiceAccessCard = ({ service, icon, description }) => (
      <MDBox
        p={2}
        bgcolor="grey.100"
        borderRadius="lg"
        mb={2}
        sx={{
          transition: 'all 0.3s',
          transform: accessRights[service] ? 'scale(1.02)' : 'scale(1)',
          boxShadow: accessRights[service] ? 3 : 0,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MDBox
              width={48}
              height={48}
              bgcolor={accessRights[service] ? 'success.main' : 'grey.300'}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              {icon}
            </MDBox>
          </Grid>
          <Grid item xs>
            <MDTypography variant="h6" textTransform="capitalize">
              {service}
              {accessRights[service] && (
                <Chip
                  size="small"
                  label="Active"
                  color="success"
                  sx={{ ml: 1 }}
                />
              )}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {description}
            </MDTypography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={accessRights[service]}
                  onChange={() => handleChange(service)}
                  color="success"
                />
              }
              label=""
            />
          </Grid>
        </Grid>
      </MDBox>
    );
  
    const AccessHistory = () => (
      <MDBox mt={3}>
        <MDTypography variant="h6" mb={2}>
          Access History
        </MDTypography>
        {[
          {
            action: "Granted VPN Access",
            by: "Admin User",
            date: "2024-01-15 14:30",
          },
          {
            action: "Revoked IPAM Access",
            by: "Security Team",
            date: "2023-12-20 09:15",
          },
          // Add more history items
        ].map((item, index) => (
          <MDBox
            key={index}
            p={1.5}
            mb={1}
            bgcolor="grey.100"
            borderRadius="lg"
            display="flex"
            alignItems="center"
          >
            <HistoryIcon sx={{ mr: 1 }} />
            <MDBox>
              <MDTypography variant="button">{item.action}</MDTypography>
              <MDTypography variant="caption" color="text" display="block">
                By: {item.by} | {item.date}
              </MDTypography>
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
    );
  
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <MDBox>
              <MDTypography variant="h6">
                Manage Access Rights - {employee?.name}
              </MDTypography>
              <MDTypography variant="caption" color="text">
                Department: {employee?.department}
              </MDTypography>
            </MDBox>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </MDBox>
        </DialogTitle>
  
        <DialogContent>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
  
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ServiceAccessCard
                service="biometric"
                icon={<FingerprintIcon />}
                description="Physical access control and time tracking"
              />
              <ServiceAccessCard
                service="vpn"
                icon={<VpnKeyIcon />}
                description="Remote access to internal network"
              />
              <ServiceAccessCard
                service="grafana"
                icon={<StorageIcon />}
                description="Monitoring and analytics dashboards"
              />
              <ServiceAccessCard
                service="ipam"
                icon={<DnsIcon />}
                description="IP address management system"
              />
              <ServiceAccessCard
                service="teleport"
                icon={<HubIcon />}
                description="Secure server access and tunneling"
              />
            </Grid>
  
            <Grid item xs={12} md={4}>
              <MDBox bgcolor="grey.100" p={2} borderRadius="lg">
                <MDBox display="flex" alignItems="center" mb={2}>
                  <InfoIcon sx={{ mr: 1 }} />
                  <MDTypography variant="h6">Access Details</MDTypography>
                </MDBox>
                
                <TextField
                  fullWidth
                  select
                  label="Access Level"
                  value="standard"
                  size="small"
                  margin="normal"
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
  
                <TextField
                  fullWidth
                  label="Access Duration"
                  select
                  value="permanent"
                  size="small"
                  margin="normal"
                >
                  <MenuItem value="temporary">Temporary (30 days)</MenuItem>
                  <MenuItem value="extended">Extended (90 days)</MenuItem>
                  <MenuItem value="permanent">Permanent</MenuItem>
                </TextField>
  
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Access Notes"
                  placeholder="Add any relevant notes..."
                  size="small"
                  margin="normal"
                />
  
                <MDButton
                  variant="outlined"
                  color="info"
                  fullWidth
                  onClick={() => setShowHistory(!showHistory)}
                  startIcon={<HistoryIcon />}
                  sx={{ mt: 2 }}
                >
                  {showHistory ? 'Hide History' : 'View History'}
                </MDButton>
              </MDBox>
  
              {showHistory && <AccessHistory />}
            </Grid>
          </Grid>
        </DialogContent>
  
        <DialogActions>
          <MDButton onClick={onClose} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleSave} color="info" variant="gradient">
            Save Changes
          </MDButton>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default ManageAccessModal;