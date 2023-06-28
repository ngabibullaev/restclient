import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';
import "../Styles/Buy.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export const Buy: React.FC = () => {

  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const text = items.map((item) => '\n' + (item.nameResult || item.name) + ' - ' + item.count + 'шт').join('');

  const [active, setActive] = useState(false)
  const [show, setShow] = useState(false);

  const [isName, setIsName] = useState('')
  const [number, setNumber] = useState('')
  const [region, setRegion] = useState('(Не указан)')
  const [home, setHome] = useState('(Не указан)')
  const [house, setHouse] = useState('(Не указан)')
  const [floor, setFloor] = useState('(Не указан)')
  const [apartment, setApartment] = useState('(Не указан)')
  const [comment, setComment] = useState('(Не указан)')

  const [nameError, setNameError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [regionError, setRegionError] = useState('')
  const [homeError, setHomeError] = useState('')

  const handleSubmit = () => {
    let data = {};

    if (active === false) {
      setNameError('')
      setNumberError('')
      if (isName.trim() === '') {
        setNameError('Заполните обязательное поле')
        return;
      }
      if (!/^\d{9,}$/.test(number)) {
        setNumberError('Номер телефона должен содержать не менее 9 цифр')
        return;
      }
      data = {
        isName,
        number,
        region,
        home,
        house,
        floor,
        apartment,
        comment,
        text,
        totalPrice,
        totalCount
      };
    } else {
      setNameError('')
      setNumberError('')
      setRegionError('')
      setHomeError('')
      if (isName.trim() === '') {
        setNameError('Заполните обязательное поле')
        return;
      }
      if (!/^\d{9,}$/.test(number)) {
        setNumberError('Номер телефона должен содержать не менее 9 цифр')
        return;
      }
      if (region === '(Не указан)') {
        setRegionError('Заполните обязательное поле')
        return;
      }
      if (home === '(Не указан)') {
        setHomeError('Заполните обязательное поле')
        return;
      }
      data = {
        isName,
        number,
        region,
        home,
        house,
        floor,
        apartment,
        comment,
        text,
        totalPrice,
        totalCount
      };
      setShow(true)
    }

    axios.post('/sendMessage', data)
      .then(response => {
        if (response.data.success) {
          console.log('Сообщение отправлено');
          setShow(true)
        } else {
          console.error(`Ошибка в отправке: ${response.data.error}`);
        }
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  return (
    <div>
      <Container className="ground-buy">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-center mb-4 pt-2">Оформление заказа</h2>
            <Row>
              <Col></Col>
              <Col sm={6}>
                <ButtonGroup className="ButtonGroup-buy" aria-label="Basic example">
                  <Button onClick={() => setActive(false)} className="left-buy" variant={!active ? "dark" : "outline-dark"}>Самовывоз</Button>
                  <Button onClick={() => setActive(true)} className="right-buy" variant={active ? "dark" : "outline-dark"}>Доставка</Button>
                </ButtonGroup>
                {!active && <p className="text-center mt-2"><img className="me-2" src="https://cdn2.iconfinder.com/data/icons/boxicons-solid-vol-1/24/bxs-building-house-24.png" alt="" />Адрес заведения <b>Центральная 1A</b></p>}
              </Col>
              <Col></Col>
            </Row>
          </div>

          <div>

            {/* Клиент */}
            <Row>
              <Col></Col>
              <Col sm={6}>
                <h4 className="mt-4 text-secondary"><img className="me-1 mb-2" src="https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-24.png" alt="" />Клиент</h4>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Имя"
                  className="mb-1"
                  onChange={e => setIsName((e.target as HTMLInputElement).value)}
                >
                  <Form.Control as="input" placeholder="Введите имя" />
                </FloatingLabel>
                {nameError && <p className="text-danger">{nameError}</p>}
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Номер телефона"
                  className="mb-3"
                  onChange={e => setNumber((e.target as HTMLInputElement).value)}
                >
                  <Form.Control as="input" placeholder="Введите номер телефона" />
                </FloatingLabel>
                {numberError && <p className="text-danger">{numberError}</p>}
                <hr />
              </Col>
              <Col></Col>
            </Row>


            {/* Адрес */}
            {active &&
              <Row>
                <Col></Col>
                <Col sm={6}>
                  <h4 className="text-secondary"><img className="me-1 mb-2" src="https://cdn1.iconfinder.com/data/icons/freeline/32/home_house_real_estate-24.png" alt="" />Адрес доставки</h4>
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Улица"
                    className="mb-1"
                    onChange={e => setRegion((e.target as HTMLInputElement).value)}
                  >
                    <Form.Control as="input" placeholder="Введите название улицы" />
                  </FloatingLabel>
                  {regionError && <p className="text-danger">{regionError}</p>}
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Дом"
                    className="mb-1"
                    onChange={e => setHome((e.target as HTMLInputElement).value)}
                  >
                    <Form.Control as="input" placeholder="Введите номер дома" />
                  </FloatingLabel>
                  {homeError && <p className="text-danger">{homeError}</p>}
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Подъезд"
                    className="mb-1 text-secondary"
                    onChange={e => setHouse((e.target as HTMLInputElement).value)}
                  >
                    <Form.Control as="input" placeholder="Введите номер подъезда" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Этаж"
                    className="mb-1 text-secondary"
                    onChange={e => setFloor((e.target as HTMLInputElement).value)}
                  >
                    <Form.Control as="input" placeholder="Введите номер этажа" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Квартира"
                    className="mb-3 text-secondary"
                    onChange={e => setApartment((e.target as HTMLInputElement).value)}
                  >
                    <Form.Control as="input" placeholder="Введите номер квартиры" />
                  </FloatingLabel>
                  <hr />
                </Col>
                <Col></Col>
              </Row>}

            {/* Комментарий */}
            <Row>
              <Col></Col>
              <Col sm={6}>
                <h4 className="text-secondary"><img className="me-1" src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Message-24.png" alt="" />Комментарий</h4>
                <FloatingLabel controlId="floatingTextarea2" label="Комментарий">
                  <Form.Control
                    maxLength={200}
                    as="textarea"
                    placeholder="Введите комментарий"
                    style={{ height: '100px' }}
                    className="text-secondary"
                    onChange={e => setComment((e.target as HTMLInputElement).value)}
                  />
                </FloatingLabel>

                <div className="d-flex">
                  <NavLink className="w-100 me-4" to="/basket"><Button className="w-100 mt-4 mb-4 basket-section-scale" variant="outline-dark">Назад ↵</Button></NavLink>
                  <Button onClick={handleSubmit} className="w-100 mt-4 mb-4 basket-section-scale" variant="dark">Заказать</Button>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </form>









        {show === true &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Alert
            className="ok-alert"
            variant="success"
            onClose={() => setShow(false)}
            dismissible
          >
            <Alert.Heading>Ожидайте пожалуйста!</Alert.Heading>
            <p>
              Менеджер позвонит вам в течении 5 минут для уточнении информации
            </p>
          </Alert>
        </div>}

      </Container>
    </div>
  );
};
