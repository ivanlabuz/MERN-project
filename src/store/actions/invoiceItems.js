import { CREATE_INVOICE, CREATE_INVOICE_ITEMS, EDIT_INVOICE, DELETE_INVOICE_ITEMS, EDIT_INVOICE_ITEM } from './actionTypes'

export function createInvoiceAndItems(invoice, invoiceItems) {
	return async dispatch => {
		invoice.id = `${Date.now()}`
		dispatch({
			type: CREATE_INVOICE,
			invoice
		})

		// eslint-disable-next-line
		invoiceItems.map(invoiceItem => {
			invoiceItem.id = `${Date.now()}`;
			invoiceItem.invoice_id = invoice.id
		})

		let arr = invoiceItems
		dispatch({
			type: CREATE_INVOICE_ITEMS,
			arr
		})
	}
}


export function editInvoiceAndItems(invoice, invoiceItems) {
	return async dispatch => {
		dispatch({
			type: EDIT_INVOICE,
			invoice
		})
		
		// eslint-disable-next-line
		invoiceItems.map(invoiceItem => {
			if (invoiceItem.id) {
				dispatch({
					type: EDIT_INVOICE_ITEM,
					invoiceItem
				})
			} else {
				invoiceItem.id = `${Date.now()}`;
				invoiceItem.invoice_id = invoice.id
				let arr = []
				arr.push(invoiceItem)
				dispatch({
					type: CREATE_INVOICE_ITEMS,
					arr
				})
			}
		})
	}
}

export function removeInvoiceItems(arrayId) {
	return async dispatch => {
		dispatch({
			type: DELETE_INVOICE_ITEMS,
			arrayId
		})
	}
}