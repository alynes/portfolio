import React, { useState } from 'react';

// Material Design
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// My Components
import Swipe from '../Swipe.js';
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
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [carouselDirection, setCarouselDirection] = useState("none");

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <h1>Home Page</h1>
            <Divider />
            <div className={classes.carouselContainer}>
                <Swipe threshold={20} x={carouselIndex} setX={setCarouselIndex} setDirection={setCarouselDirection}>
                    <Carousel3D index={carouselIndex} direction={carouselDirection}>
                        <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/avesa animated.gif'} alt={"avesa"}/>
                        <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/bp-chronicles-play.gif'} alt={"record"}/>
                        <img className={"carousel-img"} src={process.env.PUBLIC_URL + '/tourists.gif'} alt={"create response"}/>
                    </Carousel3D>
                </Swipe>
            </div>
        </div>
    )
}
