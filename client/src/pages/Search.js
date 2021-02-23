import React, { useState, useEffect } from 'react';
// import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/API';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, FormBtn } from '../components/Form';

function Search () {
  const [searched, setSearched] = useState(''); // word sent to search API
  const [result, setResult] = useState([]); // data returned from search API
  const [input, setInput] = useState(''); // search handle change

  useEffect(() => {
    searchBooks(searched);
  }, [searched]);

  function searchBooks (searched) {
    API.searchGoogleBooks(searched)
      .then(res => {
        // console.log(res.data.items);
        const arr = res.data.items;
        const resultArr = arr.map(object => {
          const {
            id,
            volumeInfo: { title },
            volumeInfo: { authors }, // array
            volumeInfo: { description },
            volumeInfo: { imageLinks: { smallThumbnail } },
            volumeInfo: { infoLink }
          } = object;

          return { id, title, authors, description, smallThumbnail, infoLink };
        });
        return resultArr;
      }).then((data) => {
        // console.log(data);
        setResult(data);
      })
      .catch(err => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook (id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange (event) {
    const { value } = event.target;
    setInput(value);
  }

  function handleFormSubmit (e) {
    e.preventDefault();
    if (input) {
      setSearched(input);
    }
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  // function handleFormSubmit (event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.saveBook({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis
  //     })
  //       .then(res => loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // }

  return (
    <Container fluid>
      <Row>
        <Col size='sm-12'>
          <form>
            <Input
              onChange={handleInputChange}
              name='search'
              placeholder='Search'
            />
            <FormBtn
              disabled={!(input)}
              onClick={handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
        <Col size='sm-12'>
          <h1>Found</h1>
          {result.length
            ? (
              <List>
                {result.map(book => (
                  <ListItem key={book.id}>
                    <a href={book.infoLink} target='_blank' rel='noopener noreferrer'>
                      <strong>
                        {book.title} by {book.authors && book.authors.map((a, idx) => (
                          <div key={idx}>{a}</div>
                        ))}
                      </strong>
                    </a>
                    {/* <DeleteBtn onClick={() => deleteBook(book._id)} /> */}
                  </ListItem>
                ))}
              </List>
              )
            : (
              <h3>No Results to Display</h3>
              )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
