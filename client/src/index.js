import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Messenger from './DappComponents/Messenger.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Messenger/:address/:username" element={<Messenger />} />
      <Route path="*" element={ <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>}/>
    </Routes>
  </BrowserRouter>
);