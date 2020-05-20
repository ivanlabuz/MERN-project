import {
  CREATE_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMERS
} from './actionTypes'
import axios from 'axios'

export function getCustomers() {
  return async dispatch => {
    try {
      let customersList = await axios.get('/customers/')
      dispatch({
        type: GET_CUSTOMERS,
        customersList: customersList.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function createCustomer(customer) {
  return async dispatch => {
    try {
      const newCustomer = await axios.post('/customers/', { ...customer })
      dispatch({
        type: CREATE_CUSTOMER,
        customer: newCustomer.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function editCustomer(_id, customer) {
  return async dispatch => {
    try {
      const modifiedCustomer = await axios
        .put(`/customers/${_id}`, { ...customer })
      dispatch({
        type: EDIT_CUSTOMER,
        customer: modifiedCustomer.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteCustomer(_id) {
  return async dispatch => {
    try {
      await axios.delete(`/customers/${_id}`)
      dispatch({
        type: DELETE_CUSTOMER,
        _id
      })
    } catch (error) {
      console.error(error)
    }
  }
}