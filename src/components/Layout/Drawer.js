import React from 'react';

// Material Design
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PermMediaIcon from '@material-ui/icons/PermMedia';

// My Components
import DrawerItem from './DrawerItem.js';
import Clock from '../Clock.js';

const useStyles = makeStyles(() => ({
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
    link: {
        textAlign: "left",
        padding: "0 0 8px 16px",
        pointerEvents: "all",
    }
}));

/**
 * The Drawer component is the sidebar for the layout.
 *
 * IN THIS APP:
 * Layout
 */
export default function Drawer() {
    const classes = useStyles();

    const homeIcon = <PermMediaIcon />;
    const resumeIcon = <RecentActorsIcon />;

    return (
        <div id={"drawer"} style={{pointerEvents: "none"}}>
            {/* Drawer's main content */}
            <div id={"drawer-main-content"} style={{display: "inline-block", background: "#fff", pointerEvents: "all"}}>
                <Toolbar>
                    <div className={classes.clockContainer}>
                        <img className={classes.img} src={process.env.PUBLIC_URL + "/astronaut-flip.gif"} alt={"astronaut-flip"}/>
                        <Clock />
                    </div>
                </Toolbar>
                <Divider />
                <List id={"this"}>
                    <DrawerItem text={"Portfolio"} url={""} svg={homeIcon} />
                    <DrawerItem text={"Resumé"} url={"/resume/"} svg={resumeIcon} />
                </List>
                <Divider />
            </div>

            {/* Spacer so that the links below can show through this "window" on small screens */}
            <div style={{height: "72px", background: "rgba(0, 0, 0, 0)"}}/>

            {/* Bottom-fixed link section */}
            <div style={{position: "fixed", bottom: 0, zIndex: -1, marginBottom: "8px"}}>
                <div className={classes.link}>
                    <a href={"https://github.com/alynes"}>github.com/alynes</a>
                </div>
                <div className={classes.link}>
                    <a href={"https://linkedin.com/in/alynes"}>linkedin.com/alynes</a>
                </div>
            </div>
        </div>
    )
}
