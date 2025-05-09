import { getUser, updateUser } from '@/hooks/useFirestore'
import firestore from '@react-native-firebase/firestore'
import { useCurrencyStore } from '../stores/useCurrencyStore'

const usersCollection = firestore().collection('users')

export const getUserCoins = async (uid: string) => {
	const userDoc = await usersCollection.doc(uid).get()
	const coins = userDoc.exists ? userDoc.data()?.coins ?? 0 : 0
	useCurrencyStore.getState().setCoins(coins)
}

export const addUserCoins = async (uid: string, amount: number) => {
	const store = useCurrencyStore.getState()
	store.addCoins(amount)

	await usersCollection.doc(uid).update({
		coins: firestore.FieldValue.increment(amount),
	})
}

export const spendUserCoins = async (uid: string, amount: number) => {
	const store = useCurrencyStore.getState()
	if (store.coins >= amount) {
		store.spendCoins(amount)
		await usersCollection.doc(uid).update({
			coins: firestore.FieldValue.increment(-amount),
		})
		return true
	} else {
		return false
	}
}

export const resetUserCoins = async (uid: string) => {
	useCurrencyStore.getState().setCoins(0)
	await usersCollection.doc(uid).update({ coins: 0 })
}

export const claimReward = async (userId: string, rewardAmount: number) => {
	await updateUser(userId, {
		coins: firestore.FieldValue.increment(rewardAmount),
		lastLogin: firestore.FieldValue.serverTimestamp(),
	})
	addUserCoins(userId, rewardAmount)
}

export const checkDailyReward = async (userId: string) => {
	try {
		const userDoc = await getUser(userId)

		if (userDoc) {
			const lastLogin = userDoc?.lastLogin?.toDate()
			const today = new Date()

			// Check if the user has logged in today
			if (
				lastLogin?.getDate() === today.getDate() &&
				lastLogin?.getMonth() === today.getMonth() &&
				lastLogin?.getFullYear() === today.getFullYear()
			) {
				await updateUser(userId, { dailyRewardClaimed: true })
			} else {
				return false
			}
		}
	} catch (error) {
		console.error('Error handling daily reward:', error)
		return false
	}
}
