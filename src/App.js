import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./components/ListBooks";
import Book from "./components/Book";

class BooksApp extends React.Component {
  state = {
    shelfs: [],
    allBooks: []
  };

  getShelfReadable = shelf => {
    switch (shelf) {
      case "currentlyReading":
        return "Currently Reading";
      case "wantToRead":
        return "Want to read";
      case "read":
        return "Reading";
      default:
        return "all books";
    }
  };

  getAllShelfs = allBooks => {
    const newBooks = [];

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

  changeBookShelf = (shelf, book) => {
    const newShelfBook = [];

    book.shelf = shelf;

    Object.keys(this.state.shelfs).forEach(position => {
      newShelfBook[position] = {
        shelf: this.getShelfReadable(position),
        books: []
      }

      let filter = this.state.shelfs[position].books.filter(b => b.id !== book.id);
      newShelfBook[position].books.push(...filter)
    })

    newShelfBook[shelf].books.push(book)

    this.setState({
      shelfs: newShelfBook
    })

  };

  render() {
    return (
      <div className="container">
        {Object.values(this.state.shelfs).map(obj => (
          <ListBooks key={obj.shelf} name={obj.shelf}>
            {obj.books.map(book => (
              <Book
                key={book.id}
                changeShelf={this.changeBookShelf}
                getReadable={this.getShelfReadable}
                allShelfs={Object.keys(this.state.shelfs)}
                book={book} />
            ))}
          </ListBooks>
        ))}
      </div>
    );
  }
}
export default BooksApp;
