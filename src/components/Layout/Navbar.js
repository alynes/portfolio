import React from 'react';
import { Link } from 'react-router-dom';

// Material Design
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PermMediaIcon from '@material-ui/icons/PermMedia';

// Styles
const useStyles = makeStyles(theme => ({
    nav: {
        padding: '6px',
        [theme.breakpoints.down('xs')]: {
            display: 'none',

        }
    },
    navButton: {
        textTransform: 'none',
        color: 'white',
    }
}));

/**
 *    This component is a navigation bar.
 *
 *    @param { Function } handleDrawerToggle - 'handleDrawerToggle' opens/closes the side drawer.
 */
export default function Navbar({ handleDrawerToggle }) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" style={{display: "block"}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{flex: 1}} />
                <Link to={""}>
                    <Button className={classes.navButton}>
                        <PermMediaIcon />
                        <Typography variant="p" noWrap className={classes.nav}>
                            Portfolio
                        </Typography>
                    </Button>
                </Link>
                <div style={{width: "10px", textAlign: "center"}}>
                    |
                </div>
                <Link to={"/resume/"}>
                    <Button className={classes.navButton}>
                        <RecentActorsIcon/>
                        <Typography variant="p" noWrap className={classes.nav}>
                            Resumé
                        </Typography>
                    </Button>
                </Link>
                <div style={{width: "10px", textAlign: "center"}}>
                    |
                </div>
                <IconButton
                    edge={"end"}
                >
                    <a href={"https://github.com/alynes/portfolio/"} style={{display: 'inline-block', height: '32px'}}>
                        <img style={{height: "100%", margin: "auto"}} src={process.env.PUBLIC_URL + "/github-mark.png"} alt={"create response"}/>
                    </a>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}