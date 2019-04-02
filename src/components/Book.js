import React, { Component } from "react";

class Book extends Component {
  render() {
    const book = this.props.book;
    return (
      <li key={book.id}>
        <img src={book.imageLinks.thumbnail} alt={book.title} />
        <h2>{book.title}</h2>
        {book.authors.map((aut, ind) => (
          <span key={ind} className="author">
            {aut}
          </span>
        ))}
      </li>
    );
  }
}

export default Book;
