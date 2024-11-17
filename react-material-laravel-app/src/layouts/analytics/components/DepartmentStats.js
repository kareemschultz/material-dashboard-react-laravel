import { useState } from "react";
import { Card, Grid, LinearProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DepartmentStats() {
  // Sample data
  const data = [
    {
      department: "IT",
      "Biometric Access": 90,
      "VPN Access": 85,
      "Grafana Access": 75,
      "IPAM Access": 70,
      "Teleport Access": 65,
      totalEmployees: 45,
    },
    // Add more departments...
  ];

  const DepartmentCard = ({ department }) => (
    <Card>
      <MDBox p={2}>
        <MDTypography variant="h6">{department.department}</MDTypography>
        <MDBox mt={2}>
          {Object.entries(department).filter(([key]) => 
            key !== 'department' && key !== 'totalEmployees'
          ).map(([service, percentage]) => (
            <MDBox key={service} mb={1}>
              <MDBox display="flex" justifyContent="space-between">
                <MDTypography variant="button" fontWeight="medium">
                  {service}
                </MDTypography>
                <MDTypography variant="button" color="text">
                  {percentage}%
                </MDTypography>
              </MDBox>
              <LinearProgress 
                variant="determinate" 
                value={percentage} 
                sx={{
                  height: 6,
                  borderRadius: 3,
                }}
              />
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" mb={3}>Department Access Distribution</MDTypography>
            <MDBox height="400px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Biometric Access" fill="#8884d8" />
                  <Bar dataKey="VPN Access" fill="#82ca9d" />
                  <Bar dataKey="Grafana Access" fill="#ffc658" />
                  <Bar dataKey="IPAM Access" fill="#ff7300" />
                  <Bar dataKey="Teleport Access" fill="#00c49f" />
                </BarChart>
              </ResponsiveContainer>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>

      {data.map((department, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <DepartmentCard department={department} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DepartmentStats;