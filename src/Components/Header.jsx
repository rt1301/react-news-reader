import React from 'react'
import {Box} from '@mantine/core'
export default function Header() {
    const styleSetting = {
        width:"100%",
        height:"80px",
        backgroundColor:"#191E26",
        color:"#ADABAA",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
  return (
    <Box style={styleSetting}>
        <div>Web News Reader</div>
    </Box>
  )
}
