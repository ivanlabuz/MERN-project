import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import './Customer.css'
import { Helmet } from 'react-helmet'
import { CreateModal } from './createModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import { connect } from 'react-redux'
import { Loading } from '../../components/loading/loading'
import {
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomers
} from '../../store/actions/customers'

function Customers({
  deleteCustomer,
  editCustomer,
  createCustomer,
  getCustomers,
  customers
}) {

  const [currentCustomer, setCurrentCustomer] = useState({
    _id: null,
    name: null,
    address: null,
    phone: null
  })
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomers().finally(setIsLoading(false))

    // eslint-disable-next-line  
  }, [])

  const handleCloseCreate = () => setShowCreate(false);

  const handleShowCreate = () => setShowCreate(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (_id, name, address, phone) => {
    setCurrentCustomer({ _id, name, address, phone })
    setShowEdit(true);
  }

  const handleCloseDelete = (_id) => {
    setCurrentCustomer((prevState) => ({
      ...prevState,
      _id
    }));
    setShowDelete(false);
  }

  const handleShowDelete = (_id, name) => {
    setCurrentCustomer((prevState) => ({
      ...prevState,
      _id, name
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
            <tr key={customer._id}>
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
                        customer._id,
                        customer.name,
                        customer.address,
                        customer.phone
                      )}
                  ></i>&nbsp;
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={
                      () => handleShowDelete(customer._id, customer.name)
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

  const customerDelete = _id => {
    deleteCustomer(_id)
  }

  const customerEdit = (_id, object) => {
    editCustomer(_id, object)
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
      {
        isLoading
          ? <Loading />
          : customersList(customers)}
      <CreateModal
        handleCloseCreate={handleCloseCreate}
        newCustomer={newCustomer}
        showCreate={showCreate}
      />
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        customerDelete={customerDelete}
        showDelete={showDelete}
        _id={currentCustomer._id}
        name={currentCustomer.name}
      />
      <EditModal
        handleCloseEdit={handleCloseEdit}
        showEdit={showEdit}
        customerEdit={customerEdit}
        _id={currentCustomer._id}
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

function mapStateToProps(state) {
  return {
    customers: state.customers.list
  }
}

function mapStateToDispatch(dispatch) {
  return {
    getCustomers: () => dispatch(getCustomers()),
    createCustomer: (customer) => dispatch(createCustomer(customer)),
    editCustomer: (_id, customer) => dispatch(editCustomer(_id, customer)),
    deleteCustomer: (_id) => dispatch(deleteCustomer(_id)),
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Customers)