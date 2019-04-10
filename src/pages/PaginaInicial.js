import React from "react";
import * as BooksAPI from "../BooksAPI";
import ListBooks from "../components/ListBooks";
import Book from "../components/Book";
import { Link } from "react-router-dom";

class PaginaInicial extends React.Component {
  componentDidMount() {
    this.props.hasToUpdate &&
      BooksAPI.getAll().then(allBooks => {
        this.props.getAllShelfs(allBooks);
        this.props.changeUpdate(false);
      });
  }
  /* Add the book on the selected shelf */
  changeBookShelf = (shelf, book) => {
    book.shelf = shelf;
    const newShelfBook = this.removeBookFromArray(book);
    newShelfBook[shelf].books.push(book);
    this.props.changeShelfPerBook(newShelfBook);
    BooksAPI.update(book, shelf);
  };

  /* Remove the selected book from the shelf*/
  removeBookFromArray = book => {
    const newShelfBook = [];
    Object.keys(this.props.shelfsPerBook).forEach(position => {
      newShelfBook[position] = {
        shelf: this.props.getShelfReadable(position),
        books: []
      };

      let filter = this.props.shelfsPerBook[position].books.filter(
        b => b.id !== book.id
      );
      newShelfBook[position].books.push(...filter);
    });
    return newShelfBook;
  };

  /* Remove book from listing books */
  deleteBook = book => {
    const newBooks = this.removeBookFromArray(book);
    this.props.changeShelfPerBook(newBooks);
    BooksAPI.update(book, "none");
  };

  render() {
    return (
      <div>
        {Object.values(this.props.shelfsPerBook).map(
          obj =>
            obj.books.length > 0 && (
              <ListBooks key={obj.shelf} name={obj.shelf}>
                {obj.books.map(book => (
                  <Book
                    key={book.id}
                    changeShelf={this.changeBookShelf}
                    getReadable={this.props.getShelfReadable}
                    allShelfs={Object.keys(this.props.shelfsPerBook)}
                    book={book}
                    deleteBook={this.deleteBook}
                    setSelectedBook={this.props.changeSelectedBook}
                  />
                ))}
              </ListBooks>
            )
        )}
        <Link className="linkButton search" to="/search">
          Search
        </Link>
      </div>
    );
  }
}
export default PaginaInicial;
