import React from 'react';
import PropTypes from 'prop-types';

// Material Design
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MUIDrawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// My components
import MyDrawer from './Drawer.js';
import {makeStyles} from "@material-ui/core";

// Styles
const drawerWidth = 240;
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

export default function Layout({ component }) {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    function handleDrawerToggle() {
        setDrawerOpen(!drawerOpen);
    }

    const drawer = <MyDrawer />;

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
                            Austin Lynes
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="menu items">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden lgUp implementation="css">
                        <MUIDrawer
                            // container={container}
                            variant="temporary"
                            anchor={"left"}
                            open={drawerOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: ""
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </MUIDrawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <MUIDrawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </MUIDrawer>
                    </Hidden>
                </nav>
            </div>
            <div>
                {component}
            </div>
        </div>
    )

}

Layout.propTypes = {
    component: PropTypes.object,

};