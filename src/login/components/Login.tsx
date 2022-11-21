import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import StatusAlert from "./StatusAlert";

function Login(props: any) {

    let navigate = useNavigate();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginStatus, setLoginStatus] = React.useState({ severity: "", message: "" });
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (userName != null && userName !== '') {
            setUserName(JSON.parse(userName));
        }
    }, []);

    const handleNameChange = (event: any) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setLoginStatus({ severity: "", message: "" });
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        if (userName.length === 0 || password.length === 0) {
            setOpen(true);
            setLoginStatus({ severity: "warning", message: "Please provide valid details" });
        } else {
            Axios.get("https://secure-refuge-14993.herokuapp.com/login?username=" + userName + "&password=" + password).then(
                (response) => {
                    console.log(response.data);
                    if (response.data.error !== 0) {
                        setOpen(true);
                        setLoginStatus({ severity: "error", message: "Login not successful! Please try again" });
                    } else {
                        console.log("Response token: ", response.data.token);
                        localStorage.setItem("userToken", JSON.stringify(response.data.token));
                        localStorage.setItem("userName", JSON.stringify(userName));
                        navigate('/dashboard');
                    }
                }
            )
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <Box display={"flex"} flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"}
                    margin="auto" marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }} >
                    <Typography variant="h3" padding={3} fontSize={38} textAlign="center"> Login </Typography>
                    <TextField
                        value={userName} variant="outlined" type={'text'} margin="normal" placeholder="Username" onChange={handleNameChange}>
                    </TextField>
                    <TextField
                        value={password} variant="outlined" type={'password'} margin="normal" placeholder="Password" onChange={handlePasswordChange}>
                    </TextField>
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" type="submit"
                    >Login <LoginIcon /></Button>
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} onClick={() => {navigate('/');localStorage.setItem("userName", '')}}>
                        Go to Sign Up
                    </Button>
                    {
                        <StatusAlert status = {loginStatus} open={open} handleClose={handleClose}></StatusAlert>
                    }
                </Box>
            </form>
        </div>

    );
}

export default Login;