import { useState } from "react";
import { Card, Grid, TextField, MenuItem } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function AccessTrendsChart() {
  const [timeRange, setTimeRange] = useState("month");
  
  // Sample data
  const data = [
    {
      date: "2024-01",
      "Biometric Access": 65,
      "VPN Access": 45,
      "Grafana Access": 35,
      "IPAM Access": 28,
      "Teleport Access": 22,
    },
    // Add more data points...
  ];

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDTypography variant="h6">Access Trends</MDTypography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Time Range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="small"
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <MDBox mt={3} height="400px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Biometric Access" stroke="#8884d8" />
              <Line type="monotone" dataKey="VPN Access" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Grafana Access" stroke="#ffc658" />
              <Line type="monotone" dataKey="IPAM Access" stroke="#ff7300" />
              <Line type="monotone" dataKey="Teleport Access" stroke="#00c49f" />
            </LineChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox mt={3}>
          <Grid container spacing={2}>
            {Object.entries(data[data.length - 1] || {})
              .filter(([key]) => key !== "date")
              .map(([service, value]) => (
                <Grid item xs={12} sm={6} md={4} key={service}>
                  <MDBox p={2} bgcolor="grey.100" borderRadius="lg">
                    <MDTypography variant="button" fontWeight="medium">
                      {service}
                    </MDTypography>
                    <MDTypography variant="h5">
                      {value}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      Current Active Users
                    </MDTypography>
                  </MDBox>
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AccessTrendsChart;