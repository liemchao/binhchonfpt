import { Box, Card, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

export default function PageHeader(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#fdfdff",
      // width: { width },
    },
    pageHeader: {
      padding: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
    pageIcon: {
      display: "inline-block",
      padding: theme.spacing(2),
      color: "#B83490",
      paddingleft: theme.spacing(5),
    },
    pageTitle: {
      paddingRight: theme.spacing(2),
      "& .MuiTypography-subtitle2": {
        opacity: "0.6",
      },
    },
  }));
  const classes = useStyles();
  const { title, subTitle, icon, width, marginLeft } = props;
  return (
    <Paper
      elevation={0}
      square
      className={classes.root}
      sx={{ width: { width }, marginLeft: { marginLeft } }}
    >
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "#B83490",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#B83490",
              fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
            }}
          >
            {subTitle}
          </Typography>
        </div>
        <Box className={classes.pageIcon}>{icon}</Box>
      </div>
    </Paper>
  );
}