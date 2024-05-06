import React from 'react';
import './Logo.css'
import {Link, Typography} from "@mui/material";

function Logo(props) {
    return (
        <div className="logo" >
            <Link href='/'>
                <img className='logo-img' src='openai.png' alt="logo"/>

            </Link>
            <Typography sx={
                {
                    display: {xs: 'none', md: 'block', sm: 'none'},
                    mr: 'auto',
                    fontWeight: '800',
                    textShadow: '2px 2px 20px #000'
                }}><span style={{fontSize: '20px'}}>MERN</span>-GPT</Typography>
        </div>
    );
}

export default Logo;
