import React, { useState, useEffect } from 'react'
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap'

export const EditModal = (props) => {
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  
  const editCurrentProduct = () => {
    props.handleCloseEdit()
    props.productEdit(props.id, {
      name: valueName,
      price: valuePrice
    })
  }
  
  useEffect(() => {
    if (props.name) {
      setValueName(props.name)
    }
  }, [props.name, props.showEdit])

  useEffect(() => {
    if (props.price) {
      setValuePrice(props.price)
    }
  }, [props.price, props.showEdit])

  return (
    <Modal show={props.showEdit} onHide={props.handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>
          Make changes to product data {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: '100px' }}
            >
              <i style={{ minWidth: '15px' }} className="fa fa-umbrella" aria-hidden="true"></i>&nbsp;
                  Name
              </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={event => setValueName(event.target.value)}
            value={valueName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: '100px' }}
            >
              <i style={{ minWidth: '15px' }} className="fa fa-usd" aria-hidden="true"></i>&nbsp;
                  Price
              </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='number'
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={event => setValuePrice(event.target.value)}
            value={valuePrice}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={props.handleCloseEdit}
        >
          Close
          </Button>
        <Button
          variant="primary"
          onClick={editCurrentProduct}
          disabled={valueName === '' || valuePrice === ''}
        >
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}
