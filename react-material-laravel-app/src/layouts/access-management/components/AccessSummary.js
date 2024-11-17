import { Card, LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StorageIcon from '@mui/icons-material/Storage';
import DnsIcon from '@mui/icons-material/Dns';
import HubIcon from '@mui/icons-material/Hub';

function AccessSummary() {
  const services = [
    {
      name: 'Biometric',
      total: 150,
      active: 120,
      icon: <SecurityIcon />,
      color: '#2196f3',
    },
    {
      name: 'VPN',
      total: 150,
      active: 95,
      icon: <VpnKeyIcon />,
      color: '#4caf50',
    },
    {
      name: 'Grafana',
      total: 150,
      active: 85,
      icon: <StorageIcon />,
      color: '#ff9800',
    },
    {
      name: 'IPAM',
      total: 150,
      active: 75,
      icon: <DnsIcon />,
      color: '#f44336',
    },
    {
      name: 'Teleport',
      total: 150,
      active: 65,
      icon: <HubIcon />,
      color: '#9c27b0',
    },
  ];

  const pieData = services.map(service => ({
    name: service.name,
    value: service.active,
    color: service.color,
  }));

  const ServiceCard = ({ service }) => (
    <MDBox mb={2}>
      <MDBox display="flex" alignItems="center" mb={1}>
        <MDBox
          width={40}
          height={40}
          bgcolor={service.color}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          mr={2}
        >
          {service.icon}
        </MDBox>
        <MDBox flex={1}>
          <MDTypography variant="h6" fontWeight="medium">
            {service.name}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {service.active} active users
          </MDTypography>
        </MDBox>
        <MDTypography variant="h6" fontWeight="medium">
          {((service.active / service.total) * 100).toFixed(0)}%
        </MDTypography>
      </MDBox>
      <LinearProgress
        variant="determinate"
        value={(service.active / service.total) * 100}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: `${service.color}22`,
          '& .MuiLinearProgress-bar': {
            bgcolor: service.color,
            borderRadius: 3,
          },
        }}
      />
    </MDBox>
  );

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h6" fontWeight="medium" mb={3}>
          Access Distribution
        </MDTypography>

        <MDBox height="200px" mb={3}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AccessSummary;