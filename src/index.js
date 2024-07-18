import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './page/Homepage';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navigator from "./component/Navigator";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Navigator />
      <Router>
          <Routes>
              <Route exact path="/" element={<Homepage/>} />
          </Routes>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
