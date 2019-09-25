import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material Design
import { makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
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

export default function Layout({ component, match, ...props }) {
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

Layout.propTypes = {
    component: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

};