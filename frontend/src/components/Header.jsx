import React from 'react';
import {AppBar, Toolbar} from "@mui/material";
import Logo from "./shared/Logo.jsx";
import NavigationLink from "./shared/NavigationLink.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Header(props) {
    const auth = useAuth();
    // if(auth.loading) return <div></div>;
    const nav = useNavigate();
    function handleLogout() {

        auth.logout();

    }
    const caseLoggedIn = {
        nav1: {
            text: 'Go To Chat',
            to: '/chat',
            bg: '#00fffc',
            color: 'black'
        },
        //auth.logout is executed first before to:'/' thus it redirects to register so dont use 'to' here

        nav2: {
            text: 'Log Out',
            to: '/',
            bg: '#51538f',
            color: 'white',
            onClick: handleLogout
        }
    }
    const caseLoggedOut = {
        nav1: {
            text: 'Log In',
            to: '/login',
            bg: '#00fffc',
            color: 'black'
        },
        nav2: {
            text: 'Register',
            to: '/register',
            bg: '#51538f',
            color: 'white'
        }
    }
    let NL = {
        nav1: 0,
        nav2: 0
    }
    if (auth.isLoggedIn) {
        NL = caseLoggedIn;
    } else {
        NL = caseLoggedOut;
    }
    return (
        <AppBar sx={{bgcolor: 'transparent', position: 'static', boxShadow: 'none'}}>
            <Toolbar>
                <Logo/>


                {auth.isLoggedIn?<>
                <NavigationLink text={caseLoggedIn.nav1.text} to={caseLoggedIn.nav1.to} bg={caseLoggedIn.nav1.bg} color={caseLoggedIn.nav1.color}/>
                    <NavigationLink text={caseLoggedIn.nav2.text} to={caseLoggedIn.nav2.to} bg={caseLoggedIn.nav2.bg} color={caseLoggedIn.nav2.color} onClick={NL.nav2.onClick}/>
                    </>
                    :    <><NavigationLink text={caseLoggedOut.nav1.text} to={caseLoggedOut.nav1.to} bg={caseLoggedOut.nav1.bg} color={caseLoggedOut.nav1.color}/>
                    <NavigationLink text={caseLoggedOut.nav2.text} to={caseLoggedOut.nav2.to} bg={caseLoggedOut.nav2.bg} color={caseLoggedOut.nav2.color} onClick={NL.nav2.onClick}/></>
            }
            </Toolbar>
        </AppBar>
    );
}

export default Header;
