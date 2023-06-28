import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap';
import "../Styles/TwoPizzas.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { addItem } from "../Redux/Logic/cartSlice";

interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  result: number;
  nameResult: string;
  idResult: number;
  count: number;
}

export const TwoPizzas: React.FC = () => {

  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [left, setLeft] = useState<string>("https://bogatyr.club/uploads/posts/2021-11/thumbs/1636951153_14-bogatyr-club-p-polnostyu-chyornii-fon-bez-nichego-15.jpg");
  const [right, setRight] = useState<string>("https://bogatyr.club/uploads/posts/2021-11/thumbs/1636951153_14-bogatyr-club-p-polnostyu-chyornii-fon-bez-nichego-15.jpg");
  const [priceLeft, setPriceLeft] = useState<number>(0);
  const [priceRight, setPriceRight] = useState<number>(0);
  const [nameLeft, setNameLeft] = useState<string>("");
  const [nameRight, setNameRight] = useState<string>("");
  const [idLeft, setIdLeft] = useState<number>(0);
  const [idRight, setIdRight] = useState<number>(0);
  const [num, setNum] = useState<boolean>(false);
  const [indexUrl, setIndexUrl] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Pizza[]>("https://642b35fa208dfe254714763b.mockapi.io/items?category=1")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const result = priceLeft + priceRight / 2;
  const nameResult = nameLeft + " + " + nameRight;
  const idResult = idLeft * idRight + 100;

  const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.idResult === idResult));

  const addedCount = cartItem ? cartItem.count : 0;

  console.log(addedCount);

  const onClickAdd = () => {
    const item: CartItem = {
      result: result,
      nameResult: nameResult,
      idResult: idResult,
      count: 1,
    };
    dispatch(addItem(item));
  };

  const handleClick = (pizza: Pizza, i: number) => {
    setNum(!num);
    setIndexUrl(i);
    if (num === false) {
      console.log(pizza.name);
      setLeft(pizza.imageUrl);
      setPriceLeft(pizza.price);
      setNameLeft(pizza.name);
      setIdLeft(pizza.id);
    } else {
      setRight(pizza.imageUrl);
      setPriceRight(pizza.price);
      setNameRight(pizza.name);
      setIdRight(pizza.id);
    }
  };

    return (
        <div>
            <Container className="rows-twopizzas">
                <h2 className="text-center text-danger pt-2">Соедини две пиццы</h2>
                <Row>
                    <Col>
                        <div>
                            <h4 className="text-center mt-2 mb-3">Левая</h4>
                            <img className="twopizzas-img mb-4" src={left} alt="" />
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h4 className="text-center mt-2 mb-3">Правая</h4>
                            <img className="twopizzas-img mb-4" src={right} alt="" />
                        </div>
                    </Col>
                </Row>
                <hr />
                <div className='d-flex justify-content-between'>
                <h3 className='text-danger'>{result}₽</h3>
                {left !== "https://bogatyr.club/uploads/posts/2021-11/thumbs/1636951153_14-bogatyr-club-p-polnostyu-chyornii-fon-bez-nichego-15.jpg" &&
                 right !== "https://bogatyr.club/uploads/posts/2021-11/thumbs/1636951153_14-bogatyr-club-p-polnostyu-chyornii-fon-bez-nichego-15.jpg" ?
                <Button onClick={onClickAdd} className='mb-2 basket-section-scale' variant="danger">Добавить {addedCount > 0 && <Badge bg="secondary">+{addedCount}</Badge>}</Button> :
                <Button className='mb-2' variant="secondary">Добавить</Button>}
                </div>
            </Container>
            <Container className="rows-twopizzas">
                <Row className="text-center">
                    <Col className="mx-auto">
                        {pizzas.map((pizza, i) => (
                            // @ts-ignore
                            <Image onClick={() => handleClick(pizza, i)} className="pizza-image mt-4" src={indexUrl !== i && pizza.imageUrl} thumbnail key={i} />
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
