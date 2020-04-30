import React, { useState } from 'react'
import './Invoices.css'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { DeleteModal } from './DeleteModal'
import { deleteInvoice } from '../../store/actions/invoices'
import { NavLink } from 'react-router-dom'

const Invoices = (props) => {
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  
  const handleCloseDelete = (id) => {
    setCurrentId(null);
    setShowDelete(false);
  }

  const handleShowDelete = (id, name) => {
    setCurrentName(name)
    setShowDelete(true);
    setCurrentId(id);
  }

  let customerName = (customer_id) => {
    return props.customers.find((item) => item.id === customer_id).name
  }

  const invoicesList = (array) => {
    return array.map((invoices, index) => {
      return (
        <tr key={invoices.id}>
          <td>{index + 1}</td>
          <td>{customerName(invoices.customer_id)}</td>
          <td>{invoices.discount}</td>
          <td
            className='EditInvoicesList'
          >
            {invoices.total}
            <div>
              <NavLink to={`/Invoices/Invoice/${invoices.id}`} >
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                ></i>
              </NavLink>&nbsp;
                            <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={() => handleShowDelete(invoices.id, invoices.name)}
              ></i>
            </div>
          </td>
        </tr>
      )
    })
  }

  const invoiceDelete = id => {
    props.deleteInvoice(id)
  }

  return (
    <div className='Invoices' >
      <h1 >Invoices list</h1>
      <NavLink to='/Invoices/Invoice'>
        <Button
          variant="outline-dark"
        >Create</Button>
      </NavLink>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoicesList(props.invoices)}
        </tbody>
      </Table>
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        invoiceDelete={invoiceDelete}
        showDelete={showDelete}
        id={currentId}
        name={currentName}
      />
      <Helmet>
        <title>Invoices</title>
      </Helmet>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    customers: state.customers.list,
    products: state.products.list,
    invoices: state.invoices.list,
    invoiceItems: state.invoiceItems.list
  }
}

function mapStateToDispatch(dispatch) {
  return {
    deleteInvoice: (id) => dispatch(deleteInvoice(id))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Invoices)