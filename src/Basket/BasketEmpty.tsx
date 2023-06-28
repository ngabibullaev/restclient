import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export const BasketEmpty = () => {
  return (
    <div>
        <Container className='empty-phone'>
            <h1 className='text-center pt-2'>Корзина пустая <b className='text-danger'>:(</b></h1>
            <h4 className='text-center text-secondary pt-2'>Вероятней всего вы у нас еще ничего не заказали</h4>
            <h4 className='text-center text-secondary'>для того что бы покушать перейдите на главную страницу</h4>
            <hr />
            <img className='none-basket' src="https://cdn2.iconfinder.com/data/icons/flat-set-2/64/flat_set_2-14-264.png" alt="" />
            <Link className='about-link' to="/home"><Button className='btn-about basket-section-scale' variant="dark">На главную</Button></Link>
        </Container>
    </div>
  )
}
