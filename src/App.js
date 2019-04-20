import React from "react";
import "./App.css";
import PaginalInicial from "./pages/paginaInicial/PaginaInicial";
import SearchPage from "./pages/SearchPage/SearchPage";
import { prettifyName } from "./utils/utils.js";
import { Route, HashRouter, Switch } from "react-router-dom";
import { getAll, update } from "./api/BooksAPI";
import ModalBook from "./components/modal/ModalBook";

class BooksApp extends React.Component {

  state = {
    shelvs: [],
    books: [],
    selectedBook: null,
  }

  componentDidMount() {
    getAll().then(books => {
      this.feedApp(books);
    });
  }

  feedApp = books => {
    const shelvs = [...new Set(books.map(book => book.shelf))];
    this.setState({ shelvs, books });
  }

  setSelectedBook = book => {
    this.setState({ selectedBook: book });
  }
  changeShelv = (book) => {

    let filterBook = this.state.books.filter(b => b.id !== book.id);
    if (book.shelf !== 'none') {
      console.log(book.shelf);
      filterBook = [...filterBook, book];
    }

    this.setState({ books: [...filterBook] });
    update(book, book.shelf);
  }

  render() {
    const { shelvs, books, selectedBook } = this.state
    return (
      <HashRouter>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <PaginalInicial
                  books={books}
                  shelvs={shelvs}
                  setSelectedBook={this.setSelectedBook}
                  changeShelv={this.changeShelv}
                  prettifyName={prettifyName} />
              )}
            />
            <Route
              path="/search"
              exact
              render={() => (
                <SearchPage
                  setSelectedBook={this.setSelectedBook}
                  changeShelv={this.changeShelv}
                  shelvs={shelvs}
                  prettifyName={prettifyName}
                  books={books} />
              )}
            />
          </Switch>
        </div>
        {
          this.state.selectedBook !== null &&
          <ModalBook setSelectedBook={this.setSelectedBook} book={selectedBook} />
        }

      </HashRouter>

    );
  }
}
export default BooksApp;
