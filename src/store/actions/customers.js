import { CREATE_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER } from './actionTypes'

export function createCustomer(customer) {
  customer.id = `${Date.now()}`
  return async dispatch => {
    dispatch({
      type: CREATE_CUSTOMER,
      customer
    })
  }
}

export function editCustomer(id, customer) {
  return async dispatch => {
    dispatch({
      type: EDIT_CUSTOMER,
      id, customer
    })
  }
}

export function deleteCustomer(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_CUSTOMER,
      id
    })
  }
}