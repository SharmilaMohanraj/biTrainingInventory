import React from "react";
import { Box, Typography, TextField, Button, MenuItem, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import UserDashBoard from "./UserDashboard";

function SignUp() {

    const [role, setRole] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signUpStatus, setSignUpStatus] = React.useState({ severity: "", message: "" });
    const [open, setOpen] = React.useState(false);
    const [isLoginSuccess, setLoginSuccess] = React.useState(false);

    const handleNameChange = (event: any) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSignUpStatus({ severity: "", message: "" });
    };

    const handleSignUp = (e: any) => {
        e.preventDefault();
        if (isLogin) {
            Axios.get("https://secure-refuge-14993.herokuapp.com/add_user?username=" + userName + "&password=" + password + "&role=" + role).then(
                (response) => {
                    setOpen(true);
                    if (response.data.error === 0) {
                        setIsLogin(!isLogin);
                        setSignUpStatus({ severity: "success", message: 'User is registered successfully' });
                    } if (response.data.error !== 0) {
                        if(userName.length===0 || password.length===0 || role.length===0) {
                            setSignUpStatus({ severity: "warning", message: "Please provide valid details" });
                        } else {
                            setSignUpStatus({ severity: "error", message: response.data.message });
                        }
                    }
                }
            )

        } else {
            Axios.get("https://secure-refuge-14993.herokuapp.com/login?username=" + userName + "&password=" + password).then(
                (response) => {
                    console.log(response.data);
                    setOpen(true);
                    if(userName.length===0 || password.length===0) {
                        setSignUpStatus({ severity: "warning", message: "Please provide valid details" });
                    } else {
                        if (response.data.error !== 0) {
                            setSignUpStatus({ severity: "error", message: "Login not successful! Please try again" });
                        } else {
                            console.log("Response token: ", response.data.token);
                            localStorage.setItem("userToken", JSON.stringify(response.data.token));
                            localStorage.setItem("userName", JSON.stringify(userName));
                            setLoginSuccess(true);
                        }
                    }
                }
            )
        }
    }

    const handleDataOnRedirect = () => {
        setIsLogin(!isLogin);
        setUserName('');
        setPassword('');
        setRole('');
    }

    const logOut = () => {
        localStorage.setItem("userToken", '');
        setLoginSuccess(!isLoginSuccess);
        setPassword('');
    }

    return (
        isLoginSuccess ? (
            <UserDashBoard userName={userName} logOut={logOut}></UserDashBoard>
        ) : (
            <div>
                <form onSubmit={handleSignUp}>
                    <Box display={"flex"} flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"}
                        margin="auto" marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}
                        sx={{
                            ":hover": {
                                boxShadow: "10px 10px 20px #ccc",
                            },
                        }} >
                        <Typography variant="h2" padding={3} fontSize={40} textAlign="center"> {isLogin ? "Sign Up" : "Login"}</Typography>
                        <TextField
                            value={userName} variant="outlined" type={'text'} margin="normal" placeholder="Username" onChange={handleNameChange}>
                        </TextField>
                        <TextField
                            value={password} variant="outlined" type={'password'} margin="normal" placeholder="Password" onChange={handlePasswordChange}>
                        </TextField>
                        {isLogin && (
                            <div>
                                <InputLabel shrink>Role</InputLabel>
                                <Select name="role" value={role} displayEmpty sx={{ width: 220 }} type={'text'}
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value={"admin"}>admin</MenuItem>
                                    <MenuItem value={"user"}>user</MenuItem>
                                </Select>
                            </div>
                        )}
                        <Button sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" type="submit"
                        >{isLogin ? "Sign Up" : "Login"}</Button>
                        <Button sx={{ marginTop: 3, borderRadius: 3 }} onClick={handleDataOnRedirect}>
                            Go to {isLogin ? "Login" : "Sign Up"}
                        </Button>
                        {
                            (signUpStatus.severity === 'error' &&
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                                    <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='error' onClose={handleClose}>
                                        {signUpStatus.message}</MuiAlert>
                                </Snackbar>) ||
                            (signUpStatus.severity === 'success' &&
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                                    <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='success' onClose={handleClose}>
                                        {signUpStatus.message}</MuiAlert>
                                </Snackbar>) ||
                            (signUpStatus.severity === 'warning' &&
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                                    <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='warning' onClose={handleClose}>
                                        {signUpStatus.message}</MuiAlert>
                                </Snackbar>)      
                        }

                    </Box>
                </form>
            </div>
        )

    );
}

export default SignUp;