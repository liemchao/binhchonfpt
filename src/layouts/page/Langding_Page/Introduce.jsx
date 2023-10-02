import * as React from "react";
import ThemeProvider from "theme/index.js";
import theme from "assets/theme";
import Appbar from "./components/appbar";
import { Container, Stack } from "@mui/material";
import AppDrawer from "./components/drawer";
import { UIProvider } from "./context/ui";
import Footer from "./components/footer";
import BannerLeft from "./components/banner/bannerleft";
import Section2 from "./components/feature";
import Section3 from "./components/intion";
import MyComponent from "./components/search";
import Select2 from "./components/search";
import Select3 from "./components/search";
import ScrollToTopButton from "../user/Form/Voter/List Candidate/scollpage";

//----------------------------------------------------------------

export default function IntroducePage() {
  return (
    <Container
      maxWidth="none"
      sx={{
        background: "#fff",
        backgroundImage: `url("https://res.cloudinary.com/dxevluwyr/image/upload/v1694155547/BackGround_xhgdfp.png?fbclid=IwAR39NUtxnEeju10pZTzJFAqpQiDKjpW2are7Q_MAfYpZVf50ca-jnF-rmXo")`,
        backgroundSize: "cover",
      }}
    >
      <Stack>
        <UIProvider>
          <Appbar />
          <BannerLeft />
          <Section2 />
          <Select3 />
          <Section3 />
          <Footer />
          <AppDrawer />
        </UIProvider>
        <ScrollToTopButton />
      </Stack>
    </Container>
  );
}
