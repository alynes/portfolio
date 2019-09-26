import React, { useState } from 'react';

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

export default function Layout({ component, ...props }) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    function handleDrawerToggle() {
        setDrawerOpen(!drawerOpen);
    }

    const drawer = <MyDrawer props={props}/>;

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
                    <MUIDrawer
                        // container={container}
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
                        {drawer}
                    </MUIDrawer>
                </nav>
            </div>
            <div>
                <Toolbar />
                {component}
            </div>
        </div>
    )
}
