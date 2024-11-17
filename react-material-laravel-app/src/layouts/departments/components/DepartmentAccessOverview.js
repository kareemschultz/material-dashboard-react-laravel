import { useState, useEffect } from "react";
import { Card, Icon, Divider, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SecurityIcon from "@mui/icons-material/Security";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

function DepartmentAccessOverview() {
  const [loading, setLoading] = useState(true);
  const [accessData, setAccessData] = useState([]);

  // Sample colors for the pie chart
  const COLORS = ['#2196f3', '#4caf50', '#f44336', '#ff9800'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAccessData([
        { name: 'Full Access', value: 35, icon: <SecurityIcon />, color: '#2196f3' },
        { name: 'Limited Access', value: 45, icon: <VpnKeyIcon />, color: '#4caf50' },
        { name: 'No Access', value: 15, icon: <BlockIcon />, color: '#f44336' },
        { name: 'Pending', value: 5, icon: <PendingIcon />, color: '#ff9800' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const AccessStatItem = ({ data }) => (
    <MDBox display="flex" alignItems="center" mb={2}>
      <MDBox
        variant="contained"
        bgColor={data.color}
        color="white"
        width="2rem"
        height="2rem"
        mr={2}
        borderRadius="lg"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {data.icon}
      </MDBox>
      <MDBox flex={1}>
        <MDTypography variant="button" fontWeight="medium">
          {data.name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {data.value} Departments
        </MDTypography>
      </MDBox>
      <MDTypography variant="h6">
        {Math.round((data.value / accessData.reduce((acc, curr) => acc + curr.value, 0)) * 100)}%
      </MDTypography>
    </MDBox>
  );

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox p={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              Access Distribution
            </MDTypography>
            <MDTypography variant="button" color="text">
              Department Access Overview
            </MDTypography>
          </MDBox>
          <Icon>more_horiz</Icon>
        </MDBox>

        {/* Chart Section */}
        <MDBox mt={3} position="relative" height="200px">
          {loading ? (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </MDBox>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {accessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Departments`, 'Count']}
                  contentStyle={{ borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </MDBox>

        <Divider sx={{ my: 3 }} />

        {/* Stats Section */}
        <MDBox>
          {accessData.map((item, index) => (
            <AccessStatItem key={index} data={item} />
          ))}
        </MDBox>

        {/* Recent Activity */}
        <MDBox mt={3}>
          <MDTypography variant="h6" fontWeight="medium">
            Recent Activity
          </MDTypography>
          <MDBox mt={2}>
            {[
              {
                icon: <CheckCircleIcon />,
                color: "success",
                title: "IT Department",
                description: "Granted full access to IPAM",
                time: "2 minutes ago"
              },
              {
                icon: <PendingIcon />,
                color: "warning",
                title: "HR Department",
                description: "Requested access to Grafana",
                time: "5 minutes ago"
              }
            ].map((activity, index) => (
              <MDBox key={index} mb={2} display="flex" alignItems="flex-start">
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="2rem"
                  height="2rem"
                  borderRadius="lg"
                  color="white"
                  bgColor={activity.color}
                  mr={2}
                >
                  {activity.icon}
                </MDBox>
                <MDBox flex={1}>
                  <MDTypography variant="button" fontWeight="medium">
                    {activity.title}
                  </MDTypography>
                  <MDTypography variant="caption" color="text" display="block">
                    {activity.description}
                  </MDTypography>
                  <MDTypography variant="caption" color="text" fontStyle="italic">
                    {activity.time}
                  </MDTypography>
                </MDBox>
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default DepartmentAccessOverview;