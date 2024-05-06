import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Box, Paper, Button, TextField, Avatar, Typography, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {useAuth} from "../contexts/AuthContext.jsx";
import ChatItem from "../components/ChatItem.jsx";
import {useNavigate} from "react-router-dom";
import {clearConversation, getUserChat, sendMessage} from "../helpers/api-communicator.js";
import catchAsync from "../helpers/catchAsync.js";
import toast from "react-hot-toast";
import UserAvatar from "../components/shared/UserAvatar.jsx";

let tmpid = 55;
let generatingHold = false;

function Chat() {
    const scrollRef = React.createRef();
    const inputRef = useRef();
    let token;
    const auth = useAuth();
    const nav = useNavigate();
    const [chat, setChat] = useState([]);
    //wait for auth.loading to be false
//region pre
    useEffect(() => {

        if (!auth.loading) {
            if (!auth.user)
                nav('/login');
            else {
                getUserChat(auth.user.token).then(
                    (data) => {
                        setChat(data.data);
                    }
                );
            }
        }
    }, [auth]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});

    }, [chat])
    if (auth.loading)
        return (<Box
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Loading...</Box>)

    //endregion
    if (!auth.user) return <></>

    async function handleClearConversation() {
        try {
            toast.loading('Clearing conversation...', {id: 'clear'});
            await clearConversation(auth.user.token);
            setChat([]);
            toast.success('Conversation cleared', {id: 'clear'});
        } catch (e) {
            toast.error('Failed to clear conversation', {id: 'clear'});
        }
    }

    async function handleSubmit(e) {
        //check if it is a button
        if (e.type === 'click' || e.key === 'Enter') {
            const message = inputRef.current.value;
            console.log(message);
            console.log(generatingHold);
            if (!generatingHold && message) {
                try {
                    generatingHold = true;
                    //scroll
                    console.log('hi');

                    setChat((prev) => [...prev, {role: 'user', content: message, _id: tmpid += 4}]);
                    setChat((prev) => [...prev, {role: 'assistant', content: 'Generating...', _id: tmpid += 4}]);
                    inputRef.current.value = '';
                    const data = await sendMessage(auth.user.token, message);

                    const newChat = {
                        role: 'assistant',
                        content: data.data.responseMessage,
                        _id: data.data._id
                    }
                    //setChat to al except last one
                    setChat(prev => prev.slice(0, prev.length - 1));
                    setChat((prev) => [...prev, newChat]);
                    generatingHold = false;

                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    console.log(auth.loading)
    if(!auth.user.user){
        console.log('wtf',auth.user);

    }
    console.log(auth.user.user.name)
    let name = auth.user.user.name;
    let chatItems;
    if (chat.length > 0) {
        chatItems =
            chat.map((item) => {
                return <ChatItem key={item['_id']} message={item.content} role={item.role} name={name}/>
            });
    }

    return (

        <>

            {(<Box display="flex" height="90vh">

                <Box width="25%" p={2} display={{md: 'flex', sm: 'none', xs: 'none'}}>
                    <Box sx={{
                        height: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#0b1c25',
                    }}>
                        <UserAvatar name={name}/>
                        <Typography variant="h6">You are talking to a ChatBOT</Typography>
                        <Typography variant="h5" sx={{mx: "auto", my: 4, p: 3}}>You can ask some questions
                            related to Knowledge, Business, Advices, Education, etc. But avoid sharing personal
                            information.</Typography>

                        <Button variant="contained" sx={{my: 'auto',}} color="error"
                                onClick={handleClearConversation}
                        >Clear
                            Conversation</Button>
                    </Box>
                </Box>
                <Box width="75%" p={2}>
                    <Paper sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        bgcolor: '#05101c'

                    }}>
                        <Typography variant="h4" font-weight="bold" align="center" mx='auto' p={2}>
                            MODEL GPT-3.5
                        </Typography>
                        <Box p={2} sx={{
                            overflowY: 'auto', bgcolor: '#0b1c25', height: '100%',
                        }}>
                            {chatItems}
                            <div ref={scrollRef}></div>
                        </Box>

                        <Box p={2} sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField inputRef={inputRef} sx={{input: {color: 'white'}, width: '95%'}}
                                       onKeyPress={handleSubmit}
                                       label="Type your message"
                            />
                            <IconButton color="primary" sx={{ml: 2}} aria-label="send" onClick={handleSubmit}>
                                <SendIcon/>
                            </IconButton>
                        </Box>
                    </Paper>
                </Box>
            </Box>)}
        </>)
}

export default Chat;
