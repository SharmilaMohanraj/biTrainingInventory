import React from "react";
import { Box, Typography, TextField, Button, MenuItem, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import StatusAlert from "./StatusAlert";

function SignUp(props: any) {

    let navigate = useNavigate();
    const [role, setRole] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signUpStatus, setSignUpStatus] = React.useState({ severity: "", message: "" });
    const [open, setOpen] = React.useState(false);

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
        if (userName.length === 0 || password.length === 0 || role.length === 0) {
            setOpen(true);
            setSignUpStatus({ severity: "warning", message: "Please provide valid details" });
        } else {
            Axios.get("https://secure-refuge-14993.herokuapp.com/add_user?username=" + userName + "&password=" + password + "&role=" + role).then(
                (response) => {
                    if (response.data.error === 0) {
                        setOpen(true);
                        setSignUpStatus({ severity: "success", message: 'User is registered successfully' });
                        localStorage.setItem("userName", JSON.stringify(userName));
                        navigate('/login');
                    } if (response.data.error !== 0) {
                        setOpen(true);
                        setSignUpStatus({ severity: "error", message: response.data.message });
                    }
                }
            )
        }
    }
    return (
        <div>
            <form onSubmit={handleSignUp}>
                <Box display={"flex"} flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"}
                    margin="auto" marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }} >
                    <Typography variant="h1" padding={3} fontSize={39} textAlign="center"> Sign Up</Typography>
                    <TextField
                        value={userName} variant="outlined" type={'text'} margin="normal" placeholder="Username" onChange={handleNameChange}>
                    </TextField>
                    <TextField
                        value={password} variant="outlined" type={'password'} margin="normal" placeholder="Password" onChange={handlePasswordChange}>
                    </TextField>
                    <div>
                        <InputLabel id="labelRole" shrink>Role</InputLabel>
                        <Select name="role" value={role} sx={{ width: 220 }} labelId="labelRole" label="Role"
                            onChange={handleRoleChange} >
                            <MenuItem value={"admin"}>admin</MenuItem>
                            <MenuItem value={"user"}>user</MenuItem>
                        </Select>
                    </div>
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} variant="contained" type="submit"
                    > Sign Up <PersonAddAltRoundedIcon /></Button>
                    <Button sx={{ marginTop: 3, borderRadius: 3 }} onClick={() => navigate('/login')}>
                        Go to Login
                    </Button>
                    {
                        <StatusAlert status={signUpStatus} open={open} handleClose={handleClose}></StatusAlert>
                    }

                </Box>
            </form>
        </div>

    );
}

export default SignUp;