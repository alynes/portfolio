import React from 'react';

export default function TradeBoy() {

    return (
        <div className={"App-page"}>
            <h1>TradeBoy</h1>
            <p>
                It was a friend of mine that came up with the idea for this application.
                He is a cryptocurrency day-trader, and was feeling fatigued by the constant need to be at his computer, ready to make a trade.
                He is a self-described "scalper", and uses large percentages of his funds to make profits off of very small price differences.
                The issue with that is that most exchanges, of course, only let you spend the money that you have. They don't have the ability to
                let you spend what you WILL have in the future when your open trades close. So my solution to this was to create an application that allows you to make
                "sequential" trades.
            </p>
            <p>
                I used the Binance REST API to make queries on the pricing data as well as to make trades directly and automatically on this platform.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay={true} loop={true} className={"App-img"} src={process.env.PUBLIC_URL + "/tb-login.mp4"} />
            </div>
            <p>
                The calculations are done in the front end each time something changes, and then the math is double checked and
                validation is applied by the server.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay={true} loop={true} className={"App-img"} src={process.env.PUBLIC_URL + "/tb-price.mp4"} />
            </div>
            <p>
                These buy/sell modifiers make it easy to make many trades quickly.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay={true} loop={true} className={"App-img"} src={process.env.PUBLIC_URL + "/tb-buysell.mp4"} />
            </div>
            <p>
                In-progress orders may be deleted or cancelled if already sent to the Binance exchange.
            </p>
            <div className={"App-img-container"}>
                <video autoPlay={true} loop={true} className={"App-img"} src={process.env.PUBLIC_URL + "/tb-delete-cancel.mp4"} />
            </div>
            <p>
                Now this friend of mine uses it every day. I set up an AWS EC2 instance to host the app.
            </p>
            <br/>
        </div>
    )
}
