import React from "react";
class moveBook extends React.Component {
    state = {
        shelv: this.props.book.shelf
    }
    handleChange = evt => {
        this.setState({
            shelv: evt.currentTarget.value
        });

        this.props.changeShelv(evt.currentTarget.value, this.props.book);
    };
    render() {
        const { shelvs, book } = this.props;
        return (

            <div>
                <h2 className="moveShelfCardTitle">Shelfs</h2>
                <ul className="shelfList">
                    {
                        Object.values(shelvs).map(shelv =>
                            <li className="shelf-option" key={shelv}>
                                <input
                                    id={book.id + "-" + shelv}
                                    type="radio"
                                    name={book.id}
                                    value={shelv}
                                    checked={this.state.shelv === shelv}
                                    onChange={this.handleChange}
                                />
                                <label
                                    htmlFor={book.id + "-" + shelv}
                                    className="shelfNameAnimate"
                                >
                                    {this.props.prettifyName(shelv)}
                                </label>
                            </li>
                        )
                    }
                    <li className="shelf-option" key="none">
                        <input
                            id={book.id + "-none"}
                            type="radio"
                            name={book.id}
                            value='none'
                            checked={this.state.shelv === "none" || !this.state.shelv}
                            onChange={this.handleChange}
                        />
                        <label htmlFor={book.id + "-none"} className="shelfNameAnimate">
                            {this.props.prettifyName("none")}
                        </label>
                    </li>
                </ul>
            </div>
        );
    }
}

export default moveBook;