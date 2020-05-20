import {
	CREATE_CUSTOMER,
	EDIT_CUSTOMER,
	DELETE_CUSTOMER,
	GET_CUSTOMERS
} from '../actions/actionTypes'

const initialState = {
	list: []
}

export default function customersReducer(state = initialState, action) {

	const removeCustomer = (CustomersArray, action) => {
		return CustomersArray.filter((item) => item._id !== action._id)
	}

	const editCustomer = (CustomersArray, action) => {
		return CustomersArray.map((item) => {
			if (item._id !== action.customer._id) {
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
		case GET_CUSTOMERS:
			return {
				...state,
				list: action.customersList
			}
		default:
			return state
	}
}

