import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";

class Saved extends Component {
state = {
  books: [],
  title: "",
  authors: [],
  description: "",
  saved: "",
  results: [],
  image: "",
  link: "",

};

componentDidMount() {
  this.loadSavedBooks();
}


loadSavedBooks = () => { 
  API.getSaved()
    .then(res =>
      this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    )
    .catch(err => console.log(err));
};

deleteBook = id => {
  API.deleteBook(id)
    .then(res => this.loadSavedBooks())
    .catch(err => console.log(err));
};




render() {
      return(
        <Container>

          <div className="container mt-5">
          {this.state.books.map((book,index)=> (
            book.saved ? (
              
            <div className="row">
              <div className="col s12">
              <div className="card  mt-3" >
                  <div className="card-content">
                  <div>
                  <h4><strong >Title: {book.title}</strong></h4>
                   <button  className="float-right bg-success"
                      onClick={() => this.deleteBook(book._id)}>Delete</button>
                   <a name="link" value={book.link} href={book.link} target="_blank" rel="noopener noreferrer"> <button className="float-right bg-info">View</button></a>
                  </div>
                  <h6 name="subtitle" value={book.subtitle}>Subtitle: {book.subtitle}</h6>
                  <p className="card-title" key={book[index]} name="authors" value={this.state.authors}>Authors: {book.authors},</p>
                  <div className="card-body">
                  <img name="image" value={book.image} alt="Books" src={book.image} className="img float-left" />
                    <p >{book.description}</p>
                  </div>
                  </div>
              </div>
              </div>
          </div>
            ):(
              <div></div>
            )
          ))}
          </div>  
      </Container>
      )
}
  
}

export default Saved;
