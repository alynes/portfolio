import React, { useState, useEffect, Fragment } from 'react';

/**
 *   This component will wrap any provided 'children' to measure touch/mouse swipes or drags.
 *   If the swiped distance is more than 'threshold'(px) in a cardinal direction, then
 *   'x' and/or 'y' will increase or decrease by 1 accordingly — using 'setX' and 'setY'.
 *
 *   It makes children swipe-able. You can utilize React.useEffect() in another component
 *   to do anything based on 'x' and/or 'y' increasing or decreasing by 1.
 *
 *   IN THIS APP:
 *   - Closing the Drawer: Layout
 *   - Navigating Carousel3D: Home
 */
export default function Swipe({ threshold, x=null, setX=null, y=null, setY=null, setDirection=null, revX=null, revY=null, children }) {
    const [calculate, setCalculate] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [nowX, setNowX] = useState(0);
    const [nowY, setNowY] = useState(0);

    // calculate touch/mouse positions
    useEffect(() => {
        let difX = nowX - startX;
        let difY = nowY - startY;

        // if beyond threshold, change an index
        if (x !== null) {
            if (Math.abs(difX) >= threshold) {
                if (difX > 0) {
                    revX === null ? setX(x + 1) : setX(x - 1);
                    if (setDirection !== null) {
                        setDirection("right");
                    }
                    setCalculate(false);
                    setNowX(startX);

                } else {
                    revX === null ? setX(x - 1) : setX(x + 1);
                    if (setDirection !== null) {
                        setDirection("left");
                    }
                    setCalculate(false);
                    setNowX(startX);
                }
            }
        }
        if (y !== null) {
            // noinspection JSSuspiciousNameCombination
            if (Math.abs(difY) >= threshold) {
                if (difY > 0) {
                    console.log("Y - 1");
                    revY === null ? setY(y - 1) : setY(y + 1);
                    if (setDirection !== null) {
                        setDirection("down");
                    }
                    setCalculate(false);
                } else {
                    console.log("Y + 1");
                    revY === null ? setY(y + 1) : setY(y - 1);
                    if (setDirection !== null) {
                        setDirection("up");
                    }
                    setCalculate(false);
                }
            }
        }
    }, [nowX, nowY]);

    return (
        <Fragment>
            <div style={{display: "inline-block"}}
                // Touch
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
                // Mouse
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
            >
                {children}
            </div>
        </Fragment>
    );
}
