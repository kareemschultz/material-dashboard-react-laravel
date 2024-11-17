import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Icons for different department types
import BusinessIcon from "@mui/icons-material/Business";
import CodeIcon from "@mui/icons-material/Code";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SupportIcon from "@mui/icons-material/Support";
import SecurityIcon from "@mui/icons-material/Security";

const departmentTypes = [
  { value: "it", label: "IT Department", icon: <CodeIcon /> },
  { value: "hr", label: "Human Resources", icon: <BusinessIcon /> },
  { value: "finance", label: "Finance", icon: <AccountBalanceIcon /> },
  { value: "support", label: "Support", icon: <SupportIcon /> },
  { value: "security", label: "Security", icon: <SecurityIcon /> },
];

const steps = ['Basic Info', 'Access Settings', 'Review'];

function NewDepartmentModal({ open, onClose, onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    description: "",
    manager: "",
    accessLevel: "standard",
    autoApprove: false,
    requireMFA: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit(formData);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const BasicInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Department Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Department Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          select
          label="Department Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          {departmentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              <MDBox display="flex" alignItems="center">
                {type.icon}
                <MDTypography ml={1}>{type.label}</MDTypography>
              </MDBox>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );

  const AccessSettings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Default Access Level"
          name="accessLevel"
          value={formData.accessLevel}
          onChange={handleChange}
        >
          <MenuItem value="restricted">Restricted</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="elevated">Elevated</MenuItem>
        </TextField>
      </Grid>
      {/* Add more access settings as needed */}
    </Grid>
  );

  const Review = () => (
    <MDBox>
      <MDTypography variant="h6" gutterBottom>
        Review Department Details
      </MDTypography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MDTypography variant="caption" color="text">
            Name
          </MDTypography>
          <MDTypography variant="body2">{formData.name}</MDTypography>
        </Grid>
        <Grid item xs={6}>
          <MDTypography variant="caption" color="text">
            Code
          </MDTypography>
          <MDTypography variant="body2">{formData.code}</MDTypography>
        </Grid>
        <Grid item xs={12}>
          <MDTypography variant="caption" color="text">
            Type
          </MDTypography>
          <MDTypography variant="body2">
            {departmentTypes.find(t => t.value === formData.type)?.label}
          </MDTypography>
        </Grid>
      </Grid>
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
          <MDTypography variant="h6">Create New Department</MDTypography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>

      <DialogContent>
        <MDBox mb={3}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </MDBox>

        <MDBox mt={2}>
          {activeStep === 0 && <BasicInfo />}
          {activeStep === 1 && <AccessSettings />}
          {activeStep === 2 && <Review />}
        </MDBox>
      </DialogContent>

      <DialogActions>
        <MDButton 
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </MDButton>
        {activeStep > 0 && (
          <MDButton 
            onClick={handleBack}
            color="info"
          >
            Back
          </MDButton>
        )}
        <MDButton 
          onClick={handleNext}
          color="info"
          variant="gradient"
        >
          {activeStep === steps.length - 1 ? 'Create Department' : 'Next'}
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

export default NewDepartmentModal;