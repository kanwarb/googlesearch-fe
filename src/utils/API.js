import axios from 'axios';

export default  {
  getGoogleBooks: function(search) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=15&key=AIzaSyC6OZ9TFUvaEauu3PHn36LbCflYYcULOnI`);
  },

  saveBook: function (bookData) {
    return axios.post('https://googlesearch-be.herokuapp.com/api/books', bookData );
  },

  getSaved: function () {
    return axios.get('https://googlesearch-be.herokuapp.com/api/books')
  },

  deleteBook: function (id) {
    return axios.delete(`https://googlesearch-be.herokuapp.com/api/books/${id}`)
  }
};