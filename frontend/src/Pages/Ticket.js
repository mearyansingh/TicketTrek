import React, { useEffect, useRef } from 'react'
import { Container, Card, Button, Badge, } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import Loader from '../Components/GlobalComponents/Loader'
import { getNotes, createNote } from '../features/notes/noteSlice'
import NoteItem from '../Components/AppComponents/NoteItem'
import { AddNotePopup, PopupContainer, ListEmptyPlaceholder } from "../Components/GlobalComponents";

function Ticket() {

	const { ticket, isLoading, isError, message } = useSelector(state => state.ticket)
	const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { ticketId } = useParams()

	/*** Stateless variables */
	const _addNotePopup = useRef(null);

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))

	}, [isError, message, dispatch, ticketId])

	//Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId))
		toast.success('Ticket closed successfully')
		navigate('/tickets')
	}

	const handleAddNote = (data) => {
		const { noteText } = data
		dispatch(createNote({ noteText, ticketId }))
	}

	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				{isLoading || notesIsLoading ?
					<Loader />
					:
					<>
						{isError ?
							<ListEmptyPlaceholder message={message} />
							:
							<>
								<Card className="mb-4 custom-animate-fadeup border-light-subtle shadow-sm">
									<Card.Body className='p-3 p-md-4 p-xl-5'>
										<Button as={Link} to='/tickets' variant="link" className="icon-link icon-link-hover d-inline-flex align-items-center lh-1 text-decoration-none gap-1 text-dark fw-semibold p-0 mb-3 mb-md-0">
											<i className='bi bi-arrow-left'></i>
											Back
										</Button>
										<div className='mt-3 mt-md-4 mt-xl-5'>
											<div className='d-md-flex align-items-center gap-2 mb-3'>
												<p className='fw-bold mb-0'>Ticket ID:</p>
												<span>{ticket._id}</span>
												<span className='ms-2 ms-md-0'>
													<Badge bg={`${ticket.status === "new" ? "success" : "danger"}`} className='fw-semibold'>{ticket.status}</Badge>
												</span>
											</div>
											<div className='d-md-flex align-items-center gap-2 mb-3'>
												<p className='fw-bold mb-0'>Date Submitted:</p>
												<span>{new Date(ticket.createdAt).toLocaleString('en-IN')}</span>
											</div>
											<div className='d-md-flex align-items-center gap-2 mb-3'>
												<p className='fw-bold mb-0'>product:</p>
												<span>{ticket.product}</span>
											</div>
											<div className=''>
												<p className='fw-bold mb-0'>Description of issue:</p>
												<span>{ticket.description}</span>
											</div>
											{ticket.status !== 'closed' &&
												<Button variant='danger' className='d-block mx-auto mt-3' type="button" onClick={onTicketClose}>Close Ticket</Button>
											}
										</div>
									</Card.Body>
								</Card>
								<Card className="custom-animate-fadeup border-light-subtle shadow-sm">
									<Card.Header className='px-3 px-md-4 px-xl-5 py-4 d-flex align-items-center justify-content-between border-bottom-0'>
										<h2 className='mb-0'>Notes</h2>
										{ticket.status !== 'closed' &&
											<Button type="button" aria-label="Add note" variant="primary" className="" onClick={() => _addNotePopup.current.showModal()}>
												<i className="me-1 bi bi-journal-text" />
												Add Note
											</Button>
										}</Card.Header>
									<Card.Body className='p-3 p-md-4 p-xl-5 notes-body-scroll'>
										{notes.map((note) => (
											<NoteItem key={note._id} note={note} />
										))}
									</Card.Body>
								</Card>
							</>
						}
					</>
				}
			</Container >
			<PopupContainer
				ref={_addNotePopup}
				title="Add Note"
				subTitle="this is subtitle"
				dialogClassName="custom-popup--sm modal-dialog-sm-end"
				isHeader={true}
			>
				<AddNotePopup
					callback={(status, data) => {
						_addNotePopup.current.closeModal();
						if (status && data) {
							//remaining code
							handleAddNote(data)
						}
					}}
				/>
			</PopupContainer>
		</section >
	)
}

export default Ticket