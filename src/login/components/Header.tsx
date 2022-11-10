import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material';
import DrawerComponent from "./DrawerComponent";
const PAGES = ["Services", "About Us", "Contact Us"]
function Header(props: any) {
    const [highlight, setHighlight] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <AppBar sx={{ background: "#063970" }}>
                <Toolbar>
                    <DrawerComponent />
                    <Typography sx={{ fontSize: '1.5rem', paddingLeft: '10%' }}>
                        {" "}
                        Welcome {props.props.userName}
                    </Typography>
                    <Button onClick={props.props.logOut} sx={{ marginLeft: "auto" }} variant="contained">
                        Logout{" "}
                    </Button>
                    {/*
                        isMatch ? (
                            <>
                                <Typography sx={{fontSize:'1.5rem', paddingLeft:'10%'}}>
                                    {" "}
                                    Welcome user
                                </Typography>
                                <DrawerComponent />
                            </>

                        ) : (
                            <>
                                <Tabs sx={{marginLeft:'auto'}} textColor="inherit" value={highlight} onChange={(e, highlight) => setHighlight(highlight)}
                                    indicatorColor="secondary">
                                    {
                                        PAGES.map((page, index) => (
                                            <Tab key={index} label={page} />
                                        ))
                                    }
                                </Tabs>
                                <Button sx={{ marginLeft: "auto" }} variant="contained">
                                    Logout{" "}
                                </Button>
                            </>
                        )
                        */}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;