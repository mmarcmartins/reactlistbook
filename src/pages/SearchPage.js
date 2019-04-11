import React from "react";
import { search, update } from "../BooksAPI";
import ListBooks from "../components/ListBooks";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

class SearchPage extends React.Component {
  state = {
    query: "",
    filteredBooks: [],
    searchedFor: "",
    loading: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.searchQuery(evt.target.elements.pesquisa.value);
  };
  searchQuery = query => {
    if (query.trim() !== "") {
      this.setState({ loading: true, filteredBooks: '' });
      search(query).then(filteredBooks => {
        this.setState({ filteredBooks, searchedFor: query, loading: false });
      });
    }
  };

  changeBookShelf = (shelf, book) => {
    book.shelf = shelf;
    update(book, shelf).then(() => {
      this.props.changeUpdate(true);
    });
  };

  getShelfFromBook = book => {
    let bookShelf = null;
    bookShelf = this.props.allBooks.filter(b => b.id === book.id);
    book.shelf = bookShelf !== null && bookShelf.length > 0 ? bookShelf[0].shelf : 'none';
    return book;
  };


  render() {
    const shelfsAvaliable = this.props.shelfsAvaliable;
    return (
      <div className="container">
        <div className="searchName">
          <Link className="linkButton return" to="/" />
          <form className="searchForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="pesquisa"
              className="input-pesquisa"
              placeholder="Enter a term and submit"
            />
            <input className="input-submit" type="submit" value="Submit" />
          </form>
          <a
            className="terms"
            href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Look for the search terms
          </a>
        </div>

        <div className="result">
          {this.state.loading && (
            <Loader />
          )}

          {this.state.searchedFor && (
            <p className="searchTerm">
              You've searched for {this.state.searchedFor}
            </p>
          )}

          {this.state.filteredBooks.length > 0 && (
            <ListBooks key="search" name="Search">
              {this.state.filteredBooks.map(book => (
                <Book
                  key={book.id}
                  changeShelf={this.changeBookShelf}
                  getReadable={this.props.getShelfReadable}
                  allShelfs={shelfsAvaliable}
                  allBooks={this.props.allBooks}
                  book={this.getShelfFromBook(book)}
                  setSelectedBook={this.props.changeSelectedBook}
                />
              ))}
            </ListBooks>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
