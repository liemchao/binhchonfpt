import * as React from "react";
import Stack from "@mui/material/Stack";
import Imagetimeline from "assets/images/Moc thoi gian - timeline.png";
import { Typography } from "@mui/joy";

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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-40%",
              left: "5%",
            },
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "30%",
              left: "5%",
            },
          }}
        >
          19/10/2023
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-32%",
              left: "30%",
            },
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "37%",
              left: "28%",
            },
          }}
        >
          30/10/2023
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "-20%",
              left: "52%",
            },
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "60%",
              left: "50%",
            },
          }}
        >
          31/10/2023
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "10%",
              left: "75%",
            },
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
            "@media (max-width: 600px)": {
              fontSize: "14px",
              bottom: "84%",
              left: "72%",
            },
          }}
        >
          12/11/2023
        </Typography>
      </div>
    </Stack>
  );
}
