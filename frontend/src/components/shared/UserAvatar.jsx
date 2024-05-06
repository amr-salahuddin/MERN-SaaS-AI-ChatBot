import React from 'react';
import {Avatar} from "@mui/material";

function UserAvatar(props) {
    const name = props.name;
    const fst = name.split(' ')[0][0].toUpperCase();
    const scd = name.split(' ')[0][1]?name.split(' ')[0][1].toUpperCase():null;
    return (
        <Avatar sx={{mx: '1px', my: '10px', bgcolor: 'black', color: 'white'}}>
            {fst}
            {scd}
        </Avatar>
    );
}

export default UserAvatar;
