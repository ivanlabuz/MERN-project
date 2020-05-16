import {
	CREATE_INVOICE_ITEMS,
	DELETE_INVOICE_ITEMS,
	EDIT_INVOICE_ITEM
} from '../actions/actionTypes'

const initialState = {
	list: []
}

export default function invoiceItemsReducer(state = initialState, action) {

	const removeInvoiceItems = (invoicesItemsArray, action) => {
		return invoicesItemsArray.filter((item) => !action.arrayId.includes(item.id))
	}

	const editInvoiceItems = (invoicesItemsArray, action) => {
		return invoicesItemsArray.map((item) => {
			if (item.id !== action.invoiceItem.id) {
				return item
			}
			return {
				...item,
				...action.invoiceItem
			}
		})
	}

	switch (action.type) {
		case CREATE_INVOICE_ITEMS:
			return {
				...state,
				list: [...state.list, ...action.arr]
			}
		case DELETE_INVOICE_ITEMS:
			return {
				...state,
				list: removeInvoiceItems(state.list, action)
			}
		case EDIT_INVOICE_ITEM:
			return {
				...state,
				list: editInvoiceItems(state.list, action)
			}
		default:
			return state
	}
}