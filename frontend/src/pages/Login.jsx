import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import Form from "../components/shared/Form.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const auth = useAuth();
    const fields = [

        {
            id: 'email',
            name:'email',
            label: 'Email',
            type: 'email',
            autoComplete: 'email',
            placeholder: 'Email',
        },
        {
            id: 'password',
            name:'password',
            label: 'Password',
            type: 'password',
            autoComplete: 'password',
            placeholder: 'Password',
        }

    ]
  async  function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email, password);
        try {
            toast.loading('Logging in...',{id: 'login'});
            const data = await auth.login(email, password);

            toast.success('Logged in successfully',{id: 'login'});
        }
        catch (e) {
            console.log(e);
            toast.error('Login failed',{id: 'login'});
        }

    }
    const nav = useNavigate();

    useEffect(() => {
        if (auth.user) {
            return nav('/chat');
        }
    }, [auth])
    return (
        <Box width='100%' height='100%' display='flex' flex='1' justifyContent='center' alignItems='center'>
            <Box display={{md: 'flex', sm: 'none', xs: 'none'}}>
                <img src='airobot.png' alt='Robot'/>
            </Box>
            <Box display={'flex'} ml='auto' flex={{md: '1', sm: '1', xs: '1'}} mt={16}>

                <Form  handleSubmit={handleSubmit} title='Login' fields={fields}/>
            </Box>
        </Box>
    );
}

export default Login;
