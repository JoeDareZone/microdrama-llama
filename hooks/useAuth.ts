// import { auth } from '@/app/firebase/config'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'

export const useAuth = () => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'1061764827233-q1vnh1sbmu1ce7cc95gsrkij445ovrdp.apps.googleusercontent.com',
		})

		const subscriber = auth().onAuthStateChanged(userState => {
			setUser(userState)

			if (loading) {
				setLoading(false)
			}
		})

		return subscriber
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const response = await GoogleSignin.signIn()
			const googleCredential = auth.GoogleAuthProvider.credential(
				response.data?.idToken || null
			)
			await auth().signInWithCredential(googleCredential)
		} catch (error) {
			console.log(error)
		}
	}

	const signOut = async () => {
		try {
			await GoogleSignin.signOut()
			auth().signOut()
			setUser(null)
		} catch (error) {
			console.error(error)
		}
	}

	return { user, loading, signIn, signOut }
}
