import React from 'react';

// Material Design
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    img: {
        width: '100%',
        flex: 1,
    },
    grid: {
        display: "grid",
        justifyItems: 'center',
        alignItems: 'end',
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

/**
 * This page displays applications I have created in grid format.
 *
 */
export default function Applications() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.grid}>
                <div>
                    <img className={classes.img} src={process.env.PUBLIC_URL + '/social-auto-create-response.gif'} alt={"create response"}/>
                    <h2>Social Automator</h2>
                    <p>Social media automation</p>
                </div>
                <div>
                    <img className={classes.img} src={process.env.PUBLIC_URL + '/tradeboy-trade.gif'} alt={"BP play"}/>
                    <h2>Trade Boy</h2>
                    <p>Experimental cryptocurrency trading</p>
                </div>
                <div>
                    <img className={classes.img} src={process.env.PUBLIC_URL + '/bp-chronicles-build.gif'} alt={"BP build"}/>
                    <h2>The Bipolar Chronicles</h2>
                    <p>Interactive musical experience</p>
                </div>
            </div>
            <Divider />
        </div>
    )
}
