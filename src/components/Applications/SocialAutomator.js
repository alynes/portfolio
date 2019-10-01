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
                <img className={"App-img"} src={process.env.PUBLIC_URL + "/social-auto-create-response.gif"} alt={"trading"}/>
            </div>
            <p>
                What you are seeing here is a form to create "responses". If the bot detects certain patterns in text,
                it will formulate a response based on the given text data.
                Built in is validation. If you are missing a quotation, bracket, or comma the app will let you know;
                and once the validation is satisfied, you may test your sentence generation.
            </p>
            <p>
                Responses are used in tasks. Such as responding to comments on one's own or another's Instagram page and
                responding to reply's made on comments while seeking new followers or responding to a page's bio.
                Those tasks are grouped into a weekly schedule, and
            </p>
        </div>
    )
}
