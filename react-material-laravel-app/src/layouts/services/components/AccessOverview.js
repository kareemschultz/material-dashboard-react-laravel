import { useState, useEffect } from "react";
import { Card, LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SecurityIcon from "@mui/icons-material/Security";
import BlockIcon from "@mui/icons-material/Block";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

// Custom colors to match your theme
const COLORS = {
  fullAccess: "#2196f3",    // Blue
  limitedAccess: "#4caf50", // Green
  pending: "#ff9800",       // Orange
  revoked: "#f44336"        // Red
};

function AccessOverview() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    setTimeout(() => {
      setData([
        { 
          name: 'Full Access', 
          value: 40,
          color: COLORS.fullAccess, 
          icon: <SecurityIcon />,
          description: "Complete system access"
        },
        { 
          name: 'Limited Access', 
          value: 30, 
          color: COLORS.limitedAccess, 
          icon: <VpnKeyIcon />,
          description: "Restricted permissions"
        },
        { 
          name: 'Pending', 
          value: 20, 
          color: COLORS.pending, 
          icon: <PendingActionsIcon />,
          description: "Awaiting approval"
        },
        { 
          name: 'Revoked', 
          value: 10, 
          color: COLORS.revoked, 
          icon: <BlockIcon />,
          description: "Access removed"
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <Card sx={{ p: 1.5, boxShadow: 2 }}>
          <MDBox display="flex" alignItems="center" mb={1}>
            <MDBox
              component="span"
              width={24}
              height={24}
              mr={1}
              color="white"
              bgColor={item.color}
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {item.icon}
            </MDBox>
            <MDTypography variant="button" fontWeight="medium">
              {item.name}
            </MDTypography>
          </MDBox>
          <MDTypography variant="caption" color="text">
            {item.value}% of users
          </MDTypography>
          <MDTypography variant="caption" color="text" display="block">
            {item.description}
          </MDTypography>
        </Card>
      );
    }
    return null;
  };

  const AccessItem = ({ item }) => (
    <MDBox display="flex" alignItems="center" mb={2}>
      <MDBox
        variant="gradient"
        bgColor="info"
        color="white"
        width="2rem"
        height="2rem"
        mr={2}
        borderRadius="lg"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: item.color }}
      >
        {item.icon}
      </MDBox>
      <MDBox flex={1}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="button" fontWeight="medium">
            {item.name}
          </MDTypography>
          <MDTypography variant="button" fontWeight="bold">
            {item.value}%
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          {item.description}
        </MDTypography>
        <LinearProgress
          variant="determinate"
          value={item.value}
          sx={{
            mt: 0.5,
            height: 4,
            borderRadius: 2,
            bgcolor: `${item.color}22`,
            '& .MuiLinearProgress-bar': {
              bgcolor: item.color,
            },
          }}
        />
      </MDBox>
    </MDBox>
  );

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Access Distribution
        </MDTypography>
        <MDTypography variant="button" color="text">
          Overview of service access rights
        </MDTypography>
        
        {loading ? (
          <MDBox py={5}>
            <LinearProgress />
          </MDBox>
        ) : (
          <>
            <MDBox mt={3} height="200px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.color}
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </MDBox>

            <MDBox mt={3}>
              {data.map((item, index) => (
                <AccessItem key={index} item={item} />
              ))}
            </MDBox>

            <MDBox mt={3} textAlign="center">
              <MDTypography variant="caption" color="text">
                <strong>Last updated:</strong> {new Date().toLocaleString()}
              </MDTypography>
            </MDBox>
          </>
        )}
      </MDBox>
    </Card>
  );
}

export default AccessOverview;