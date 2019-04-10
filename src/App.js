import React from "react";
import "./App.css";
import ModalBook from "./components/ModalBook";
import PaginalInicial from "./pages/PaginaInicial"
import SearchPage from "./pages/SearchPage"
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {

  state = {
    selectedBook: '',
    shelfsAvaliable: []
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
        return "None"
      default:
        return "all books";
    }
  };

  /* Change selected book on modal */
  changeSelectedBook = selectedBook => {
    this.setState({ selectedBook });
  }

  updateShelfs = shelfsAvaliable => {
    this.setState({ shelfsAvaliable })
  }

  render() {
    return (
      <div className="container">
        <Link className="searchButton" to="/search" />

        <Route path="/" exact render={() => (
          <PaginalInicial
            changeSelectedBook={this.changeSelectedBook}
            getShelfReadable={this.getShelfReadable}
            updateShelfs={this.updateShelfs} />)} />

        {(this.state.shelfsAvaliable.length > 0 &&
          <Route path="/search" exact render={() => (
            <SearchPage
              getShelfReadable={this.getShelfReadable}
              shelfsAvaliable={this.state.shelfsAvaliable}
              changeSelectedBook={this.changeSelectedBook} />)} />
        )}
        {this.state.selectedBook !== '' && (
          <ModalBook
            book={this.state.selectedBook}
            setSelectedBook={this.changeSelectedBook} />
        )}

      </div>
    );
  }
}
export default BooksApp;
