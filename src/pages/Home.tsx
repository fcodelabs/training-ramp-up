import React from 'react'
import PersonTableView from '../Component/PersonTableView/PersonTableView'

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
      }}
    >
      <div>
        {' '}
        <PersonTableView />{' '}
      </div>
    </div>
  )
}

export default Home
