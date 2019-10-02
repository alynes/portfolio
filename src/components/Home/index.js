import React from 'react';

// Material Design
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// My Components
import Carousel3D from '../Carousel3D.js';
import Applications from '../Applications/index.js';

// Styles
const useStyles = makeStyles(() => ({
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
 * This is the Home page
 */
export default function Home() {
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
            <Applications />
        </div>
    )
}
