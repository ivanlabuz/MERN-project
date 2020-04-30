import { CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from './actionTypes'

export function createProduct(product) {
	product.id = `${Date.now()}`
	return async dispatch => {
		dispatch({
			type: CREATE_PRODUCT,
			product
		})
	}
}

export function editProduct(id, product) {
	return async dispatch => {
		dispatch({
			type: EDIT_PRODUCT,
			id, product
		})
	}
}

export function deleteProduct(id) {
	return async dispatch => {
		dispatch({
			type: DELETE_PRODUCT,
			id
		})
	}
}