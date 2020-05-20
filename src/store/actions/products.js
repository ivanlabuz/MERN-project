import {
	CREATE_PRODUCT,
	EDIT_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCTS
} from './actionTypes'
import axios from 'axios'

export function getProducts() {
  return async dispatch => {
    try {
			const productsList = await axios.get('/products')
      dispatch({
        type: GET_PRODUCTS,
        productsList: productsList.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function createProduct(product) {
  return async dispatch => {
    try {
      const newProduct = await axios.post('/products', { ...product })
      dispatch({
        type: CREATE_PRODUCT,
        product: newProduct.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function editProduct(_id, product) {
  return async dispatch => {
    try {
      const modifiedProduct = await axios.put(`/products/${_id}`, { ...product })
      dispatch({
        type: EDIT_PRODUCT,
        product: modifiedProduct.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteProduct(_id) {
  return async dispatch => {
    try {
      await axios.delete(`/products/${_id}`)
      dispatch({
        type: DELETE_PRODUCT,
        _id
      })
    } catch (error) {
      console.error(error)
    }
  }
}