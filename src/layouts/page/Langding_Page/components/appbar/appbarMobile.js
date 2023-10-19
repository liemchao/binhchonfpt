import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { Box, IconButton } from "@mui/material";
import { useUIContext } from "../../context/ui";
import Logo from "assets/images/Logo_main.png";
import Logo2 from "assets/images/styled pink.png";
import Logo1 from "assets/images/full.png";
export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4">
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 3 }}>
          <img src={Logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
          <img src={Logo2} alt="Logo" style={{ width: "80px", height: "auto" }} />
          <img src={Logo1} alt="Logo" style={{ width: "80px", height: "auto" }} />
        </Box>
      </AppbarHeader>
      {/* <Actions matches={matches} /> */}
    </AppbarContainer>
  );
}
