import { DELETE_INVOICE } from './actionTypes'

export function deleteInvoice(id) {
	return async dispatch => {
		dispatch({
			type: DELETE_INVOICE,
			id
		})
	}
}