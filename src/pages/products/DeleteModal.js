import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = ({
  handleCloseDelete,
  _id,
  name,
  productDelete,
  showDelete
}) => {
  const finalDelete = (_id) => {
    handleCloseDelete()
    productDelete(_id)
  }

  return (
    <Modal show={showDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the product {name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => finalDelete(_id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
