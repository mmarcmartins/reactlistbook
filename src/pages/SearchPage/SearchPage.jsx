import React from "react";
import { search } from "../../api/BooksAPI";
import { Link } from "react-router-dom";

import ListBooks from "../../components/list/ListBooks";
import BookTemplate from "../../components/book/Book";
import Loader from "../../components/loader/Loader";

class SearchPage extends React.Component {
  state = {
    query: "",
    filteredBooks: [],
    searchedFor: "",
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.searchQuery(evt.target.elements.pesquisa.value);
  };

  searchQuery = query => {
    if (query.trim() !== "") {
      this.setState({ loading: true, filteredBooks: [] });
      search(query).then(filteredBooks => {
        const books = this.findShelvBook(filteredBooks);
        this.setState({ filteredBooks: books, searchedFor: query, loading: false });
      });
    }
  };

  findShelvBook = books => {
    const shelvBooks = this.props.books;
    return books.map(b => {
      const indexBook = shelvBooks.findIndex(shelvBook => shelvBook.id === b.id);
      b.shelf = indexBook !== -1 ? shelvBooks[indexBook].shelf : 'none';
      return b;
    });
  }

  render() {
    const { shelvs, setSelectedBook, changeShelv, prettifyName } = this.props;
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
              {this.state.filteredBooks.map((book, key) => (
                <BookTemplate
                  key={key}
                  book={book}
                  shelvs={shelvs}
                  setSelectedBook={setSelectedBook}
                  changeShelv={changeShelv}
                  prettifyName={prettifyName}
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
