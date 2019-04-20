import React, { Component } from "react";
import placeholder from "../../assets/placeholder.jpg";
import MoveBook from "./moveBook/moveBook";

class Book extends Component {
  state = {
    isCardShow: false,
  };
  updateShelv = (shelv, book) => {
    book.shelf = shelv;
    this.props.changeShelv(book);
  }
  render() {
    const { shelvs, book, setSelectedBook, prettifyName } = this.props;
    const image = book.imageLinks ? book.imageLinks.thumbnail : placeholder;
    return (
      <li className="book">

        <figure className="fig-img-book" onClick={() => { setSelectedBook(book); }} >
          <img src={image} alt={book.title} />
        </figure>

        <div className="book-informations">
          <h2>{book.title}</h2>
          {book.authors &&
            book.authors.map((aut, ind) => (
              <span key={ind} className="author">
                {aut}
              </span>
            ))}
          <button
            className={
              this.state.isCardShow ? "moveToShelf is-active" : "moveToShelf"
            }
            onClick={() =>
              this.setState({ isCardShow: !this.state.isCardShow })
            }
          />
        </div>
        <div className={this.state.isCardShow ? "moveShelfCard is-active" : "moveShelfCard"}>
          <MoveBook shelvs={shelvs} book={book} changeShelv={this.updateShelv} prettifyName={prettifyName} />
        </div>
      </li>
    );
  }
}

export default Book;
