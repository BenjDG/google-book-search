import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';

function Saved () {
  const [book, setBook] = useState([]);

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  useEffect(() => {
    API.getBooks()
      .then(res => {
        console.log(res.data);
        setBook(res.data);
        console.log(book);
      })
      .catch(err => console.log(err));
  }, [book]);

  return (
    <Container fluid>
      <Row>
        <Col size='md-12'>
          <Jumbotron>
            <h1>
              {/* {book[0].title} by {book[0].authors[0]} */}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size='md-10 md-offset-1'>
          <article>
            <h1>Synopsis</h1>
            <p>
              {/* {book[0].description} */}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size='md-2'>
          <Link to='/'>← Back to Search</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
