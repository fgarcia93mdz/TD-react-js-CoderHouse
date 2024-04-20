import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoItem from "./LogoItem";
import CartWidget from "../card/CartWidget";

const NavBarPublic = () => {

  return (
    <>
      <Box display="block">
        <AppBar
          position="sticky"
          style={{ background: "#E3D5F9", color: "#0E315A", boxShadow: "none", width: "100vw"}}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
               <LogoItem />
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "center",
                  marginLeft: { sm: "11%" },
                }}
              >
                  <Button
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    PASAJES INTERURBANOS
                  </Button>
                  <Button
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    PASAJES DE MEDIA DISTANCIA
                  </Button>
                  <Button
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    PASAJES DE LARGA DISTANCIA
                  </Button>
                <Box style={{marginTop: 27}}>
                <CartWidget />
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
