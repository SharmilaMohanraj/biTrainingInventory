import React from "react";
import { AppBar, Typography, Toolbar, Button} from '@mui/material';
import DrawerComponent from "./DrawerComponent";
import { useNavigate } from "react-router-dom";
function Header(props: any) {
    let navigate = useNavigate();
    const [userName,setUserName] = React.useState('');

    React.useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (userName != null && userName !== '') {
            setUserName(JSON.parse(userName));
        }
    }, []);
    const logOut = () => {
        localStorage.setItem("userToken", '');
        navigate('/login');
    }
    return (
        <React.Fragment>
            <AppBar sx={{ background: "#063970" }}>
                <Toolbar>
                    <DrawerComponent />
                    <Typography sx={{ fontSize: '1.5rem', paddingLeft: '10%' }}>
                        {" "}
                        Welcome {userName}
                    </Typography>
                    <Button onClick={logOut} sx={{ marginLeft: "auto" }} variant="contained">
                        Logout{" "}
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;