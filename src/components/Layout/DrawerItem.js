import React from 'react';
import PropTypes from 'prop-types';
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

DrawerItem.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    svg: PropTypes.object.isRequired,

};