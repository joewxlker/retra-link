
import './App.css';
import React, { Component } from 'react'
import Header from './HeaderComponents/Header';
import Main from './MainEntryComponents/Main'
import Footer from './FooterComponents/Footer'

class App extends Component {

  render() {
    return (
      <div className='app-container'>
        <Header />
        <Main />
        <Footer/>
      </div>
    );
  };
}

export default App;
