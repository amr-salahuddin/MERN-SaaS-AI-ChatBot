import React from 'react';
import {useAuth} from "../contexts/AuthContext.jsx";
import TypingAnim from "../components/shared/TypingAnim.jsx";
import {Box} from "@mui/material";

function Home(props) {
    const auth = useAuth();
    console.log('home', auth.user);
    return (
        //width 100% and height 100% display flex mx auto
        <Box  width='100%' height='100%' >
            <Box display='flex' flex='1' justifyContent='center' alignItems='center' flexDirection='column' mx='auto'>
                <Box>
                    <TypingAnim/>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:5, width: {md: '100%', sm: '100%', xs: '100%'} }} flexDirection={{md: 'row', sm: 'column', xs: 'column'}}>
                    <img src='robot.png' style={{width: '200px', height: '200px',margin: 'auto'}}/>
                    <img  src='openai.png' className='image-inverted rotate' style={{width: '200px', height: '200px',margin: 'auto'}}/>
                </Box>
                <Box sx={{display:'flex', width:'100%', mx:'auto',}}>
                    <img src='chat.png' style={{width:'60%',display:'flex', margin:'auto',marginTop:'20px',borderRadius:'20px',boxShadow:'-5px -5px 105px #64f3d5'}}/>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
