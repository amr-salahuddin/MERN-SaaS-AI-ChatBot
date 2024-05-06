import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createTheme, GlobalStyles, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {Toaster} from 'react-hot-toast';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import {AuthProvider} from "./contexts/AuthContext.jsx";
import axios from 'axios';
import Chat from "./pages/Chat.jsx";
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const theme = createTheme({
    typography: {
        fontFamily: 'Zilla Slab',

        allVariants: {
            color: 'whitesmoke',
            textDecoration: 'none',
            fontWeight: 500,
        }
    },
});
ReactDOM.createRoot(document.getElementById('root')).render(
        <StyledEngineProvider injectFirst>
        <AuthProvider>

            <Router>
                <ThemeProvider theme={theme}>
                    <Toaster position="top-right"/>
                    <App/>
                </ThemeProvider>
            </Router>
        </AuthProvider>
        </StyledEngineProvider>

)
