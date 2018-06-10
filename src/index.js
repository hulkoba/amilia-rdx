import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import logger from 'redux-logger'

import reducer from './rdx/reducer'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Add the offline store enhancer with compose
const store = createStore(
  reducer,
  compose(
    applyMiddleware(logger),
    offline(offlineConfig)
  )
)

// const store = createStore(
//   reducer,
//   offline(offlineConfig)
// )

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
