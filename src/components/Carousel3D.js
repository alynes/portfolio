import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Carousel3D.css';

export default function Carousel3D({ items, index }) {
    const [transition, setTransition] = useState(false);
    const [prevIndex, setPrevIndex] = useState(index);
    const [direction, setDirection] = useState("none");

    useEffect(() => {
        console.log(`index: ${index}, prevIndex: ${prevIndex}, transition: ${transition}`);
        setTransition(!transition);
        setPrevIndex(index);
        console.log(`index: ${index}, prevIndex: ${prevIndex}, transition: ${transition}`);
        console.log();

        if(index - prevIndex > 0) {
            setDirection("right");
        } else if (index - prevIndex < 0) {
            setDirection("left");
        }
    }, [index]);

    let transitionClass;
    switch(direction) {
        case "right":
            transitionClass = "slideRight";
            break;
        case "left":
            transitionClass = "slideLeft";
            break;
        default:
            transitionClass = "slide";
            break;
    }

    return (
        <div style={{position: "fixed", left: '50%', transform: 'translateX(-50%)'}}>
        <TransitionGroup
            childFactory={child => React.cloneElement(
                child,
                {classNames: transitionClass, timeout: 1000}
            )}
        >
            <CSSTransition
                in={transition}
                appear={true}
                key={index}
                timeout={1000}
                classNames={transitionClass}
            >
                <div style={{border: "2px solid black", float: "left"}}>
                    {items[Math.abs(index) % items.length]}
                </div>
            </CSSTransition>

        </TransitionGroup>
        </div>
    )
}
