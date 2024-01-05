import React from "react";
import { AppBar, Toolbar, Button, Card, CardContent, CardHeader } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import DataTable from "./DataGrid/DataTable";

const CustomButton = styled(Button)({
    padding: "6px 16px",
    width: "74px",
    height: "36px",
    letterSpacing: "0.4px",
    fontSize: "14px",
    fontFamily: "Roboto,sans-serif",
    fontStyle: "normal",
    lineHeight: "24px",
    fontWeight:500,
});


const styles ={
    page:{
        display:"flex",
        flexDirection:"column" as "column",
        alignItems:"center",
        justifyContent:"center",
        minHeight:"100vh",
    },
    toolbar:{
        padding:"8px 24px",
        display:"flex",
        flexDirection:"row" as "row",
        alignItems:"center",
        justifyContent:"space-between",
        minHeight:"36px !important"
    },

    toolbarTitle:{
        color:"#1E88E5",
        fontFeatureSettings: "'clig' off, 'liga' off",
        fontFamily: "Roboto,sans-serif",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "133.4%",

    },

    login:{
        fontWeight:500,
        width:"42px",
        height: "24px",
        letterSpacing: "0.4px",
        fontSize: "14px",
        fontFamily: "Roboto,sans-serif",
        fontStyle: "normal",
        lineHeight: "24px",
    },
   
    card:{
        padding: "0px",
        minHeight: "300px",
        borderLeft: '1px solid rgba(0,0,0,0.01)', 
        borderRight: '1px solid rgba(0,0,0,0.01)',
    },
    cardTitle:{
        padding: "16px",
        fontSize:"24px",
        fontWeight:400,
        lineHeight:"133.4%",
        fontFamily: "Roboto,sans-serif",
        fontStyle: "normal",
        fontFeatureSettings: "'clig' off, 'liga' off",
        color: "var(--text-primary, rgba(0, 0, 0, 0.87))"
    },
    addNewDiv:{
        padding: "16px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
  },
  addNewButton:{
    fontWeight:500,
    letterSpacing: "0.4px",
    fontSize: "14px",
    fontFamily: "Roboto,sans-serif",
    fontStyle: "normal",
    lineHeight: "24px",
    backgroundColor: "#2196F3",
},
}


function Home() {

    return(
        
        <div style={styles.page}>

        <AppBar position="fixed" color="transparent" elevation={0} variant="outlined" 
        sx={{
            height:"52px",

            }}>
            <Toolbar sx={styles.toolbar} >
                <h5 style={styles.toolbarTitle}>
                Ramp Up Project
                </h5>
                <CustomButton variant="outlined">
                Login
                </CustomButton>
            </Toolbar>
        </AppBar>

        <Card sx={styles.card}>
            <div style={styles.cardTitle}>
            User Details
            </div>
            <div style={styles.addNewDiv}>
                <Button variant="contained" sx={styles.addNewButton}>
                Add new
                </Button>
            </div>
            <DataTable/>
        </Card>

        </div>
    )
}

export default Home;