import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const createUser = async (user: FirebaseAuthTypes.User) => {
	console.log('creating user', user.uid)
	const userDoc = firestore().collection('Users').doc(user.uid)
	const docSnapshot = await userDoc.get()

	if (!docSnapshot.exists) {
		await userDoc.set({
			uid: user.uid,
			coins: 100,
			createdAt: firestore.FieldValue.serverTimestamp(),
		})
		console.log('New user document created 🎉')
	} else {
		console.log('User already exists, skipping create')
	}
}

export const getUser = async (user: FirebaseAuthTypes.User) => {
	const userDoc = firestore().collection('Users').doc(user.uid)
	const docSnapshot = await userDoc.get()
	return docSnapshot.data()
}
