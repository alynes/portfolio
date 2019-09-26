import React, { useState, useEffect } from 'react';

export default function Clock() {
    const time = useTime(new Date().toLocaleTimeString());

    return (
        <div style={{width: "100%", textAlign: "center"}}>
            <h3 style={{width: "100%"}}>{time}</h3>
        </div>
    )
}

function useTime(currentDate) {
    const [time, setTime] = useState(currentDate);

    useEffect(() => {
        let timeID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timeID);
        };
    });

    function tick() {
        setTime(new Date().toLocaleTimeString());
    }

    return time;
}