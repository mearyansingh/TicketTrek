import React from 'react'
import { useSelector } from 'react-redux'
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
function NoteItem({ note }) {

	const { user } = useSelector((state) => state.auth)

	return (
		<Col className={`mb-3 d-flex align-items-end ${note.isStaff ? "justify-content-end " : "justify-content-start"}`}>
			<Card className="custom-animate-fadeup border-light-subtle bg-light-subtle shadow-sm">
				<Card.Body className=''>
					<div className="d-flex gap-2">
						<div className='flex-shrink-0 lh-1 bg-info-subtle fs-4 fw-semibold rounded-circle d-flex align-items-center justify-content-center' style={{ width: '50px', height: '50px' }}>
							{note.isStaff ? <span>{"Staff".charAt(0)}</span> : <span>{user.name.charAt(0).toUpperCase()} </span>}
						</div>
						<div className='flex-grow-1'>
							<div className='fw-semibold'>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</div>
							<p className='mb-0'>{note.text}</p>
							<small>{new Date(note.createdAt).toLocaleString('en-IN')}</small>
						</div>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default NoteItem