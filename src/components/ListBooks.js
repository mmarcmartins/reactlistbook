import React, { Component } from "react";

class ListBooks extends Component {
  render() {
    const { index, books } = this.props;
    console.log(books);
    return (
      <ul key={index} className="teste">
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    );
  }
}

export default ListBooks;
