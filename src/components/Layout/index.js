import React, { useEffect, useState } from 'react';

// Material Design
import { makeStyles } from '@material-ui/core';
import MUIDrawer from '@material-ui/core/Drawer';

// My components
import MyDrawer from './Drawer.js';
import MyNavbar from './Navbar.js';
import Swipe from '../Swipe.js';

// Styles
const drawerWidth = 270;
const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth
    }
}));

/**
 *    This component contains the nav-bar and side-drawer and handles their swiping.
 *
 *    @param { Object | Array } children - 'children' are displayed in @content-area.
 *    @param { Object } location - Scroll to top on change 'location.pathname'.
 */
export default function Layout({ children, location }) {
    const classes = useStyles();
    const [swipeIndex, setSwipeIndex] = useState(0);  // determines whether drawer is opening or closing.
    const [drawerOpen, setDrawerOpen] = useState(false); // displays drawer while true.

    // Scroll to top on change location.pathname
    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            // For older browsers
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    function handleDrawerToggle() {
        setDrawerOpen(!drawerOpen);
    }

    // If swiped left, close drawer.
    useEffect(() => {
        if (swipeIndex < 0) {
            setDrawerOpen(false);
            setSwipeIndex(0);
        } else if (swipeIndex > 0) {
            setDrawerOpen(true);
            setSwipeIndex(0);
        } else {
            setSwipeIndex(0);
        }
    }, [swipeIndex]);

    const drawer = (
        <MUIDrawer
            variant="temporary"
            anchor={"left"}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper
            }}
            ModalProps={{
                keepMounted: true // Better open performance on mobile.
            }}
        >
            <MyDrawer />
        </MUIDrawer>
    );

    return(
        <div>
            <div>
                <Swipe x={swipeIndex} setX={setSwipeIndex} threshold={50} >
                    <MyNavbar handleDrawerToggle={handleDrawerToggle}/>
                </Swipe>
                <nav className={classes.drawer} aria-label="menu items">
                    <Swipe x={swipeIndex} setX={setSwipeIndex} threshold={50} >
                        {drawer}
                    </Swipe>
                </nav>
            </div>
            <div id={"content-area"}>
                {/* <br /><br /> */}
                {children}
            </div>
        </div>
    )
}
