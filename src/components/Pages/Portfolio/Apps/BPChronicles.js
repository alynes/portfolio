import React, { Fragment } from 'react';
import UrlConstants from '../../../../constant/UrlConstants';
import VideoLazy from '../../../Utility/VideoLazy';

export default function BPChronicles() {

    return (
        <Fragment>
            <h1>The Bipolar Chronicles</h1>
            <span>Demo: </span><span><a href={UrlConstants.BipolarEntertainment}>The Bipolar Chronicles</a></span>
            <p>In the age of short attention spans, the wonder for content creators of all kinds is "how do we get people to pay attention?"
            I answered this question for a small music company based in Dallas by creating a world in which listeners can explore while they enjoy the music as well.</p>
            
            <p>The landing page is comprised of 3 layers of transparent video, which move and scale when clicking to go to different areas of the page. After choosing a record to play on the turntable, it takes you to an interactive music experience.</p>
            <p>I created the front end using React, with Redux and CSSTransitions, using Django Rest Framework in the backend.</p>
            <div className={'App-img-container'}>
                <VideoLazy src={process.env.PUBLIC_URL + '/bp-landing-page.mp4'} />
            </div>
            <p> A character follows your mouse, or walks to touch location. Tap on different objects and characters to gain points, fight baddies, and reveal the plot.</p>
            <div className={'App-img-container'}>
                <VideoLazy src={process.env.PUBLIC_URL + '/bp-chronicles.mp4'} />
            </div>
            <p>In level-building mode, admins can manipulate elements of each area. Objects may have different types, click events, and effects, including but not limited to: show/hide, teleportation, group-triggered, time-triggered, etc.</p>
            <div className={'App-img-container'}>
                <VideoLazy src={process.env.PUBLIC_URL + '/bp-level-builder.mp4'} />
            </div>
            <br/>
        </Fragment>
    )
}
