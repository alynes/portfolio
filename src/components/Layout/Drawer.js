import React from 'react';
import PropTypes from 'prop-types';

// Material Design
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

// My Components
import DrawerItem from './DrawerItem.js';

export default function Drawer(props) {
    const homeIcon = <HomeIcon />;
    const historyIcon = <HistoryIcon />;
    const personIcon = <PersonIcon />;
    const appsIcon = <AppsIcon />;
    const musicNoteIcon = <MusicNoteIcon />;

    console.log(props);

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <DrawerItem text={"Home"} url={""} svg={homeIcon} />
                <DrawerItem text={"Applications"} url={"/applications/"} svg={appsIcon} />
                {/*<DrawerItem text={"Contact"} url={"BPChronicles"} svg={musicNoteIcon} />*/}

            </List>
        </div>
    )
}
