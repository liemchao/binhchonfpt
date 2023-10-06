import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import MainCard from "components/Cards/cardCampaignMain";
import Logo1 from "assets/images/styled pink.png";
import CardText from "components/Cards/CardText";
import { Card, CardContent } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    // borderTop: `1px solid blue`,
  },
  sectionTitle: {
    marginBottom: 4,
    [theme.breakpoints.up("md")]: {
      marginBottom: 6,
    },
  },
  featureItem: {
    marginBottom: 20,
    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
    },
  },
  featureItemImg: {
    marginBottom: 1,
    [theme.breakpoints.up("md")]: {
      marginBottom: "0.75 rem",
      order: 2,
    },
  },
}));

export default function MyComponent() {
  const classes = useStyles();

  return (
    <section id="section-3" className={classes.root}>
      <>
        <Box
          display="flex"
          mt={"1rem"}
          justifyContent="center"
          alignItems="center"
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
                      fontSize="60px"
                      sx={{
                        color: "#B83490",
                        fontFamily: "VLABRAHAMLINCOLN",
                        textAlign: "start", // Đặt font chữ tùy chỉnh
                      }}
                    >
                      Giới thiệu về chương trình
                    </Typography>

                    <Typography
                      level="body"
                      fontWeight="normal"
                      fontSize="25px"
                      sx={{
                        marginLeft: "2rem",
                        color: "#B83490",
                        fontFamily: "UTM Swiss Condensed Regular",
                        // Đặt font chữ tùy chỉnh
                        marginTop: "-1rem",
                        textIndent: "-2rem", // Khoảng cách đầu dòng
                        textAlign: "start", // Căn giữa nội dung
                      }}
                    >
                      <li>
                        Danh hiệu <strong>"Inspiring Instructor Awards"</strong> nhằm tôn vinh những
                        nỗ lực, cống hiến của Giảng viên trong hành trình trao truyền kiến thức và
                        cảm hứng đến sinh viên FPTU HCMC.
                      </li>
                      <li>
                        Đây là danh hiệu được bình chọn định kỳ hằng năm và dành cho tất cả giảng
                        viên dạy ở 3 học kì gần nhất của thời điểm đó: Fall, Spring, Summer.
                      </li>
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
            src={Logo1}
            alt="Logo"
            style={{ width: "30rem", marginRight: "9.2rem", height: "auto", marginLeft: "3%" }}
          />
        </Box>
      </>
    </section>
  );
}
