import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Table, Button, Badge } from 'react-bootstrap'
import NoteItem from '../Components/NoteItem'
import { toast } from 'react-toastify'
import { AddNotePopup, PopupContainer } from "../Components/GlobalComponents";
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice'


function Notes() {

	const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { ticketId } = useParams()

	/*** Stateless variables */
	const _addNotePopup = useRef(null);



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
		<>
			<Card className="mb-3 custom-animate-fadeup border-light-subtle shadow-sm">
				<Card.Body className='p-3 p-md-4 p-xl-5'>
					<h2>Notes</h2>
					{notes.map((note) => (
						<>
							<NoteItem key={note._id} note={note} />
						</>
					))}
					{/* {ticket.status !== 'closed' && */}
					<Button variant='danger' className='d-block mx-auto mt-3' type="button" onClick={onTicketClose}>Close Ticket</Button>
					{/* // } */}
					{/* {ticket.status !== 'closed' && */}
					<Button type="button" aria-label="Add note" variant="primary" className="me-md-20 w-100-md mb-15 mb-md-0" onClick={() => _addNotePopup.current.showModal({ ticketId })}>
						<i className="me-10 bi bi-person-plus" />
						Add Note
					</Button>
					{/* } */}
				</Card.Body>
			</Card>
			<PopupContainer
				ref={_addNotePopup}
				contentClassName="custom-popup--sm"
				title="Add Note"
				subTitle="this is subtitle"
				dialogClassName="modal-dialog-sm-end"
				icon="bi-person-add"
				isHeader={true}
			>
				<AddNotePopup
					popupRef={_addNotePopup}
					callback={(status, data) => {
						_addNotePopup.current.closeModal();
						if (status && data) {
							handleAddNote(data)
						}
					}}
				/>
			</PopupContainer>
		</>
	)
}

export default Notes