import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import './Products.css'
import { Helmet } from 'react-helmet'
import { CreateModal } from './createModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import { Loading } from '../../components/loading/loading'
import {
	createProduct,
	editProduct,
	deleteProduct,
	getProducts
} from '../../store/actions/products'
import { connect } from 'react-redux'

const Products = ({
	createProduct,
	deleteProduct,
	editProduct,
	products,
	getProducts }) => {

	useEffect(() => {
		getProducts().finally(
			setIsLoading(false)
		)
		// eslint-disable-next-line
	}, [])

	const [currentId, setCurrentId] = useState(null)
	const [currentName, setCurrentName] = useState(null);
	const [currentPrice, setCurrentPrice] = useState(null);
	const [showCreate, setShowCreate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleCloseCreate = () => setShowCreate(false);

	const handleShowCreate = () => setShowCreate(true);

	const handleCloseEdit = () => setShowEdit(false);

	const handleShowEdit = (_id, name, price) => {
		setCurrentId(_id)
		setCurrentName(name)
		setCurrentPrice(price)
		setShowEdit(true);
	}

	const handleCloseDelete = (_id) => {
		setCurrentId(null);
		setShowDelete(false);
	}

	const handleShowDelete = (_id, name) => {
		setCurrentName(name)
		setShowDelete(true);
		setCurrentId(_id);
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
						<tr key={product._id}>
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
											handleShowEdit(product._id, product.name, product.price)
										}}
									></i>&nbsp;
                        <i
										className="fa fa-trash"
										aria-hidden="true"
										onClick={() => handleShowDelete(product._id, product.name)}
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

	const productDelete = _id => {
		deleteProduct(_id)
	}

	const productEdit = (_id, product) => {
		editProduct(_id, product)
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
			{
				isLoading
					? <Loading />
					: productsList(products)}
			<CreateModal
				handleCloseCreate={handleCloseCreate}
				newProduct={newProduct}
				showCreate={showCreate}
			/>
			<DeleteModal
				handleCloseDelete={handleCloseDelete}
				productDelete={productDelete}
				showDelete={showDelete}
				_id={currentId}
				name={currentName}
			/>
			<EditModal
				handleCloseEdit={handleCloseEdit}
				showEdit={showEdit}
				productEdit={productEdit}
				_id={currentId}
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
		editProduct: (_id, product) => dispatch(editProduct(_id, product)),
		deleteProduct: (_id) => dispatch(deleteProduct(_id)),
		getProducts: () => dispatch(getProducts())
	}
}

export default connect(mapStateToProps, mapStateToDispatch)(Products)