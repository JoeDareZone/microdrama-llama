import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const createUser = async (user: FirebaseAuthTypes.User) => {
	const userDoc = firestore().collection('users').doc(user.uid)
	const docSnapshot = await userDoc.get()

	if (!docSnapshot.exists) {
		await userDoc.set({
			uid: user.uid,
			coins: 100,
			createdAt: firestore.FieldValue.serverTimestamp(),
			dailyRewardClaimed: false,
			achievements: [],
			lastLogin: firestore.FieldValue.serverTimestamp(),
		})
	}
}

export const getUser = async (userId: string) => {
	const userDoc = firestore().collection('users').doc(userId)
	const docSnapshot = await userDoc.get()
	return docSnapshot.data()
}

export const updateUser = async (
	userId: string,
	updates: Record<string, any>
) => {
	const userDoc = firestore().collection('users').doc(userId)
	await userDoc.update(updates)
}
