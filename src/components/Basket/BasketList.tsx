import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { BasketItem, PriceType, Items, items } from './common';
import currency from 'currency.js'

const getPrice = (item: BasketItem, items: Items): number => {
    const itemDef = items[item.id]

    if (itemDef.price.type === PriceType.Unit) {
        return currency(item.quantity).multiply(items[item.id].price.value).value
    }

    return currency(item.quantity).divide(1000).multiply(items[item.id].price.value).value
}

const getQuantity = (item: BasketItem, items: Items): string => {
    const itemDef = items[item.id]

    if (itemDef.price.type === PriceType.Unit) {
        return `X ${item.quantity}`
    }

    return `${item.quantity}g`
}

export default ({ basket, subTotal, removeFromBasket }: { basket: BasketItem[], subTotal: number, removeFromBasket: (itemId: string) => void }) => (
    <List>
        <Typography variant="h6" align="center">
            Items
          </Typography>
        {basket.map(item => (
            <ListItem key={item.id} button onClick={() => removeFromBasket(item.id)}>
                <ListItemText primary={items[item.id].name} />
                <ListItemSecondaryAction>
                    {getQuantity(item, items)} = {getPrice(item, items)}
                </ListItemSecondaryAction>
            </ListItem>
        ))}
        <ListItem >
            <ListItemText primary='Sub-total' />
            <ListItemSecondaryAction>
                {subTotal}
            </ListItemSecondaryAction>
        </ListItem>
    </List>
)