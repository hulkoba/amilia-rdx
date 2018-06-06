import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
import './main.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// import contactApp from './rdx/reducer'
// const store = createStore(contactApp)
// const store = createStore(todoApp, window.STATE_FROM_SERVER)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
