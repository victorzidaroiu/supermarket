import { Subject } from 'rxjs';
import { BasketItem, items, PriceType } from './common';

interface InitialState {
  status: string,
  data: BasketItem[],
  newDataCount: number,
  error: string
}

const subject = new Subject();
const initialState: InitialState = {
  status: '',
  data: [],
  newDataCount: 0,
  error: ''
};

let state = initialState;

export const basketStore = {
  init: () => {
    state = { ...state, newDataCount: 0 }
    subject.next(state)
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  addToBasket: (itemId: string) => {
    const newData = [...state.data]
    const itemIndex = newData.findIndex(({ id }) => id === itemId)
    const item = items[itemId]

    if (itemIndex !== -1) {
      newData[itemIndex].quantity += item.price.type === PriceType.Weight ? 100 : 1
    } else {
      newData.push({
        id: itemId,
        quantity: item.price.type === PriceType.Weight ? 100 : 1,
      })
    }

    state = {
      ...state,
      data: newData,
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  removeFromBasket: (itemId: string) => {
    const newData = [...state.data]
    const itemIndex = newData.findIndex(({ id }) => id === itemId)
    const item = items[itemId]

    if (itemIndex !== -1) {
      newData[itemIndex].quantity = item.price.type === PriceType.Weight ? 0 : newData[itemIndex].quantity - 1
    }

    if (newData[itemIndex].quantity === 0) {
      newData.splice(itemIndex, 1)
    }

    state = {
      ...state,
      data: newData,
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  clearBasket: () => {
    state = { ...state, data: [] };
    subject.next(state);
  },
  initialState
};
