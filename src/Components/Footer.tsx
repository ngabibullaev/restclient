import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "../Styles/Section.css"
import "../Styles/Review.css"
import { Link, useLocation } from 'react-router-dom'

export const Footer = () => {
  const location = useLocation();

  return (
    <div className='my-5 mb-5'>
      <Container fluid="xxl">
        {location.pathname === "/review" ? (
          <Link to="/home"><Button className='mb-5 w-100 basket-section-scale' variant='danger'>Вернуться</Button></Link>
        ) : (
          <Link to="/review"><Button className='mb-5 w-100 basket-section-scale' variant='secondary'>Отзывы ➔</Button></Link>
        )}
        <Row>
          <Col className='text-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, quam! Autem quaerat quo doloremque nemo adipisci veniam reiciendis recusandae enim saepe, blanditiis exercitationem voluptates obcaecati hic ratione atque a, harum laudantium in magnam odit quos nisi ex dolores! Reiciendis voluptatem nostrum consequuntur rerum velit expedita sit aliquid?</Col>
          <Col className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi assumenda adipisci asperiores inventore error, natus suscipit iste dolore pariatur! Vel ab, consequatur quibusdam reprehenderit distinctio, sed, cum blanditiis hic animi illo inventore excepturi dolor!</Col>
        </Row>
      </Container>
    </div>
  )
}