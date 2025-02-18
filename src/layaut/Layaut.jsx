import React from 'react'
import Header from '../componenta/header'

function Layaut({children}) {
  return (
    <div>
        <Header></Header>
        {children}

    </div>
  )
}

export default Layaut