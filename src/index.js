import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './rdx/reducer'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer)
// const store = createStore(todoApp, window.STATE_FROM_SERVER)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
