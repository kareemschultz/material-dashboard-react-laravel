import { Card, LinearProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";

function MetricsCard({ title, value, icon, color = "info", trend, progress }) {
  return (
    <Card>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3rem"
            height="3rem"
            borderRadius="lg"
            color="white"
            bgColor={color}
            variant="gradient"
            mr={2}
          >
            {icon}
          </MDBox>
          <MDBox>
            <MDTypography variant="button" textTransform="capitalize" fontWeight="medium">
              {title}
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox mt={2} mb={1}>
          <MDTypography variant="h4" fontWeight="medium">
            {value}
          </MDTypography>
        </MDBox>

        {trend && (
          <MDTypography variant="caption" color={trend.value.startsWith("+") ? "success" : "error"}>
            {trend.value} {trend.label}
          </MDTypography>
        )}

        {typeof progress === "number" && (
          <MDBox mt={2}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={color}
              sx={{
                height: 6,
                borderRadius: 3,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                },
              }}
            />
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default MetricsCard;