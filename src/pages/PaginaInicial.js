import React from "react";
import * as BooksAPI from "../BooksAPI";
import ListBooks from "../components/ListBooks";
import Book from "../components/Book";

class PaginaInicial extends React.Component {
    state = {
        shelfsPerBook: [],
        allBooks: []
    };

    getAllShelfs = allBooks => {
        const newBooks = [];
        allBooks.forEach(book => {

            if (!Object.prototype.hasOwnProperty.call(newBooks, book.shelf)) {
                newBooks[book.shelf] = {
                    shelf: this.props.getShelfReadable(book.shelf),
                    books: []
                };
            }

            newBooks[book.shelf].books.push({ ...book });
        });

        this.setState({ allBooks, shelfsPerBook: newBooks });
        this.props.updateShelfs(Object.keys(this.state.shelfsPerBook));

    };

    componentDidMount() {

        BooksAPI.getAll().then(allBooks => {
            this.getAllShelfs(allBooks);
        });

    }
    /* Add the book on the selected shelf */
    changeBookShelf = (shelf, book) => {
        book.shelf = shelf;
        const newShelfBook = this.removeBookFromArray(book);
        newShelfBook[shelf].books.push(book)

        this.setState({
            shelfs: newShelfBook
        })

        BooksAPI.update(book, shelf);
    };

    /* Remove the selected book from the shelf*/
    removeBookFromArray = book => {
        const newShelfBook = [];
        Object.keys(this.state.shelfsPerBook).forEach(position => {
            newShelfBook[position] = {
                shelf: this.props.getShelfReadable(position),
                books: []
            }

            let filter = this.state.shelfsPerBook[position].books.filter(b => b.id !== book.id);
            newShelfBook[position].books.push(...filter)
        })
        return newShelfBook;
    }

    /* Remove book from listing books */
    deleteBook = book => {
        const newBooks = this.removeBookFromArray(book);
        this.setState({
            shelfsPerBook: newBooks
        })
        BooksAPI.update(book, 'none');
    }

    render() {
        return (

            Object.values(this.state.shelfsPerBook).map(obj => (
                obj.books.length > 0 && (
                    <ListBooks key={obj.shelf} name={obj.shelf}>
                        {obj.books.map(book => (
                            <Book
                                key={book.id}
                                changeShelf={this.changeBookShelf}
                                getReadable={this.props.getShelfReadable}
                                allShelfs={Object.keys(this.state.shelfsPerBook)}
                                book={book}
                                deleteBook={this.deleteBook}
                                setSelectedBook={this.props.changeSelectedBook} />
                        ))}
                    </ListBooks>
                )
            ))

        );
    }
}
export default PaginaInicial;
