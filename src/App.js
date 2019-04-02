import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./components/ListBooks";

class BooksApp extends React.Component {
  state = {
    shelfs: [],
    allBooks: []
  };

  getAllShelfs = allBooks => {
    const newBooks = [];

    allBooks.forEach(book => {
      if (!Object.prototype.hasOwnProperty.call(newBooks, book.shelf)) {
        newBooks[book.shelf] = { books: [] };
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

  render() {
    return (
      <div className="container">
        {Object.keys(this.state.shelfs).map(obj => (
          <ListBooks key={obj} name={obj} {...this.state.shelfs[obj]} />
        ))}
      </div>
    );
  }
}
export default BooksApp;
