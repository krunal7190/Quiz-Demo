
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Question from './components/Question'; 

function App() {


  return (
    <> 
    <Router>
          
          <Routes>
            <Route exact path="/" element={< Form />} />
            <Route exact path="/question" element={< Question />}/>
          </Routes>
    
        </Router>
    </>
  );
}


export default App;
