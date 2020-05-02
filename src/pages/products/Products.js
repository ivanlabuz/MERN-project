import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import './Products.css'
import { Helmet } from 'react-helmet'
import { CreateModal } from './createModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import {
	createProduct,
	editProduct,
	deleteProduct
} from '../../store/actions/products'
import { connect } from 'react-redux'

const Products = ({ createProduct, deleteProduct, editProduct, products }) => {
	const [currentId, setCurrentId] = useState(null)
	const [currentName, setCurrentName] = useState(null);
	const [currentPrice, setCurrentPrice] = useState(null);
	const [showCreate, setShowCreate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const handleCloseCreate = () => setShowCreate(false);

	const handleShowCreate = () => setShowCreate(true);

	const handleCloseEdit = () => setShowEdit(false);

	const handleShowEdit = (id, name, price) => {
		setCurrentId(id)
		setCurrentName(name)
		setCurrentPrice(price)
		setShowEdit(true);
	}

	const handleCloseDelete = (id) => {
		setCurrentId(null);
		setShowDelete(false);
	}

	const handleShowDelete = (id, name) => {
		setCurrentName(name)
		setShowDelete(true);
		setCurrentId(id);
	}

	const productsList = (array) => {
		if (array.length) {
			return <Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{array.map((product, index) => (
						<tr key={product.id}>
							<td>{index + 1}</td>
							<td>{product.name}</td>
							<td
								className='EditProductsList'
							>
								{product.price}
								<div>
									<i
										className="fa fa-pencil"
										aria-hidden="true"
										onClick={() => {
											handleShowEdit(product.id, product.name, product.price)
										}}
									></i>&nbsp;
                        <i
										className="fa fa-trash"
										aria-hidden="true"
										onClick={() => handleShowDelete(product.id, product.name)}
									></i>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		} else {
			return <h2 style={{ textAlign: 'center', paddingTop: '50px' }}>
				No products, create new products.
			</h2 >
		}
	}

	const productDelete = id => {
		deleteProduct(id)
	}

	const productEdit = (id, product) => {
		editProduct(id, product)
	}

	const newProduct = product => {
		createProduct(product)
	}

	return (
		<div className='Product' >
			<h1 >Product list</h1>
			<Button
				variant="outline-dark"
				onClick={handleShowCreate}
			>Create</Button>
			{productsList(products)}
			<CreateModal
				handleCloseCreate={handleCloseCreate}
				newProduct={newProduct}
				showCreate={showCreate}
			/>
			<DeleteModal
				handleCloseDelete={handleCloseDelete}
				productDelete={productDelete}
				showDelete={showDelete}
				id={currentId}
				name={currentName}
			/>
			<EditModal
				handleCloseEdit={handleCloseEdit}
				showEdit={showEdit}
				productEdit={productEdit}
				id={currentId}
				name={currentName}
				price={currentPrice}
			/>
			<Helmet>
				<title>Products</title>
			</Helmet>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		products: state.products.list
	}
}

function mapStateToDispatch(dispatch) {
	return {
		createProduct: (product) => dispatch(createProduct(product)),
		editProduct: (id, product) => dispatch(editProduct(id, product)),
		deleteProduct: (id) => dispatch(deleteProduct(id))
	}
}


export default connect(mapStateToProps, mapStateToDispatch)(Products)