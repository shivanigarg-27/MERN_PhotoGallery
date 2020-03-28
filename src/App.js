import React, {useState} from 'react';
import './App.css';
import { useAuth0 } from './contexts/ContextAuth';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FileUpload from './components/FileUpload';
import UserList from './components/UserList';
import Header from './components/Header';
import PhotoListing from './components/PhotoListing';
import {Button} from 'react-bootstrap';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const { isLoading, user } = useAuth0()
  const [show, setShow] = useState(false)
  return (
    <div className="App">
         <div className="container">
              <Header />
              {
                !isLoading && user && 
                <div className = 'row'>
                    <div className='col-md-3'>
                        <UserList />
                        <Button onClick={() => {
                            setShow(true)
                        }}>
                          Upload
                        </Button>
                    </div>
                    <div className='col-md-9'>
                        <PhotoListing useremail = {user && user.email} />
                    </div>
                </div> 
              }
         </div>
        <FileUpload useremail = {user && user.email} show={show} handleClose={() => setShow(false)} />
      </div>
  );
}

export default App;
