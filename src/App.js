import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import Book from "./components/Book";
import ModalBook from "./components/ModalBook";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shelfs: [],
    allBooks: [],
    selectedBook: "",
    query: ""
  };

  getShelfReadable = shelf => {
    switch (shelf) {
      case "currentlyReading":
        return "Currently Reading";
      case "wantToRead":
        return "Want to read";
      case "read":
        return "Read";
      case "none":
        return "None";
      default:
        return "all books";
    }
  };

  getAllShelfs = allBooks => {
    const newBooks = [];
    console.log(allBooks);
    allBooks.forEach(book => {
      if (!Object.prototype.hasOwnProperty.call(newBooks, book.shelf)) {
        newBooks[book.shelf] = {
          shelf: this.getShelfReadable(book.shelf),
          books: []
        };
      }

      newBooks[book.shelf].books.push({ ...book });
    });

    this.setState({ allBooks, shelfs: newBooks });
  };

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.getAllShelfs(allBooks);
    });
  }
  /* Add the book on the selected shelf */
  changeBookShelf = (shelf, book) => {
    book.shelf = shelf;
    const newShelfBook = this.removeBookFromArray(book);
    newShelfBook[shelf].books.push(book);

    this.setState({
      shelfs: newShelfBook
    });

    BooksAPI.update(book, shelf);
  };

  /* Remove the selected book from the shelf*/
  removeBookFromArray = book => {
    const newShelfBook = [];
    Object.keys(this.state.shelfs).forEach(position => {
      newShelfBook[position] = {
        shelf: this.getShelfReadable(position),
        books: []
      };

      let filter = this.state.shelfs[position].books.filter(
        b => b.id !== book.id
      );
      newShelfBook[position].books.push(...filter);
    });
    return newShelfBook;
  };

  /* Remove book from listing books */
  deleteBook = book => {
    const newBooks = this.removeBookFromArray(book);
    this.setState({
      shelfs: newBooks
    });

    BooksAPI.update(book, "none");
  };
  /* Change selected book on modal */
  changeSelectedBook = book => {
    this.setState({ selectedBook: book });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const querySearch = this.state.query;
    BooksAPI.search(querySearch).then(result => {
      console.log(result);
    });
  };

  updateQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className="container">
        <Link className="searchButton" to="/search" />
        <Route
          path="/"
          exact
          render={() =>
            Object.values(this.state.shelfs).map(
              obj =>
                obj.books.length > 0 && (
                  <ListBooks key={obj.shelf} name={obj.shelf}>
                    {obj.books.map(book => (
                      <Book
                        key={book.id}
                        changeShelf={this.changeBookShelf}
                        getReadable={this.getShelfReadable}
                        allShelfs={Object.keys(this.state.shelfs)}
                        book={book}
                        deleteBook={this.deleteBook}
                        setSelectedBook={this.changeSelectedBook}
                      />
                    ))}
                  </ListBooks>
                )
            )
          }
        />
        <Route
          path="/search"
          exact
          render={() => (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="pesquisa"
                onChange={evt => this.updateQuery(evt.currentTarget.value)}
              />
              <input type="submit" />
            </form>
          )}
        />

        {this.state.selectedBook !== "" && (
          <ModalBook
            book={this.state.selectedBook}
            setSelectedBook={this.changeSelectedBook}
          />
        )}
      </div>
    );
  }
}
export default BooksApp;
