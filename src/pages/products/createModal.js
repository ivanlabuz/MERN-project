import React, { useState } from 'react'
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap'

export const CreateModal = ({handleCloseCreate, handleClose, newProduct, showCreate}) => {
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')

  const saveNewProduct = () => {
    handleCloseCreate()
    newProduct({
      name: valueName,
      price: valuePrice,
    })
    setValueName('')
    setValuePrice('')
  }
  
  return (
    <Modal show={showCreate} onHide={handleCloseCreate}>
      <Modal.Header closeButton>
        <Modal.Title>
          Introduce New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: '100px' }}
            >
              <i
                style={{ minWidth: '15px' }}
                className="fa fa-umbrella"
                aria-hidden="true"
              ></i>&nbsp;
                  Name
              </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Samsung Galaxy S20"
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
              <i
                style={{ minWidth: '15px' }}
                className="fa fa-usd"
                aria-hidden="true"
              ></i>&nbsp;
                  Price
              </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='number'
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="99.9"
            onChange={event => setValuePrice(event.target.value)}
            value={valuePrice}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={handleClose}
        >
          Close
          </Button>
        <Button
          variant="primary"
          onClick={saveNewProduct}
          disabled={valueName === '' || valuePrice === ''}
        >
          Save new product
          </Button>
      </Modal.Footer>
    </Modal>
  )
}