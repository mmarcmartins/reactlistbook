import React from "react";

function ModalBook(props) {
  const { book, setSelectedBook } = props;
  const bookImage = `http://books.google.com/books/content?id=${
    book.id
  }&printsec=frontcover&img=1&zoom=2&source=gbs_api`;
  const link = !book.canonicalVolumeLink
    ? book.infoLink
    : book.canonicalVolumeLink;

  if (!book.description) {
    book.description = "No description avaliable";
  }
  return (
    <div className="modal">
      <div className="innerModal">
        <span
          className="moveToShelf closeModal"
          onClick={() => {
            setSelectedBook("");
          }}
        />
        <div className="title_subtitle">
          <h1>{book.title}</h1>
          <h2>{book.subtitle}</h2>
        </div>
        <div className="book_desc">
          <figure className="single-book-modal">
            <img src={bookImage} alt={book.title} />
          </figure>
          <div className="content">
            <p>{book.description.substr(0, 300)}...</p>

            <div className="sep">
              {book.ratingsCount && (
                <span className="rating">Ratings: {book.ratingsCount}</span>
              )}
              {book.pageCount && (
                <span className="totalPages">
                  Page counts: {book.pageCount}
                </span>
              )}
            </div>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.replace(/"/g, link)}
            >
              See more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBook;
