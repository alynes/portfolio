import React, { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Carousel3D.css';

/**
 *   This component will place any provided 'children' into a rotating carousel.
 *   It will display the 'index'ed position child element, and use 'direction' ('left' or 'right') to
 *   determine which CSSTransition to animate the carousel.
 *
 *   It will attempt to fill it's parent component.
 *   Use any relatively positioned parent with overflow: 'hidden'.
 *
 *
 *   IN THIS APP:
 *   - Home
 */
export default function Carousel3D({ index, direction, children }) {
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
        <Fragment>
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
        </Fragment>
    )
}
