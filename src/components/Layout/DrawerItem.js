import React from 'react';
import { Link } from 'react-router-dom';

// Material Design
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function DrawerItem({ text, url, svg }) {

    return (
        <ListItem
            button
            key="Trade"
            component={Link}
            to={url}
        >
            <ListItemIcon>
                {svg}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
}
