import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import './Customer.css'
import { Helmet } from 'react-helmet'
import { CreateModal } from './createModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import { connect } from 'react-redux'
import {
  createCustomer,
  editCustomer,
  deleteCustomer
} from '../../store/actions/customers'

function Customers({ deleteCustomer, editCustomer, createCustomer, customers }) {
  const [currentCustomer, setCurrentCustomer] = useState({
    id: null,
    name: null,
    address: null,
    phone: null
  })
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseCreate = () => setShowCreate(false);

  const handleShowCreate = () => setShowCreate(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (id, name, address, phone) => {
    setCurrentCustomer({ id, name, address, phone })
    setShowEdit(true);
  }

  const handleCloseDelete = (id) => {
    setCurrentCustomer((prevState) => ({
      ...prevState,
      id
    }));
    setShowDelete(false);
  }

  const handleShowDelete = (id, name) => {
    setCurrentCustomer((prevState) => ({
      ...prevState,
      id, name
    }));
    setShowDelete(true);
  }

  const customersList = (array) => {
    if (array.length) {
      return <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {array.map((customer, index) => (
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
                    onClick={() =>
                      handleShowEdit(
                        customer.id,
                        customer.name,
                        customer.address,
                        customer.phone
                      )}
                  ></i>&nbsp;
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={
                      () => handleShowDelete(customer.id, customer.name)
                    }
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    } else {
      return <h2 style={{ textAlign: 'center', paddingTop: '50px' }}>
        No customers, create new customers.
      </h2 >
    }
  }

  const customerDelete = id => {
    deleteCustomer(id)
  }

  const customerEdit = (id, object) => {
    editCustomer(id, object)
  }

  const newCustomer = object => {
    createCustomer(object)
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
      {customersList(customers)}
      <CreateModal
        handleCloseCreate={handleCloseCreate}
        newCustomer={newCustomer}
        showCreate={showCreate}
      />
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        customerDelete={customerDelete}
        showDelete={showDelete}
        id={currentCustomer.id}
        name={currentCustomer.name}
      />
      <EditModal
        handleCloseEdit={handleCloseEdit}
        showEdit={showEdit}
        customerEdit={customerEdit}
        id={currentCustomer.id}
        name={currentCustomer.name}
        address={currentCustomer.address}
        phone={currentCustomer.phone}
      />
      <Helmet>
        <title>Customers</title>
      </Helmet>
    </div>
  )
}
setTimeout(console.log(1), 3000)
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