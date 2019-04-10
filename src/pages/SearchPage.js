import React from "react";
import { search, update } from "../BooksAPI";
import ListBooks from "../components/ListBooks";
import Book from "../components/Book";

class SearchPage extends React.Component {
    state = {
        query: '',
        filteredBooks: [],
        searchedFor: ''
    };

    handleSubmit = evt => {
        evt.preventDefault();
        this.searchQuery(this.state.query);
    };
    searchQuery = query => {
        search(query).then(filteredBooks => {
            this.setState({ filteredBooks });
        })
    }
    updateQuery = query => {
        this.setState({ query });
    }

    changeBookShelf = teste => {

    }

    render() {
        const shelfsAvaliable = this.props.shelfsAvaliable;
        return (
            < div className="container" >
                <div className="searchName">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="pesquisa"
                            onChange={evt => this.updateQuery(evt.currentTarget.value)}
                        />
                        <input type="submit" />

                    </form>
                    <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
                        target="_blank"
                        rel="noopener noreferrer">Look for the search terms</a>
                </div>

                <div className="result">
                    {(this.state.filteredBooks.length > 0 && (
                        <ListBooks key='none' name='none' >
                            {this.state.filteredBooks.map(book => (
                                <Book
                                    key={book.id}
                                    changeShelf={this.changeBookShelf}
                                    getReadable={this.props.getShelfReadable}
                                    allShelfs={shelfsAvaliable}
                                    book={book}
                                    setSelectedBook={this.props.changeSelectedBook} />
                            ))}
                        </ListBooks>
                    ))}

                </div>

            </div >



        )
    }

}

export default SearchPage;