import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div className="mx-auto" style={{ width: '200px' }} >
      <h1>Invoice APP</h1>
      <h5>Version 0.1.1</h5>
      <Helmet>
        <title>Invoice APP</title>
      </Helmet>
    </div>
  )
}

export default Home