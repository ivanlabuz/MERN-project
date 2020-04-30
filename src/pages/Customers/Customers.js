import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import './Customer.css'
import { Helmet } from 'react-helmet'
import { CreateModal } from './createModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import { connect } from 'react-redux'
import { createCustomer, editCustomer, deleteCustomer } from '../../store/actions/customers'

function Customers(props) {

  const [currentName, setCurrentName] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentPhone, setCurrentPhone] = useState(null);
  const [currentId, setCurrentId] = useState(null)
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id, name, address, phone) => {
    setCurrentId(id)
    setCurrentName(name)
    setCurrentAddress(address)
    setCurrentPhone(phone)
    setShowEdit(true);
  }

  const handleCloseDelete = (id) => {
    setCurrentId(id);
    setShowDelete(false);
  }

  const handleShowDelete = (id, name) => {
    setCurrentName(name)
    setShowDelete(true);
    setCurrentId(id);
  }

  const customersList = (array) => {
    return array.map((customer, index) => (
      <tr key={customer.id}>
        <td>{index + 1}</td>
        <td>{customer.name}</td>
        <td>{customer.address}</td>
        <td
          className='EditCustomersList'
        >
          {customer.phone}
          <div>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              onClick={() => handleShowEdit(customer.id, customer.name, customer.address, customer.phone)}
            ></i>&nbsp;
                  <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => handleShowDelete(customer.id, customer.name)}
            ></i>
          </div>
        </td>
      </tr>
    ))
  }

  const customerDelete = id => {
    props.deleteCustomer(id)
  }

  const customerEdit = (id, object) => {
    props.editCustomer(id, object)
  }

  const newCustomer = object => {
    props.createCustomer(object)
  }

  return (
    <div className='Customer' >
      <h1 >Customer list</h1>
      <Button
        variant="outline-dark"
        onClick={handleShowCreate}
      >
        Create
      </Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customersList(props.customers)}
        </tbody>
      </Table>
      <CreateModal
        handleCloseCreate={handleCloseCreate}
        newCustomer={newCustomer}
        showCreate={showCreate}
      />
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        customerDelete={customerDelete}
        showDelete={showDelete}
        id={currentId}
        name={currentName}
      />
      <EditModal
        handleCloseEdit={handleCloseEdit}
        showEdit={showEdit}
        customerEdit={customerEdit}
        id={currentId}
        name={currentName}
        address={currentAddress}
        phone={currentPhone}
      />
      <Helmet>
        <title>Customers</title>
      </Helmet>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    customers: state.customers.list
  }
}

function mapStateToDispatch(dispatch) {
  return {
    createCustomer: (customer) => dispatch(createCustomer(customer)),
    editCustomer: (id, customer) => dispatch(editCustomer(id, customer)),
    deleteCustomer: (id) => dispatch(deleteCustomer(id))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Customers)