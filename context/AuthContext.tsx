import { createUser, getUser, updateUser } from '@/hooks/useFirestore'
import { UserData } from '@/types/user'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
	user: UserData | null
	loading: boolean
	signIn: () => Promise<void>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	signIn: async () => {},
	signOut: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'1061764827233-q1vnh1sbmu1ce7cc95gsrkij445ovrdp.apps.googleusercontent.com',
		})

		const unsubscribe = auth().onAuthStateChanged(async userState => {
			if (userState) {
				const userDoc = await getUser(userState.uid)

				if (userDoc) {
					await updateUser(userState.uid, {
						lastLogin: firestore.FieldValue.serverTimestamp(),
					})
					setUser(userDoc as UserData)
				} else {
					await createUser(userState)
				}
			} else {
				setUser(null)
			}

			setLoading(false)
		})

		return unsubscribe
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
			console.log('Google sign-in error:', error)
		}
	}

	const signOut = async () => {
		try {
			await GoogleSignin.signOut()
			await auth().signOut()
			setUser(null)
		} catch (error) {
			console.log('Sign-out error:', error)
		}
	}

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
