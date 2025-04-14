// import { auth } from '@/app/firebase/config'
import {
	GoogleSignin,
	isSuccessResponse,
	User,
} from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'

export const useAuth = () => {
	const [loading, setLoading] = useState(true)
	// const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		GoogleSignin.configure({
			//   webClientId: 'YOUR_WEB_CLIENT_ID', // replace this!
		})
		// const unsubscribe = auth().onAuthStateChanged(user => {
		// 	setUser(user)
		// 	setLoading(false)
		// })

		// return unsubscribe
		const checkSignedIn = async () => {
			const currentUser = GoogleSignin.getCurrentUser()
			if (currentUser) {
				setUser(currentUser)
				setLoading(false)
			} else {
				setLoading(false)
			}
		}
		checkSignedIn()
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const response = await GoogleSignin.signIn()
			if (isSuccessResponse(response)) {
				console.log('sign in successful')
				setUser(response.data)
			} else {
				console.log('sign in was cancelled by user')
				// sign in was cancelled by user
			}
		} catch (error) {
			console.log(error)
		}
	}

	// const signIn = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices()
	// 		const { data } = await GoogleSignin.signIn()
	// 		// const googleCredential = auth.GoogleAuthProvider.credential(
	// 		// 	data?.idToken || null
	// 		// )
	// 		// await auth().signInWithCredential(googleCredential)
	// 		setUser(data)
	// 		// setUser(auth().currentUser)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	const signOut = async () => {
		try {
			await GoogleSignin.signOut()
			setUser(null)
		} catch (error) {
			console.error(error)
		}
	}

	return { user, loading, signIn, signOut }
}
