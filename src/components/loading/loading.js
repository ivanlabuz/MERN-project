import { Spinner } from 'react-bootstrap'
import React from 'react'

export const Loading = () => {
  return <div style={{ textAlign: 'center' }}>
    <Spinner animation="grow" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
}