import { DELETE_INVOICE, CREATE_INVOICE, EDIT_INVOICE } from "../actions/actionTypes"

const initialState = {
	list: []
}

export default function invoicesReducer(state = initialState, action) {

	const removeInvoice = (array, action) => {
		return array.filter((item) => item.id !== action.id)
	}

	const editInvoice = (array, action) => {
		return array.map((item) => {
			if (item.id !== action.invoice.id) {
				return item
			}
			return {
				...item,
				...action.invoice
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
		default:
			return state
	}
}

