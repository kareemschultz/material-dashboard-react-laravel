import { Card } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

// Icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SecurityIcon from "@mui/icons-material/Security";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SettingsIcon from "@mui/icons-material/Settings";
import BlockIcon from "@mui/icons-material/Block";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const getActivityConfig = (type) => {
  switch (type) {
    case "access_granted":
      return {
        icon: <VpnKeyIcon />,
        color: "success",
        label: "Access Granted",
      };
    case "access_revoked":
      return {
        icon: <BlockIcon />,
        color: "error",
        label: "Access Revoked",
      };
    case "member_added":
      return {
        icon: <PersonAddIcon />,
        color: "info",
        label: "Member Added",
      };
    case "member_removed":
      return {
        icon: <PersonRemoveIcon />,
        color: "warning",
        label: "Member Removed",
      };
    case "settings_changed":
      return {
        icon: <SettingsIcon />,
        color: "primary",
        label: "Settings Updated",
      };
    case "security_alert":
      return {
        icon: <SecurityIcon />,
        color: "error",
        label: "Security Alert",
      };
    default:
      return {
        icon: <SettingsIcon />,
        color: "default",
        label: "Activity",
      };
  }
};

function ActivityTimeline({ activities }) {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox mb={3}>
          <MDTypography variant="h6" fontWeight="medium">
            Activity Timeline
          </MDTypography>
        </MDBox>

        <Timeline position="alternate">
          {activities.map((activity, index) => {
            const config = getActivityConfig(activity.type);
            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={config.color}>
                    {config.icon}
                  </TimelineDot>
                  {index < activities.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <MDBox mb={0.5}>
                    <MDTypography variant="button" fontWeight="medium">
                      {config.label}
                    </MDTypography>
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="caption" color="text">
                      {activity.description || `${activity.user} - ${activity.service}`}
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="caption" color="text" fontStyle="italic">
                    {new Date(activity.timestamp).toLocaleString()}
                  </MDTypography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>

        {activities.length === 0 && (
          <MDBox textAlign="center" py={5}>
            <MDTypography variant="button" color="text">
              No recent activities
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default ActivityTimeline;