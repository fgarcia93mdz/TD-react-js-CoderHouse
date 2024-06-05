import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LogoItem from "./LogoItem";
import CartWidget from "../card/CartWidget";
import { Link } from 'react-router-dom';
import Login from "../home/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase.js';

const NavBarPublic = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box display="block">
        <AppBar
          position="sticky"
          style={{ background: "#F6F1FF", color: "#0E315A", boxShadow: "none", width: "100vw" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  width: { xs: "100%", sm: "10%" },
                }}
              >
                <Link to="/">
                  <LogoItem />
                </Link>
              </Box>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <List>
                  <ListItem listItemButton component={Link} to="/category/interurbanos" onClick={handleClose}>
                    <ListItemText primary="PASAJES INTERURBANOS" sx={{ fontSize: { xs: "10px", sm: "20px" } }} />
                  </ListItem>
                  <ListItem listItemButton component={Link} to="/category/media-distancia" onClick={handleClose}>
                    <ListItemText primary="PASAJES DE MEDIA DISTANCIA" sx={{ fontSize: { xs: "10px", sm: "20px" } }} />
                  </ListItem>
                  <ListItem listItemButton component={Link} to="/category/larga-distancia" onClick={handleClose}>
                    <ListItemText primary="PASAJES DE LARGA DISTANCIA" sx={{ fontSize: { xs: "10px", sm: "20px" } }} />
                  </ListItem>
                  {user && (
                    <ListItem listItemButton component={Link} to="/ordersUser" onClick={handleClose}>
                      <ListItemText primary="MIS ORDENES" sx={{ fontSize: { xs: "10px", sm: "20px" } }} />
                    </ListItem>
                  )}
                </List>
              </Drawer>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/category/interurbanos">
                    <Button
                      sx={{
                        my: 2,
                        color: "#0E315A",
                        display: { xs: "none", sm: "block" },
                        fontSize: "20px",
                        marginRight: "50px",
                      }}
                    >
                      PASAJES INTERURBANOS
                    </Button>
                  </Link>
                  <Link to="/category/media-distancia">
                    <Button
                      sx={{
                        my: 2,
                        color: "#0E315A",
                        display: { xs: "none", sm: "block" },
                        fontSize: "20px",
                        marginRight: "50px",
                      }}
                    >
                      PASAJES DE MEDIA DISTANCIA
                    </Button>
                  </Link>
                  <Link to="/category/larga-distancia">
                    <Button
                      sx={{
                        my: 2,
                        color: "#0E315A",
                        display: { xs: "none", sm: "block" },
                        fontSize: "20px",
                        marginRight: "50px",
                      }}
                    >
                      PASAJES DE LARGA DISTANCIA
                    </Button>
                  </Link>
                  {user ? (
                    <Link to="/ordersUser" onClick={handleClose}>
                      <Button
                        sx={{
                          my: 2,
                          color: "#0E315A",
                          display: { xs: "none", sm: "block" },
                          fontSize: "15px",
                          marginRight: "50px",
                          width: "100px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        MIS ORDENES
                      </Button>
                    </Link>
                  ) : (
                    <Login />
                  )}
                </Box>
                <Box style={{ marginTop: 27, marginLeft: 40 }}>
                  <Link to="/cart">
                    <CartWidget />
                  </Link>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBarPublic;
