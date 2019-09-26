import React from 'react';

// Material Design
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

// My Components
import DrawerItem from './DrawerItem.js';
import Clock from '../Clock.js';

const useStyles = makeStyles(theme => ({
    img: {
        width: '100%',
        flex: 1,
    },
    clockContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

}));

export default function Drawer() {
    const classes = useStyles();

    const homeIcon = <HomeIcon />;
    const appsIcon = <AppsIcon />;

    return (
        <div id={"fuckin drawer"}>
            <Toolbar>
                <div className={classes.clockContainer}>
                    <img className={classes.img} src={process.env.PUBLIC_URL + '/GREECEHAT.gif'} alt={"create response"}/>
                    <Clock />
                </div>
            </Toolbar>
            <Divider />
            <List>
                <DrawerItem text={"Home"} url={""} svg={homeIcon} />
                <DrawerItem text={"Applications"} url={"/applications/"} svg={appsIcon} />

            </List>
        </div>
    )
}
