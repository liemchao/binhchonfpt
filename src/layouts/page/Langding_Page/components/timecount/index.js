import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./custom-fonts.css";

const CountdownTimer = ({ startTime, endTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const gradient = "linear-gradient(to bottom, #df40af 45%, #ac0078 5%, #1e2024 50% )";
  const textShadow = "2px 5px 5px rgba(0, 0, 0, 0.3)"; // Điều chỉnh shadow theo nhu cầu của bạn

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateRemainingTime() {
    const now = new Date().getTime();
    const targetDate = new Date(endTime).getTime();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "6rem" }}>
        <Typography
          display="inline"
          fontSize={"12rem"}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.days}
        </Typography>
        <Typography
          display="inline"
          fontSize={"12rem"}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow, // Đặt font chữ tùy chỉnh
          }}
        >
          {remainingTime.hours}
        </Typography>
        <Typography
          display="inline"
          fontSize={"12rem"}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow,
          }}
        >
          {remainingTime.minutes}
        </Typography>
        <Typography
          display="inline"
          fontSize={"12rem"}
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Antique Book Cover",
            textShadow: textShadow, // Đặt font chữ tùy chỉnh
          }}
        >
          {remainingTime.seconds}
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10rem", marginTop: "-5%" }}>
        <Typography
          variant="h5"
          display="inline"
          fontSize={"3rem"}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
          }}
        >
          Ngày
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={"3rem"}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
          }}
        >
          Giờ
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={"3rem"}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
          }}
        >
          Phút
        </Typography>
        <Typography
          variant="h5"
          display="inline"
          fontSize={"3rem"}
          sx={{
            color: "#fffff",
            fontFamily: "VLABRAHAMLINCOLN",
          }}
        >
          Giây
        </Typography>
      </div>
    </div>
  );
};

export default CountdownTimer;