import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = ({
  handleCloseDelete,
  invoiceDelete,
  showDelete,
  name,
  id
}) => {

  const finishDelete = (id) => {
    handleCloseDelete()
    invoiceDelete(id)
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
        <Button variant="primary" onClick={() => finishDelete(id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
