import React, { useState, useEffect } from "react";
import currency from 'currency.js'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { BasketItem, Receipt, items, PriceType, InventoryItem } from './common';
import { basketStore } from './store';
import SavingsList from './SavingsList'
import InventoryList from './InventoryList'
import BasketList from './BasketList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      maxWidth: 360,
    }
  }),
);

const calculatePrice = (itemDef: InventoryItem, item: BasketItem) => itemDef.price.type === PriceType.Unit ?
  currency(item.quantity).multiply(itemDef.price.value) :
  currency(item.quantity).divide(1000).multiply(itemDef.price.value)

const getReceiptData = (basket: BasketItem[]) => basket.reduce((acc: Receipt, item: BasketItem) => {
  const itemDef = items[item.id]

  if (!itemDef) {
    return acc
  }

  const savings = itemDef.savings ?
    currency(Math.floor(item.quantity / itemDef.savings.units)).multiply(itemDef.savings.value).value : 0

  const savingsItem = savings ? { [item.id]: { value: savings } } : {}

  return {
    savings: {
      total: acc.savings.total + savings,
      items: { ...acc.savings.items, ...savingsItem }
    },
    total: calculatePrice(itemDef, item).add(acc.total).value
  }
}, {
  savings: {
    items: {},
    total: 0
  },
  total: 0
})

export default function SimpleList() {
  const classes = useStyles();

  const [basketState, setBasketState] = useState(basketStore.initialState);

  useEffect(() => {
    basketStore.subscribe(setBasketState);
    basketStore.init();
  }, []);

  const addToBasket = (id: string) => {
    basketStore.addToBasket(id);
  };

  const removeFromBasket = (id: string) => {
    basketStore.removeFromBasket(id);
  };

  const basket = basketState.data
  const receipt = getReceiptData(basket)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs className={classes.list}>
          <Typography variant="h4" align="center">
            Shop
          </Typography>
          {<InventoryList addToBasket={addToBasket} />}
        </Grid>
        <Grid item xs className={classes.list}>
          <Typography variant="h4" align="center">
            Basket
          </Typography>
          {basket.length > 0 ? <BasketList subTotal={receipt.total} basket={basket} removeFromBasket={removeFromBasket} /> : null}
          {receipt.savings.total > 0 ? <SavingsList receipt={receipt} /> : null}
          <List>
            <ListItem>
              <ListItemText primary="Total to pay" />
              <ListItemSecondaryAction>
                {currency(receipt.total).subtract(receipt.savings.total).value}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div >
  );
}
