import {combineReducers} from 'redux'
import customersReducer from './customers'
import productsReducer from './products'
import invoicesReducer from './invoices'
import invoiceItemsReducer from './invoiceItems'

export default combineReducers({
  customers: customersReducer,
  products: productsReducer,
  invoices: invoicesReducer,
  invoiceItems: invoiceItemsReducer
})