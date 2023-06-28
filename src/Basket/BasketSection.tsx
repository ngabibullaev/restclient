import React from 'react'
import BaketCards from './BaketCards'
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { clearItems } from '../Redux/Logic/cartSlice';
import { BasketEmpty } from './BasketEmpty';


export const BasketSection = () => {

    const dispatch = useDispatch()
    const {totalPrice, items} = useSelector((state: RootState) => state.cart)

    const totalCount = items.reduce((sum, item) => sum + item.count, 0)

    const onClickClear = () => {
        if (window.confirm("Очистить все товары")) {
            dispatch(clearItems())
        }
    } 

    if (!totalCount) {
        return <BasketEmpty/>
    }

    return (
        <div>
            <Container className='basket-main'>
                <div className='d-flex justify-content-between'>
                    <h2 className='mt-2'><img className='mx-2 mb-2' src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-4/48/204-36.png" alt="" />Корзина</h2>
                    <h5 onClick={onClickClear} className='text-secondary mt-3 basket-clear'><img className='mb-1 mx-1' src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-39-20.png" alt="" />Очистить</h5>
                </div>
                {
                    items.map((item) => (
                        // @ts-ignore
                        <BaketCards key={item.id} {...item}/>
                    ))
                }
                <div className='d-flex justify-content-between mb-2'>
                    <h3 className='text-secondary'>{totalCount} шт.</h3>
                    <h3 className='text-danger'>{totalPrice}₽</h3>
                </div>
                <div className='d-flex justify-content-between'>
                <Link to="/home"><Button className='mb-2 basket-section-scale' variant="outline-secondary">❮ Вернуться назад</Button>{' '}</Link>
                <Link to="/buy"><Button className='mb-2 basket-section-scale' variant="warning">Приобрести</Button>{' '}</Link>
                </div>
            </Container>
        </div>
    )
}
