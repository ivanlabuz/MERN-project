import {
	DELETE_INVOICE,
	DELETE_INVOICE_ITEMS_WITH_INVOICE,
	GET_INVOICES,
	GET_CUSTOMERS
} from './actionTypes'
import axios from 'axios'

export function getInvoices() {
	return async dispatch => {
		try {
			const customersList = await axios.get('/customers/')
			dispatch({
				type: GET_CUSTOMERS,
				customersList: customersList.data
			})
			const invoicesList = await axios.get('/invoices')
			dispatch({
				type: GET_INVOICES,
				invoicesList: invoicesList.data
			})
		} catch (error) {
			console.error(error)
		}
	}
}

export function deleteInvoice(_id, arrayInvoiceItems) {

	return async dispatch => {
		try {
			const promises = arrayInvoiceItems.map(i =>
				axios.delete(`/invoices/${_id}/items/${i}`)
			)
			await Promise.all(promises);
			dispatch({
				type: DELETE_INVOICE_ITEMS_WITH_INVOICE,
				_id
			})

			await axios.delete(`/invoices/${_id}`)
			dispatch({
				type: DELETE_INVOICE,
				_id
			})
		} catch (error) {
			console.error(error)
		}
	}
}
