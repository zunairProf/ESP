import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

export default function ButtonUsage() {

    const handleClick = () => {
        console.log("CLicked");
        // Navigate to another page

    };
    return <Button  onClick={() => {
        alert('clicked');
    }} variant="contained">Hello world</Button>;
}
