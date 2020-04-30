import React, { useState, useEffect } from 'react'
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap'

export const EditModal = (props) => {
  const [valueName, setValueName] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const editCurrentCustomers = () => {
    props.handleCloseEdit()
    props.customerEdit(props.id, {
      name: valueName,
      address: valueAddress,
      phone: valuePhone
    })
  }

  useEffect(() => {
    if (props.name) {
      setValueName(props.name)
    }
  }, [props.name, props.showEdit])

  useEffect(() => {
    if (props.address) {
      setValueAddress(props.address)
    }
  }, [props.address, props.showEdit])

  useEffect(() => {
    if (props.phone) {
      setValuePhone(props.phone)
    }
  }, [props.phone, props.showEdit])

  return (
    <Modal show={props.showEdit} onHide={props.handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Make changes to user data {props.name}</Modal.Title>
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
          onClick={props.handleCloseEdit}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={editCurrentCustomers}
          disabled={valueName === '' || valueAddress === '' || valuePhone === ''}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}