import React, { useState } from 'react'
import './Invoices.css'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { DeleteModal } from './DeleteModal'
import { deleteInvoice } from '../../store/actions/invoices'
import { NavLink } from 'react-router-dom'

const Invoices = ({ customers, deleteInvoice, invoices }) => {
  const [currentInvoice, setCurrentInvoice] = useState({
    id: null,
    name: null
  })
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = (id) => {
    setCurrentInvoice((prevState) => ({
      ...prevState,
      id: null
    }))
    setShowDelete(false);
  }

  const handleShowDelete = (id, name) => {
    setCurrentInvoice({ id, name })
    setShowDelete(true);
  }

  let customerName = (customer_id) => {
    let customer = customers.find((item) => item.id === customer_id)
    if (customer) {
      return customer.name
    }
  }

  const invoicesList = (array) => {
    if (array.length) {
      return <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {array.map((invoice, index) => {
            return (
              <tr key={invoice.id}>
                <td>{index + 1}</td>
                <td>{customerName(invoice.customer_id)}</td>
                <td>{invoice.discount}</td>
                <td
                  className='EditInvoicesList'
                >
                  {invoice.total}
                  <div>
                    <NavLink to={`/Invoices/Invoice/${invoice.id}`} >
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                      ></i>
                    </NavLink>&nbsp;
                            <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        handleShowDelete(invoice.id, invoice.name)
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    } else {
      return <h2 style={{ textAlign: 'center', paddingTop: '50px' }}>
        No invoices, create new invoices.
      </h2 >
    }
  }

  const invoiceDelete = id => {
    deleteInvoice(id)
  }

  return (
    <div className='Invoices' >
      <h1 >Invoices list</h1>
      <NavLink to='/Invoices/Invoice'>
        <Button
          variant="outline-dark"
        >Create</Button>
      </NavLink>
      {invoicesList(invoices)}
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        invoiceDelete={invoiceDelete}
        showDelete={showDelete}
        id={currentInvoice.id}
        name={currentInvoice.name}
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