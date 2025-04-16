import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type UserData = {
	uid: string
	createdAt: FirebaseFirestoreTypes.Timestamp
	lastLogin: FirebaseFirestoreTypes.Timestamp
	dailyRewardClaimed: boolean
	coins: number
	achievements: string[]
}
