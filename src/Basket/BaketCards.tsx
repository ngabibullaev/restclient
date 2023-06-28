import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../Redux/Logic/cartSlice';

interface BasketCardProps {
  id: number;
  name: string;
  nameResult: string;
  price: number;
  result: number;
  count: number;
  imageUrl?: string;
  idResult: number
}

const BasketCards: React.FC<BasketCardProps> = React.memo(({id, name, nameResult, price, result, count, imageUrl, idResult}) => {
  const dispatch = useDispatch();
  
  const onClickPlus = () => {
    dispatch(addItem({id, idResult}));
  };

  const onClickMinus = () => {
    dispatch(minusItem({id, idResult}));
  };

  const onClickRemove = () => {
    if (window.confirm("Ты действительно хочешь удалить товар?")) {
      dispatch(removeItem({id, idResult}));
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className='basket-card'>
            <img className='card-image' src={imageUrl || "https://barcelonatm.ru/wp-content/uploads/2017/03/pitstsa-v-barselone-7-2.jpg"} alt="" />
            <div><h3>{name || nameResult}</h3></div>
          </Col>
          <Col className='basket-card-setting'>
            <div className="p-2">
              <Button className='basket-section-scale' onClick={onClickRemove} variant="outline-secondary">
                <img src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-39-20.png" alt="" />
              </Button>
            </div>
            <div className="p-2 text-danger">
              <h5>{price || result * count} ₽</h5>
            </div>
            <div className="p-2">
              <Button className='basket-section-scale' variant="warning" onClick={onClickMinus}>-</Button>
            </div>
            <div className="p-2">
              <h5>{count}</h5>
            </div>
            <div className="p-2">
              <Button className='basket-section-scale' variant="warning" onClick={onClickPlus}>+</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <hr />
    </div>
  );
});

export default BasketCards;