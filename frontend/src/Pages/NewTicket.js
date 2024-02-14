import { useState, useEffect } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Loader from '../Components/GlobalComponents/Loader'

function NewTicket() {

	const { user } = useSelector(state => state.auth)
	const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	/**Initial state */
	const [name] = useState(user.name)
	const [email] = useState(user.email)
	const [product, setProduct] = useState('iPhone')
	const [description, setDescription] = useState('')

	/**Lifecycle method */
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		//Redirect when submit the ticket without error
		if (isSuccess) {
			dispatch(reset())
			toast.success('Ticket created successfully')
			navigate('/tickets')
		}
		//Reset all the fields 
		dispatch(reset())
	}, [isError, isSuccess, message, navigate, dispatch])

	function onHandleSubmit(e) {
		e.preventDefault()
		dispatch(createTicket({ product, description }))
	}

	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading ?
					<Loader />
					:
					<Card className='border-light-subtle shadow-sm'>
						<Card.Body className='p-3 p-md-4 p-xl-5'>
							<Button as={Link} to='/' variant="link" className="icon-link icon-link-hover d-inline-flex align-items-center lh-1 text-decoration-none gap-1 text-dark fw-semibold p-0 mb-3 mb-md-0">
								<i className='bi bi-arrow-left'></i>
								Back
							</Button>
							<h1 className='text-center'>Create new ticket</h1>
							<p className='text-center'>Please fill out the form below</p>
							<Form onSubmit={onHandleSubmit}>
								<Form.Group className="mb-3" controlId="name">
									<Form.Label>Customer name</Form.Label>
									<Form.Control
										type="text"
										disabled
										readOnly
										value={name}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Customer email</Form.Label>
									<Form.Control
										type="text"
										disabled
										readOnly
										value={email}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="product">
									<Form.Label>Product</Form.Label>
									<Form.Select name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
										<option>Select the option</option>
										<option value="iPhone">iPhone</option>
										<option value="MacBook Pro">Macbook Pro</option>
										<option value="iMac">iMac</option>
										<option value="iPad">iPad</option>
									</Form.Select>
								</Form.Group>
								<Form.Group className="mb-3" controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control as="textarea" required rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
								</Form.Group>
								<Button type='submit' className="mx-auto d-block">Submit</Button>
							</Form>
						</Card.Body>
					</Card>
				}
			</Container>
		</section>
	)
}

export default NewTicket