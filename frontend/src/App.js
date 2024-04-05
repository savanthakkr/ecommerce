
import './App.css';
import { Route, Routes } from 'react-router-dom'; 
import Login from './component/Login'
import AllBook from './component/AllBook';
import AddBook from './component/AddBook';
import UpdateBook from './component/UpdateBook';
import Register from './component/Register';
import AllbookClass from './component/AllbookClass';

function App() {
  return (
    <Routes>
      {<Route path='/' element={<Register />}/>}
      {<Route path='/login' element={<Login />}/>}
      {/* <Route path="/register" element={<Register />} /> */}
      { <Route path='/allBooks' element={<AllBook/>}/>}
      < Route path='/addBooks' element={<AddBook/>}/>
      < Route path='/AllbookClass' element={<AllbookClass/>}/>
      <Route path='/updateBook/:id' element={<UpdateBook/>}/>
      {/* <Route path='/search' element={<Search/>}/>  */}
    </Routes>
  );
}

export default App;
