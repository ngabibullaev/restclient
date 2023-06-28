import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export const BasketMain = () => {
    return (
        <div>
            <Container className='basket-main'>
                <Row>
                    <Col><img className='basket-main-img' src="https://dodopizza-a.akamaihd.net/static/Img/Products/e3f5dfcb094b4c9b8200ca9f573cb2f1_292x292.webp" alt="" /></Col>
                    <Col>
                        <h2 className='basket-main-title'>Соедини половинки</h2>
                        <p className='basket-main-p'>попробуй сразу две пиццы по одной цене</p>
                        <Link className='text-link' to="/two"><Button className='basket-main-btn basket-section-scale' variant="warning">Попробовать ➞</Button></Link>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
