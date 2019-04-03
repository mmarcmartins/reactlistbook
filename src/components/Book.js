import React, { Component } from "react";

class Book extends Component {
  render() {
    const shelfs = this.props.allShelfs;
    const book = this.props.book;
    const FgetReadable = this.props.getReadable;
    return (
      <li className="book" key={book.id}>
        <img src={book.imageLinks.thumbnail} alt={book.title} />
        <div className="book-informations">
          <h2>{book.title}</h2>
          {book.authors.map((aut, ind) => (
            <span key={ind} className="author">
              {aut}
            </span>
          ))}
          <button className="moveToShelf" />
        </div>
        <div className="moveShelfCard">
          <ul className="shelfList">
            {shelfs.map(shelf => (
              <li key={shelf}>{FgetReadable(shelf)}</li>
            ))}
          </ul>
        </div>
      </li>
    );
  }
}

export default Book;
