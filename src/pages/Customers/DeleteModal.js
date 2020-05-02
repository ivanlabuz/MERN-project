import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = ({
  handleCloseDelete,
  customerDelete,
  showDelete,
  name,
  id }) => {

  const finishDelete = (id) => {
    handleCloseDelete()
    customerDelete(id)
  }

  return (
    <Modal show={showDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the customer {name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => finishDelete(id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
