import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context/AuthContext";
import RadioButtons from "../radio-buttons/RadioButtons";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import logoIcon from "../../assets/images/logo-icon.png";
import logoText from "../../assets/images/image.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout, unreadMessages, updateMessagesReadTrue } =
    useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profil");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3f475f", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            onClick={handleLogoClick}
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "flex", sm: "flex" },
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box mr={1}>
              <img src={logoIcon} alt="flexy" />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <img src={logoText} alt="flexy" width={100} />
            </Box>
          </Typography>
          <RadioButtons />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {currentUser ? (
              <>
                <Link to="/mesajlarim" onClick={updateMessagesReadTrue}>
                  {unreadMessages ? (
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      sx={{ color: "black" }}
                    >
                      <Badge sx={{ color: "#f44336" }} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      sx={{ color: "black" }}
                    >
                      <MailIcon />
                    </IconButton>
                  )}
                </Link>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "black" }}
                >
                  <Typography sx={{ color: "white" }}>
                    {currentUser.username}
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/giris" sx={{ color: "white" }}>
                  Giriş Yap
                </MenuItem>
                <MenuItem component={Link} to="/kayit" sx={{ color: "white" }}>
                  Hesap Aç
                </MenuItem>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              sx={{ color: "black" }}
              onClick={handleProfileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;
