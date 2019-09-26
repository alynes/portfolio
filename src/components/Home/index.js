import React, { useState } from 'react';

// Material Design
import Divider from '@material-ui/core/Divider';

// My Components
import Touch from '../Touch.js';
import Carousel3D from '../Carousel3D.js';

export default function Home() {
    const [index, setIndex] = useState(0);

    const avesaAni = <img style={{width: "50%", pointerEvents: "none"}} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"avesa"}/>;
    const record = <img style={{width: "50%", pointerEvents: "none"}} src={process.env.PUBLIC_URL + '/bipolar record.gif'} alt={"record"}/>;
    const tourists = <img style={{width: "50%", pointerEvents: "none"}} src={process.env.PUBLIC_URL + '/tourists.gif'} alt={"create response"}/>;

    const items = [
        avesaAni,
        record,
        tourists
    ];

    const carousel = <Carousel3D items={items} index={index}/>;

    return (
        <div>
            <h1>Home Page</h1>
            <Divider />
            <div>
                <Touch component={carousel} threshold={20} x={index} setX={setIndex} />
            </div>

        </div>
    )
}
