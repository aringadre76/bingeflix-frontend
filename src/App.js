// In src/App.js

import React from 'react';
import LandingPage from './components/Landinglogin-page/Landing';
import Home from './components/Home-page/Home';
import Recommend from './components/Recommend-page/Recommend'; 
import Lists from './components/Az-page/Lists';
import Seasons from './components/Seasons-page/Seasons';
import Genre from './components/Genre-page/Genre';
import Sports from './components/Sports-page/Sports';

import Construction from './components/Construction-page/Construction'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Redirect
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          {/*<Route path="/recommend" element={<Recommend />} />*/}
          
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/genre" element={<Genre/>} />

          <Route path="/recommend/construction" element={<Construction />} />
          <Route path="/lists/construction" element={<Construction />} />
          <Route path="/seasons/construction" element={<Construction />} />
          <Route path="/genre/construction" element={<Construction/>} />
          <Route path="/sports" element={<Sports/>} />
          <Route path="/under_construction" element={<Construction/>} />
          {/*Add more routes as needed*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
