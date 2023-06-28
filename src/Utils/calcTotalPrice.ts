import { ICartItem } from '../Redux/Logic/cartSlice'

export const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((sum, obj) => {
      const itemPrice = isNaN(obj.price) ? 0 : obj.price;
      const itemResult = isNaN(obj.result) ? 0 : obj.result;
      return (itemPrice + itemResult) * obj.count + sum;
    }, 0);
  }