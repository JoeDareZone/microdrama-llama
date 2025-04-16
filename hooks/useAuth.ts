// import { auth } from '@/app/firebase/config'
import { getUserCoins } from '@/services/currencyService'
import { UserData } from '@/types/user'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'
import { createUser } from './useFirestore'

export const useAuth = () => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<UserData | null>(null)

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'1061764827233-q1vnh1sbmu1ce7cc95gsrkij445ovrdp.apps.googleusercontent.com',
		})

		const subscriber = auth().onAuthStateChanged(async userState => {
			if (userState) {
				const userRef = firestore()
					.collection('users')
					.doc(userState.uid)

				const userDoc = await userRef.get()

				if (!userDoc.exists) {
					await createUser(userState)
				} else {
					setUser(userDoc.data() as UserData)
				}
			}

			setLoading(false)
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
			const userCredential = await auth().signInWithCredential(
				googleCredential
			)
			await getUserCoins(userCredential.user.uid)
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
