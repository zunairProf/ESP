import CopyrightIcon from '@mui/icons-material/Copyright';
import React from "react";

export const Footer = () => {
    return (
        <footer className="footer pb-0 mt-5">
            <div className="site-section">
                <div style={{background: '#d7d7d8', height: '50px', marginTop: '120px'}}>
                    <span style={{position: 'relative', top: '10px', color: '#4d4f53'}}>
                        <CopyrightIcon style={{height: '15px'}}/>
                        2023 Copyright: bedbooking.com
                    </span>
                </div>
            </div>
        </footer>
    )
}