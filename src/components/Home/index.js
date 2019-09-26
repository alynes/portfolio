import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Material Design
import Divider from '@material-ui/core/Divider';

// My Components
import Touch from '../Touch.js';

export default function Home() {
    const [index, setIndex] = useState(0);

    const comp = <img style={{width: "50vmin", pointerEvents: "none"}} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"create response"}/>
    return (
        <div>
            <h1>Home Page</h1>
            <Divider />
            <h3>Austin Lynes</h3>
            <Touch component={comp} threshold={20} x={index} setX={setIndex} />

        </div>
    )
}
