import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { items } from './common';

export default ({ addToBasket }: { addToBasket: (itemId: string) => void }) => (
    <List component="nav">
        <ListItem>
            <ListItemSecondaryAction>
                Price
            </ListItemSecondaryAction>
        </ListItem>
        {Object.entries(items).map(([itemId, item]) => (
            <ListItem key={itemId} button onClick={() => addToBasket(itemId)}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    {item.price.value}
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
)