import * as React from "react";
import ThemeProvider from "theme/index.js";
import theme from "assets/theme";
import Appbar from "./components/appbar";
import Promotions from "./components/promotions";
import Products from "./components/products";
import { Container, Typography, Box, Stack } from "@mui/material";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
// import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PromotionCarousel from "./components/campaign";
import MyTimeline from "./components/timeline";
import CountdownTimer from "./components/timecount";
import VotingRules from "./components/rules";
import ImageThele from "../../../assets/images/The le tham gia.png";
import ImageMocTime from "../../../assets/images/Moc thoi gian.png";
import ImageTimeCount from "../../../assets/images/Thoi gian con lai.png";
import ImageCampaign from "../../../assets/images/Chien dich dang dien ra.png";

import { Link } from "react-scroll";
import ScrollToTopButton from "../user/Form/Voter/List Candidate/scollpage";
import ScrollToTopButtonTop from "../user/Form/Voter/List Candidate/scollLandingPage";
//----------------------------------------------------------------

export default function LangdingPage() {
  const styles = {
    section: {
      position: "relative",
      cursor: "pointer",
    },
    heading: {
      position: "relative",
      display: "inline-block",
    },
    arrow: {
      position: "absolute",
      top: "50%",
      right: "-10px",
      transform: "translateY(-50%)",
    },
  };

  return (
    <Container
      maxWidth="none"
      sx={{
        background: "#fff",
        backgroundImage: `url("https://res.cloudinary.com/dxevluwyr/image/upload/v1694155547/BackGround_xhgdfp.png?fbclid=IwAR39NUtxnEeju10pZTzJFAqpQiDKjpW2are7Q_MAfYpZVf50ca-jnF-rmXo")`,
        backgroundSize: "cover", // Thêm thuộc tính backgroundSize với giá trị "cover"
      }}
    >
      <Stack sx={{ gap: 1 }}>
        <UIProvider>
          <Appbar />
          <Promotions />
          <Box
            sx={{
              mt: "-5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExpandMoreIcon
              sx={{
                visibility: "hidden",
                fontSize: "100px",
              }}
            />
            <ExpandMoreIcon
              sx={{
                visibility: "hidden",
                fontSize: "100px",
              }}
            />

            <ScrollToTopButtonTop />
          </Box>

          {/* <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h2">Ứng cử viên</Typography>
            </Box>
            <Products /> */}
          {/* <BannerLeft />
            <Section2 />
            <SearchBox /> */}
          <Box
            id="section2"
            sx={{
              backgroundImage: `url("https://res.cloudinary.com/dxevluwyr/image/upload/v1694590664/bg1_culbrm.png")`,
              backgroundSize: "100% 100%",
            }}
          >
            <Box display="flex" justifyContent="center" sx={{ p: 2, mt: 5 }}>
              <img src={ImageMocTime}></img>
            </Box>
            <MyTimeline />
            <Box display="flex" justifyContent="center" sx={{ p: 2, visibility: "hidden" }}>
              <img src={ImageMocTime}></img>
            </Box>
          </Box>
          <Box id="section3" display="flex" justifyContent="center" sx={{ p: 2 }}>
            <img src={ImageThele}></img>
          </Box>
          <VotingRules />
          <Box
            sx={{
              backgroundImage: `url("https://res.cloudinary.com/dxevluwyr/image/upload/v1694590664/bg1_culbrm.png")`,
              backgroundSize: "100% 100%",
            }}
          >
            <Box id="section4" display="flex" justifyContent="center" sx={{ p: 2, mt: 5 }}>
              <img src={ImageTimeCount}></img>
            </Box>
            <CountdownTimer startTime={"2023-10-02T00:00:00"} endTime={"2023-10-15T00:00:00"} />
            <Box display="flex" justifyContent="center" sx={{ p: 2, visibility: "hidden" }}>
              <img src={ImageMocTime}></img>
            </Box>
          </Box>

          {/* <ContactSection /> */}
          <Footer />

          <AppDrawer />
          <ScrollToTopButton />
        </UIProvider>
      </Stack>
    </Container>
  );
}
