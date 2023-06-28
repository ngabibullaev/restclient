import React from 'react'
import "../Styles/Basket-main.css"
import "../Styles/BasketSection.css"
import { BasketMain } from './BasketMain';
import {BasketSection} from './BasketSection';

export const Baket = () => {
  return (
    <div>
        <BasketMain/>
        <BasketSection/>
    </div>
  )
}
