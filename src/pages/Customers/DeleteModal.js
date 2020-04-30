import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DeleteModal = (props) => {

  const customerDelete = (id) => {
    props.handleCloseDelete()
    props.customerDelete(id)
  }

  return (
    <Modal show={props.showDelete} onHide={props.handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Delete customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the customer {props.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseDelete}>
          No
        </Button>
        <Button variant="primary" onClick={() => customerDelete(props.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
