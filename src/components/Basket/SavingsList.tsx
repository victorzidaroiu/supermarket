import React, { Fragment } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { items, Receipt } from './common';

export default ({ receipt }: { receipt: Receipt }) => (
  <Fragment>
    <Typography variant="h6" align="center">
      Savings
    </Typography>
    <List>
      {Object.entries(receipt.savings.items).map(([itemId, item]) => (
        <ListItem key={itemId}>
          <ListItemText primary={items[itemId].name} />
          <ListItemSecondaryAction>
            -{item.value}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <List>
      </List>
      <ListItem>
        <ListItemText primary="Total savings" />
        <ListItemSecondaryAction>
          -{receipt.savings.total}
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Fragment>
)