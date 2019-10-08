import React, { useState, useEffect, Fragment } from 'react';

/**
 *   This component will wrap any provided 'children' to measure touch/mouse swipes or drags.
 *   If the swiped distance is more than 'threshold'(px) in a cardinal direction, then
 *   'x' and/or 'y' will increase or decrease by 1 accordingly — using 'setX' and 'setY'.
 *
 *   It makes 'children' elements swipe-able. You can utilize React.useEffect() in another component
 *   to do anything based on 'x' and/or 'y' increasing or decreasing by 1.
 *
 *  @param { Array | Object } children - This component adapts to fit the size of child element/s.
 *  @param { Number } threshold - The minimum swiped distance (in pixels) that registers as a swipe.
 *  @param { Number=null } x - is used to determine what 'x' value is next when when a X axis swipe is triggered.
 *  @param { function=null } setX - sets 'x' from container component when a X axis swipe is triggered.
 *  @param { Number=null } y - is used to determine what 'y' value is next when when a Y axis swipe is triggered.
 *  @param { function=null } setY - sets 'y' from container component when a Y axis swipe is triggered.
 *  @param { function=null } setDirection - sets the direction ('left', 'right', 'up', 'down') based on changes in 'x' and 'y'.
 *  @param { boolean=false } revX - reverse effect on 'x'.
 *  @param { boolean=false } revY - reverse effect on 'y'.
 *
 *   IN THIS APP:
 *   - Closing the Drawer: Layout
 *   - Navigating Carousel3D: Portfolio
 */
export default function Swipe({ children, threshold, x=null, setX=null, y=null, setY=null, setDirection=null, revX=false, revY=false }) {
    const [calculating, setCalculating] = useState(0);  // Calculate differences in 'x' and 'y' swipe coordinates while true.
    const [startX, setStartX] = useState(null);  // Initial x coordinate on swipe-start.
    const [startY, setStartY] = useState(null);  // Initial y coordinate on swipe-start.
    const [nowX, setNowX] = useState(null);  // Current x coordinate while swiping.
    const [nowY, setNowY] = useState(null);  // Current y coordinate while swiping.

    // Calculate touch/mouse positions.
    useEffect(() => {
        let difX = nowX - startX;
        let difY = nowY - startY;

        // If beyond threshold, change an index.
        if (x !== null) {
            if (Math.abs(difX) >= threshold) {
                if (difX > 0) {
                    revX === false ? setX(x + 1) : setX(x - 1);
                    if (setDirection !== null) {
                        setDirection("right");
                    }
                    setCalculating(false);
                    setNowX(startX);

                } else {
                    revX === false ? setX(x - 1) : setX(x + 1);
                    if (setDirection !== null) {
                        setDirection("left");
                    }
                    setCalculating(false);
                    setNowX(startX);
                }
            }
        }
        if (y !== null) {
            // noinspection JSSuspiciousNameCombination
            if (Math.abs(difY) >= threshold) {
                if (difY > 0) {
                    console.log("Y - 1");
                    revY === false ? setY(y - 1) : setY(y + 1);
                    if (setDirection !== null) {
                        setDirection("down");
                    }
                    setCalculating(false);
                } else {
                    console.log("Y + 1");
                    revY === false ? setY(y + 1) : setY(y - 1);
                    if (setDirection !== null) {
                        setDirection("up");
                    }
                    setCalculating(false);
                }
            }
        }
    }, [nowX, nowY]);

    return (
        <Fragment>
            <div style={{display: "inline-block", touchAction: "none"}}
                // Touch
                onTouchStart={(e) => {
                    e.preventDefault();
                    setCalculating(true);
                    setStartX(e.touches[0].pageX);
                    setStartY(e.touches[0].pageY);
                }}
                onTouchMove={(e) => {
                    if (calculating) {
                        setNowX(e.touches[0].pageX);
                        setNowY(e.touches[0].pageY);
                    }
                }}
                onTouchEnd={() => {
                    setCalculating(false);
                }}
                // Mouse
                onMouseDown={(e) => {
                    e.preventDefault();
                    setCalculating(true);
                    setStartX(e.pageX);
                    setStartY(e.pageY);
                }}
                onMouseMove={(e) => {
                    if (calculating === true) {
                        setNowX(e.pageX);
                        setNowY(e.pageY);
                    }
                }}
                onMouseUp={() => {
                    setCalculating(false);
                }}
                onMouseLeave={() => {
                    setCalculating(false);
                }}
            >
                {children}
            </div>
        </Fragment>
    );
}
