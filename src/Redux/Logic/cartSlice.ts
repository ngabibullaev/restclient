import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../Utils/getCartFromLS';
import { calcTotalPrice } from '../../Utils/calcTotalPrice';

export type ICartItem = {
  id: number;
  idResult: number;
  price: number
  result: number
  count: number
  name: string
  nameResult: string
  // Добавьте все свойства элемента корзины
}

interface ICartState {
  totalPrice: number;
  items: ICartItem[];
}

const { items, totalPrice } = getCartFromLS(); // сохраняем данные из файла где хранится localStorage

const initialState: ICartState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, idResult } = action.payload;
      const itemIndex = findItem(state.items, id, idResult);
      
      if (itemIndex >= 0) {
        // Если товар уже есть в корзине, увеличиваем счетчик
        state.items[itemIndex] = {...state.items[itemIndex], count: state.items[itemIndex].count + 1};
      } else {
        // Если товара еще нет в корзине, добавляем новый элемент
        state.items = [...state.items, {...action.payload, count: 1}];
      }
    
      state.totalPrice = calcTotalPrice(state.items);
    },
    
    minusItem(state, action) {
      const { id, idResult } = action.payload;
      const itemIndex = findItem(state.items, id, idResult);
    
      if (itemIndex >= 0) {
        if (state.items[itemIndex].count > 1) {
          state.items[itemIndex] = {...state.items[itemIndex], count: state.items[itemIndex].count - 1};
        } else {
          return;
        }
      }
    
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action) {
      const { id, idResult } = action.payload;
      state.items = state.items.filter(obj => obj.id !== id || obj.idResult !== idResult);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

function findItem(items: ICartItem[], id: number, idResult: number) {
  return items.findIndex(obj => obj.id === id && obj.idResult === idResult);
}