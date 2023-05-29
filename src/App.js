import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

//Context import
import ContextProvider from './contexts/contextProvider';

//Components imports
import Header from './components/header';
import Home from './components/home';
import Auth from './components/auth';
import Welcome from './components/welcome';
import Leagues from './components/leagues';
import Teams from './components/teams';


function App() {

  return (
    <div className="App">
      <HashRouter>
        <ContextProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/leagues/:country' element={<Leagues />} />
            <Route path='/leagues/:league/:season' element={<Teams />} />
          </Routes>
        </ContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
