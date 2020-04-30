import { CREATE_INVOICE_ITEMS, DELETE_INVOICE_ITEMS, EDIT_INVOICE_ITEM } from '../actions/actionTypes'

const initialState = {
	list: [
		{
			id: '5515851588',
			invoice_id: '8596',
			product_id: '256',
			quantity: 2
		},
		{
			id: '916296',
			invoice_id: '8596',
			product_id: '184',
			quantity: 5
		},
		{
			id: '8125632',
			invoice_id: '7856',
			product_id: '295',
			quantity: 3
		}
	]
}

export default function invoiceItemsReducer(state = initialState, action) {

	const removeInvoiceItems = (array, action) => {
		return array.filter((item) => !action.arrayId.includes(item.id))
	}

	const editInvoiceItems = (array, action) => {
		return array.map((item) => {
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