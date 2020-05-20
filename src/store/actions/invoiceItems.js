import {
	CREATE_INVOICE,
	CREATE_INVOICE_ITEMS,
	EDIT_INVOICE,
	DELETE_INVOICE_ITEMS,
	EDIT_INVOICE_ITEM,
	GET_PRODUCTS,
	GET_INVOICE_ITEMS
} from './actionTypes'
import axios from 'axios'

export function getInvoiceItems(_id) {
	return async dispatch => {
		try {
			const productsList = await axios.get('/products')
			dispatch({
				type: GET_PRODUCTS,
				productsList: productsList.data
			})
			if (_id) {
				const invoiceItemsList = await axios.get(`/invoices/${_id}/items`)
				await dispatch({
					type: GET_INVOICE_ITEMS,
					invoiceItemsList: invoiceItemsList.data
				})
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export function createInvoiceAndItems(invoice, invoiceItems) {
	return async dispatch => {
		try {
			const newInvoice = await axios.post('/invoices', { ...invoice })
			dispatch({
				type: CREATE_INVOICE,
				invoice: newInvoice.data
			})
			const arr = []
			async function addeditems() {
				for (const invoiceItem of invoiceItems) {
					let newInvoiceitem = await axios
						.post(`/invoices/${newInvoice.data._id}/items`, { ...invoiceItem })
					arr.push(newInvoiceitem.data)
				}
			}
			addeditems()
			dispatch({
				type: CREATE_INVOICE_ITEMS,
				arr
			})
		} catch (error) {
			console.error(error)
		}
	}
}

export function editInvoiceAndItems(invoice, invoiceItems) {
	return async dispatch => {
		try {
			const editInvoice = await axios
				.put(`/invoices/${invoice._id}`, { ...invoice })
			dispatch({
				type: EDIT_INVOICE,
				editInvoice: editInvoice.data
			})
			let arr = []
			let editItems = {}
			for (const invoiceItem of invoiceItems) {
				if (invoiceItem._id) {
					editItems = await axios
						.put(`/invoices/${invoiceItem.invoice_id}/items/${invoiceItem._id}`, { ...invoiceItem })
					dispatch({
						type: EDIT_INVOICE_ITEM,
						editItems: editItems.data
					})
				} else {
					let newInvoiceitem = axios
						.post(`/invoices/${invoice._id}/items`, { ...invoiceItem })
					arr.push(newInvoiceitem.data)
					dispatch({
						type: CREATE_INVOICE_ITEMS,
						arr
					})
				}
			}
		} catch (error) {
			console.error(error)
		}
	}
}


export function removeInvoiceItems(invoiceID, arrayId) {
	return dispatch => {
		try {
			async function deleteItems() {
				for (const itemsId of arrayId) {
					await axios.delete(`/invoices/${invoiceID}/items/${itemsId}`)
				}
			}
			deleteItems()
			dispatch({
				type: DELETE_INVOICE_ITEMS,
				arrayId
			})
		} catch (error) {
			console.error(error)
		}
	}
}