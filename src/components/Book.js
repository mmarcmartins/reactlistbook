import React, { Component } from "react";


class Book extends Component {
  state = {
    isCardShow: false,
    shelf: this.props.book.shelf,
  };

  handleChange = evt => {
    if (evt.currentTarget.value !== evt.currentTarget.name) {
      this.setState({
        shelf: evt.currentTarget.value
      })
      this.props.changeShelf(evt.currentTarget.value, this.props.book);
    }
    else {
      this.props.deleteBook(this.props.book);
    }
  }

  render() {
    const shelfs = this.props.allShelfs;
    const book = this.props.book;
    const FgetReadable = this.props.getReadable;
    return (
      <li className="book">
        <figure className="fig-img-book" onClick={() => {
          this.props.setSelectedBook(book)
        }
        } >
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        </figure>
        <div className="book-informations">
          <h2>{book.title}</h2>
          {book.authors.map((aut, ind) => (
            <span key={ind} className="author">
              {aut}
            </span>
          ))}
          <button
            className={this.state.isCardShow ? "moveToShelf is-active" : "moveToShelf"}
            onClick={() => this.setState({ isCardShow: !this.state.isCardShow })} />
        </div>
        <div className={this.state.isCardShow ? "moveShelfCard is-active" : "moveShelfCard"}>
          <h2 className="moveShelfCardTitle">Shelfs</h2>
          <ul className="shelfList">
            {shelfs.map(shelf => (
              < li className="shelf-option" key={shelf} >
                <input
                  id={book.id + "-" + shelf}
                  type="radio"
                  name={book.id}
                  value={shelf}
                  checked={this.state.shelf === shelf}
                  onChange={this.handleChange}></input>
                <label htmlFor={book.id + "-" + shelf} className="shelfNameAnimate">{FgetReadable(shelf)}</label>
              </li>
            ))}
            < li className="shelf-option" key='none' >
              <input
                id={book.id + "-none"}
                type="radio"
                name={book.id}
                value={book.id}
                checked={this.state.shelf === 'none'}
                onChange={this.handleChange}></input>
              <label htmlFor={book.id + "-none"} className="shelfNameAnimate">{FgetReadable('none')}</label>
            </li>

          </ul>
        </div>
        {this.state.isModalOpen && (
          <singleBook modalState={this.state.isModalOpen} {...book} />
        )
        }
      </li>
    );
  }

}

export default Book;
