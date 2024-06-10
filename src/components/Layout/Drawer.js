import React from 'react';

import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PermMediaIcon from '@material-ui/icons/PermMedia';

import DrawerItem from './DrawerItem.js';
import Clock from '../Utility/Clock.js';
import UrlConstants from '../../constant/UrlConstants.js';
import RouteConstants from '../../constant/RouteConstants.js';

const useStyles = makeStyles(() => ({
    img: {
        width: '100%',
        flex: 1,
    },
    clockContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        textAlign: 'left',
        padding: '0 0 8px 16px',
        pointerEvents: 'all',
    }
}));

/**
 *    The Drawer component is the sidebar for the layout.
 *
 *    @param { Function } handleDrawerToggle - 'handleDrawerToggle' opens/closes the side drawer.
 */
export default function Drawer({ handleDrawerToggle }) {
    const classes = useStyles();

    const portfolioIcon = <PermMediaIcon color={'inherit'} />;
    const resumeIcon = <RecentActorsIcon color={'inherit'} />;

    return (
        <div id={'drawer'} style={{pointerEvents: 'none'}}>
            {/* Drawer's main content */}
            <div id={'drawer-main-content'} style={{display: 'inline-block', color: 'white', pointerEvents: 'all'}}>
                <Toolbar>
                    <div className={classes.clockContainer}>
                        <img className={classes.img} src={process.env.PUBLIC_URL + '/assets/astronaut-flip.gif'} alt={'astronaut-flip'}/>
                        <Clock />
                    </div>
                </Toolbar>
                <Divider />
                <List onClick={() => handleDrawerToggle()}>
                    <DrawerItem text={'Portfolio'} url={RouteConstants.Portfolio} svg={portfolioIcon} />
                    <DrawerItem text={'Resumé'} url={RouteConstants.Resume} svg={resumeIcon} />
                </List>
                <Divider />
            </div>

            {/* Spacer so that the links below can show through this 'window' on small screens */}
            <div style={{height: '72px', background: 'rgba(0, 0, 0, 0)'}}/>

            {/* Bottom-fixed link section */}
            <div style={{position: 'fixed', bottom: 0, zIndex: -1, marginBottom: '8px'}}>
                <div className={classes.link}>
                    <a href={UrlConstants.MyGithub}>github.com/alynes</a>
                </div>
                <div className={classes.link}>
                    <a href={UrlConstants.MyLinkedIn}>linkedin.com/alynes</a>
                </div>
            </div>
        </div>
    )
}
