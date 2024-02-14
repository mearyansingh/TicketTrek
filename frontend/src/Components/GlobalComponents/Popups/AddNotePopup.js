/**
 * Invite user popup 
 */
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

function AddNotePopup({ callback }) {

	const [noteText, setNoteText] = useState('')

	/**
	 * Function is called on form submission.
	 * Send popup data with callback in parent component and show toast.
	 */
	const onSubmitForm = (e) => {
		e.preventDefault()
		// Check if noteText is not empty
		if (noteText.trim() !== '') {
			// Perform any additional logic or validation here if needed
			toast.success("Note added successfully");
			// Call the callback function with the note text
			const callBackData = { noteText }
			callback(true, callBackData);
		} else {
			// Display an error message or handle the case when noteText is empty
			toast.error("Note text cannot be empty");
		}
	}

	return (
		<Fragment>
			<Modal.Body className="custom-popup__content">
				<Form id="addNoteForm" onSubmit={onSubmitForm}>
					<Form.Group>
						<Form.Label>Add Note</Form.Label>
						<Form.Control
							type="text"
							placeholder="Note text"
							name='noteText'
							id="noteText"
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer className="custom-popup__footer flex-column-reverse flex-sm-row gap-2 gap-sm-3">
				<Button variant="dark" type="button" aria-label="Cancel" onClick={() => callback(false)}>
					Cancel
				</Button>
				<Button variant="primary" form="addNoteForm" type="submit" aria-label="Add Note">
					Add Note
				</Button>
			</Modal.Footer>
		</Fragment>
	)
}

/** Props types */
AddNotePopup.propTypes = {
	callback: PropTypes.func,
};

export { AddNotePopup };