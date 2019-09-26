import React, { useState, useEffect } from 'react';

export default function Touch({ component, threshold, x=null, setX=null, y=null, setY=null }) {
    const [calculate, setCalculate] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [nowX, setNowX] = useState(0);
    const [nowY, setNowY] = useState(0);

    useEffect(() => {
        let difX = nowX - startX;
        let difY = nowY - startY;

        // if beyond threshold, change an index
        if (x !== null) {
            if (Math.abs(difX) >= threshold) {
                if (difX > 0) {
                    console.log("X + 1!!");
                    setX(x + 1);
                    setCalculate(false);
                    setNowX(startX);

                } else {
                    console.log("X - 1!!");
                    setX(x - 1);
                    setCalculate(false);
                    setNowX(startX);
                }
            }
        }
        if (y !== null) {
            if (Math.abs(difY) >= threshold) {
                if (difY > 0) {
                    console.log("Y - 1");
                    setY(y - 1);
                    setCalculate(false);
                } else {
                    console.log("Y + 1");
                    setY(y + 1);
                    setCalculate(false);
                }
            }
        }
    }, [nowX, nowY]);

    return (
        <div>
            <div style={{display: "inline-block"}}
                 // Mouse Events
                onMouseDown={(e) => {
                    e.preventDefault();
                    setCalculate(true);
                    setStartX(e.pageX);
                    setStartY(e.pageY);
                }}
                onMouseMove={(e) => {
                    if (calculate === true) {
                        setNowX(e.pageX);
                        setNowY(e.pageY);
                    }
                }}
                onMouseUp={() => {
                    setCalculate(false);
                }}
                onMouseLeave={() => {
                    setCalculate(false);
                }}
                 // Touch Events
                onTouchStart={(e) => {
                    e.preventDefault();
                    setCalculate(true);
                    setStartX(e.touches[0].pageX);
                    setStartY(e.touches[0].pageY);
                }}
                onTouchMove={(e) => {
                    if (calculate) {
                        setNowX(e.touches[0].pageX);
                        setNowY(e.touches[0].pageY);
                    }
                }}
                onTouchEnd={() => {
                    setCalculate(false);
                }}
            >
                {component}
            </div>
        </div>
    );

}



