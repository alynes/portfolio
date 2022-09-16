import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Carousel3D.css';
import Swipe from './Swipe.js';

/**
 *   This component places 'children' into a rotating carousel.
 *   Use any relatively positioned parent with {overflow: 'hidden'}, and
 *   it will attempt to fill it's parent component.
 *
 *  @param { Array | Object } children - The carousel displays all child elements.
 *  @param { Number } initialIndex - 'initialIndex' determines the child element displayed on load.
 *  @param { Number } autoInterval - Auto-swipe every 'autoInterval' seconds (at '0', does not auto-swipe).
 *  @param { string } autoDirection - Auto-swipe to the 'autoDirection' ('left' | 'right')
 *
 *   IN THIS APP:
 *   - Portfolio
 */
export default function Carousel3D({ children, initialIndex=0, autoInterval=0, autoDirection='left' }) {
    const [index, setIndex] = useState(initialIndex);  // The carousel will display the 'index' positioned child element.
    const [direction, setDirection] = useState('none');  // 'direction' ('left' or 'right') determines which CSSTransitions to use for animating the carousel.
    const [autoSwipe, setAutoSwipe] = useAutoSwipe(autoInterval);  // Sets 'autoSwipe' to true every 'autoInterval' seconds.

    // Calculate swipe direction.
    useEffect(() => {
        if (autoSwipe === true) {
            if (autoDirection === 'left') {
                setIndex(index - 1);
                setDirection('left')
            } else {
                setIndex(index + 1);
                setDirection('right')
            }
            // Reset 'autoSwipe' to false after auto swipe.
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
            <div style={{display: 'block', width: '100%', height: '200px'}}>
                <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: 'auto', pointerEvents: 'all'}}>
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
                        <div className={'slide'} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto'}}>
                            {children[Math.abs(index) % children.length]}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
                </div>
            </div>
        </Swipe>
    )
}

/**
 *   Custom effect to return true after X 'seconds', enabling auto-swipe for the carousel.
 *   Use setAutoSwipe(false) in parent component's 'useEffect' to react on 'autoSwipe' and reset.
 *
 *   @param { Number } seconds - Time interval between auto-swipes.
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