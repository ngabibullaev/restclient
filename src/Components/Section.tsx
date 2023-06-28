import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Carton from './Card';
import { RootState } from '../Redux/store';
import { Reload } from './Reload';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  actionsed: string;
}

export const Section: React.FC = () => {
  const { categoryId, sortId, sortOrder, search } = useSelector((state: RootState) => state.logic);

  const isDesktop = window.innerWidth >= 768; // Threshold value for desktop devices

  const [items, setItems] = useState<Item[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedCategoryId = useMemo(() => categoryId, [categoryId]);
  const memoizedSortId = useMemo(() => sortId, [sortId]);
  const memoizedSortOrder = useMemo(() => sortOrder, [sortOrder]);
  const memoizedSearch = useMemo(() => search, [search]);

  useEffect(() => {
    axios
      .get(
        `https://642b35fa208dfe254714763b.mockapi.io/items?${memoizedCategoryId > 0 ? `category=${memoizedCategoryId}` : ''
        }&sortBy=${memoizedSortId}&order=${memoizedSortOrder}${memoizedSearch ? `&search=${memoizedSearch}` : ''
        }`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, [memoizedCategoryId, memoizedSortId, memoizedSortOrder, memoizedSearch]);

  return (
    <div className='Section'>
      <Container fluid='xxl'>
      <Row>
          {
            isLoading ? [...new Array(12)].map((_, index) => <Col key={index}><Reload /></Col>) : items.length > 0 ?
              items.map((item: Item, index: number) => (
                <Col onClick={() => setActiveIndex(index)} key={index}>
                  <Carton
                    id={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    actionsed={item.actionsed}
                    setShow={setShow}
                  />
                </Col>
              )) :
              <div className='foodsNone'>
                У нас такого нет <p>☹️</p>
              </div>
          }
        </Row>

        {isDesktop ? (
          <Alert
            show={show}
            variant='success'
            className='Alert'
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '100%' }}
          >
            {items[activeIndex] && (
              <>
                <Image className='w-100 mb-2' src={items[activeIndex].imageUrl} rounded />
                <Alert.Heading style={{ color: 'red' }}>{items[activeIndex].name}</Alert.Heading>
                <p>
                  <b>Описание: </b>
                  <br />
                  {items[activeIndex].title}
                </p>
                <b>
                  Рейтинг: <b className='rating' style={{ color: 'green' }}>
                    {items[activeIndex].rating}/100
                  </b>
                </b>
                <ProgressBar now={items[activeIndex].rating} />
              </>
            )}
            <hr />
            {items[activeIndex] && (
              <div className='bottom-bar'>
                <b className='textPrice' style={{ color: 'red' }}>
                  {items[activeIndex].price}₽
                </b>
                <div>
                  <Button onClick={() => setShow(false)} variant='outline-danger '>
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </Alert>
        ) : (
          <Alert
            show={show}
            variant='success'
            className='Alert'
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '100%' }}
          >
            {items[activeIndex] && (
              <>
                <Image className='w-100 mb-2' src={items[activeIndex].imageUrl} rounded />
                <div className='d-flex justify-content-center'>
                  <Button onClick={() => setShow(false)} variant='outline-danger '>
                    Закрыть
                  </Button>
                </div>
              </>
            )}
          </Alert>
        )}
      </Container>
    </div>
  );
};