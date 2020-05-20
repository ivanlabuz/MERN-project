import {
	CREATE_PRODUCT,
	EDIT_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCTS
} from '../actions/actionTypes'

const initialState = {
	list: []
}

export default function productsReducer(state = initialState, action) {

	const removeProduct = (productsArray, action) => {
		return productsArray.filter((item) => item._id !== action._id)
	}

	const editProduct = (productsArray, action) => {
		return productsArray.map((item) => {
			if (item._id !== action.product._id) {
				return item
			}
			return {
				...item,
				...action.product
			}
		})
	}

	switch (action.type) {
		case CREATE_PRODUCT:
			return {
				...state,
				list: [...state.list, action.product]
			}
		case EDIT_PRODUCT:
			return {
				...state,
				list: editProduct(state.list, action)
			}
		case DELETE_PRODUCT:
			return {
				...state,
				list: removeProduct(state.list, action)
			}
		case GET_PRODUCTS:
			return {
				...state,
				list: action.productsList
			}
		default:
			return state
	}
}