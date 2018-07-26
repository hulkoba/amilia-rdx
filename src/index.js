import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import reducer from './rdx/reducer'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// override the discard function
// the original does not always retry although it is in the documentation!
const discard = (error, _action, _retries) => {
  // ORIGINAL
  // if (!('status' in error)) { return true; }
  // return error.status >= 400 && error.status < 500;
  const { response } = error
  return response && response.status >= 400 && response.status <= 500
}

// Add the offline store enhancer with compose
const store = createStore(
  reducer,
  compose(
    offline({
      ...offlineConfig,
      discard
    })
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
