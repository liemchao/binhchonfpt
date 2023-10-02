import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { Box, IconButton } from "@mui/material";
import { useUIContext } from "../../context/ui";
import Logo from "assets/images/Logo_main.png";
import Logo1 from "assets/images/logos/LogoFVS.svg";
export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4">
        <Box sx={{ flexGrow: 1, marginRight: "4rem", display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}></div>
          <img src={Logo1} alt="Logo" style={{ width: "115px", height: "auto" }} />
          <img
            style={{ backgroundColor: "white", width: "8rem", height: "3rem" }}
            src={Logo}
            alt="Logo"
          />
          <div style={{ flex: 1 }}></div>
        </Box>
      </AppbarHeader>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
