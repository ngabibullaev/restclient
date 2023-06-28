import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Redux/Logic/cartSlice';
import { RootState } from '../Redux/store';
import { Badge } from 'react-bootstrap';

interface CartonProps {
  id: number;
  name: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  actionsed: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Carton: React.FC<CartonProps> = ({ id, name, imageUrl, title, price, rating, actionsed, setShow }) => {
  const dispatch = useDispatch()

  const onClickAdd = useCallback(() => {
    const item = {
      id,
      name,
      price,
      imageUrl,
    }
    dispatch(addItem(item))
  }, [dispatch, id, name, price, imageUrl]);

  const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id))

  const addedCount = cartItem ? cartItem.count : 0

  return (
    <Card className='foods'>
      <Card.Img onClick={() => setShow(true)} className='imgFood' variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title style={{ color: "orange" }}>{name}</Card.Title>
        <Card.Text style={{ height: "100px" }}>
          {title}
          <Badge className='action' bg="warning" text="dark">{actionsed}</Badge>
        </Card.Text>
        <div>Количество: {addedCount > 0 ? <Badge bg="danger">+{addedCount}</Badge> : <Badge bg="danger">0</Badge>}</div>
        <div>Рейтинг: <b className='rating'>{rating}/100</b></div>
        <ProgressBar now={rating} />
        <b className='textPrice'>{price} ₽</b><Button onClick={onClickAdd} className='btnAdd' variant="outline-dark">Добавить </Button>
      </Card.Body>
    </Card>
  );
};

export default React.memo(Carton);