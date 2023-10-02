import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// components

//

import Iconify from "../../assets/theme/components/icon/Iconify";
import Searchbar from "./Searchbar";
import NotificationsPopover from "./NotificationsPopover";
import AccountPopover from "./AccountPopover";
import Logo from "assets/images/full 3 logo.png";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 80;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),

  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  backgroundPosition: "start",
  // width: "100%",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const RootStyleClose = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar, open }) {
  return (
    <>
      {open ? (
        <RootStyle>
          <ToolbarStyle>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <Searchbar />
              <NotificationsPopover />
              {/* <MailNotification /> */}
              <AccountPopover />
            </Stack>
          </ToolbarStyle>
        </RootStyle>
      ) : (
        <RootStyleClose>
          <ToolbarStyle>
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary" }}>
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
            <Box sx={{ flexGrow: 1, marginRight: "-20rem", display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}></div>
              <img
                src={Logo}
                alt="Logo"
                style={{ mt: "2%", width: "25%", height: "auto", marginRight: "-2rem" }}
              />
              <div style={{ flex: 1 }}></div>
            </Box>
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              {/* <Searchbar /> */}
              <NotificationsPopover />
              {/* <MailNotification /> */}
              <AccountPopover />
            </Stack>
          </ToolbarStyle>
        </RootStyleClose>
      )}
    </>
  );
}
