import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import RouteConstants from '../../constant/RouteConstants';
import UrlConstants from '../../constant/UrlConstants';

// Styles
const useStyles = makeStyles(theme => ({
    nav: {
        padding: '6px',
        [theme.breakpoints.down('xs')]: {
            //display: 'none',
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
    const history = useHistory();

    return (
        <AppBar position='fixed' style={{display: 'block', pointerEvents: 'all', touchAction: 'none', backgroundColor: 'black'}}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    edge='start'
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{flex: 1}} />
                <Link to={RouteConstants.Portfolio}>
                    <Button className={classes.navButton}>
                        <PermMediaIcon />
                        <Typography variant='p' noWrap className={classes.nav}>
                            Portfolio
                        </Typography>
                    </Button>
                </Link>
                <Link to={history.location.pathname.indexOf(RouteConstants.Resume) > -1 ? RouteConstants.Home : RouteConstants.Resume}>
                    <Button className={classes.navButton}>
                        <RecentActorsIcon/>
                        <Typography variant='p' noWrap className={classes.nav}>
                            Resumé
                        </Typography>
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}