import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Card, Image, Container } from "react-bootstrap";
import Header from './Components/LayoutComponents/Header';
import Footer from './Components/LayoutComponents/Footer';
import NewTicket from './Pages/NewTicket';
import PrivateRoute from './Components/AppComponents/PrivateRoute';
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Tickets from "./Pages/Tickets";
import Ticket from "./Pages/Ticket";
// import Notes from "./Pages/Notes";
import NoMatch from './Pages/NoMatch '
import TicketTrek from './Assets/Images/TicketTrek.gif'

function App() {
	return (
		<>
			<Router>
				<div className='d-flex flex-column justify-content-between min-vh-100'>
					<Header />
					<Card className='mb-4 rounded-0 border-0 border-light-subtle overflow-hidden'>
						<Card.Body className='p-0' style={{ height: "400px" }}>
							<Image src={TicketTrek} fluid width={800} className='w-100 h-100 object-fit-cover' height={800} alt="TicketTrek_img" />
						</Card.Body>
					</Card>
					<main className='flex-grow-1 py-4'>
						<Container>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/new-ticket' element={<PrivateRoute><NewTicket /></PrivateRoute>} />
								<Route path='/tickets' element={<PrivateRoute><Tickets /></PrivateRoute>} />
								<Route path='/ticket/:ticketId' element={<PrivateRoute> <Ticket /></PrivateRoute>} />
								{/* <Route path='/ticket/:ticketId/notes' element={<PrivateRoute> <Notes /></PrivateRoute>} /> */}
								<Route path='*' element={<NoMatch />} />
							</Routes>
						</Container>
					</main>
					<Footer />
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
