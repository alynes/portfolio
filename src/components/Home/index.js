import React from 'react';

// Material Design
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// My Components
import Carousel3D from '../Carousel3D.js';

const useStyles = makeStyles(theme => ({
    carouselContainer: {
        position: "relative",
        display: "block",
        width: "90%",
        height: "50vh",
        overflow: "hidden",
        margin: "auto",
        backgroundColor: "none",
        border: "2px solid grey"
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
                <Carousel3D>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"avesa"}/>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/bp-chronicles-play.gif'} alt={"record"}/>
                    <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/tourists.gif'} alt={"create response"}/>
                </Carousel3D>
            </div>
            <p>
                This is the portfolio page for Austin Lynes. A man of many talents, but the most notable are his
                achievements in software development.
            </p>
        </div>
    )
}
