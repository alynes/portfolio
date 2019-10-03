import React from 'react';
import { Link } from "react-router-dom";

// Material Design
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// My Components
import Carousel3D from '../Carousel3D.js';

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

// Styles
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
    carouselContainer: {
        position: "relative",
        display: "block",
        width: "90%",
        height: "50vh",
        overflow: "hidden",
        margin: "auto",
        backgroundColor: "none",
        // border: "2px solid grey"
    }
}));

/**
 * This is the Portfolio page
 */
export default function Portfolio() {
    const classes = useStyles();

    return (
        <div className={"App-page"}>
            <Divider />
            <div className={classes.carouselContainer}>
                <Carousel3D autoInterval={5}>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"avesa"}/>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/bp-chronicles-play.gif'} alt={"bp chonicles"}/>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/tourists.jpg'} alt={"create response"}/>
                </Carousel3D>
            </div>
            <p>
                Punctual, hard-working, and professional.
                Armed with a wide scope of technical proficiency, exceptional communication skills, and
                an open creative mind — fights evil and inefficiency with a steadfast positive attitude,
                adapts to fast-paced/rapidly-changing environments, and perpetually chases knowledge —
                consistently learning new ideologies, patterns, and paradigms.
            </p>

            <div>
                <div className={classes.grid}>
                    {applications.map((app) => (
                        <Link key={app.id} to={`/portfolio/${app.id}`} style={{textDecoration: "none"}}>
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
        </div>
    )
}
