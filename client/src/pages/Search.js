import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, FormBtn } from '../components/Form';

function Search () {
  // Setting our component's initial state
  const [searched, setSearched] = useState('');
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');

  // Load all books and store them with setBooks
  useEffect(() => {
    searchBooks(searched);
  }, [searched]);

  // Loads all books and sets them to books
  // Start here ##########################################################################################################
  function searchBooks (searched) {
    API.searchGoogleBooks(searched)
      .then(res => {
        const temp = [];
        console.log(res.data.items);
        const arr = res.data.items;
        arr.map(object => {
          const { id, volumeInfo.title, volumeInto.authors[], volumeInfo.description, volumeInfo.imageLinks.smallThumbnail, volumeInfo.infoLink  } = object;
          return
        });

        // setResult(res.data)
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
                  <ListItem key={book._id}>
                    <Link to={'/books/' + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
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
