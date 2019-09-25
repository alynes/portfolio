import React from 'react';
import PropTypes from 'prop-types';

// Material Design
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";

// My Components
import DrawerItem from './DrawerItem.js';

export default function Drawer() {
    const historyIcon = <HistoryIcon />;
    const personIcon = <PersonIcon />;

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <DrawerItem text={"Page1"} url={"page1"} svg={historyIcon} />
                <Divider />
                <DrawerItem text={"Page2"} url={"page2"} svg={personIcon} />
            </List>
        </div>
    )
}
