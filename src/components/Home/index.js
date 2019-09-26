import React from 'react';

// Material Design
import Divider from '@material-ui/core/Divider';

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Divider />
            <h3>Austin Lynes</h3>
            <img style={{width: "50%"}} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"create response"}/>

        </div>
    )
}