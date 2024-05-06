import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import Form from "../components/shared/Form.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Register(props) {
    const auth = useAuth();
    const fields = [

        {
            id: 'username',
            label: 'Username',
            name:'username',
            type: 'username',
            autoComplete: 'username',
            placeholder: 'username',
        },
        {
            id: 'name',
            name:'name',
            label: 'Name',
            type: 'name',
            autoComplete: 'name',
            placeholder: 'Name',
        },
        {
            id: 'email',
            label: 'Email',
            name:'email',
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
        },{
            id: 'passwordConfirm',
            name:'passwordConfirm',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm Password',
        }

    ]
    const nav = useNavigate();

    async  function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');
        const username = formData.get('username');
        const passwordConfirm = formData.get('passwordConfirm');
        try {
            //make it 1 second
            toast.loading('Registering...',{id: 'register', duration: 1000} );
            const data ={
                email, password, name, username,passwordConfirm
            }
            const response = await auth.register(data);

            toast.success('Registered successfully',{id: 'register',duration: 1000});
            nav('/login')
        }
        catch (e) {
            console.log(e);
            toast.error('Registeration failed',{id: 'register',duration: 1000});
        }

    }

    // useEffect(() => {
    //     if (auth.user) {
    //         return nav('/chat');
    //     }
    // }, [auth])
    return (
        <Box width='100%' height='100%' display='flex' flex='1' justifyContent='center' alignItems='center'>
            <Box display={{md: 'flex', sm: 'none', xs: 'none'}}>
                <img src='airobot.png' alt='Robot'/>
            </Box>
            <Box display={'flex'} ml='auto' flex={{md: '1', sm: '1', xs: '1'}} mt={16}>

                <Form  handleSubmit={handleSubmit} title='Register' fields={fields}/>
            </Box>
        </Box>
    );
}

export default Register;
