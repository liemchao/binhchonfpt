import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import MainCard from "components/Cards/cardCampaignMain";
import Logo1 from "assets/images/talk.png";
import CardText from "components/Cards/CardText";
import { CardContent } from "@mui/joy";
import { Card } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { getDesiginHome } from "context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: (isMobile) => (isMobile ? "6rem" : "12rem"),
    paddingBottom: (isMobile) => (isMobile ? "6rem" : "12rem"),
    // borderTop: `1px solid blue`,
  },
  sectionTitle: {
    marginBottom: (isMobile) => (isMobile ? "3rem" : "4rem"),
    [theme.breakpoints.up("md")]: {
      marginBottom: (isMobile) => (isMobile ? "5rem" : "6rem"),
    },
  },
  featureItem: {
    marginBottom: (isMobile) => (isMobile ? "10rem" : "20rem"),
    [theme.breakpoints.up("md")]: {
      marginBottom: (isMobile) => (isMobile ? "0rem" : "20rem"),
    },
  },
  featureItemImg: {
    marginBottom: (isMobile) => (isMobile ? "1rem" : "0.75rem"),
    [theme.breakpoints.up("md")]: {
      marginBottom: (isMobile) => (isMobile ? "0.75rem" : "1rem"),
      order: 2,
    },
  },
}));

export default function Select3() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles(isMobile);
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getDesiginHome());
    };
    callAPI();
  }, []);
  const designhome = useSelector((state) => {
    return state.designhome;
  });
  return (
    <section id="section-3" className={classes.root}>
      {isMobile ? (
        <>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"} // Adjust the flexDirection based on screen size
            mt={isMobile ? "-6rem" : "-6rem"} // Adjust the margin top based on screen size
            justifyContent="center"
            alignItems={isMobile ? "initial" : "center"} // Adjust the alignItems based on screen size
            style={{ width: "100%" }}
          >
            <img
              src={designhome.logo3}
              alt="Logo"
              style={{
                width: isMobile ? "15rem" : "30rem",
                marginRight: "9.2rem",
                height: "auto",
                marginLeft: isMobile ? "17%" : "3%",
              }}
            />
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: { xs: "auto", sm: "initial" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  width: "1px",
                  left: "500px",
                  top: "-24px",
                  bottom: "-24px",
                  "&::before": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    right: "0.5rem",
                    color: "text.tertiary",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                  "&::after": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    left: "0.5rem",
                    color: "white",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                }}
              />
              <Card
                orientation="horizontal"
                sx={{
                  width: "90%",
                  flexWrap: "wrap",
                  [`& > *`]: {
                    "--stack-point": "500px",
                    minWidth:
                      "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                  },
                  overflow: "auto",
                  resize: "horizontal",
                  position: "relative", // Thêm thuộc tính position: "relative"
                  backgroundColor: "transparent", // Đặt màu nền của card là trong suốt
                  boxShadow: "none",
                  marginLeft: "2%",

                  backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <CardContent>
                  <Sheet
                    sx={{
                      borderRadius: "sm",
                      p: 5,
                      my: 1.5,
                      mt: 0,
                      display: "flex",
                      alignItems: "center", // Canh giữa dọc
                      justifyContent: "center", // Canh giữa ngang
                      gap: 1,
                      "& > div": { flex: 1 },
                      backgroundColor: "transparent",
                      position: "relative",
                    }}
                  >
                    <div style={{ marginTop: "-2rem" }}>
                      <Typography
                        fontSize={isMobile ? "30px" : "60px"}
                        sx={{
                          color: designhome.textColor,
                          fontFamily: "VLABRAHAMLINCOLN",
                          textAlign: "start", // Đặt font chữ tùy chỉnh
                        }}
                      >
                        Thể lệ bình chọn
                      </Typography>

                      <Typography
                        level="body"
                        fontWeight="normal"
                        fontSize={isMobile ? "15px" : "25px"}
                        sx={{
                          marginLeft: "2rem",
                          color: designhome.textColor,
                          fontFamily: "UTM Swiss Condensed Regular",
                          // Đặt font chữ tùy chỉnh
                          marginTop: isMobile ? "1rem" : "0rem",
                          textIndent: isMobile ? "-1.5rem" : "-2rem", // Khoảng cách đầu dòng
                          textAlign: "start", // Căn giữa nội dung
                        }}
                      >
                        {designhome.description3?.split(".").map((sentence, index) => (
                          <React.Fragment key={index}>
                            {index > 0} {/* Thêm dấu chấm (.) trước câu từ thứ hai trở đi */}
                            {sentence}
                            <br /> {/* Xuống dòng sau mỗi câu */}
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 3,
                          mt: 2,
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      ></Box>
                      <div style={{ visibility: "hidden" }}>
                        <ButtonLangding
                          height={"3.5rem"}
                          width={"15rem"}
                          nameButton="THAM GIA"
                          bgColor="#d44fac"
                          // onClick={onClickJoin}
                          borderRadius={"50px"}
                        />
                      </div>
                    </div>
                  </Sheet>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"} // Adjust the flexDirection based on screen size
            mt={isMobile ? "-6rem" : "-6rem"} // Adjust the margin top based on screen size
            justifyContent="center"
            alignItems={isMobile ? "initial" : "center"} // Adjust the alignItems based on screen size
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: { xs: "auto", sm: "initial" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  width: "1px",
                  left: "500px",
                  top: "-24px",
                  bottom: "-24px",
                  "&::before": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    right: "0.5rem",
                    color: "text.tertiary",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                  "&::after": {
                    top: "4px",
                    display: "block",
                    position: "absolute",
                    left: "0.5rem",
                    color: "white",
                    fontSize: "sm",
                    fontWeight: "lg",
                  },
                }}
              />
              <Card
                orientation="horizontal"
                sx={{
                  width: "90%",
                  flexWrap: "wrap",
                  [`& > *`]: {
                    "--stack-point": "500px",
                    minWidth:
                      "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                  },
                  overflow: "auto",
                  resize: "horizontal",
                  position: "relative", // Thêm thuộc tính position: "relative"
                  backgroundColor: "transparent", // Đặt màu nền của card là trong suốt
                  boxShadow: "none",
                  marginLeft: "2%",

                  backgroundImage: `url("https://i.imgur.com/dqFqy9W.png")`,
                  backgroundSize: "100% 100%",
                }}
              >
                <CardContent>
                  <Sheet
                    sx={{
                      borderRadius: "sm",
                      p: 5,
                      my: 1.5,
                      mt: 0,
                      display: "flex",
                      alignItems: "center", // Canh giữa dọc
                      justifyContent: "center", // Canh giữa ngang
                      gap: 1,
                      "& > div": { flex: 1 },
                      backgroundColor: "transparent",
                      position: "relative",
                    }}
                  >
                    <div style={{ marginTop: "-2rem" }}>
                      <Typography
                        fontSize={isMobile ? "30px" : "60px"}
                        sx={{
                          color: designhome.textColor,
                          fontFamily: "VLABRAHAMLINCOLN",
                          textAlign: "start", // Đặt font chữ tùy chỉnh
                        }}
                      >
                        Thể lệ bình chọn
                      </Typography>

                      <Typography
                        level="body"
                        fontWeight="normal"
                        fontSize={isMobile ? "15px" : "25px"}
                        sx={{
                          marginLeft: "2rem",
                          color: designhome.textColor,
                          fontFamily: "UTM Swiss Condensed Regular",
                          // Đặt font chữ tùy chỉnh
                          marginTop: isMobile ? "1rem" : "0rem",
                          textIndent: isMobile ? "-1.5rem" : "0.1rem", // Khoảng cách đầu dòng
                          textAlign: "start", // Căn giữa nội dung
                        }}
                      >
                        {designhome.description3?.split(".").map((sentence, index) => (
                          <React.Fragment key={index}>
                            {index > 0} {/* Thêm dấu chấm (.) trước câu từ thứ hai trở đi */}
                            {sentence}
                            <br /> {/* Xuống dòng sau mỗi câu */}
                          </React.Fragment>
                        ))}

                        {/* <li>Chương trình dành cho tất cả sinh viên đang học tại FPTU HCMC.</li>
                        <li>Sinh viên bình chọn cho giảng viên yêu thích.</li>
                        <li>Hệ thống sẽ tính điểm theo tổng lượt bình chọn của sinh viên.</li>
                        <li>
                          Sau thời gian bình chọn, hệ thống lọc ra top 10 giảng viên đạt danh hiệu
                          <strong> “Inspiring Instructor Awards”.</strong>
                        </li> */}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 3,
                          mt: 2,
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      ></Box>
                      <div style={{ visibility: "hidden" }}>
                        <ButtonLangding
                          height={"3.5rem"}
                          width={"15rem"}
                          nameButton="THAM GIA"
                          bgColor="#d44fac"
                          // onClick={onClickJoin}
                          borderRadius={"50px"}
                        />
                      </div>
                    </div>
                  </Sheet>
                </CardContent>
              </Card>
            </Box>
            <img
              src={designhome.logo3}
              alt="Logo"
              style={{
                width: isMobile ? "15rem" : "30rem",
                marginRight: "9.2rem",
                height: "auto",
                marginLeft: isMobile ? "17%" : "3%",
              }}
            />
          </Box>
        </>
      )}
    </section>
  );
}
