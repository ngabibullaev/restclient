import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import moment from "moment";

type ReviewItem = {
    name: string;
    ratingIndex: number;
    date: Date;
}

const PAGE_SIZE = 10;

export const Review: React.FC = () => {
    const rating: string[] = ["★", "★", "★", "★", "★"];

    const [ratingIndex, setRatingIndex] = useState<number>(-1);
    const [reviews, setReviews] = useState<ReviewItem[]>([]);

    const [name, setName] = useState<string>("");

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef<HTMLDivElement | null>(null);

    const loadMore = async () => {
        if (hasMore) {
            const response = await axios.get(`/setting?_page=${page}&_limit=${PAGE_SIZE}`);
            const newReviews = response.data;
            setReviews([...reviews, ...newReviews]);
            setPage(page + 1);
            if (newReviews.length < PAGE_SIZE) {
                setHasMore(false);
            }
        }
    };

    useEffect(() => {
        loadMore();
    }, []);

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore) {
            loadMore();
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = () => {

        const review: ReviewItem = { name, ratingIndex, date: new Date() };

        axios
            .post("/", review)
            .then((response) => {
                console.log(response);
                setReviews([...reviews, review]);
            })
            .catch((error) => console.error(error));

        setName("");
        setRatingIndex(-1);
    };

    useEffect(() => {
        axios
            .get("/setting")
            .then((response) => setReviews(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <Container
                style={{ background: "white", borderRadius: "10px", marginTop: "10px" }}
            >
                <h2 className="text-center pt-2 pb-2">Оставить отзыв</h2>
                <div className="d-flex justify-content-center">
                    {rating.map((r, i) => (
                        <h1
                            key={i}
                            onClick={() => setRatingIndex(i)}
                            className={
                                ratingIndex >= i ? "reviewRest text-warning" : "reviewRest"
                            }
                        >
                            {r}
                        </h1>
                    ))}
                </div>

                <FloatingLabel controlId="floatingTextarea2" label="Комментарий">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        maxLength={200}
                        style={{ height: "100px", marginTop: "10px" }}
                        onChange={handleNameChange}
                        value={name}
                    />
                </FloatingLabel>
                <div className="d-flex justify-content-end">
                    {!name.trim() || ratingIndex === -1
                        ? <Button variant="secondary mt-1">Добавить</Button>
                        : <Button variant="warning mt-1" onClick={handleSubmit}>Добавить</Button>}
                </div>
                <hr />
                <h2 className="text-center text-secondary pt-2 pb-2">Отзывы</h2>
                {reviews.map((item: ReviewItem, index: number) => (
                    <div key={index}>
                        <Alert variant="light">
                            <p className="d-flex justify-content-between">
                                <h4 className="text-success">
                                    {moment(item.date).format("DD.MM.YYYY")}
                                </h4>
                                <div className="d-flex">
                                    {rating.map((r, i) => (
                                        <h4
                                            key={i}
                                            className={i <= item.ratingIndex ? "text-warning" : ""}
                                        >
                                            {r}
                                        </h4>
                                    ))}
                                </div>
                            </p>
                            <hr />
                            <p style={{ wordWrap: "break-word" }}><img className="me-2 mb-2" src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-24.png" alt="" />{item.name}</p>
                        </Alert>
                    </div>
                ))}
                <div ref={loader}></div>
                {!hasMore && <p className="text-center text-secondary">Больше нет отзывов</p>}
            </Container>
        </div>
    );
};