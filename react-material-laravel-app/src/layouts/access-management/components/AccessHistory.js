import { useState } from "react";
import { Card, Grid, TextField, MenuItem } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function AccessHistory() {
  const [timeRange, setTimeRange] = useState('week');
  const [filterService, setFilterService] = useState('all');

  const getEventIcon = (type) => {
    switch (type) {
      case 'access_granted':
        return <VpnKeyIcon />;
      case 'access_revoked':
        return <BlockIcon />;
      case 'security_change':
        return <SecurityIcon />;
      case 'user_added':
        return <PersonAddIcon />;
      case 'user_removed':
        return <PersonRemoveIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'access_granted':
        return 'success';
      case 'access_revoked':
        return 'error';
      case 'security_change':
        return 'warning';
      case 'user_added':
        return 'info';
      case 'user_removed':
        return 'error';
      default:
        return 'primary';
    }
  };

  // Sample data
  const events = [
    {
      type: 'access_granted',
      user: 'John Doe',
      service: 'VPN',
      description: 'Granted VPN access',
      timestamp: '2024-11-16 10:30',
      grantedBy: 'Admin User',
    },
    // Add more events...
  ];

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Time Range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="small"
            >
              <MenuItem value="day">Last 24 Hours</MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Service"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All Services</MenuItem>
              <MenuItem value="vpn">VPN</MenuItem>
              <MenuItem value="biometric">Biometric</MenuItem>
              <MenuItem value="grafana">Grafana</MenuItem>
              <MenuItem value="ipam">IPAM</MenuItem>
              <MenuItem value="teleport">Teleport</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Timeline>
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="text.secondary">
                {event.timestamp}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={getEventColor(event.type)}>
                  {getEventIcon(event.type)}
                </TimelineDot>
                {index < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <MDBox>
                  <MDTypography variant="button" fontWeight="medium">
                    {event.description}
                  </MDTypography>
                  <MDTypography variant="caption" color="text" display="block">
                    User: {event.user}
                  </MDTypography>
                  <MDTypography variant="caption" color="text" display="block">
                    Service: {event.service}
                  </MDTypography>
                  <MDTypography variant="caption" color="text" display="block">
                    By: {event.grantedBy}
                  </MDTypography>
                </MDBox>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </MDBox>
    </Card>
  );
}

export default AccessHistory;