import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';

export const Reload = () => {
    return (
        <div>
            <Card className='foods' style={{ height: "460px" }}>
                <div>
                <Card.Img className='imgFood' variant="top" src="https://phonoteka.org/uploads/posts/2022-02/thumbs/1644246899_4-phonoteka-org-p-polnii-chernii-fon-6.jpg" style={{height: "180px"}} />
                <Spinner className='spinners' animation="border" />
                </div>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder as={Card.Title} animation="glow" style={{ paddingTop: "80px" }}>
                    <Placeholder className='textPrice mb-3' xs={2} />
                    <Placeholder.Button className='btnAdd' style={{marginLeft: "5.2em"}} variant="outline-dark" xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </div>
    )
}
