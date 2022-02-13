import React from 'react'
import ReactDom from 'react-dom'

// Import App component
import App from './App'

// Import styling
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(<App />, document.querySelector('#root'))