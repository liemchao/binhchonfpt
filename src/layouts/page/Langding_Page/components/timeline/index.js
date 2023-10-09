import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import Imagetimeline from "assets/images/Moc thoi gian - timeline.png";
import { Typography } from "@mui/joy";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CampaignIcon />,
    2: <CampaignIcon />,
    3: <EmojiEventsIcon />,
    4: <EmojiEventsIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  { label: "Mở bình chọn", date: "31/08/2023" },
  { label: "Đóng bình chọn", date: "15/10/2023" },
  { label: "Công bố top 10", date: "29/10/2023" },
  { label: "Vinh danh top 10", date: "20/11/2023" },
];

export default function CustomizedSteppers() {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img src={Imagetimeline} alt="Timeline" />
        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "10%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          Mở cổng <br />
          bình chọn
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "10%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          15/10/2023
        </Typography>

        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "-4%",
            left: "32%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          Đóng cổng
          <br /> bình chọn
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "35%",
            left: "30%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          29/10/2023
        </Typography>

        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "16%",
            left: "54%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          Công bố <br /> TOP 10
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "60%",
            left: "54%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          30/10/2023
        </Typography>

        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            bottom: "43%",
            left: "76%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          Vinh danh
          <br /> TOP 10
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            bottom: "80%",
            left: "76%",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular",
            fontSize: 30,
          }}
        >
          19/11/2023
        </Typography>
      </div>
    </Stack>
  );
}
