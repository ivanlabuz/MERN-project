import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import './Invoice.css'
import { Loading } from '../../components/loading/loading'
import invoiceHoc from './invoiceHoc'
import {
	createInvoiceAndItems,
	editInvoiceAndItems,
	removeInvoiceItems,
	getInvoiceItems
} from '../../store/actions/invoiceItems'

const Invoice = ({
	title,
	selectProductOptions,
	selectCustomerOptions,
	invoiceItemsList,
	total,
	newInvoice,
	titleButton,
	handleChangeDiscount,
	handleChangeCustomer,
	handleAddInvoiceItem,
	handleChangeProduct,
	hendlersAddAllStore,
	selectProduct,
	isLoading
}) => {
	return <div className='Invoice'>
		<h1>{title}</h1>
		<label htmlFor="basic-url">Discount (%)</label>
		<InputGroup
			className="mb-3"
			style={{ width: '200px' }}
		>
			<FormControl
				placeholder='enter...'
				id="basic-url"
				aria-describedby="basic-addon3"
				type='number'
				min='0'
				max='99'
				value={newInvoice.discount ?? ''}
				onChange={(event) => { handleChangeDiscount(event) }}
			/>
		</InputGroup>
		<Form className='customerSelect'>
			<Form.Group controlId="exampleForm.SelectCustom">
				<Form.Label>Customer</Form.Label>
				<Form.Control
					as="select"
					value={newInvoice.customer_id}
					onChange={(event) => handleChangeCustomer(event)}
					custom>
					<option value='' disabled>select...</option>
					{selectCustomerOptions()}
				</Form.Control>
			</Form.Group>
		</Form>
		<Form className='productSelect' style={{ display: 'block' }}>
			<Form.Group controlId="exampleForm.SelectCustom1">
				<Form.Label>Add product</Form.Label>
				<div style={{ display: 'flex' }}>
					<Form.Control
						as="select"
						defaultValue='select...'
						onChange={(event) => handleChangeProduct(event)}
						custom
					>
						<option disabled>select...</option>
						{selectProductOptions()}
					</Form.Control>&nbsp;
          <Button
						variant="outline-dark"
						style={{ display: 'block' }}
						onClick={handleAddInvoiceItem}
						disabled={selectProduct === ''}
					>
						Add
          </Button>
				</div>
			</Form.Group>
		</Form>
		{
			isLoading
				? <Loading />
				: invoiceItemsList()}
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<h1>Total:{total}</h1>
			<Button
				variant="outline-dark"
				style={{ display: 'block' }}
				onClick={hendlersAddAllStore}
				disabled={
					!newInvoice.discount ||
					newInvoice.customer_id === 'select...' ||
					total === '0.00'
				}
			>
				{titleButton}
			</Button>
		</div>
		<Helmet>
			<title>{title}</title>
		</Helmet>
	</div>
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
		createInvoiceAndItems: (invoice, invoiceItems) =>
			dispatch(createInvoiceAndItems(invoice, invoiceItems)),
		editInvoiceAndItems: (invoice, invoiceItems) =>
			dispatch(editInvoiceAndItems(invoice, invoiceItems)),
		removeInvoiceItems: (arrayId) => dispatch(removeInvoiceItems(arrayId)),
		getInvoiceItems: (_id) => dispatch(getInvoiceItems(_id))
	}
}

export default connect(
	mapStateToProps,
	mapStateToDispatch
)(invoiceHoc(Invoice))