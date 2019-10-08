import React from 'react';

export default function BPChronicles() {

    return (
        <div className={"App-page"}>
            <h1>The Bipolar Chronicles</h1>
            <p>In the age of short attention spans, the wonder for content creators of all kinds is "how do we get people to pay attention?"
            I answered this question for a small music company based in Dallas by creating a world in which listeners can explore while they enjoy the music as well.</p>
            <p> Tap on different objects and characters to gain points and reveal the plot.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-jellyfish.mp4"} />
            </div>
            <p>I created the front end using React, with Redux and CSSTransitions, using Django Rest Framework in the backend.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-all-directions.mp4"} />
            </div>
            <p>The music player changes the level.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-music-player.mp4"} />
            </div>
            <p>I created a simple level builder that they can use to customise these worlds from a graphical standpoint.</p>
            <p>Elements can be scaled.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-build-scale.mp4"} />
            </div>
            <p>Elements can also be translated.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-build-translate.mp4"} />
            </div>
            <p>Now the blue guy disappears on click, but the coin does not.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-build-scale-result.mp4"} />
            </div>
            <p>That's because translate moves elements without moving their clickable area. So does scale.</p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/bc-build-translate-result.mp4"} />
            </div>
            <br/>
        </div>
    )
}
