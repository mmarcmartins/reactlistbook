import React from "react";
import { Link } from "react-router-dom";
import ListBooks from "../../components/list/ListBooks";
import BookTemplate from "../../components/book/Book";

const PaginaInicial = props => {
    const { books, shelvs, setSelectedBook, changeShelv, prettifyName } = props;
    return (
        <div>
            {
                Object.values(shelvs).map((shelv, key) => {
                    return (
                        <ListBooks key={key} name={prettifyName(shelv)}>
                            {
                                books.filter(book => book.shelf === shelv)
                                    .map((book, key) =>
                                        <BookTemplate
                                            key={key}
                                            book={book}
                                            shelvs={shelvs}
                                            setSelectedBook={setSelectedBook}
                                            changeShelv={changeShelv}
                                            prettifyName={prettifyName} />)
                            }
                        </ListBooks>
                    )
                })
            }
            <Link className="linkButton search" to="/search">
                Search
            </Link>
        </div>
    );

}
export default PaginaInicial;
