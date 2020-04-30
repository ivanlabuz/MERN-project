import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = (props) => {
  const productDelete = (id) => {
    props.handleCloseDelete()
    props.productDelete(id)
  }
  return (
    <Modal show={props.showDelete} onHide={props.handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the product {props.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => productDelete(props.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
