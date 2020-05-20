import {
	DELETE_INVOICE,
	CREATE_INVOICE,
	EDIT_INVOICE,
	GET_INVOICES
} from "../actions/actionTypes"

const initialState = {
	list: []
}

export default function invoicesReducer(state = initialState, action) {

	const removeInvoice = (invoicesArray, action) => {
		return invoicesArray.filter((item) => item._id !== action._id)
	}

	const editInvoice = (invoicesArray, action) => {
		return invoicesArray.map((item) => {
			if (item._id !== action.editInvoice._id) {
				return item
			}
			return {
				...item,
				...action.editInvoice
			}
		})
	}

	switch (action.type) {
		case CREATE_INVOICE:
			return {
				...state,
				list: [...state.list, action.invoice]
			}
		case EDIT_INVOICE:
			return {
				...state,
				list: editInvoice(state.list, action)
			}
		case DELETE_INVOICE:
			return {
				...state,
				list: removeInvoice(state.list, action)
			}
		case GET_INVOICES:
			return {
				...state,
				list: action.invoicesList
			}
		default:
			return state
	}
}

