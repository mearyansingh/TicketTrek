import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<Navbar collapseOnSelect expand="lg" className="bg-warning bg-gradient sticky-top">
			<Container>
				<Navbar.Brand as={Link} to="/" className='fw-bold'>TicketTrek</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className='ms-auto align-items-start'>
						{user ? (
							<Nav.Link as="button" type='button' className='fw-semibold' onClick={onLogout}><i className="bi bi-box-arrow-in-left me-1"></i>Logout</Nav.Link>
						) : (
							<>
								<Nav.Link as={Link} to="/login" className='fw-semibold'><i className="bi bi-box-arrow-in-right me-1"></i>Login</Nav.Link>
								<Nav.Link as={Link} to="/register" className='fw-semibold'><i className="bi bi-person-fill me-1"></i>Register</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container >
		</Navbar >
	);
}

export default Header;

