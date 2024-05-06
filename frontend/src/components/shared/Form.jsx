import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import './Form.css';
import InputField from "./InputField.jsx";

function Form(props) {

    let fields = props.fields;

    return (
        <>        {
            fields ?
                <form display='flex' onSubmit={props.handleSubmit} className='form-main' noValidate>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Typography textAlign='center' padding={2} fontWeight={600}
                                    variant='h4'>{props.title}</Typography>

                        {fields.map((field, index) => (
                            <InputField key={index} {...field}
                                        className='form-input'
                            >
                            </InputField>))}

                        <Button type='submit' className='form-button' variant='contained'>Log In</Button></Box>
                </form>

                : <></>
        }
        </>)

}

export default Form;
