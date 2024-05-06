import axios from "axios";
import validator from "validator/es";
import catchAsync from "./catchAsync.js";

export const loginUser = async (email, password) => {
    let data = {email: null, username: null, password}
    //check if email is in email format
    if (validator.isEmail(email)) {
        data.email = email
    } else {
        data.username = email
    }
    const response = await axios.post('user/login', data)
    if (response.status >= 200 && response.status < 300) {
        return response.data
    }
}
export const registerUser = async (params) => {
    let data = {
        email: params.email,
        username: params.username,
        password: params.password,
        name: params.name,
        passwordConfirm: params.passwordConfirm
    }
    //check if email is in email format
    const response = await axios.post('user/register', data)
    if (response.status >= 200 && response.status < 300) {
        return response.data
    }
}

export const checkToken = async (token) => {
    // post to checkAuth header token brear
    const response = await axios.post('user/checkAuth', null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (response.status >= 200 && response.status < 300) {
        return response.data
    }

}

export const getUserChat = catchAsync(async (token) => {
    try {
        const response = await axios.get('/chat', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            //error
            console.log(response.data);
        }
    } catch (e) {
        console.log(e);
    }
})

export const clearConversation = catchAsync(async (token) => {
    const response = await axios.delete('/chat', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        //error
        console.log(response.data);
    }
})

export const sendMessage = async (token, message) => {
    try {
        const response = await axios.post('/chat', {message}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            //error
            console.log(response.data);
        }
    } catch (e) {
        console.log(e);
    }
}
