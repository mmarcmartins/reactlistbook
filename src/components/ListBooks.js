import React, { Component } from "react";

class ListBooks extends Component {
  render() {
    const title = this.props.name;

    return (
      <section className="list-books">
        <h1 className="title">{title}</h1>
        <ul className="shelf">{this.props.children}</ul>
      </section>
    );
  }
}

export default ListBooks;
