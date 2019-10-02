import React, { useState, useEffect } from 'react';

/**
 *   Presentation component to display the local current time.
 *
 *   IN THIS APP:
 *   - Drawer: Layout
 */
export default function Clock() {
    const time = useTime(new Date());

    return (
        <div style={{width: "100%", textAlign: "center"}}>
            <h3 style={{width: "100%"}}>{time}</h3>
        </div>
    )
}

/**
 *   Custom effect to return the current local time each second.
 *   @param { Date } currentDate
 */
function useTime(currentDate) {
    const [time, setTime] = useState(currentDate.toLocaleTimeString());

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