import {
	CREATE_CUSTOMER,
	EDIT_CUSTOMER,
	DELETE_CUSTOMER
} from '../actions/actionTypes'

const initialState = {
	list: [
		{
			id: '100',
			name: 'Mark',
			address: 'Otto',
			phone: '555-222'
		},
		{
			id: '200',
			name: 'Jacob',
			address: 'Thornton',
			phone: '555-1111'
		},
		{
			id: '300',
			name: 'Ivan',
			address: 'Taganrog',
			phone: '555-9999'
		}
	]
}

export default function customersReducer(state = initialState, action) {

	const removeCustomer = (CustomersArray, action) => {
		return CustomersArray.filter((item) => item.id !== action.id)
	}

	const editCustomer = (CustomersArray, action) => {
		return CustomersArray.map((item) => {
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

