import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./Login.css";

class AllBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: localStorage.getItem('accessToken'),
            bookid: this.props.params.bookid,
            
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick = () => {
        console.log("To addBooks");
        this.props.navigation('/addBooks');
    }


    handleUpdate = (bookID) => {
        console.log("To addBooks");
        this.props.navigation(`/updateBook/${bookID}`);
    
        console.log('edit book with id ', bookID);
        localStorage.setItem('accessBookId', bookID);
    }

    handleDelete(bookID) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:5000/deleteBook/${bookID}`);
        xhr.setRequestHeader('Authorization', `${this.state.token}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.state.navigate('/allBooks');
                window.location.reload();
            } else {
                console.error('Failed to delete the book');
            }
        };
        xhr.onerror = () => {
            console.error('Error making the delete request');
        };
        xhr.send();
        console.log('delete book with id ', bookID);
    }

    componentDidMount() {
        const fetchBooks = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`,
                    },
                };

                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:5000/allBooks', true);
                xhr.setRequestHeader('Authorization', `Bearer ${this.state.token}`);

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (Array.isArray(response.data)) {
                            console.log('l : ', response);
                            this.setState({ books: response.data });
                        } else {
                            console.error(' fetching books:', response.statusText);
                        }
                    } else {
                        console.error('Error fetching books:', xhr.statusText);
                    }
                };

                xhr.onerror = () => {
                    console.error('Error fetching books:', xhr.statusText);
                };

                xhr.send();
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }

    render() {
        return (
            <div className="container mt-5">
                <nav className='navbar'>
                    {/* <button type='button' onClick={this.handleClick}>Add Book</button> */}
                </nav>
                <h2>All Books with class component</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Published Year</th>
                            <th>Quantity Available</th>
                            <th>Author ID</th>
                            <th>Genre ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(this.state.books) && this.state.books.map((book, index) => (
                            <tr key={index}>
                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.published_year}</td>
                                <td>{book.quantity_available}</td>
                                <td>{book.author_id}</td>
                                <td>{book.genre_id}</td>
                                {/* <td><img src={`http://localhost:5000${book?.image}`}/></td> */}
                                <td><button onClick={() => this.handleUpdate(book.book_id)}>EDIT</button></td>
                                <td><button onClick={() => this.handleDelete(book.book_id)}>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type='button' onClick={this.handleClick}>Add Book</button>
            </div>
        );
    }
}


const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();

        return <Component navigation={navigation} {...props} />
    }
}
  const withRouter = Wrapped => props => {
    const params = useParams();
   
    return (
      <Wrapped
        {...props}
        params={params}
      />
    );
  };
  

export default (AllBook, withNavigateHook, withRouter(AllBook));