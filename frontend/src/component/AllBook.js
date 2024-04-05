import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./Login.css";


const AllBook = () => {
    const [books, setBooks] = useState([]);

    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate('/addBooks')
    };

    const handleUpdate = (bookID) => {
      navigate(`/updateBook/${bookID}`)
      console.log('edit book with id ', bookID)
      localStorage.setItem('accessBookId', bookID);
  };

  const {bookid} = useParams();


  const handleDelete = (bookID) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:5000/deleteBook/${bookID}`);
    xhr.setRequestHeader('Authorization', `${token}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        navigate('/allBooks');
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
  };

  // const [image, setImage]  = useState([]);

  // useEffect(() => {
  //   const fetchBookData = async () => {
  
  //     try {
  //       const response = await fetch(`http://localhost:5000/allBook/${bookId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       const data = await response.json();
  //       setImage(data.data[0]);
  //       console.log(data)
  //     } catch (error) {
  //       console.error('Error fetching book data:', error);
  //     }
  //   };
  //   fetchBookData();
  // }, [bookId]);

  




    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'http://localhost:5000/allBooks', true);
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);

          // const path = [`/public/assets/book/${bookid}`]
          // console.log(path);
    
          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
    
              if (Array.isArray(response.data)) {
                console.log('l : ', response);
                setBooks(response.data);
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
    }, [token]);



    return (
      
        <div className="container mt-5">
          <nav className='navbar'>
          <button type='button' onClick={handleClick}>Add Book</button>
          </nav>
            <h2>All Books</h2>
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
                    {Array.isArray(books) && books.map((book, index) => (
                              <tr key={index}>
                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.published_year}</td>
                                <td>{book.quantity_available}</td>
                                <td>{book.author_id}</td>
                                <td>{book.genre_id}</td>
                                {/* <td><img src={`http://localhost:5000${book?.image}`}/></td> */}
                                <td><button  onClick={ () => handleUpdate(book.book_id)}>EDIT</button></td>
                                <td><button  onClick={ () => handleDelete(book.book_id)}>DELETE</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <button type='button' onClick={handleClick}>Add Book</button>
        </div>
        
    );
};

export default AllBook;