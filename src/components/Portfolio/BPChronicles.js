import React from 'react';

export default function BPChronicles() {

    return (
        <div className={"App-page"}>
            <h1>The Bipolar Chronicles</h1>
            <p>In the age of short attention spans, the wonder for content creators of all kinds is "how do we get people to pay attention?"
            I answered this question for a small music company based in Dallas by creating a world in which listeners can explore while they
            enjoy the music as well. Tap on different objects and characters to gain points and reveal the plot.</p>
            <div className={"App-img-container"}>
                <img className={"App-img"} src={process.env.PUBLIC_URL + "/bp-chronicles-play.gif"} alt={"trading"}/>
            </div>
            <p>I created the front end using React, with Redux and CSSTransitions, using Django Rest Framework in the backend.</p>
            <p>I created a simple level builder that they can use to customise these worlds from a graphical standpoint.</p>
            <div className={"App-img-container"}>
                <img className={"App-img"} src={process.env.PUBLIC_URL + "/bp-chronicles-build.gif"} alt={"trading"}/>
            </div>
        </div>
    )
}
