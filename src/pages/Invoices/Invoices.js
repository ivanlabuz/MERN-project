import React, { useState, useEffect } from 'react'
import './Invoices.css'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { DeleteModal } from './DeleteModal'
import { deleteInvoice, getInvoices } from '../../store/actions/invoices'
import { Loading } from '../../components/loading/loading'
import { NavLink } from 'react-router-dom'

const Invoices = ({
  customers,
  products,
  deleteInvoice,
  invoices,
  getInvoices }) => {

  useEffect(() => {
    getInvoices().finally(
      setTimeout(setIsLoading, 1000, false)
    )
    // eslint-disable-next-line
  }, [])

  const [currentInvoice, setCurrentInvoice] = useState({
    _id: null,
    name: null
  })
  const [isLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = (_id) => {
    setCurrentInvoice((prevState) => ({
      ...prevState,
      _id: null
    }))
    setShowDelete(false);
  }

  const handleShowDelete = (_id, name) => {
    setCurrentInvoice({ _id, name })
    setShowDelete(true);
  }

  let customerName = (customer_id) => {
    let customer = customers.find(item => item._id === customer_id)

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
              <tr key={invoice._id}>
                <td>{index + 1}</td>
                <td>{customerName(invoice.customer_id)}</td>
                <td>{invoice.discount}</td>
                <td
                  className='EditInvoicesList'
                >
                  {invoice.total}
                  <div>
                    <NavLink to={`/Invoices/Invoice/${invoice._id}`} >
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                      ></i>
                    </NavLink>&nbsp;
                            <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        handleShowDelete(invoice._id, invoice.name)
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

  const invoiceDelete = _id => {
    let arrayInvoiceItems = invoices.find(i => i._id === _id).invoiceItems
    deleteInvoice(_id, arrayInvoiceItems)
  }

  return (
    <div className='Invoices' >
      <h1 >Invoices list</h1>
      <NavLink to='/Invoices/Invoice'>
        <Button
          variant="outline-dark"
        >Create</Button>
      </NavLink>
      {
        isLoading
          ? <Loading />
          : invoicesList(invoices)}
      <DeleteModal
        handleCloseDelete={handleCloseDelete}
        invoiceDelete={invoiceDelete}
        showDelete={showDelete}
        _id={currentInvoice._id}
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
    invoices: state.invoices.list,
  }
}

function mapStateToDispatch(dispatch) {
  return {
    deleteInvoice: (_id, arrayInvoiceItems) => dispatch(deleteInvoice(_id, arrayInvoiceItems)),
    getInvoices: () => dispatch(getInvoices())
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Invoices)