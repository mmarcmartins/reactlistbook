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
    let tempShelfs = [];

    allBooks.forEach(book => {
      if (tempShelfs.findIndex(e => e.shelf === book.shelf) === -1) {
        let allBooksShelf = allBooks.filter(
          singleBook => singleBook.shelf === book.shelf
        );
        tempShelfs.push({ shelf: book.shelf, books: allBooksShelf });
      }
    });
    return tempShelfs;
  };

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
        allBooks: allBooks,
        shelfs: this.getAllShelfs(allBooks)
      });
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.shelfs.forEach(obj => (
          <ListBooks />
        ))}
      </div>
    );
  }
}
export default BooksApp;
