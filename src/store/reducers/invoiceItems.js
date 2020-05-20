import {
	CREATE_INVOICE_ITEMS,
	DELETE_INVOICE_ITEMS,
	EDIT_INVOICE_ITEM,
	DELETE_INVOICE_ITEMS_WITH_INVOICE,
	GET_INVOICE_ITEMS
} from '../actions/actionTypes'

const initialState = {
	list: []
}

export default function invoiceItemsReducer(state = initialState, action) {

	const removeInvoiceItems = (invoicesItemsArray, action) => {
		return invoicesItemsArray.filter((item) => !action.arrayId.includes(item._id))
	}

	const editInvoiceItems = (invoicesItemsArray, action) => {
		return invoicesItemsArray.map((item) => {
			if (item._id !== action.editItems._id) {
				return item
			}
			return {
				...item,
				...action.editItems
			}
		})
	}

	const removeInvoiceItemsWithInvoice = (invoicesItemsArray, action) => {
		return invoicesItemsArray.filter(item => item.invoice_id !== action._id)
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
		case DELETE_INVOICE_ITEMS_WITH_INVOICE:
			return {
				...state,
				list: removeInvoiceItemsWithInvoice(state.list, action)
			}
		case GET_INVOICE_ITEMS:
			return {
				...state,
				list: action.invoiceItemsList
			}

		default:
			return state
	}
}