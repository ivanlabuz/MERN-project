import React, { useState } from 'react'
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap'

export const CreateModal = (props) => {
  const [valueName, setValueName] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  
  const saveNewCustomer = () => {
    props.handleCloseCreate()
    props.newCustomer({
      name: valueName,
      address: valueAddress,
      phone: valuePhone
    })
    setValueName('')
    setValueAddress('')
    setValuePhone('')
  }

  return (
    <Modal show={props.showCreate} onHide={props.handleCloseCreate}>
      <Modal.Header closeButton>
        <Modal.Title>Enter new user data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: '100px' }}
            >
              <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
                  Name
              </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Bob Jonson"
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
              <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                  Address
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="890 Main St, Dansville CA 94325"
            onChange={event => setValueAddress(event.target.value)}
            value={valueAddress}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              id="inputGroup-sizing-default"
              style={{ width: '100px' }}
            >
              <i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;
                  Phone
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder='8-950-777-77-77'
            onChange={event => setValuePhone(event.target.value)}
            value={valuePhone}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={props.handleClose}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={saveNewCustomer}
          disabled={valueName === '' || valueAddress === '' || valuePhone === ''}
        >
          Save new user
        </Button>
      </Modal.Footer>
    </Modal>
  )
}