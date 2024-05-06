import React from 'react';
import {Box, Avatar, Typography} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import UserAvatar from "./shared/UserAvatar.jsx";


function ChatItem({message, role,name}) {
    const bgColor = {
        'user': '#004655',
        'assistant': '#001220'
    }
    const isUser = role === 'user';
    return (
        <Box display="flex" alignItems="center" mt={3} bgcolor={bgColor[role]} borderRadius={2} p={2}>
            {(role == 'user') && (
                <UserAvatar name={name}/>
            )}
            <Box
                sx={{
                    bgcolor: bgColor[role],
                    borderRadius: '8px',
                    py: 1,
                    px: 2,
                    maxWidth: '70%',
                }}
            >

                <MDEditor.Markdown style={{borderRadius: '8px', backgroundColor: 'transparent', whiteSpace: 'pre-wrap'}}
                                   source={message}> </MDEditor.Markdown>
            </Box>
        </Box>
    );
}

export default ChatItem;
