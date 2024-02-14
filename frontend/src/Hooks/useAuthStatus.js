import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
	/**Initial state */
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	//Getting the user from redux
	const { user } = useSelector(state => state.auth)

	/**lifecycle method with dependency user */
	useEffect(() => {
		if (user) {
			setLoggedIn(true)
		} else {
			setLoggedIn(false)
		}
		setCheckingStatus(false)

	}, [user])

	return { loggedIn, checkingStatus }
}

