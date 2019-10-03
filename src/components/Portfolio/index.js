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
        src: ['/tb-price.mp4', '/tb-buysell.mp4', '/tb-delete-cancel.mp4'],
        alt: 'Experimental crytocurrency trading app'
    },
    {
        name: 'The Bipolar Chronicles',
        description: 'Interactive musical experience',
        id: 'bp-chronicles',
        src: ['/bc-jellyfish.mp4', '/bc-music-player.mp4', '/bc-build-scale.mp4'],
        alt: 'Interactive musical experience application'
    },
    {
        name: 'Social Automator',
        description: 'Social media automation',
        id: 'social-automator',
        src: ['/sa-response-edit.mp4', '/sa-who-r-u.mp4', '/sa-not-found.mp4'],
        alt: 'Social media automation application'
    }
];

// Styles
const useStyles = makeStyles(theme => ({
    grid: {
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'start',
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
        minHeight: "30vmin",
        overflow: "hidden",
        margin: "auto",
        backgroundColor: "none",
        // border: "2px solid grey"
    },
    gridItemContainer: {
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        margin: 0
    }
}));

/**
 * This is the Portfolio page
 */
export default function Portfolio() {
    const classes = useStyles();

    return (
        <div className={"App-page"}>
            <div>
                <div className={classes.grid}>
                    {applications.map((app) => (
                        <div key={app.id} className={classes.gridItemContainer}>
                            <Link to={`/portfolio/${app.id}`} style={{display: "flex", flexDirection: "column"}}>
                                <h1 style={{textAlign: "center"}} className={"App-link"}>{app.name}</h1>
                                <p style={{textAlign: "center"}} className={"App-link"}>{app.description}</p>
                                <div className={classes.carouselContainer}>
                                    <Carousel3D autoInterval={15}>
                                        {app.src.map((path, index) => (
                                            <video key={index} autoPlay muted loop className={"carousel-img"} src={process.env.PUBLIC_URL + path} />
                                        ))}
                                    </Carousel3D>
                                </div>
                            </Link>
                            <br/>
                        </div>
                    ))}
                </div>
                <Divider />
            </div>
        </div>
    )
}
