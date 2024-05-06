import {createContext, useContext} from "react";
import {useEffect, useState} from "react";
import {checkToken, loginUser, registerUser} from "../helpers/api-communicator.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(0)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //get user from local storage


        async function checkStatus() {
            const storageUser = localStorage.getItem("user")
            const user = JSON.parse(storageUser);
            if (!user) {
                setLoading(false);
                return;
            }
            const token = user.token;
            console.log(user)
            try {
                // toast.loading("Checking Authentication...", {id: "checkAuth"});
                await checkToken(token);
                // toast.success("Authentication valid", {id: "checkAuth"});

                setUser(user);
                setIsLoggedIn(1);

            } catch (e) {
                console.log('e', e);
                toast.error("Authentication invalid... Please login", {id: "checkAuth"});
                logout();
            }

            setLoading(false);

        }

        checkStatus();


    }, []);
    const register = async (userData) => {
        let data = await registerUser(userData);


    }
    const login = async (email, password) => {

        let data = await loginUser(email, password);
        console.log(data);
        let userData = data.data.user
        console.log('x', data);
        if (data) {
            setUser({
                user: {
                    email: userData.email,
                    name: userData.name,
                    username: userData.username,
                },
                token: data.data.token


            });
        }
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(data.data));


        setIsLoggedIn(true);
    }
    const logout = () => {
        setUser(null);
        setIsLoggedIn(0);
        localStorage.removeItem("user");
    }
    const value = {
        user,
        login,
        register,
        logout,
        isLoggedIn,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

