import React, { Component } from "react";
import API from "../utils/API";
import SearchBook from "../components/SearchBook"
import Container from "../components/Container";

class Search extends Component {
state = {
  books: [],
  title: "",
  authors: [],
  description: "",
  saved: "",
  results: [],
  image: "",
  link: "",
  search: ""

};

handleInputChange = event => {
    this.setState({ search: event.target.value });
  };


  loadBooks = () =>{
    API.getGoogleBooks(this.state.search)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
     
      const newBooks = res.data.items.map(book => {
        return{
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          subtitle: book.volumeInfo.subtitle,
          image: book.volumeInfo.imageLinks.thumbnail,
          link: book.volumeInfo.infoLink,
          description: book.volumeInfo.description,
          saved: false
        }
      })
      const newState = Object.assign({}, this.state,{books: newBooks});
      this.setState(newState);
      console.log(this.state.books)
      //this.setState({ books: res.data.items, error: "" });
     // console.log(res.data.items);
      
    })
    .catch(err => this.setState({ error: err.message }));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.loadBooks();
  };

  handleSaveBook = (event,book) =>{
    // console.log('this is:', book);
    API.saveBook({
        authors: book.authors,
        title: book.title,
        subtitle: book.subtitle,
        description: book.description,
        image: book.image,
        link : book.link,
        saved: true
    })
     
      .then(res => {
        if (res.data.status === "error") {
          console.log(res.data)
          throw new Error(res.data.message);
        }
      })
  }   
//       })
//       .catch(err => this.setState({ error: err.message }));

  


render() {
      return(
        <Container>
          <h1 className="text-center"> (React) Google Books Search</h1>
          <h3 className="text-center">Search for and Save Books of Interest</h3>
          <SearchBook
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            />
                      <br />
          <div className="container mt-5">
          {this.state.books.map((book,index)=> (
            !book.saved ? (
              
            <div className="row">
              <div className="col s12">
              <div className="card  mt-3" >
                  <div className="card-content">
                  <div>
                  <h4><strong >Title: {book.title}</strong></h4>
                   <button  className="float-right bg-success"
                       onClick={(e) => this.handleSaveBook(e,book)}>Save</button>
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

export default Search;
