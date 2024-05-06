import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.render(
  <BrowserRouter basename="/TD-react-js-CoderHouse/">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)