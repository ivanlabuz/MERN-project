import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = (props) => {

  const invoiceDelete = (id) => {
    props.handleCloseDelete()
    props.invoiceDelete(id)
  }
  
  return (
    <Modal show={props.showDelete} onHide={props.handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the invoice {props.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => invoiceDelete(props.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
