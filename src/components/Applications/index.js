import React from 'react';
import { Link } from 'react-router-dom';

// Material Design
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const applications = [
    {
        name: 'TradeBoy',
        description: 'Experimental cryptocurrency trading',
        id: 'trade-boy',
        src: '/tradeboy-trade.gif',
        alt: 'Experimental crytocurrency trading app'
    },
    {
        name: 'The Bipolar Chronicles',
        description: 'Interactive musical experience',
        id: 'bp-chronicles',
        src: '/bp-chronicles-build.gif',
        alt: 'Interactive musical experience application'
    },
    {
        name: 'SocialAutomator',
        description: 'Social media automation',
        id: 'social-automator',
        src: '/social-auto-create-response.gif',
        alt: 'Social media automation application'
    }
];

const useStyles = makeStyles(theme => ({
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

/**
 * This page displays applications I have created in grid format.
 *
 */
export default function Applications() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.grid}>
                {applications.map((app) => (
                    <Link key={app.id} to={`/applications/${app.id}`} style={{textDecoration: "none"}}>
                    <div>
                        <h1 style={{textAlign: "center"}} className={"App-link"}>{app.name}</h1>
                        <p style={{textAlign: "center"}} className={"App-link"}>{app.description}</p>
                        <img className={"App-img"} src={process.env.PUBLIC_URL + app.src} alt={app.alt}/>
                    </div>
                    </Link>
                ))}
            </div>
            <Divider />
        </div>
    )
}
