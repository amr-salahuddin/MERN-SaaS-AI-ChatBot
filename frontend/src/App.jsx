import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import {useAuth} from "./contexts/AuthContext.jsx";
import Footer from "./components/Footer.jsx";


function App() {
    const auth = useAuth();
    return (
        <main>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                { auth.isLoggedIn && auth.user && <Route path="/chat" element={<Chat/>} />}
                <Route path="*" element={<NotFound/>} />
            </Routes>
            <Footer/>
        </main>
    )
}

export default App
