import React from 'react';
import {Link} from "@mui/material";
import './NavigationLink.css'

function NavigationLink(props) {
    const style = {
        background: props.bg,
        color: props.color,
    }
    return (
            <Link className="nav-link" href={props.to} style={style} onClick={props.onClick}>
                {props.text}
            </Link>
    );
}

export default NavigationLink;
