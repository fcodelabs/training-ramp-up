import React from 'react'
import PersonTableView from '../../Component/PersonTableView/PersonTableView'

const Home: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
