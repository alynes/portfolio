import React from 'react';

export default function SocialAutomator() {

    return (
        <div className={"App-page"}>
            <h1>Social Automator</h1>
            <p>
                This project began with a simple goal. CREATE SOCIAL MEDIA BOTS.
                Turns out, that is not so effective on it's own. With time and many Python scripting experiments
                it has evolved into a social automation platform aimed at
                decreasing the necessary time and effort needed to grow and maintain a social presence online.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/sa-response-edit.mp4"} />
            </div>
            <p>
                What you are seeing here is a form to create "responses". If the bot detects certain patterns in text,
                it will formulate a response based on the given text data.
                Built in is validation. If you are missing a quotation, bracket, or comma the app will let you know;
                and once the validation is satisfied, you may test your sentence generation.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/sa-who-r-u.mp4"} />
            </div>
            <p>
                If it cannot find the pattern in the test text, it will not respond.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay muted loop className={"App-img"} src={process.env.PUBLIC_URL + "/sa-not-found.mp4"} />
            </div>
            <p>
                Responses are used in tasks. Such as responding to comments on one's own or another's Instagram page and
                responding to reply's made on comments while seeking new followers or responding to a page's bio.
                Those tasks are grouped into a weekly schedule and users actions are batched together by a worker service.
            </p>
        </div>
    )
}