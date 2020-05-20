import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = ({
  handleCloseDelete,
  invoiceDelete,
  showDelete,
  name,
  _id
}) => {

  const finishDelete = (_id) => {
    handleCloseDelete()
    invoiceDelete(_id)
  }

  return (
    <Modal show={showDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the invoice {name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => finishDelete(_id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
