import { useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from "@mui/material";

// Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";

function QuickAccessMenu({ onAction }) {
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <PersonAddIcon />, name: 'Add Employee', action: 'add-employee' },
    { icon: <GroupAddIcon />, name: 'Bulk Update', action: 'bulk-update' },
    { icon: <SecurityIcon />, name: 'Security Audit', action: 'security-audit' },
    { icon: <AssessmentIcon />, name: 'Generate Report', action: 'generate-report' },
    { icon: <SettingsIcon />, name: 'Access Settings', action: 'access-settings' },
  ];

  const handleAction = (actionType) => {
    setOpen(false);
    onAction(actionType);
  };

  return (
    <SpeedDial
      ariaLabel="Quick Access Menu"
      sx={{ position: 'fixed', bottom: 32, right: 32 }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.action}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handleAction(action.action)}
        />
      ))}
    </SpeedDial>
  );
}

export default QuickAccessMenu;