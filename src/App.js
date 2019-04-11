import React from "react";
import "./App.css";
import ModalBook from "./components/ModalBook";
import PaginalInicial from "./pages/PaginaInicial";
import SearchPage from "./pages/SearchPage";

import { Route } from "react-router-dom";
import { getAll } from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    selectedBook: "",
    shelfsPerBook: [],
    hasToUpdate: false,
    allBooks: [],
    baseShelfs: ["currentlyReading", "wantToRead", "read"]
  };

  componentDidMount() {
    getAll().then(allBooks => {
      this.getAllShelfs(allBooks);
    });
  }

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
    /* 
      All the shelfs on the app previously this script right down was dynamic, with 
      this script it has to have at least the 3 shelfs on 
      'baseShelf' pushed
    */
    this.state.baseShelfs.forEach(shelfBase => {
      if (!Object.prototype.hasOwnProperty.call(newBooks, shelfBase)) {
        newBooks[shelfBase] = {
          shelf: this.getShelfReadable(shelfBase),
          books: []
        };
      }
    });
    /* End of script */
    this.setState({ allBooks, shelfsPerBook: newBooks });
    return newBooks;
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

  /* Change selected book on modal */
  changeSelectedBook = selectedBook => {
    this.setState({ selectedBook });
  };

  changeShelfPerBook = shelfsPerBook => {
    this.setState({ shelfsPerBook });
  };

  changeShelfAllBooks = book => {
    const index = this.state.allBooks.findIndex(b => b.id === book.id);
    const auxBooks = this.state.allBooks;
    auxBooks[index] = book;
    this.setState({
      allBooks: auxBooks
    });
  };

  render() {
    return (
      <div className="container">
        <Route
          path="/"
          exact
          render={() => (
            <PaginalInicial
              changeSelectedBook={this.changeSelectedBook}
              changeShelfAllBooks={this.changeShelfAllBooks}
              getShelfReadable={this.getShelfReadable}
              getAllShelfs={this.getAllShelfs}
              shelfsPerBook={this.state.shelfsPerBook}
              changeShelfPerBook={this.changeShelfPerBook}
              hasToUpdate={this.state.hasToUpdate}
              changeUpdate={e => this.setState({ hasToUpdate: e })}
            />
          )}
        />

        <Route
          path="/search"
          exact
          render={() => (
            <SearchPage
              getShelfReadable={this.getShelfReadable}
              shelfsAvaliable={Object.keys(this.state.shelfsPerBook)}
              changeSelectedBook={this.changeSelectedBook}
              allBooks={this.state.allBooks}
              changeUpdate={e => this.setState({ hasToUpdate: e })}
            />
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
