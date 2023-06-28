import React, { useCallback, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

export const Header = () => {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const memoizedTotalPrice = useMemo(() => totalPrice, [totalPrice]);
  const memoizedItems = useMemo(() => items, [items]);

  const handleSaveCartToLocalStorage = useCallback(() => {
    localStorage.setItem('cart', JSON.stringify(memoizedItems));
  }, [memoizedItems]);

  // сохраняем данные корзины в localStorage
  React.useEffect(() => {
    handleSaveCartToLocalStorage();
  }, [handleSaveCartToLocalStorage]);

  return (
    <div className='visualhead'>
      <div className='Header'>
        <Navbar className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand>
              <Link to='/home' className='text-link'>
                <div className='Hlogo'>
                  カ <b>KATANA</b>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                <Link className="basket-link" to='/basket'>
                  <ButtonGroup aria-label='Basic example'>
                    <Button variant='danger'>
                      <svg
                        data-name='Layer 1'
                        id='Layer_1'
                        width='30px'
                        fill='white'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title></title>
                        <path d='M15.93,8,14.5,2.67A1,1,0,0,0,13.28,2a1,1,0,0,0-.71,1.22L13.86,8H10.14l1.29-4.81A1,1,0,0,0,9.5,2.67L8.07,8H1V9.9L3.94,21H20.06L23,10.16,23,8Zm2.6,11H5.47L3.06,10H20.94ZM7.81,11.68A1.15,1.15,0,1,0,9,12.83,1.15,1.15,0,0,0,7.81,11.68ZM16.19,14a1.15,1.15,0,0,0,0-2.3,1.15,1.15,0,0,0,0,2.3Z' />
                      </svg>
                    </Button>
                    <Button variant='danger'>
                      <b>{memoizedTotalPrice} ₽</b>
                    </Button>
                  </ButtonGroup>
                </Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
