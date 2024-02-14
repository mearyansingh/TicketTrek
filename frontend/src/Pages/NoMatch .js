import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoMatch() {
	return (
		<section className="p-3 p-md-4 p-xl-5">
			<Container>
				<div class="d-flex align-items-center justify-content-center">
					<div class="text-center">
						<h1 class="display-1 fw-bold">404</h1>
						<p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
						<p class="lead">
							The page you’re looking for doesn’t exist.
						</p>
						<Button as={Link} to="/" variant="primary" type='button'>Back to Home</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default NoMatch 