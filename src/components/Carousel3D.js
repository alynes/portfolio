import React, {useEffect, useState} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Carousel3D.css';
import Swipe from './Swipe.js';

/**
 *   This component will place any provided 'children' into a rotating carousel.
 *   It will display the 'index' position child element, and use 'direction' ('left' or 'right') to
 *   determine which CSSTransition to animate the carousel.
 *
 *   It will attempt to fill it's parent component.
 *   Use any relatively positioned parent with overflow: 'hidden'.
 *
 *   IN THIS APP:
 *   - Home
 */
export default function Carousel3D({ children, initialIndex=0, autoInterval=0, autoDirection='left' }) {
    const [index, setIndex] = useState(initialIndex);
    const [direction, setDirection] = useState('none');
    const [autoSwipe, setAutoSwipe] = useAutoSwipe(autoInterval);

    useEffect(() => {
        if (autoSwipe === true) {
            if (autoDirection === 'left') {
                setIndex(index - 1);
                setDirection('left')
            } else {
                setIndex(index + 1);
                setDirection('right')
            }
            setAutoSwipe(false);
        }
    }, [autoSwipe]);

    let transitionClass;
    switch(direction) {
        case 'right':
            transitionClass = 'slideRight';
            break;
        case 'left':
            transitionClass = 'slideLeft';
            break;
        default:
            transitionClass = 'slide';
            break;
    }

    return (
        <Swipe threshold={30} x={index} setX={setIndex} setDirection={setDirection}>
            <TransitionGroup
                // This ensures that the next element receives the correct transition class BEFORE the transition
                childFactory={element => React.cloneElement(
                    element,
                    {classNames: transitionClass, timeout: 600},
                )}
                component={null}
            >
                <CSSTransition
                    key={index}
                    timeout={600}
                    classNames={transitionClass}
                >
                    <div className={"slide"} style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, padding: "auto"}}>
                        {children[Math.abs(index) % children.length]}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </Swipe>
    )
}

/**
 *   Custom effect to return true after X 'seconds', enabling auto-swipe for the carousel.
 *   Use setAutoSwipe(false) in parent component's 'useEffect' to react on 'autoSwipe' and reset.
 */
function useAutoSwipe(seconds) {
    const [autoSwipe, setAutoSwipe] = useState(false);

    useEffect(() => {
        if (seconds > 0) {
            let timeID = setInterval( () => tick(), seconds * 1000 );
            return function cleanup() {
                clearInterval(timeID);
            };
        }
    });

    function tick() {
        setAutoSwipe(true);
    }

    return [autoSwipe, setAutoSwipe];
}