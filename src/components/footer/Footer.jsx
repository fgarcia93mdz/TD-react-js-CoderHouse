import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from '@mui/icons-material/X';
import LogoDigital from "../../assets/img/TerminalDigital.png";
import LogoTD from "../../assets/img/icono-colectivo.png";

import { Stack, Typography, Box } from "@mui/material";

const Footer = ({ Terminal, Provincia }) => {

  const [yearState, setYearState] = useState("");

  useEffect(() => {
    const date = new Date();
    let year = date.getYear() + 1900;
    setYearState(year);
  }, []);

  return (
    <>
      <Stack
        role="footer"
        sx={{
          paddingBottom: { xs: "140px", sm: 2 },
          color: "#0e315a",
          backgroundColor: "white",
          paddingTop: { xs: "0px", sm: "10px" },
          paddingRight: { xs: 0, md: "48px" },
        }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={{ xs: "center" }}
      //sx={{ position: "fixed" }}
      >
        <Box
          component="img"
          className=""
          alt="Logo Terminal Digital"
          src={LogoDigital}
          sx={{ maxWidth: "200px", display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <br></br>
          <br></br>
        </Box>
        <Box
          textAlign={{ xs: "center", sm: "center", fontSize: "0.93rem" }}
        >
          <a
            href="https://www.google.com/maps?q=Terminal+De+%C3%93mnibus+de+Mendoza&ftid=0x967e093c495d1ce3:0x7798543506fb42c6"
            target="_blank"
            rel="noreferrer"
          >
            <Typography
              sx={{
                textAlign: "center",
                textDecoration: "none",
                color: "#0E315A",
              }}
            >¿Cómo llegar?</Typography>
          </a>
        </Box>
        <Box
          textAlign={{ xs: "center", sm: "center", fontSize: "0.93rem" }}
        >
          <Link to={"/contacto"}>
            <Typography
              sx={{
                textAlign: "center",
                textDecoration: "none",
                color: "#0E315A",
              }}
            >
              Contacto
            </Typography>
          </Link>
          <a href="/">
            <Typography sx={{
              textAlign: "center",
              textDecoration: "none",
              color: "#0E315A",
            }}
            ></Typography>
          </a>
        </Box>
        <Box
          textAlign={{ xs: "center", sm: "center", fontSize: "0.93rem" }}
        >
          <a
            href="https://www.argentina.gob.ar/transporte/cnrt"
            rel="noreferrer"
            target="_blank"
          >
            <Typography
              sx={{
                textAlign: "center",
                textDecoration: "none",
                color: "#0E315A",
              }}
            >CNRT</Typography>
          </a>
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <br></br>
        </Box>
        <Box textAlign={{ xs: "center", sm: "center" }} pt={3}>

          <a
            href="https://www.facebook.com/?locale=es_LA"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon
              sx={{
                color: "facebook",
                fontSize: "2.5rem",
                marginLeft: { xs: 0, sm: 2 }
              }}
            />{" "}
          </a>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon
              sx={{
                color: "#E1306C",
                fontSize: "2.5rem",
                marginLeft: { xs: 5, sm: 2, lg: 6 },
              }}
            />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <XIcon
              sx={{
                color: "black",
                fontSize: "2.4rem",
                marginLeft: { xs: 6, sm: 3, lg: 6 },
                marginRight: { xs: -0.7, sm: 3, lg: 0 },
              }}
            />
          </a>
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <br></br>
        </Box>
        <Box
          py={{ xs: 0, sm: 2 }}
          sx={{ display: { xs: "block", sm: "none", md: "block" } }}
        >
          <Box
            textAlign={{ xs: "center", sm: "center" }}
            py={{ xs: 2, sm: 2 }}
          >
            <Typography variant="body2">
              Terminal de {Terminal}
            </Typography>
            <Typography variant="body2">
              Provincia de {Provincia}
            </Typography>
            <Typography variant="body2">Año {yearState}</Typography>
          </Box>
        </Box>

        <Box
          component="img"
          className=""
          alt="Logo Terminal Digital"
          src={LogoTD}
          sx={{
            height: "50px",
            display: { xs: "none", sm: "none", lg: "block" },
          }}
        />
      </Stack>
    </>
  );
};

export default Footer;
