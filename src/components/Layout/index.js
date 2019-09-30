import React, {useEffect, useState} from 'react';

// Material Design
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MUIDrawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

// My components
import MyDrawer from './Drawer.js';
import Swipe from '../Swipe.js';

// Styles
const drawerWidth = 270;
const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up("lg")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth
    }
}));

export default function Layout({ children, ...props }) {
    const classes = useStyles();
    const [touchIndex, setTouchIndex] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);

    function handleDrawerToggle() {
        console.log("OPEN drawer");
        setDrawerOpen(!drawerOpen);
    }

    useEffect(() => {
        if (touchIndex < 0) {
            console.log("CLOSE");
            setDrawerOpen(false);
            setTouchIndex(0);
        } else {
            setTouchIndex(0);
        }
    }, [touchIndex]);

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
                <AppBar position="fixed" className={""} style={{display: "block"}}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {/*App bar title here*/}
                        </Typography>
                        <div style={{flex: 1}} />
                        <img style={{height: "70px", margin: "-10px"}} src={process.env.PUBLIC_URL + '/bipolar record.gif'} alt={"create response"}/>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="menu items">
                    <Swipe x={touchIndex} setX={setTouchIndex} threshold={60} >
                        {drawer}
                    </Swipe>
                </nav>
            </div>
            <div>
                <Toolbar />
                {children}
            </div>
        </div>
    )
}
