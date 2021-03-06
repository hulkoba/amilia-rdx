import React from 'react'
import { connect } from 'react-redux'
import { Offline, Online } from 'react-detect-offline'

import { toggleEdit } from '../rdx/actions'
import '../main.css'

const Header = ({ dispatch, isOpen }) => {
  return (
    <header className='app-header'>
      <h1 className='app-title'>
        <Online polling={{ enabled: true, url: 'http://localhost:1312' }}>
          <div>Hello cat, <span className='green'>you're online</span></div>
        </Online>
        <Offline polling={{ enabled: true, url: 'http://localhost:1312' }}>
          <div>Hello cat, <span className='red'>you're offline</span></div>
        </Offline>
      </h1>
      {!isOpen &&
        <button
          className='add-btn'
          onClick={() => dispatch(toggleEdit())}>Add a cat
        </button>
      }
    </header>
  )
}

const mapStateToProps = state => ({
  isOpen: state.editView.isOpen
})

export default connect(mapStateToProps)(Header)
