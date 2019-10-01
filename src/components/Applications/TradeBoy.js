import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    img: {
        width: '100%',
        flex: 1,
    },
    grid: {
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'start',
        gridGap: '30px 30px',
        maxWidth: '1200px',

        [theme.breakpoints.up('xs')]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            margin: '3%',
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            margin: '3%',
            marginTop: '3vh',
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            margin: 'auto',
            marginTop: '3vh',
        }
    },
}));

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
            <div className={"App-img-container"}>
                <img className={"App-img"} src={process.env.PUBLIC_URL + "/tradeboy-trade.gif"} alt={"trading"}/>
            </div>
            <p>
                For this, I used the Binance REST API to make queries on the pricing data as well as to make trades directly and automatically on this platform.
            </p>
            <p>
                Now this friend of mine uses it every day. I set up an AWS EC2 instance to host the app.
            </p>
        </div>
    )
}
