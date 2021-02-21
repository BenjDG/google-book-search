import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import API from '../utils/API';

function Saved () {
  const [books, setBooks] = useState([]);

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    API.getBooks()
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <Container fluid>
      <Row>
        <Col size='md-12'>
          {books.length
            ? (
              <div>
                {books.map(book => (
                  <div className='card' key={book._id}>
                    <div className='card-body'>
                      <h3>{book.title} by {book.authors.length > 1
                        ? (
                          <div>
                            {book.authors.map((author, idx) => (
                              <div key={idx}>{author + ' '}</div>
                            ))}
                          </div>

                          )
                        : (
                          <div>{book.authors[0]}</div>
                          )}
                      </h3>
                      <p>{book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              )
            : (
              <p>No Results</p>
              )}
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
