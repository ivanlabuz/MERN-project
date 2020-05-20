import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default (WrappedComponent) => {
	return ({
		match,
		invoices,
		invoiceItems,
		customers,
		products,
		editInvoiceAndItems,
		removeInvoiceItems,
		createInvoiceAndItems,
		history,
		getInvoiceItems,
		...props
	}) => {

		useEffect(() => {
			getInvoiceItems(invoiceId).finally(
				setIsLoading(false)
			)
			// eslint-disable-next-line 
		}, [])

		useEffect(() => {
			if (match.params.id) {
				setNewInvoiceItem(invoiceItems ?? [])
			} else {
				setNewInvoiceItem([])
			}
			// eslint-disable-next-line
		}, [invoiceItems])

		let invoiceId = match.params.id

		const invoice = invoices.find(i => i._id === invoiceId) ??
		{
			_id: '',
			customer_id: '',
			discount: null,
			total: null
		}

		const [newInvoice, setNewInvoice] = useState({})
		const [newInvoiceItem, setNewInvoiceItem] = useState([])
		const [selectProduct, setSelectProduct] = useState('')
		const [isLoading, setIsLoading] = useState(true);
		const [idDeletedItem, setIdDeletedItem] = useState([])

		useEffect(() => {
			setNewInvoice((prevState) => ({
				...prevState,
				total: totalWithDiscount()
			}))
			// eslint-disable-next-line 
		}, [newInvoice.discount, newInvoiceItem])

		useEffect(() => {
			setNewInvoice(invoice)
			// eslint-disable-next-line 
		}, [])

		const handleChangeDiscount = (event) => {
			let value = event.target.value
			setNewInvoice((prevState) => ({
				...prevState,
				discount: value
			}))
		}

		const handleChangeProduct = (event) => {
			setSelectProduct(event.target.value)
		}

		const handleChangeCustomer = (event) => {
			let value = event.target.value
			setNewInvoice((prevState) => ({
				...prevState,
				customer_id: value,
			}))
		}

		let deleteInvoiceItems = (indexCurrent, currentIdDeletedItem) => {
			setNewInvoiceItem(newInvoiceItem.filter((item, index) => {
				return index !== indexCurrent
			}))
			setIdDeletedItem([...idDeletedItem, currentIdDeletedItem])
		}

		const handleAddInvoiceItem = () => {
			setNewInvoiceItem(
				[...newInvoiceItem, {
					product_id: selectProduct,
					quantity: 1
				}]
			)
		}

		const selectOptions = (array) => {
			return array.map((item, index) => (
				<option key={index} value={item._id}>{item.name}</option>
			))
		}

		const selectCustomerOptions = () => {
			return selectOptions(customers ?? [])
		}

		const selectProductOptions = () => {
			return selectOptions(products ?? [])
		}

		let invoiceItemName = (product_id) => {
			return products.find((item) => item._id === product_id).name
		}

		let invoiceItemPrice = (product_id) => {
			return products.find((item) => item._id === product_id).price
		}

		const handleEditInvoiceItem = (
			_id,
			product_id,
			invoice_id,
			indexCurrent,
			event
		) => {
			let invoiceItem =
			{
				_id,
				invoice_id,
				product_id,
				quantity: event.target.value
			}
			setNewInvoiceItem(newInvoiceItem.map((item, index) => {
				if (index !== indexCurrent) {
					return item
				}
				return {
					...item,
					...invoiceItem
				}
			})
			)
		}

		const invoiceItemsList = () => {
			let arrayFilter = newInvoiceItem
			if (arrayFilter.length) {
				return <Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Qty</th>
						</tr>
					</thead>
					<tbody>
						{arrayFilter.map((item, index) => (
							<tr key={index}>
								<td>{invoiceItemName(item.product_id)}</td>
								<td>{invoiceItemPrice(item.product_id)}</td>
								<td><input
									type='number'
									value={item.quantity ?? ''}
									onChange={(event) => {
										handleEditInvoiceItem(
											item._id,
											item.product_id,
											item.invoice_id,
											index, event
										)
									}}
									min='1'
								></input></td>
								<td className='trashI'><i
									className="fa fa-trash"
									aria-hidden="true"
									onClick={() => deleteInvoiceItems(index, item._id)}
								></i></td>
							</tr>
						))}
					</tbody>
				</Table>
			} else {
				return <h5 style={{ textAlign: 'center', paddingTop: '50px' }}>
					No invoices items, create new invoices items.
				</h5 >
			}
		}

		const editInvoiceAndItemsAtStore = async () => {
			await editInvoiceAndItems(newInvoice, newInvoiceItem)
			if (idDeletedItem.length) {
				await removeInvoiceItems(match.params.id, idDeletedItem)
			}
			history.push('/invoices')
		}

		const addInvoiceAndItemsAtStore = async () => {
			await createInvoiceAndItems(newInvoice, newInvoiceItem)
			history.push('/invoices')
		}

		const totalWithDiscount = () => {
			let itemSum = (newInvoiceItem.map(item => (
				invoiceItemPrice(item.product_id) * item.quantity
			)))
			let itemsTotal = itemSum.reduce((a, b) => {
				return a + b;
			}, 0)

			return (itemsTotal - ((newInvoice.discount / 100) * itemsTotal))
				.toFixed(2)
		}

		const getTitle = (_id) => (_id ? 'Edit invoice' : 'New invoice')

		const getTitleButton = (_id) => (_id ? 'Edit invoice' : 'Create invoice')

		const getHendlersAddAllStore = (_id) => (
			_id ?
				editInvoiceAndItemsAtStore
				: addInvoiceAndItemsAtStore
		)

		return <WrappedComponent
			title={getTitle(invoiceId)}
			selectCustomerOptions={selectCustomerOptions}
			selectProductOptions={selectProductOptions}
			invoiceItemsList={invoiceItemsList}
			total={totalWithDiscount()}
			newInvoice={newInvoice}
			titleButton={getTitleButton(invoiceId)}
			handleChangeDiscount={handleChangeDiscount}
			handleChangeCustomer={handleChangeCustomer}
			handleAddInvoiceItem={handleAddInvoiceItem}
			handleChangeProduct={handleChangeProduct}
			hendlersAddAllStore={getHendlersAddAllStore(invoiceId)}
			selectProduct={selectProduct}
			isLoading={isLoading}
			{...props} />
	}
}