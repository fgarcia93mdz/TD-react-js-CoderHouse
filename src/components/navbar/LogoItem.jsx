import { Box } from '@mui/material'
import React from 'react'
import logo from '../../assets/img/icono-colectivo.png';

const LogoItem = ({width}) => {
    return (
        <Box
            component="img"
            className=""
            src={logo}
            alt="icono colectivo"
            sx={{
            paddingInline: '12px',
            maxWidth: "40px", minWidth: "32px",
            paddingBottom: '7px', paddingTop: '12px'
        
        }}
        />
    )
}

export default LogoItem