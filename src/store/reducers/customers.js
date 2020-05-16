import { CREATE_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER } from '../actions/actionTypes'

const initialState = {
	list: []
}

export default function customersReducer(state = initialState, action) {

	const removeCustomer = (array, action) => {
		return array.filter((item) => item.id !== action.id)
	}

	const editCustomer = (array, action) => {
		return array.map((item) => {
			if (item.id !== action.id) {
				return item
			}
			return {
				...item,
				...action.customer
			}
		})
	}

	switch (action.type) {
		case CREATE_CUSTOMER:
			return {
				...state,
				list: [...state.list, action.customer]
			}
		case EDIT_CUSTOMER:
			return {
				...state,
				list: editCustomer(state.list, action)
			}
		case DELETE_CUSTOMER:
			return {
				...state,
				list: removeCustomer(state.list, action)
			}
		default:
			return state
	}
}

