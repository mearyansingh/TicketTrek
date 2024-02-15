import React, { useEffect } from 'react'
import Loader from '../Components/GlobalComponents/Loader'
import { Container, Card, Table, Button, Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { Link } from 'react-router-dom'
import { Tooltip } from '../Components/GlobalComponents'
import { ListEmptyPlaceholder } from '../Components/GlobalComponents/ListEmptyPlaceholder'

function Tickets() {
	const { tickets, isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTickets())

		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading ?
					<Loader />
					:
					<>
						{isError ?
							<ListEmptyPlaceholder
								message={message}
								contentWrapperClass="w-100 px-3 px-md-0 w-50 mx-md-auto"
							/>
							:
							<Card className="mb-3 custom-animate-fadeup border-light-subtle shadow-sm">
								<Card.Body className='p-2 p-sm-3 p-md-4 p-xl-5'>
									<Button as={Link} to='/' variant="link" className="icon-link icon-link-hover d-inline-flex align-items-center lh-1 text-decoration-none gap-1 text-dark fw-semibold p-0 mb-3 mb-md-0">
										<i className='bi bi-arrow-left'></i>
										Back
									</Button>
									<h1 className='text-center'>Tickets</h1>
									<p className='text-center mb-4 mb-xl-5'>This section showcases all tickets submitted by applicants</p>
									{tickets && (tickets.length > 0) ?
										<Card className="custom-animate-fadeup border-light-subtle shadow-sm">
											<Card.Body className="p-0">
												<Table className="custom-table custom-table--hover custom-table--responsive custom-table--responsive__lg custom-table--border__x">
													<thead>
														<tr>
															<th className="w-25">Date</th>
															<th className="w-25">Product</th>
															<th className="w-25">Status</th>
															<th className="text-end w-25">Actions</th>
														</tr>
													</thead>
													<tbody>
														{tickets.map((ticket) => (
															<tr key={ticket._id}>
																<td data-label="Date">
																	<span className='text-body-secondary'>{new Date(ticket.createdAt).toLocaleString("en-IN")}</span>
																</td>
																<td data-label="Product">
																	<span className='text-body-secondary'>{ticket.product}</span>
																</td>
																<td data-label="Status">
																	<div>
																		<Badge bg={`${ticket.status === "new" ? "success" : "danger"}`} className='fw-semibold'>{ticket.status}</Badge>
																	</div>
																</td>
																<td className="text-lg-end" data-label="Actions">
																	<div className='custom-table-action-wrap'>
																		<Tooltip content="View ticket">
																			<Button as={Link} to={`/ticket/${ticket._id}`} data-label="View Ticket" variant='link' className='text-decoration-none custom-table-action'><i className='bi bi-eye fs-5 text-body-secondary'></i></Button>
																		</Tooltip>
																	</div>
																</td>
															</tr>
														))}
													</tbody>
												</Table>
											</Card.Body>
										</Card>
										:
										<ListEmptyPlaceholder
											message="Currently, you have not reported any ticket"
											contentWrapperClass="w-100 px-3 px-md-0 w-50 mx-md-auto"
										/>
									}
								</Card.Body>
							</Card>
						}
					</>
				}
			</Container>
		</section>
	)
}

export default Tickets