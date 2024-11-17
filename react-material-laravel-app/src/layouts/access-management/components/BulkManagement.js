import { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  MenuItem,
  LinearProgress,
  IconButton,
  Tooltip,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";

function BulkManagement() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [services, setServices] = useState({
    biometric: true,
    vpn: true,
    grafana: true,
    ipam: true,
    teleport: true,
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Here you would typically parse the CSV/Excel file
    // For demo, we'll use sample data
    setPreviewData([
      {
        name: "John Doe",
        department: "IT",
        status: "pending",
        error: null,
      },
      {
        name: "Jane Smith",
        department: "HR",
        status: "error",
        error: "Invalid department",
      },
      // Add more preview data...
    ]);
  };

  const handleDownloadTemplate = () => {
    // Implementation for downloading template
    console.log("Downloading template...");
  };

  const handleServiceToggle = (service) => {
    setServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Implementation for submitting bulk changes
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Card>
          <MDBox p={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <MDTypography variant="h6">Bulk Access Management</MDTypography>
              <Tooltip title="Download Template">
                <IconButton onClick={handleDownloadTemplate}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
            </MDBox>

            {/* File Upload Section */}
            <MDBox 
              border="2px dashed"
              borderColor="grey.300"
              borderRadius="lg"
              p={3}
              textAlign="center"
              mb={3}
            >
              <input
                type="file"
                accept=".csv,.xlsx"
                style={{ display: 'none' }}
                id="file-upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <MDButton
                  variant="contained"
                  color="info"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload File
                </MDButton>
              </label>
              {selectedFile && (
                <MDBox mt={2}>
                  <Chip
                    label={selectedFile.name}
                    onDelete={() => setSelectedFile(null)}
                    color="primary"
                  />
                </MDBox>
              )}
            </MDBox>

            {/* Preview Section */}
            {previewData.length > 0 && (
              <MDBox>
                <MDTypography variant="h6" gutterBottom>
                  Preview
                </MDTypography>
                {previewData.map((item, index) => (
                  <MDBox
                    key={index}
                    p={2}
                    mb={1}
                    bgcolor="grey.100"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                  >
                    {item.status === "error" ? (
                      <ErrorIcon color="error" sx={{ mr: 1 }} />
                    ) : (
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    )}
                    <MDBox flex={1}>
                      <MDTypography variant="button" fontWeight="medium">
                        {item.name}
                      </MDTypography>
                      <MDTypography variant="caption" color="text" display="block">
                        Department: {item.department}
                      </MDTypography>
                      {item.error && (
                        <MDTypography variant="caption" color="error">
                          Error: {item.error}
                        </MDTypography>
                      )}
                    </MDBox>
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </MDBox>
                ))}
              </MDBox>
            )}

            {loading && <LinearProgress sx={{ mt: 2 }} />}
          </MDBox>
        </Card>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" gutterBottom>
              Bulk Update Settings
            </MDTypography>

            <TextField
              fullWidth
              select
              label="Target Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              margin="normal"
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="it">IT Department</MenuItem>
              <MenuItem value="hr">HR Department</MenuItem>
              <MenuItem value="operations">Operations</MenuItem>
            </TextField>

            <MDBox mt={3}>
              <MDTypography variant="subtitle2" gutterBottom>
                Services to Update
              </MDTypography>
              {Object.entries(services).map(([service, enabled]) => (
                <FormControlLabel
                  key={service}
                  control={
                    <Switch
                      checked={enabled}
                      onChange={() => handleServiceToggle(service)}
                      color="primary"
                    />
                  }
                  label={service.toUpperCase()}
                />
              ))}
            </MDBox>

            <MDBox mt={3} display="flex" gap={1}>
              <Tooltip title="Any changes will be logged and can be reversed">
                <InfoIcon color="info" />
              </Tooltip>
              <MDTypography variant="caption" color="text">
                Changes will be logged in the audit trail
              </MDTypography>
            </MDBox>

            <MDBox mt={3}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSubmit}
                disabled={!selectedFile || loading}
              >
                {loading ? "Processing..." : "Apply Changes"}
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BulkManagement;