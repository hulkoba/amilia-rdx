import React from 'react'
import { connect } from 'react-redux'
import { Offline, Online } from 'react-detect-offline'

import { toggleEdit } from '../rdx/actions'
import '../main.css'

const Header = ({ dispatch }) => {
  return (
    <header className='app-header'>
      <h1 className='app-title'>
        <Online>
          <div>Hello cat, <span className='green'>you're online</span></div>
        </Online>
        <Offline>
          <div>Hello cat, <span className='red'>you're offline</span></div>
        </Offline>
      </h1>
      {/* {!editView && */}
      <button
        className='add-btn'
        onClick={() => dispatch(toggleEdit())}>Add a cat
      </button>
      {/* } */}
    </header>
  )
}

export default connect()(Header)
