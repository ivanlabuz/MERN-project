import {CREATE_PRODUCT,EDIT_PRODUCT, DELETE_PRODUCT} from '../actions/actionTypes'

const initialState = {
	list:[
		{   
			id: '256',
			name: 'Parachute Pants',
			price: 29.99
		},
		{   
			id: '573',
			name: 'Phone Holder',
			price: 9.99
		},
		{   
			id: '784',
			name: 'Pet Rock',
			price: 5.99
		},
		{   
			id: '184',
			name: 'Egg Timer',
			price: 15.99
		},
		{   
			id: '295',
			name: 'Neon Green Hat',
			price: 21.99
		}
	]
}

export default function  productsReducer(state = initialState, action) {

	const  removeProduct = (array, action) => {
		return array.filter((item) => item.id !== action.id)
	}

	const editProduct = (array, action) => {
		return array.map((item) => {
			if (item.id !== action.id) {
				return item
			}
			return {
				...item,
				...action.product
			}
		})
	}

	switch(action.type){
		case CREATE_PRODUCT:
			return{
				...state,
				list: [...state.list, action.product]
			}
		case EDIT_PRODUCT:
			return{
				...state,
				list: editProduct(state.list, action)
			}
		case DELETE_PRODUCT:
			return{
				...state,
				list: removeProduct(state.list, action)
			}
		default:
			return state
	}
}